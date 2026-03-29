#!/usr/bin/env bash
# =============================================================================
#  deploy.sh  —  Deploy remoto da aplicação encruamento-app
#
#  Uso (executado DENTRO do servidor ou via SSH pipe):
#    chmod +x deploy.sh && ./deploy.sh
#
#  Pré-requisitos no servidor:
#    - Docker instalado e ativo
#    - Nginx instalado e ativo
#    - Usuário com permissão para docker e para alterar /etc/nginx
# =============================================================================
set -euo pipefail

# ──────────────────────────────────────────────────────────────────────────────
# Variáveis de configuração — ajuste aqui se necessário
# ──────────────────────────────────────────────────────────────────────────────
APP_NAME="encruamento-app"
APP_DIR="/opt/encruamento"
CONTAINER_NAME="encruamento-app"
INTERNAL_PORT="3000"
DOMAIN="encruamento.ewertondev.com.br"
SERVER_HOST="130.250.189.175"
SERVER_USER="root"
NGINX_SITE_PATH="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED_PATH="/etc/nginx/sites-enabled/${DOMAIN}"
NGINX_CONFD_PATH="/etc/nginx/conf.d/${DOMAIN}.conf"
IMAGE_TAG="encruamento-app:latest"

# ──────────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────────
info()    { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
success() { echo -e "\033[1;32m[OK]\033[0m    $*"; }
warn()    { echo -e "\033[1;33m[WARN]\033[0m  $*"; }
error()   { echo -e "\033[1;31m[ERROR]\033[0m $*" >&2; }
die()     { error "$*"; exit 1; }

step() {
  echo ""
  echo "──────────────────────────────────────────"
  echo "  $*"
  echo "──────────────────────────────────────────"
}

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 1 — Verificar pré-requisitos
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 1 — Verificando pré-requisitos"

command -v docker >/dev/null 2>&1 || die "Docker não encontrado. Instale o Docker antes de continuar."
docker info >/dev/null 2>&1       || die "Docker está instalado mas não está em execução."
success "Docker OK: $(docker --version)"

command -v nginx >/dev/null 2>&1  || die "Nginx não encontrado. Instale o Nginx antes de continuar."
nginx -v 2>&1 | head -1 && success "Nginx OK"

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 2 — Preparar diretório da aplicação
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 2 — Preparando diretório ${APP_DIR}"

mkdir -p "${APP_DIR}"
info "Diretório ${APP_DIR} pronto."

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 3 — Build da imagem Docker
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 3 — Build da imagem Docker (${IMAGE_TAG})"

cd "${APP_DIR}"

if [ ! -f Dockerfile ]; then
  die "Dockerfile não encontrado em ${APP_DIR}. Verifique se os arquivos foram enviados."
fi

info "Iniciando build da imagem..."
docker build -t "${IMAGE_TAG}" . \
  || die "Falha no build da imagem Docker."

success "Imagem ${IMAGE_TAG} construída com sucesso."

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 4 — Parar e remover container antigo
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 4 — Gerenciando container existente"

if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  info "Container ${CONTAINER_NAME} encontrado. Parando..."
  docker stop "${CONTAINER_NAME}" || warn "Falha ao parar container (pode já estar parado)."
  docker rm   "${CONTAINER_NAME}" || warn "Falha ao remover container."
  success "Container antigo removido."
else
  info "Nenhum container anterior encontrado com o nome ${CONTAINER_NAME}."
fi

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 5 — Subir container
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 5 — Subindo container ${CONTAINER_NAME}"

if [ -f "${APP_DIR}/docker-compose.yml" ]; then
  info "docker-compose.yml encontrado — usando Docker Compose."
  docker compose -f "${APP_DIR}/docker-compose.yml" up -d \
    || die "Falha ao subir container com Docker Compose."
else
  info "Usando docker run diretamente."
  docker run -d \
    --name "${CONTAINER_NAME}" \
    --restart unless-stopped \
    -e NODE_ENV=production \
    -e PORT="${INTERNAL_PORT}" \
    -p "127.0.0.1:${INTERNAL_PORT}:${INTERNAL_PORT}" \
    "${IMAGE_TAG}" \
    || die "Falha ao iniciar o container."
fi

success "Container ${CONTAINER_NAME} iniciado."

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 6 — Validar container em execução
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 6 — Validando container"

info "Aguardando a aplicação inicializar (15s)..."
sleep 15

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  error "Container ${CONTAINER_NAME} não está em execução."
  info "Últimas linhas do log:"
  docker logs --tail 50 "${CONTAINER_NAME}" 2>&1 || true
  die "Falha na validação do container."
fi

success "Container em execução:"
docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Teste local da aplicação
info "Testando aplicação localmente em http://127.0.0.1:${INTERNAL_PORT} ..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://127.0.0.1:${INTERNAL_PORT}" || echo "000")
if [ "${HTTP_CODE}" = "000" ]; then
  warn "Não foi possível atingir a aplicação localmente (código: ${HTTP_CODE})."
  info "Logs do container:"
  docker logs --tail 30 "${CONTAINER_NAME}" 2>&1 || true
  die "Aplicação não responde localmente."
fi
success "Aplicação responde localmente (HTTP ${HTTP_CODE})."

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 7 — Localizar certificado HTTPS
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 7 — Localizando certificado HTTPS"

CERT_PATH=""
KEY_PATH=""

# Prioridade: certificado específico do domínio
for candidate in \
  "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" \
  "/etc/letsencrypt/live/${DOMAIN%.*}/fullchain.pem" \
  "/etc/nginx/ssl/${DOMAIN}.crt" \
  "/etc/ssl/certs/${DOMAIN}.crt" \
  "/etc/ssl/certs/fullchain.pem"; do
  if [ -f "${candidate}" ]; then
    CERT_PATH="${candidate}"
    break
  fi
done

for candidate in \
  "/etc/letsencrypt/live/${DOMAIN}/privkey.pem" \
  "/etc/letsencrypt/live/${DOMAIN%.*}/privkey.pem" \
  "/etc/nginx/ssl/${DOMAIN}.key" \
  "/etc/ssl/private/${DOMAIN}.key" \
  "/etc/ssl/private/privkey.pem"; do
  if [ -f "${candidate}" ]; then
    KEY_PATH="${candidate}"
    break
  fi
done

if [ -n "${CERT_PATH}" ] && [ -n "${KEY_PATH}" ]; then
  success "Certificado encontrado:"
  info "  CERT: ${CERT_PATH}"
  info "  KEY : ${KEY_PATH}"
  HTTPS_ENABLED=true
else
  warn "Certificado HTTPS não encontrado nos caminhos conhecidos."
  warn "A configuração do Nginx será criada apenas para HTTP (porta 80)."
  warn "Para ativar HTTPS, obtenha o certificado e re-execute o deploy."
  HTTPS_ENABLED=false
fi

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 8 — Detectar padrão de configuração do Nginx
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 8 — Detectando padrão de configuração do Nginx"

USE_SITES_AVAILABLE=false
USE_CONFD=false

if [ -d /etc/nginx/sites-available ]; then
  USE_SITES_AVAILABLE=true
  NGINX_CONF_FILE="${NGINX_SITE_PATH}"
  info "Usando padrão sites-available/sites-enabled."
elif [ -d /etc/nginx/conf.d ]; then
  USE_CONFD=true
  NGINX_CONF_FILE="${NGINX_CONFD_PATH}"
  info "Usando padrão conf.d."
else
  die "Não foi possível determinar o padrão de configuração do Nginx."
fi

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 9 — Fazer backup e criar/atualizar configuração do Nginx
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 9 — Configurando Nginx para ${DOMAIN}"

BACKUP_SUFFIX=".bak.$(date -u +%Y%m%d%H%M%S)"

if [ -f "${NGINX_CONF_FILE}" ]; then
  cp "${NGINX_CONF_FILE}" "${NGINX_CONF_FILE}${BACKUP_SUFFIX}"
  info "Backup criado: ${NGINX_CONF_FILE}${BACKUP_SUFFIX}"
fi

if [ "${HTTPS_ENABLED}" = true ]; then
  info "Gerando configuração HTTPS..."
  cat > "${NGINX_CONF_FILE}" <<EOF
# Configuração gerada automaticamente por deploy.sh
# Domínio: ${DOMAIN}
# Data: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    http2 on;
    server_name ${DOMAIN};

    ssl_certificate     ${CERT_PATH};
    ssl_certificate_key ${KEY_PATH};

    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 50m;

    access_log  /var/log/nginx/${DOMAIN}.access.log;
    error_log   /var/log/nginx/${DOMAIN}.error.log warn;

    location / {
        proxy_pass         http://127.0.0.1:${INTERNAL_PORT};
        proxy_http_version 1.1;

        proxy_set_header Upgrade           \$http_upgrade;
        proxy_set_header Connection        "upgrade";
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_cache_bypass \$http_upgrade;

        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;
    }
}
EOF
else
  info "Gerando configuração HTTP apenas..."
  cat > "${NGINX_CONF_FILE}" <<EOF
# Configuração gerada automaticamente por deploy.sh
# Domínio: ${DOMAIN}
# HTTPS: desabilitado (certificado não encontrado)
# Data: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

server {
    listen 80;
    server_name ${DOMAIN};

    client_max_body_size 50m;

    access_log  /var/log/nginx/${DOMAIN}.access.log;
    error_log   /var/log/nginx/${DOMAIN}.error.log warn;

    location / {
        proxy_pass         http://127.0.0.1:${INTERNAL_PORT};
        proxy_http_version 1.1;

        proxy_set_header Upgrade           \$http_upgrade;
        proxy_set_header Connection        "upgrade";
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_cache_bypass \$http_upgrade;

        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;
    }
}
EOF
fi

success "Arquivo de configuração criado em ${NGINX_CONF_FILE}"

# Habilitar site (apenas no padrão sites-available)
if [ "${USE_SITES_AVAILABLE}" = true ]; then
  if [ ! -L "${NGINX_ENABLED_PATH}" ]; then
    ln -s "${NGINX_CONF_FILE}" "${NGINX_ENABLED_PATH}"
    success "Symlink criado: ${NGINX_ENABLED_PATH} -> ${NGINX_CONF_FILE}"
  else
    info "Symlink já existe: ${NGINX_ENABLED_PATH}"
  fi
fi

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 10 — Validar e recarregar Nginx
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 10 — Validando e recarregando Nginx"

nginx -t || die "Configuração do Nginx inválida. Verifique ${NGINX_CONF_FILE}."
success "Sintaxe do Nginx OK."

systemctl reload nginx 2>/dev/null || service nginx reload 2>/dev/null \
  || die "Falha ao recarregar o Nginx."
success "Nginx recarregado com sucesso."

# ──────────────────────────────────────────────────────────────────────────────
# ETAPA 11 — Validações finais
# ──────────────────────────────────────────────────────────────────────────────
step "ETAPA 11 — Validações finais"

info "Status do Nginx:"
systemctl status nginx --no-pager 2>/dev/null | head -5 || service nginx status 2>/dev/null | head -5 || true

info "Containers em execução:"
docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

info "Testando domínio HTTP (${DOMAIN})..."
HTTP_DOMAIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "http://${DOMAIN}" 2>/dev/null || echo "000")
info "  → http://${DOMAIN}  : HTTP ${HTTP_DOMAIN_CODE}"

if [ "${HTTPS_ENABLED}" = true ]; then
  info "Testando domínio HTTPS (${DOMAIN})..."
  HTTPS_DOMAIN_CODE=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 15 "https://${DOMAIN}" 2>/dev/null || echo "000")
  info "  → https://${DOMAIN} : HTTP ${HTTPS_DOMAIN_CODE}"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  DEPLOY CONCLUÍDO"
echo "════════════════════════════════════════════════════════════"
if [ "${HTTPS_ENABLED}" = true ]; then
  echo "  URL: https://${DOMAIN}"
else
  echo "  URL: http://${DOMAIN}"
  warn "HTTPS não configurado. Obtenha o certificado para habilitar."
fi
echo "  Container : ${CONTAINER_NAME}"
echo "  Porta     : 127.0.0.1:${INTERNAL_PORT}"
echo "════════════════════════════════════════════════════════════"

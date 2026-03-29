# README_DEPLOY.md — Guia de Deploy: poc-usiminas.ewertondev.com.br

## Visão Geral

Este guia descreve como implantar a aplicação **poc-usiminas** (Next.js) no servidor remoto usando Docker e o Nginx já instalado no host.

| Item | Valor |
|------|-------|
| Servidor | `130.250.189.175` |
| Usuário SSH | `root` |
| Domínio | `poc-usiminas.ewertondev.com.br` |
| Container | `poc-usiminas-app` |
| Porta interna | `127.0.0.1:3001` |

> **Nota:** A porta 3001 é usada para evitar conflito com a aplicação existente (tela elevador) que já utiliza a porta 3000 no mesmo servidor.

---

## 0. Pré-requisito: Criar Registro DNS

Antes do deploy, crie um registro DNS do tipo **A** apontando para o servidor:

```
poc-usiminas.ewertondev.com.br  →  130.250.189.175
```

Configure isso no painel do seu provedor de DNS (Cloudflare, Route53, etc).

---

## 1. Conectar ao Servidor

```bash
ssh root@130.250.189.175
```

Se a conexão for recusada ou a senha não for aceita, veja a seção **9. O que fazer se a senha do root não funcionar**.

---

## 2. Enviar os Arquivos para o Servidor

### Opção A — Windows (deploy.bat)

Execute `deploy.bat` na raiz do projeto. O script usa `scp`/`ssh` do OpenSSH.

```bat
deploy.bat
```

> O script solicita a senha interativamente. Se preferir automação sem prompt, use chaves SSH (recomendado).

### Opção B — Linux/macOS (scp manual)

```bash
# Enviar todos os arquivos (exceto node_modules e .next)
rsync -avz --exclude=node_modules --exclude=.next --exclude=.git \
  ./ root@130.250.189.175:/opt/poc-usiminas/

# OU, se rsync não estiver disponível:
scp -r app components hooks mocks theme types utils public \
       Dockerfile .dockerignore docker-compose.yml package.json package-lock.json \
       next.config.js tsconfig.json .eslintrc.json deploy.sh \
       root@130.250.189.175:/opt/poc-usiminas/
```

---

## 3. Executar o Deploy

```bash
# Conectar ao servidor
ssh root@130.250.189.175

# Navegar até o diretório da aplicação
cd /opt/poc-usiminas

# Dar permissão de execução e rodar o script
chmod +x deploy.sh
./deploy.sh
```

O `deploy.sh` realiza automaticamente:
- Build da imagem Docker
- Parada e remoção do container antigo
- Subida do novo container
- Detecção e configuração do Nginx
- Backup dos arquivos alterados
- Reload do Nginx
- Validações finais

---

## 4. Validar o Container

```bash
# Listar containers em execução
docker ps

# Ver detalhes do container da aplicação
docker ps --filter name=poc-usiminas-app

# Testar resposta local da aplicação
curl -I http://127.0.0.1:3001

# Inspecionar o container
docker inspect poc-usiminas-app
```

---

## 5. Validar o Nginx

```bash
# Testar sintaxe da configuração
nginx -t

# Ver status do serviço
systemctl status nginx

# Verificar arquivo de configuração gerado
cat /etc/nginx/sites-available/poc-usiminas.ewertondev.com.br
# ou
cat /etc/nginx/conf.d/poc-usiminas.ewertondev.com.br.conf

# Listar sites habilitados
ls -la /etc/nginx/sites-enabled/
```

---

## 6. Validar HTTPS

```bash
# Testar redirecionamento HTTP → HTTPS
curl -I http://poc-usiminas.ewertondev.com.br

# Testar resposta HTTPS
curl -I https://poc-usiminas.ewertondev.com.br

# Verificar certificado
openssl s_client -connect poc-usiminas.ewertondev.com.br:443 -servername poc-usiminas.ewertondev.com.br < /dev/null 2>/dev/null | openssl x509 -noout -dates

# Verificar onde está o certificado Let's Encrypt
ls -la /etc/letsencrypt/live/
```

Se o certificado não for encontrado automaticamente, veja o passo abaixo sobre certificados.

### Obter novo certificado Let's Encrypt (somente se necessário)

```bash
# Parar Nginx temporariamente para validação standalone
systemctl stop nginx

# Emitir certificado
certbot certonly --standalone -d poc-usiminas.ewertondev.com.br

# Reiniciar Nginx
systemctl start nginx
```

---

## 7. Verificar Logs

```bash
# Logs do container Docker
docker logs poc-usiminas-app
docker logs --tail 100 poc-usiminas-app
docker logs -f poc-usiminas-app   # modo follow

# Logs de acesso do Nginx
tail -f /var/log/nginx/poc-usiminas.ewertondev.com.br.access.log

# Logs de erro do Nginx
tail -f /var/log/nginx/poc-usiminas.ewertondev.com.br.error.log

# Logs gerais do Nginx
tail -f /var/log/nginx/error.log
```

---

## 8. Rollback Básico

```bash
# Listar imagens disponíveis
docker images | grep poc-usiminas

# Parar container atual
docker stop poc-usiminas-app && docker rm poc-usiminas-app

# Subir container com imagem anterior (substitua <TAG> pela tag anterior)
docker run -d \
  --name poc-usiminas-app \
  --restart unless-stopped \
  -e NODE_ENV=production \
  -e PORT=3001 \
  -p 127.0.0.1:3001:3001 \
  poc-usiminas-app:<TAG>

# Restaurar configuração anterior do Nginx (substitua <TIMESTAMP> pelo backup)
ls /etc/nginx/sites-available/*.bak.*
cp /etc/nginx/sites-available/poc-usiminas.ewertondev.com.br.bak.<TIMESTAMP> \
   /etc/nginx/sites-available/poc-usiminas.ewertondev.com.br
nginx -t && systemctl reload nginx
```

---

## 9. O que Fazer se a Senha do Root Não Funcionar

Se `ssh root@130.250.189.175` recusar a senha:

1. **Verifique se a autenticação por senha está habilitada:**
   ```bash
   # No servidor, via console ou outro acesso:
   grep PasswordAuthentication /etc/ssh/sshd_config
   # Se estiver "no", edite para "yes" e reinicie: systemctl restart sshd
   ```

2. **Verifique se o fail2ban bloqueou seu IP:**
   ```bash
   fail2ban-client status sshd
   # Para desbloquear:
   fail2ban-client set sshd unbanip <SEU_IP>
   ```

3. **Configure autenticação por chave SSH (recomendado):**
   ```bash
   # Na máquina local:
   ssh-keygen -t ed25519 -C "deploy@poc-usiminas"
   ssh-copy-id -i ~/.ssh/id_ed25519.pub root@130.250.189.175
   # Após isso, o acesso será por chave, sem necessidade de senha
   ```

4. **Se a senha realmente estiver errada:**
   - Acesse o servidor via console do provedor de nuvem
   - Redefina a senha do root: `passwd root`

---

## Possíveis Pontos de Falha

| Situação | Causa Provável | Solução |
|----------|---------------|---------|
| `Connection refused` na porta 22 | SSH bloqueado por firewall | Abrir porta 22 no firewall do servidor/provedor |
| `Permission denied (publickey,password)` | Senha incorreta ou auth por senha desabilitada | Verificar senha ou habilitar `PasswordAuthentication yes` no sshd |
| Build Docker falha | Dependências não encontradas ou Node incompatível | Verificar `Dockerfile` e versão do Node |
| Container sobe mas não responde | Aplicação com erro na inicialização | `docker logs poc-usiminas-app` para detalhes |
| Nginx `nginx -t` falha | Caminho de certificado errado na config | Corrigir `ssl_certificate` e `ssl_certificate_key` no arquivo de config |
| DNS não resolve | Registro A não configurado | Criar registro A no DNS: `poc-usiminas.ewertondev.com.br → 130.250.189.175` |
| Porta 3001 já em uso | Outro processo usando a porta | `ss -tlnp \| grep 3001` para identificar e liberar |
| HTTPS não funciona | Certificado não encontrado ou expirado | Verificar `/etc/letsencrypt/live/` ou emitir novo certificado |
| Site acessível localmente mas não externamente | Firewall bloqueando portas 80/443 | Abrir portas 80 e 443 no firewall: `ufw allow 80,443/tcp` |

---

## Estrutura de Arquivos do Deploy

```
poc-usiminas/
├── Dockerfile                         # Build da imagem Docker da aplicação
├── .dockerignore                      # Arquivos excluídos do build Docker
├── docker-compose.yml                 # Orquestração do container
├── deploy.sh                          # Script de deploy (executa no servidor)
├── deploy.bat                         # Launcher para Windows (envia e executa deploy)
├── nginx/
│   └── poc-usiminas.ewertondev.com.br.conf  # Template de configuração Nginx
└── README_DEPLOY.md                   # Este guia
```

@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

REM =============================================================================
REM  deploy.bat  —  Envio dos arquivos e execução remota do deploy
REM
REM  Pré-requisitos na máquina local:
REM    - ssh e scp disponíveis no PATH (Git for Windows, OpenSSH ou similar)
REM    - Acesso de rede ao servidor 130.250.189.175
REM
REM  Uso:
REM    deploy.bat
REM
REM  O script irá solicitar a senha interativamente, se necessário.
REM  Para automação sem prompt, exporte SSH_PASS como variável de ambiente
REM  antes de executar este script (NÃO grave a senha diretamente aqui).
REM =============================================================================

REM ──────────────────────────────────────────────────────────────────────────────
REM  Variáveis de configuração
REM ──────────────────────────────────────────────────────────────────────────────
set SERVER_HOST=130.250.189.175
set SERVER_USER=root
set DOMAIN=poc-usiminas.ewertondev.com.br
set APP_DIR=/opt/poc-usiminas
set REMOTE_SCRIPT=%APP_DIR%/deploy.sh

REM Arquivos e pastas a enviar ao servidor
set LOCAL_PROJECT_DIR=%~dp0

REM ──────────────────────────────────────────────────────────────────────────────
REM  Banner
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo ============================================================
echo   DEPLOY — %DOMAIN%
echo   Servidor: %SERVER_USER%@%SERVER_HOST%
echo ============================================================
echo.

REM ──────────────────────────────────────────────────────────────────────────────
REM  Verificar se ssh está disponível
REM ──────────────────────────────────────────────────────────────────────────────
where ssh >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Comando 'ssh' nao encontrado no PATH.
    echo        Instale o OpenSSH for Windows ou o Git for Windows e tente novamente.
    echo        https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse
    pause
    exit /b 1
)

where scp >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Comando 'scp' nao encontrado no PATH.
    echo        Instale o OpenSSH for Windows ou o Git for Windows e tente novamente.
    pause
    exit /b 1
)

echo [OK] ssh e scp encontrados no PATH.

REM ──────────────────────────────────────────────────────────────────────────────
REM  Preparar diretório remoto
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo [PASSO 1/4] Criando diretorio remoto %APP_DIR% ...
ssh -o StrictHostKeyChecking=no -o ConnectTimeout=15 ^
    %SERVER_USER%@%SERVER_HOST% "mkdir -p %APP_DIR%"
if errorlevel 1 (
    call :ssh_error
    exit /b 1
)
echo [OK] Diretorio remoto pronto.

REM ──────────────────────────────────────────────────────────────────────────────
REM  Enviar arquivos da aplicação
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo [PASSO 2/4] Enviando arquivos para %SERVER_USER%@%SERVER_HOST%:%APP_DIR% ...
echo            (excluindo node_modules e .next para evitar envio desnecessario)

REM Criar arquivo de exclusão temporário
set EXCLUDE_FILE=%TEMP%\scp_exclude_%RANDOM%.txt
(
    echo node_modules
    echo .next
    echo .git
    echo *.log
) > "%EXCLUDE_FILE%"

REM Usar rsync se disponível, caso contrário usar scp com tar
where rsync >nul 2>&1
if not errorlevel 1 (
    echo [INFO] Usando rsync para envio...
    rsync -avz --progress ^
        --exclude="node_modules" ^
        --exclude=".next" ^
        --exclude=".git" ^
        --exclude="*.log" ^
        -e "ssh -o StrictHostKeyChecking=no" ^
        "%LOCAL_PROJECT_DIR%" ^
        %SERVER_USER%@%SERVER_HOST%:%APP_DIR%/
    if errorlevel 1 (
        call :scp_error
        exit /b 1
    )
) else (
    echo [INFO] rsync nao disponivel. Usando scp para envio de arquivos principais...
    REM Enviar arquivos essenciais individualmente via scp
    for %%F in (
        Dockerfile
        .dockerignore
        docker-compose.yml
        package.json
        package-lock.json
        next.config.js
        tsconfig.json
        .eslintrc.json
        deploy.sh
    ) do (
        if exist "%LOCAL_PROJECT_DIR%%%F" (
            echo [INFO] Enviando %%F ...
            scp -o StrictHostKeyChecking=no -o ConnectTimeout=15 ^
                "%LOCAL_PROJECT_DIR%%%F" ^
                %SERVER_USER%@%SERVER_HOST%:%APP_DIR%/%%F
            if errorlevel 1 (
                call :scp_error
                exit /b 1
            )
        )
    )
    REM Enviar pastas via scp -r
    for %%D in (app components hooks mocks theme types utils public) do (
        if exist "%LOCAL_PROJECT_DIR%%%D" (
            echo [INFO] Enviando pasta %%D ...
            scp -r -o StrictHostKeyChecking=no -o ConnectTimeout=15 ^
                "%LOCAL_PROJECT_DIR%%%D" ^
                %SERVER_USER%@%SERVER_HOST%:%APP_DIR%/
            if errorlevel 1 (
                call :scp_error
                exit /b 1
            )
        )
    )
)

del /f /q "%EXCLUDE_FILE%" 2>nul
echo [OK] Arquivos enviados com sucesso.

REM ──────────────────────────────────────────────────────────────────────────────
REM  Ajustar permissões e executar deploy remoto
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo [PASSO 3/4] Executando deploy remoto no servidor ...
ssh -o StrictHostKeyChecking=no -o ConnectTimeout=15 ^
    %SERVER_USER%@%SERVER_HOST% ^
    "chmod +x %REMOTE_SCRIPT% && bash %REMOTE_SCRIPT%"
if errorlevel 1 (
    echo.
    echo [ERRO] O deploy remoto falhou.
    echo        Verifique os logs acima para detalhes.
    echo.
    echo  Possiveis causas:
    echo    - Erro no build Docker
    echo    - Porta 3001 ocupada por outro processo
    echo    - Certificado SSL nao encontrado (HTTPS desabilitado temporariamente)
    echo    - Permissao negada para alterar configuracao do Nginx
    echo.
    pause
    exit /b 1
)

REM ──────────────────────────────────────────────────────────────────────────────
REM  Validação final
REM ──────────────────────────────────────────────────────────────────────────────
echo.
echo [PASSO 4/4] Validacao final ...
echo.
echo  Verificando container e Nginx remotamente:
ssh -o StrictHostKeyChecking=no -o ConnectTimeout=15 ^
    %SERVER_USER%@%SERVER_HOST% ^
    "docker ps --filter name=poc-usiminas-app --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' && echo '---' && systemctl is-active nginx 2>/dev/null || service nginx status 2>/dev/null | head -3"

echo.
echo ============================================================
echo   DEPLOY CONCLUIDO
echo ============================================================
echo   Dominio  : https://%DOMAIN%
echo   Servidor : %SERVER_HOST%
echo   Container: poc-usiminas-app
echo ============================================================
echo.
echo  Se o site nao estiver acessivel, verifique:
echo    1. DNS do dominio aponta para %SERVER_HOST%
echo    2. Portas 80 e 443 abertas no firewall
echo    3. Certificado HTTPS configurado no servidor
echo    4. Logs: ssh %SERVER_USER%@%SERVER_HOST% "docker logs poc-usiminas-app"
echo.
pause
exit /b 0

REM ──────────────────────────────────────────────────────────────────────────────
REM  Sub-rotinas de erro
REM ──────────────────────────────────────────────────────────────────────────────
:ssh_error
echo.
echo [ERRO] Falha na conexao SSH com %SERVER_USER%@%SERVER_HOST%.
echo.
echo  Possiveis causas:
echo    - Senha incorreta para o usuario root
echo    - SSH bloqueado por firewall ou fail2ban
echo    - Servidor inacessivel na rede
echo    - Autenticacao por senha desabilitada no servidor
echo.
echo  Solucoes:
echo    1. Verifique se a senha esta correta
echo    2. Tente conectar manualmente: ssh %SERVER_USER%@%SERVER_HOST%
echo    3. Verifique o firewall do servidor (porta 22)
echo    4. Configure autenticacao por chave SSH para evitar problemas de senha
echo.
goto :eof

:scp_error
echo.
echo [ERRO] Falha ao enviar arquivos via SCP para %SERVER_USER%@%SERVER_HOST%.
echo.
echo  Possiveis causas:
echo    - Senha incorreta
echo    - Permissao negada no diretorio remoto %APP_DIR%
echo    - Conexao interrompida durante transferencia
echo.
echo  Solucoes:
echo    1. Verifique a senha e tente novamente
echo    2. Verifique permissoes no servidor: ssh %SERVER_USER%@%SERVER_HOST% "ls -la /opt/"
echo.
goto :eof

@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
title SOTOdelPRIOR - Despliegue WEB
cd /d "%~dp0"

set APP_NAME=WEB
set REMOTE_USER=root
set REMOTE_HOST=sotodelprior.com
REM Las webs viven en /root/SOTOdelPRIOR/webs/; en apps/ solo estan las que
REM llevan backend. El script apuntaba a apps/web, que ya no existe: el deploy
REM fallaba en el primer git pull.
set REMOTE_PATH=/root/SOTOdelPRIOR/webs/sotodelprior
set COMPOSE=docker compose -f docker-compose.yml
REM El contenedor se llama web-sotodelprior desde el renombrado; antes sotoweb-main.
set WEB=web-sotodelprior
set DOMAIN=sotodelprior.com
set BACKUP_DIR=/backups/web

REM WEB usa SQLite (DATABASE_URL=file:/app/db/prod.db, volumen ./db_data).
REM Por eso este menu NO tiene "prisma db push" ni "seed": las migraciones van
REM en el build de la imagen y la BD es un fichero, no un contenedor Postgres.

:menu
cls
echo ============================================================
echo   DESPLIEGUE %APP_NAME% (SOTO DEL PRIOR)
echo   Servidor: %REMOTE_USER%@%REMOTE_HOST%
echo   Web:      https://%DOMAIN%
echo ============================================================
echo.
echo   1.  Deploy completo (git pull + rebuild + logs)
echo   2.  Update rapido (sin rebuild, solo pull + restart)
echo   3.  Ver logs en vivo
echo   4.  Reiniciar contenedor
echo   5.  Estado de contenedores
echo   6.  Health check
echo   7.  Backup BD ahora (copia SQLite)
echo   8.  Abrir sesion SSH al VPS
echo.
echo   0.  Salir
echo.
set /p OPT="   Opcion: "

if "%OPT%"=="1" goto deploy
if "%OPT%"=="2" goto update
if "%OPT%"=="3" goto logs
if "%OPT%"=="4" goto restart
if "%OPT%"=="5" goto status
if "%OPT%"=="6" goto health
if "%OPT%"=="7" goto backup
if "%OPT%"=="8" goto sshvps
if "%OPT%"=="0" exit /b 0
goto menu

:deploy
REM Mismas redes de seguridad que el deploy CI del CRM: liberar disco antes del
REM build y copia de la BD antes de que la imagen nueva aplique migraciones.
echo.
echo [1/4] git pull origin main...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && git pull origin main"
if errorlevel 1 goto error
echo.
echo    Ultimo commit desplegado:
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && git log --oneline -1"
echo.
echo [2/4] Liberando disco antes del build (evita 'no space left on device')...
ssh %REMOTE_USER%@%REMOTE_HOST% "d=$(docker info --format '{{.DockerRootDir}}'); libre=$(df -BG --output=avail $d | tail -1 | tr -dc '0-9'); echo '    espacio libre (GB):' $libre; if [ ${libre:-0} -lt 20 ]; then echo '    por debajo de 20G: purga completa de la cache de build'; docker builder prune -af || true; else docker builder prune -f --filter until=72h || true; fi; docker image prune -f || true; df -h $d || true"
echo.
echo [3/4] Copia de la BD SQLite ANTES del build...
REM Las migraciones van dentro de la imagen: si la version nueva toca el schema,
REM esta copia es el punto de retorno. Si la copia falla, se aborta el deploy.
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% || exit 1; test -f db_data/prod.db || { echo '[AVISO] no existe db_data/prod.db todavia; nada que copiar'; exit 0; }; mkdir -p %BACKUP_DIR% && f=%BACKUP_DIR%/prod-predeploy-$(date -u +%%Y%%m%%d-%%H%%M%%S).db && cp db_data/prod.db $f && gzip $f && gzip -t $f.gz && test -s $f.gz || { echo 'ERROR: la copia de la BD fallo, se aborta el deploy'; rm -f $f $f.gz; exit 1; }; echo '    backup previo correcto:'; ls -lh $f.gz"
if errorlevel 1 goto error
echo.
echo [4/4] docker compose up -d --build...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && %COMPOSE% up -d --build --remove-orphans"
if errorlevel 1 goto error
echo.
echo ============================================================
echo   [OK] Deploy %APP_NAME% completado. Mostrando logs...
echo ============================================================
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && %COMPOSE% logs -f --tail=40 %WEB%"
goto end

:update
echo.
echo Pull + restart (sin rebuild)...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && git pull origin main && %COMPOSE% restart %WEB%"
if errorlevel 1 goto error
goto end

:logs
echo.
echo Logs en vivo (Ctrl+C para volver)...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && %COMPOSE% logs -f --tail=80 %WEB%"
goto end

:restart
echo.
echo Reiniciando contenedor web...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && %COMPOSE% restart %WEB%"
if errorlevel 1 goto error
echo [OK] Reiniciado.
goto end

:status
echo.
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && %COMPOSE% ps"
echo.
echo --- Redes del contenedor web ---
ssh %REMOTE_USER%@%REMOTE_HOST% "docker inspect %WEB% --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'"
goto end

:health
echo.
echo Health check interno...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && %COMPOSE% exec -T %WEB% node -e \"fetch('http://127.0.0.1:3000/').then(r=>console.log('interno HTTP',r.status)).catch(e=>{console.log('interno ERROR',e.message);process.exit(1)})\""
echo.
echo Health check externo (HTTPS publico)...
ssh %REMOTE_USER%@%REMOTE_HOST% "curl -s -o /dev/null -w 'HTTP %%{http_code} - tiempo %%{time_total}s' https://%DOMAIN%/"
echo.
goto end

:backup
echo.
echo Copiando BD SQLite a %BACKUP_DIR%/...
ssh %REMOTE_USER%@%REMOTE_HOST% "mkdir -p %BACKUP_DIR% && f=%BACKUP_DIR%/prod-manual-$(date +%%Y%%m%%d-%%H%%M%%S).db && cp %REMOTE_PATH%/db_data/prod.db \"$f\" && gzip \"$f\" && ls -lh %BACKUP_DIR%/ | tail -5"
if errorlevel 1 goto error
echo [OK] Backup creado.
goto end

:sshvps
echo.
echo Abriendo sesion SSH (escribe 'exit' para volver al menu)...
ssh %REMOTE_USER%@%REMOTE_HOST%
goto end

:error
echo.
echo ============================================================
echo   [ERROR] Operacion fallida en %APP_NAME%. Revisa la salida.
echo.
echo   Si fallo el git pull: el servidor puede tener cambios
echo   locales. Entra por SSH (opcion 8) y ejecuta:
echo       cd %REMOTE_PATH% ^&^& git stash ^&^& git pull origin main
echo ============================================================
pause
goto menu

:end
echo.
pause
goto menu

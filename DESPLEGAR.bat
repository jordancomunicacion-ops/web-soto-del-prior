@echo off
set SERVER=root@sotodelprior.com
set REMOTE_DIR=~/SOTOdelPRIOR/apps/web
set LOCAL_PATH=%~dp0
set ARCHIVE=web_soto.tar.gz

echo ===========================================
echo   DESPLIEGUE WEB SOTODELPRIOR (PRODUCCIÓN)
echo ===========================================

echo [+] 1. EMPAQUETANDO APP WEB (Next.js)...
:: Excluimos carpetas pesadas y locales
tar --exclude="node_modules" --exclude=".git" --exclude=".next" --exclude="db_data" --exclude=".env.local" -czf %ARCHIVE% .

echo [+] 2. SUBIENDO AL SERVIDOR (%SERVER%)...
ssh %SERVER% "mkdir -p %REMOTE_DIR%"
scp %ARCHIVE% %SERVER%:%REMOTE_DIR%/

echo [+] 3. EJECUTANDO DESPLIEGUE REMOTO...
ssh %SERVER% "cd %REMOTE_DIR% && chmod +x setup_remote.sh && ./setup_remote.sh %ARCHIVE%"

echo [+] 4. LIMPIEZA LOCAL...
del %ARCHIVE%

echo ===========================================
echo   DESPLIEGUE FINALIZADO CON ÉXITO
echo ===========================================
pause

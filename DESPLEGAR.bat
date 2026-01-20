@echo off
set SERVER=root@sotodelprior.com
set REMOTE_DIR=~/SOTOdelPRIOR/apps/web
set LOCAL_PATH=%~dp0
set ARCHIVE=web_soto.tar.gz

echo === EMPAQUETANDO APP WEB (Next.js) ===
tar --exclude="node_modules" --exclude=".git" --exclude=".next" -czf %ARCHIVE% .

echo === SUBIENDO A SERVIDOR ===
ssh %SERVER% "mkdir -p %REMOTE_DIR%"
scp %ARCHIVE% %SERVER%:%REMOTE_DIR%/

echo === DESPLEGANDO EN REMOTO ===
ssh %SERVER% "cd %REMOTE_DIR% && tar -xzf %ARCHIVE% && chmod +x setup_remote.sh && ./setup_remote.sh"

echo === LIMPIEZA LOCAL ===
del %ARCHIVE%

echo === DESPLIEGUE FINALIZADO ===
pause

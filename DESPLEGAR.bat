@echo off
chcp 65001 >nul
setlocal
title SOTOdelPRIOR - Despliegue WEB
cd /d "%~dp0"

set APP_NAME=WEB
set REMOTE_USER=root
set REMOTE_HOST=sotodelprior.com
set REMOTE_PATH=~/SOTOdelPRIOR/apps/web
set ARCHIVE=web_soto.tar.gz

echo ============================================================
echo   DESPLIEGUE %APP_NAME% (SOTO DEL PRIOR)
echo   Servidor: %REMOTE_USER%@%REMOTE_HOST%
echo   Ruta:     %REMOTE_PATH%
echo ============================================================
echo.

echo [1/4] Empaquetando %APP_NAME% (Next.js)...
tar --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude=".idea" --exclude=".vscode" --exclude=".claude" --exclude="dist" --exclude="build" --exclude="db_data" --exclude=".env.local" --exclude="*.log" --exclude="%ARCHIVE%" -czf %ARCHIVE% .
if errorlevel 1 goto :error

echo.
echo [2/4] Subiendo paquete al servidor...
ssh %REMOTE_USER%@%REMOTE_HOST% "mkdir -p %REMOTE_PATH%"
if errorlevel 1 goto :error
scp setup_remote.sh %REMOTE_USER%@%REMOTE_HOST%:%REMOTE_PATH%/
if errorlevel 1 goto :error
scp %ARCHIVE% %REMOTE_USER%@%REMOTE_HOST%:%REMOTE_PATH%/
if errorlevel 1 goto :error

echo.
echo [3/4] Ejecutando despliegue remoto...
ssh %REMOTE_USER%@%REMOTE_HOST% "cd %REMOTE_PATH% && chmod +x setup_remote.sh && sed -i 's/\r$//' setup_remote.sh && ./setup_remote.sh %ARCHIVE%"
if errorlevel 1 goto :error

echo.
echo [4/4] Limpiando local...
del %ARCHIVE%

echo.
echo ============================================================
echo   [OK] DESPLIEGUE %APP_NAME% COMPLETADO
echo ============================================================
pause
endlocal
exit /b 0

:error
echo.
echo ============================================================
echo   [ERROR] El despliegue de %APP_NAME% ha fallado.
echo   Revisa el mensaje anterior.
echo ============================================================
if exist %ARCHIVE% del %ARCHIVE%
pause
endlocal
exit /b 1

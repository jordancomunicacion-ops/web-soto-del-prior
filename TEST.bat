@echo off
chcp 65001 >nul
setlocal
title SOTOdelPRIOR - Test local WEB
cd /d "%~dp0"

set APP_NAME=WEB
set LOCAL_URL=http://localhost:3000

echo ============================================================
echo   ENTORNO LOCAL %APP_NAME% (SOTO DEL PRIOR)
echo   URL: %LOCAL_URL%
echo ============================================================
echo.

echo [1/1] Arrancando servidor de desarrollo (npm run dev)...
npm run dev
if errorlevel 1 (
    echo.
    echo [ERROR] Fallo al iniciar. Asegurate de haber ejecutado "npm install".
    pause
    endlocal
    exit /b 1
)
pause
endlocal

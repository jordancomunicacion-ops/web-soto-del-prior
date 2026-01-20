#!/bin/bash
set -e

echo "=== Configurando Servidor WEB SOTO ==="

echo "-> DETENIENDO CONTENEDOR WEB..."
docker stop web-soto || true
docker rm web-soto || true

echo "-> Desplegando Web Corporativa ..."
# El script se ejecuta desde dentro de site_web_soto
docker compose up -d --build --remove-orphans

echo "=== WEB DESPLEGADA EXITOSAMENTE ==="

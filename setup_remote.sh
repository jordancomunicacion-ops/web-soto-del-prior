#!/bin/bash
set -e

ARCHIVE=$1

echo "=== INICIANDO DESPLIEGUE REMOTO (LIMPIEZA Y ACTUALIZACIÓN) ==="

# 1. Borrar archivos antiguos para evitar acumulación
echo "-> Borrando archivos antiguos (excepto db_data y el paquete)..."
# Buscamos todo lo que NO sea db_data ni el archivo .tar.gz y lo borramos
find . -maxdepth 1 ! -name 'db_data' ! -name "$ARCHIVE" ! -name '.' -exec rm -rf {} +

# 2. Descomprimir el nuevo contenido
echo "-> Extrayendo nuevos archivos..."
tar -xzf "$ARCHIVE"

# 3. Limpieza de Docker prévia (liberar espacio crítico)
echo "-> Limpiando espacio en disco prévio..."
docker system prune -f
docker builder prune -af

# 4. Preparar entorno
echo "-> Asegurando directorios de persistencia..."
mkdir -p db_data
chown -R 1001:1001 db_data || echo "Aviso: No se pudo cambiar el owner de db_data. Continuando..."

# 5. Desplegar con reconstrucción de imágenes
echo "-> Re-creando imágenes y levantando servicio..."
docker compose up -d --build --remove-orphans

# 6. Limpieza post-despliegue (borrar imágenes antiguas reemplazadas)
echo "-> Limpieza final de imágenes antiguas..."
docker image prune -f

# 7. Borrar el archivo tar
rm "$ARCHIVE"

echo "=== WEB DESPLEGADA EXITOSAMENTE ==="

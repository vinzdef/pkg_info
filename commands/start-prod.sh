ln -s /var/lib/dpkg/status ./volumes/data/dpkg_status
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

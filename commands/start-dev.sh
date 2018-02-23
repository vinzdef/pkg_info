ln -s /var/lib/dpkg/status ./volumes/data/dpkg_status
docker-compose -f docker-compose.yml up --build

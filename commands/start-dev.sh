if ! [ -e ./volumes/data/dpkg_status ]; then
	ln -s /var/lib/dpkg/status ./volumes/data/dpkg_status;
fi;

docker-compose up --build

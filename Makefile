setup-drupal:
	docker-compose up --build

load-from-db:
	docker exec searchstax-docs-headless-db bash /usr/local/bin/db-import.sh

backup-db:
	docker exec searchstax-docs-headless-db bash /usr/local/bin/db-backup.sh

build-react:
	docker exec searchstax-docs-headless-cms vendor/bin/drush pmu searchstax_studio_react || echo 'Removing Previous Version'
	docker exec searchstax-docs-headless-cms vendor/bin/drush cr
	docker exec searchstax-docs-headless-app chmod -R 775 /usr/local/bin/build.sh
	docker exec searchstax-docs-headless-app /bin/sh /usr/local/bin/build.sh
	docker cp searchstax-docs-headless-app:/build/searchstax_studio_react build
	docker cp build/searchstax_studio_react searchstax-docs-headless-cms:/opt/drupal/web/modules
	docker exec searchstax-docs-headless-cms vendor/bin/drush en searchstax_studio_react -y
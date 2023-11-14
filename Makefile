setup-drupal:
	docker-compose up --build

load-from-db:
	docker exec searchstax-docs-headless-db pg_restore -U drupaluser -d drupaldb -c usr/local/bin/drupaldb.pgsql

backup-db:
	docker exec searchstax-docs-headless-db pg_dump -U drupaluser -F c drupaldb > drupaldb.pgsql
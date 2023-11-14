composer require drush/drush
composer config minimum-stability dev
composer config prefer-stable true
vendor/bin/drush si --db-url=pgsql://drupaluser:drupalpassword@host.docker.internal:5434/drupaldb --site-name="SearchStax Demo" -y
vendor/bin/drush cset system.performance css.preprocess false --input-format=yaml -y
vendor/bin/drush cset system.performance js.preprocess false --input-format=yaml -y
vendor/bin/drush upwd admin "searchstax"
vendor/bin/drush pmu search || echo 'Search not installed'
composer require drupal/jsonapi_search_api
composer require drupal/jsonapi_resources
composer require drupal/jsonapi_extras
composer require drupal/searchstax
composer require drupal/search_api_searchstax
composer require drupal/search_api_solr
vendor/bin/drush en jsonapi_search_api -y
vendor/bin/drush en jsonapi_resources -y
vendor/bin/drush en jsonapi_extras -y
vendor/bin/drush en searchstax -y
vendor/bin/drush en search_api_searchstax -y
chmod -R 777 /opt/drupal/web/sites/default/files

exec apache2-foreground
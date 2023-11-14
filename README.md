# SearchStax Studio Documentation - Headless Drupal & React Demo

Docker-based React and Drupal headless demo site with SearchStax Studio documentation and integration. This repo sets up a Docker enivornment for Drupal, Postgres, and React and includes a pre-configured headless and search front end and JSON:API-powered Drupal instance.

## Setting Up

- Install Docker
- Switch to Linux containers if you're using Windows
- Run `make setup-drupal`
- Once `apache2` is running in the `react-headless-cms` run `make load-from-db` in another terminal session

## Using the Demo Site

After the Drupal site has been updated from the `load-from-db` process go to [`http://localhost:3010`](http://localhost:3010)] to view the headless React app.

Click 'Studio Docs' in the main navigation to view documentation and additional API features.

(Note - only Studio documentation has been included in this demo environment)

### Features

- Main navigation loaded from Drupal Menu API
- Side navigation loaded/updated as user nagivates through Studio documentation
- Page content dynamically loaded from Drupal API
- Dynamic injection of 'Code/Open Console' panel for &lt;pre&gt; tags
- Integration of Search UI Components for React in site navigation and search page [`http://localhost:3010/search`](http://localhost:3010/search)
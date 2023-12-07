# SearchStax Studio Documentation - Headless Drupal & React Demo

Docker-based React and Drupal headless demo site with SearchStax Studio documentation and integration. This repo sets up a Docker enivornment for Drupal, Postgres, and React and includes a pre-configured headless and search front end and JSON:API-powered Drupal instance.

## Setting Up

- Install Docker
- Switch to Linux containers if you're using Windows
- Run `make setup-drupal` to create the various containers and configure Drupal
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

## Drupal Configuration

This demo uses a custom Drupal module to host the React app and redirect any non-admin URLs to the React app so that the requested URL can be built and rendered.

### Reserved Drupal URLs

- /home - This URL is mapped to the home page content
- / - The React app module container is mapped to the home page so it loads when no path name is included
- /?url=/drupal-url-alias - A redirect script loaded on every page will redirect any URL to the React app if a Drupal page is loaded but the app is missing - the app will then load the requested URL and remove the `?url=` parameter
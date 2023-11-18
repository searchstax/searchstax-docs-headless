#! /bin/bash

cd /app
yarn install
yarn run build
rm -rf /build
mkdir -p /build
cp -r /templates/searchstax_studio_react /build
cp /app/dist/index.html /build/searchstax_studio_react/templates/react.html.twig
cp -r /app/dist/* /build/searchstax_studio_react/dist
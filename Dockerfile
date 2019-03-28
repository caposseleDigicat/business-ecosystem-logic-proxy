FROM node:6.17.0

WORKDIR business-ecosystem-logic-proxy

# Indexes used by the Business API Ecosystem for searching
VOLUME /business-ecosystem-logic-proxy/indexes
# Themes that can be used to customize the web portal
VOLUME /business-ecosystem-logic-proxy/themes
# Static files ready to be rendered including the selected theme and js files
VOLUME /business-ecosystem-logic-proxy/static
VOLUME /business-ecosystem-logic-proxy/locales
VOLUME /business-ecosystem-logic-proxy/public/resources/core/js
VOLUME /business-ecosystem-logic-proxy/views
VOLUME /business-ecosystem-logic-proxy/lib

# Install npm dependencies
COPY ./package.json .
RUN npm install --production

# Project sources
COPY ./controllers controllers
COPY ./db db
COPY ./default_locales default_locales
COPY ./lib lib
COPY ./locales locales
COPY ./public public
COPY ./views views
COPY ./collect_static.js .
COPY ./fill_indexes.js .
COPY ./log_config.json .
COPY ./server.js .

# Docker dir (scripts & config)
COPY ./docker/entrypoint.sh /

COPY config.js.template etc/config.js.template
RUN echo "module.exports = require('./etc/config');" > config.js

ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
ENV ENDPOINT_INVENTORY_PATH DSProductInventory
ENV ENDPOINT_INVENTORY_HOST apis.docker
ENV ENDPOINT_INVENTORY_PORT 8080
ENV ENDPOINT_INVENTORY_APP_SSL false

EXPOSE 8004

ENTRYPOINT ["/entrypoint.sh"]
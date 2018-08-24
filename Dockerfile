FROM ubuntu:16.04

MAINTAINER CoNWeT Lab. Universidad Politécnica de Madrid

#ENV VERSION Synchronicity-v6.4.0
ENV VERSION no-cache1
ENV VERSION multiple-broker
ENV VERSION SLA

RUN apt-get update && apt-get install -y git xinetd python-pip wget && \
    pip install sh requests 
    #git clone https://github.com/caposseleDigicat/business-ecosystem-logic-proxy.git

RUN mkdir business-ecosystem-logic-proxy

WORKDIR business-ecosystem-logic-proxy

COPY / ./

ENV VERSION SLA

RUN wget https://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-x64.tar.xz && \
    tar -xvf node-v6.9.1-linux-x64.tar.xz && \
    echo 'export PATH=$PATH:/business-ecosystem-logic-proxy/node-v6.9.1-linux-x64/bin' >> ~/.bashrc && \
    #git checkout $VERSION && \
    mkdir indexes && \
    mkdir themes

VOLUME /business-ecosystem-logic-proxy/indexes
VOLUME /business-ecosystem-logic-proxy/themes
VOLUME /business-ecosystem-logic-proxy/static
VOLUME /business-ecosystem-logic-proxy/locales
VOLUME /business-ecosystem-logic-proxy/public/resources/core/js
VOLUME /business-ecosystem-logic-proxy/views
VOLUME /business-ecosystem-logic-proxy/lib

RUN export PATH=$PATH:/business-ecosystem-logic-proxy/node-v6.9.1-linux-x64/bin && \
    ./install.sh && \
    mkdir etc && \
    cp config.js.template etc/config.js && \
    echo "module.exports = require('./etc/config');" > config.js

COPY ./docker/entrypoint.sh /
COPY ./docker/cleanIndex.sh /
COPY ./docker/getConfig.js /business-ecosystem-logic-proxy
     
COPY ./docker/serviceIndexes /etc/xinetd.d/

EXPOSE 8004

ENTRYPOINT ["/entrypoint.sh"]

FROM daocloud.io/daocloud/cosmo-doc-base:0.3

COPY . /opt/doc/

WORKDIR /opt/doc

EXPOSE 9001

RUN chmod +x /usr/local/bin/mkdocs

CMD ["/usr/local/bin/mkdocs", "serve", "-a", "0.0.0.0:9001"]

FROM iregistry.baidu-int.com/ihu/base/base-nginx

COPY --chown=work:work output /home/work/nhc-web

USER work
COPY ./output/conf/nginx.conf /home/work/nginx/conf/nginx.conf
WORKDIR /home/work/nhc-web


EXPOSE 8888
ENTRYPOINT source /etc/bashrc \
    && mkdir -p /home/work/log \
    && /home/work/nginx/sbin/nginx -g 'daemon off;'

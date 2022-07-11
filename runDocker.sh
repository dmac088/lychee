#!/bin/bash

data_path="data/certbot"

docker run  --rm -it -d \
            --name my-react-container  \
            -p 8070:8070 \
            -p 80:8080 \
            -p 443:4443 \
            -v $(pwd)/$data_path/conf:/etc/letsencrypt \
            -v $(pwd)/$data_path/www:/var/www/certbot \
            -v $(pwd)/data/nginx:/etc/nginx/conf.d \
            -v $(pwd)/build:/usr/share/nginx/html \
            --network my-net \
   my-react-app

docker exec -u root my-react-container sh -c "while :; do sleep 6h && wait $$; nginx -s reload; done && nginx -g 'daemon off;'"
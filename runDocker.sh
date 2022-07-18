#!/bin/bash

data_path="data/certbot"

docker run  --rm -it -d \
            --name my-react-container  \
            -p 8070:8070 \
            -p 8002:8080 \
            -p 4443:4443 \
            -v $(pwd)/$data_path/conf:/etc/letsencrypt \
            -v $(pwd)/$data_path/www:/var/www/certbot \
            -v $(pwd)/data/nginx:/etc/nginx/conf.d \
            --network my-net \
   my-react-app

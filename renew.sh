#!/bin/bash

data_path="data/certbot"

docker rm --force certbot

docker run -it -d  \
    --entrypoint="/bin/sh" \
    --rm \
    --name certbot \
    -v $(pwd)/$data_path/conf:/etc/letsencrypt \
    -v $(pwd)/$data_path/www:/var/www/certbot \
    --network my-net \
    certbot/certbot

docker exec certbot sh -c 'certbot renew --webroot -w /var/www/certbot --agree-tos'
    
echo "Reloading nginx..."
docker exec my-react-container  sh -c 'nginx -s reload'
echo "Done!"
echo "Certificate is already up-to-date."

docker container stop certbot


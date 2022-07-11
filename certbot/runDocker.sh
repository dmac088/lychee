#!/bin/bash

data_path="data/certbot"

docker run -it -d \
    --entrypoint="/bin/sh" \
    --rm \
    --name certbot \
    -v $(pwd)/../$data_path/conf:/etc/letsencrypt \
    -v $(pwd)/../$data_path/www:/var/www/certbot \
    --network my-net \
    certbot/certbot

docker exec -u root certbot sh -c "echo 'starting renewal.... ' && trap exit TERM; while :; do certbot renew; sleep 12h && wait $$; done;"
#!/bin/bash


docker run -itd --entrypoint="/bin/sh" --rm \
    --name certbot \
    -v $(pwd)/$data_path/conf:/etc/letsencrypt \
    -v $(pwd)/$data_path/www:/var/www/certbot \
    --network my-net \
    certbot/certbot

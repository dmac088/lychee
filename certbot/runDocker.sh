docker run --rm --name certbot \
    -v $(pwd)/../data/certbot/conf:/etc/letsencrypt \
    -v $(pwd)/../data/certbot/www:/var/www/certbot \
    certbot/certbot \
    certonly --webroot --agree-tos --renew-by-default \
    --text --email danielmackie82@gmail.com \
    -w /var/www/certbot -d littlebagshop.com

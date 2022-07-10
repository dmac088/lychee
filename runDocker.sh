docker run --rm -it \
           --name my-react-container  \
           -p 8070:82 \
           -p 81:80 \
           -p 443:443 \
           -v $(pwd)/data/certbot/conf:/etc/letsencrypt \
           -v $(pwd)/data/certbot/www:/var/www/certbot \
           -v $(pwd)/data/nginx:/etc/nginx/conf.d \
           --network my-net \
 my-react-app

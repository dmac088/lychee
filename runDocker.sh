docker run --rm -it \
           --name my-react-container  \
           -p 8070:80 \
           -p 81:81 \
           -p 443:443 \
           -v $(pwd)/data/certbot/conf:/etc/letsencrypt \
           -v $(pwd)/data/certbot/www:/var/www/certbot \
           -v $(pwd)/data/nginx:/etc/nginx/conf.d \
           --network my-net \
 my-react-app

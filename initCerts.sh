#!/bin/bash

domains=(littlebagshop.com)
rsa_key_size=4096
data_path="data/certbot"
email="danielmackie82@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
mkdir -p "$data_path/www"

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

docker run -itd --entrypoint="/bin/sh" --rm \
    --name certbot \
    -v $(pwd)/$data_path/conf:/etc/letsencrypt \
    -v $(pwd)/$data_path/www:/var/www/certbot \
    --network my-net \
    certbot/certbot

docker exec -u root certbot sh -c "openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1 \
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" 

docker run --rm -it -d \
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

# echo "### Deleting dummy certificate for $domains ..."
docker exec -u root certbot sh -c "rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf"

echo "### Requesting Let's Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

# echo "### Reloading nginx ..."
echo $staging_arg
echo $email_arg 
echo $domain_args
echo $rsa_key_size

echo   "certbot certonly --webroot -w /var/www/certbot \
     $staging_arg \
     $email_arg \
     $domain_args \
     --rsa-key-size $rsa_key_size \
     --agree-tos \
     --force-renewal"

docker exec -u root certbot sh -c "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal"

docker restart my-react-container 

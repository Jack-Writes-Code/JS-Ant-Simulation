# ants

<br>

Serving with nginx forward the port in sites-available:


```
server {
        listen 80;
        listen [::]:80;
        server_name yourdomain.com;

    location / {
        proxy_pass         "http://0.0.0.0:8080";
    }
}
```

<br>

Mirror the file from sites-available

```
sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled
```




<br>

Then run the certbot to add SSL to your domain:
```
https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx
```

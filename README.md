# ants

<br>
<h3>Ants sim</h3>
<br>

Edit /ants/Dockerfile and uncomment the development option if deploying as a dev.

Run using 'docker-compose up -d' in terminal.

<br>
<h3>To deploy using Ubuntu</h3>
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

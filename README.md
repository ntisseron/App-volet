# Server Web Appache2 sur Raspberry PI  

## Configuration 
un serveur Raspberry équipé qui héberge 2 site webs.
Chaque site web aura sa propre adresse IP statique
Le premier site web est le site de Jeedom à l'adresse 192.168.0.49.
Le deuxieme serveur est le site App-Volet à l'adresse 192.168.50.
Le serveur App-Volet doit pouvoir réaliser des call API vers le serveur Jeedom

---------------------------------------------------
Jeedom API
https://doc.jeedom.com/fr_FR/core/4.1/api_http
Pour trouver l'API Jeedom : Pour la trouver, il faut aller dans le menu “Général” → “Configuration” → onglet “Général”.

clé API: wifilightV2:

Info/Action commande
Voici l’URL = http://#IP_JEEDOM#/core/api/jeeApi.php?apikey=#APIKEY#&type=cmd&id=#ID#

Action on
http://192.168.0.49/core/api/jeeApi.php?apikey="clé API"&type=cmd&id=490 

Action Off
http://192.168.0.49/core/api/jeeApi.php?apikey="clé API"&type=cmd&id=491

---------------------------------------------------

## Etape 1 : Mettre à jour le Raspberry
```sudo apt-get update```

## Etape 2 : Verifier qu'Appache2 est installé.
```sudo apachectl -v```

## Etape 3 : Configuration du réseau
- désactiver le dhcp en modifiant  /etc/dhcpcd.conf \
```sudo nano /etc/dhcp.cnf``` ajouter à la fin : 
```denyinterfaces eth0```
```nogateway```

faire Ctrl+x pour quitter
faire "O"+Entrée pour sauvegarder


- configurer les 2 adresses IP statiques
modifier ou créer  ```/etc/systemd/network/20-ethernet.network``` 
```sudo nano /etc/systemd/network/20-ethernet.network
[Match]
Name=eth0

[Network]
DHCP=no
DNS=192.168.0.254

[Route]
Gateway=192.168.0.254
Metric=202

[Address]
Address=192.168.0.49/24

[Address]
Address=192.168.0.50/24
```
faire Ctrl+x pour quitter
faire "O"+Entrée pour sauvegarder

redemarrer le service réseau
```$ sudo systemctl enable --now systemd-networkd``` 

redémarrer la machine
```sudo reboot```

************ verifier la configuration
Display status of network links.
```$ sudo networkctl```

```jeedom@jeedom:/var/www/App-volet $ sudo networkctl
IDX LINK             TYPE               OPERATIONAL SETUP
  1 lo               loopback           carrier     unmanaged
  2 eth0             ether              routable    configured
```
Inspect network addresses .49 nad .50 are mapped to eth0
```$ ip -br a
jeedom@jeedom:~ $ ip -br a
lo               UNKNOWN        127.0.0.1/8 ::1/128
eth0             UP             192.168.0.49/24 192.168.0.50/24 2a01:cb14:185:6a00:ba27:ebff:fe56:b90/64 fe80::ba27:ebff:fe56:b90/64
                                          ^^              ^^
```
## Etape 4 : configurer Apache

ajouter à la fin du fichier  \ ```/etc/apache2/apache2.conf```:
```
ServerName 127.0.0.1

sudo nano /etc/apache2/sites-available/000-default.conf
------------------- Allow CORS on apache2 ----------------------


Ajouter la ligne suivante sur chaque VirtualHost: Header add Access-Control-Allow-Origin "*"

<VirtualHost 192.168.0.49:80>
        ServerAdmin webmaster@www.jeedom.org
        DocumentRoot /var/www/html
        ErrorLog /var/www/html/log/http.error
        ServerName www.jeedom.org
        Header add Access-Control-Allow-Origin "*"
         # Set the Content Security Policy header for site1
    <IfModule mod_headers.c>
        Header set Content-Security-Policy "connect-src 'self' http://192.168.0.49/ http://192.168.0.50/;"
    </IfModule>
</VirtualHost>

<VirtualHost 192.168.0.50:80>
        ServerAdmin webmaster@www1.jeedom.org
        DocumentRoot /var/www/App-volet
        ErrorLog /var/www/App-volet/log/http.error
        ServerName www1.jeedom.org
        Header add Access-Control-Allow-Origin "*"
    <IfModule mod_headers.c>
        Header set Content-Security-Policy "connect-src 'self' http://192.168.0.49/ http://192.168.0.50/;"
    </IfModule>
</VirtualHost>
```
faire Ctrl+x pour quitter
faire "O"+Entrée pour sauvegarder

verifier les changement:
```sudo apachectl -t```
reload apache:
```sudo service apache2 reload```

check Mod_Headers enabled
```sudo a2enmod headers```

 
---------------------------------------------------
Jeedom API
https://doc.jeedom.com/fr_FR/core/4.1/api_http
Pour trouver l'API Jeedom : Pour la trouver, il faut aller dans le menu “Général” → “Configuration” → onglet “Général”.

clé API: wifilightV2:

Info/Action commande
Voici l’URL = http://#IP_JEEDOM#/core/api/jeeApi.php?apikey=#APIKEY#&type=cmd&id=#ID#

Action on
http://192.168.0.49/core/api/jeeApi.php?apikey="clé API"&type=cmd&id=490 

Action Off
http://192.168.0.49/core/api/jeeApi.php?apikey="clé API"&type=cmd&id=491

#GitHub cloning and Raspberry Config

# Etape 5: Deployer le code depuis Github
## Configurer ssh with jeedom user.
Creer clé rsa (niveau rsa obligatoire avec GitHub) \
```sudo ssh-keygen -o -t rsa -C jeedom``` \
copier le clé public \
 ```cat ~/.ssh/id_ed25519.pub```
Then select and copy the contents of the id_ed25519.pub file (start with ssh-rsa ....)
displayed in the terminal to your clipboard

Deploiment de la clé publique dans GitHub: \
The upper-right corner of any page on GitHub, click your profile photo, then click  Settings. \
In the "Access" section of the sidebar, click  SSH and GPG keys. \
Click New SSH key or Add SSH key. \
In the "Title" field, add a descriptive label for the new key. For example, if you're using a personal laptop, you might call this key "Personal laptop". \
Select the type of key to authentication \
In the "Key" field, paste your public key.
Click Add SSH key.

se positionner dans le répartoir ```/var/www```
```sudo git clone git@github.com:ntisseron/App-volet.git```
verifier la connexion:
```sudo ssh -T git@github.com```
```Hi ntisseron! You've successfully authenticated, but GitHub does not provide shell access.```

Donner les droits à l'utilisateur jeedom et www-data.
jeedom owner du répertoire
```sudo chown -R jeedom /var/www/App-volet```
mettr le user www-data utilisé par Apache sur le group

 ```$ sudo chgrp -R www-data /var/www/App-volet```
```
$ ls-l
drwxrwsr-x 2 jeedom www-data 4096 janv. 31 00:15 Chambre
drwxrwsr-x 2 jeedom www-data 4096 janv. 31 00:40 css
drwxrwsr-x 2 jeedom www-data 4096 janv. 31 00:07 Images
-rwxrwxr-x 1 jeedom www-data 1975 janv. 31 00:07 index.html
drwxrwsr-x 2 jeedom www-data 4096 janv. 31 00:12 js
drwxrwsr-x 2 jeedom www-data 4096 janv. 28 09:42 log
```






sudo git clone git@github.com:ntisseron/App-volet.git


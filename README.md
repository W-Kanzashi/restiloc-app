# Application smartphone du projet Restiloc

## Installer apache et mysql (Commandes réalisé avec ubuntu 20.04)
*Il est aussi possible d'utiliser WAMP sur windows*  
[Installer Apache](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04)  
[Installer Mysql](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)  

Importer le fichier `restiloc.sql` dans la base de données.  

```bash
mysql -u username -p < restiloc.sql
```

## Lancer l'application

```bash
# Node > 16 et utiliser yarn de préférence mais npm fonctionne

yarn install # npm install
yarn start
```

Attendre le lancement de l'application et aller sur l'adresse ip

![Screenshot 2022-04-30 113357](https://user-images.githubusercontent.com/46336904/166100266-3d1cd83f-3f83-40b6-9b83-e05ab5bdf89f.png)

Sur l'interface cliquer sur `Run in web browser`

![2022-04-30 11 38 08 localhost 36b71a9acd7e](https://user-images.githubusercontent.com/46336904/166100345-cd9f623c-ba9e-4277-8032-3c341b791579.png)

**Une autre option est d'installer l'application expogo sur un smartphone ou une tablette et de scanner le qr code**

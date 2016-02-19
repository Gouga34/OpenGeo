# OpenGeo Suite

## Suite logicielle contenant :
- [PostGIS](http://www.postgis.fr/)/[PostgreSQL](http://docs.postgresql.fr/)
- [GeoServer](http://geoserver.org/)
- [OpenLayers](http://openlayers.org/)
- Autres composants secondaires :
  - [GeoWebCache](http://geowebcache.org/)
  - [Boundless SDK](http://developers.boundlessgeo.com/)
  - [GeoGig](http://geogig.org/)
  - [GeoExt](http://www.geoext.org/)
  - [GeoScript](http://geoscript.org/)

## Documentation officielle
- [suite.opengeo.org](http://suite.opengeo.org/opengeo-docs/index.html)

## Sommaire
- [Installation](#installation)
- [Démarrer et arrêter les services](#startstopServices)
- [Créer une base de données spatiale](#createSpatialDB)
- [Charger des données dans PostGIS en utilisant la ligne de commande](loadDataWithCommandeLine)
- [GeoServer](GeoServer)

# Installation <a id="installation"></a>

```
sudo wget -qO- https://apt.boundlessgeo.com/gpg.key | apt-key add -
```
```
sudo echo "deb http://apt.opengeo.org/ubuntu lucid main" >> /etc/apt/sources.list
```
```
sudo apt-get update
```
```
sudo apt-cache search opengeo
```
```
sudo apt-get install opengeo-suite
```

# Démarrer et arrêter les services <a id="startstopServices"></a>
## Service Tomcat
```
sudo service tomcat7 start|stop|restart
```

## Service PostgreSQL
```
sudo service postgresql start|stop|restart
```

# Créer une base de données spatiale <a id="createSpatialDB"></a>

- Créer une nouvelle base de données puis exécuter la requête suivante :
```
CREATE EXTENSION postgis;
```

- On peut vérifier que la base de données a été correctement crée en exécutant la fonction suivante :
```
SELECT postgis_full_version();
```

- La table de métadonnées spécifiques à PostGIS `spatial_ref_sys` doit se trouver dans le schéma `public`, sinon la base de données n'a pas été correctement créée.

# Charger des données dans PostGIS en utilisant la ligne de commande <a id="loadDataWithCommandeLine"></a>
- il faut connaitre le SRID du fichier. S'il est inconnu, on peut utiliser un service comme [prj2epsg.org](http://prj2epsg.org/) pour télécharger et convertir de `.prj` du shapefile en un code SRID.

- Exécuter la commande `shp2pgsql` ( Si tout c'est bien passé, l'exécution devrait se terminer par `COMMIT` ) :
```
shp2pgsql -I -s <SRID> <PATH/TO/SHAPEFILE> <SCHEMA>.<DBTABLE> | psql -U postgres -d <DBNAME>
```
exemple :
```
shp2pgsql -I -s 2908 shapefilestests/nyc_roads/nyc_roads.shp roads | psql -U postgres -d opengeotest
```

- On peut vérifier que le contenue a bien été ajouté via pgAdmin ou avec la commande suivante :
```
psql -U <USERNAME> -d <DBNAME> -c "\d"
```
# GeoServer <a id="GeoServer"></a>
- Cf documentation : [docs.geoserver.org](http://docs.geoserver.org/latest/en/user/)

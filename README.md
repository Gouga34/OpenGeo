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


# Installation

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

# Démarrer et arrêter les services
## Service Tomcat
```
sudo service tomcat7 start|stop|restart
```

## Service PostgreSQL
```
sudo service postgresql start|stop|restart
```

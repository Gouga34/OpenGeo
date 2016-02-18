# OpenGeo Suite

## Suite logicielle contenant :
- PostGIS/PostgreSQL
- GeoServer
- OpenLayers
- Autres composants secondaires :
  - GeoWebCache
  - Boundless SDK
  - GeoGig
  - GeoExt
  - GeoScript

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

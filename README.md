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
- [Charger des données dans PostGIS en utilisant la ligne de commande](#loadDataWithCommandeLine)
- [GeoServer](#GeoServer)
  - [Styles des couches - SLD (Styled Layer Descriptor)](#SLD)

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

## Styles des couches - SLD (Styled Layer Descriptor) <a id="SLD"></a>
SLD est un descripteur de couches permettant de décrire le style des couches d'une carte.
Dans l'exemple suivant, on va colorer les polygones dans différents degrés de vert en fonction du type de parcelles (blé, mais, orge). SLD est basé sur une syntaxe XML. On peut ainsi par exemple mettre en place différentes règles, `<Rule></Rule>`, avec par exemple la coloration de toutes les parcelles dont le type (`<ogc:PropertyName>type</ogc:PropertyName>`) est égal à `ble` (` <ogc:PropertyIsEqualTo></og:PropertyIsEqualTo>`) en vert clair.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Attribute-based polygon</Name>
    <UserStyle>
      <Title>Plot coloration</Title>
      <FeatureTypeStyle>
           <Rule>
             <Name>Wheat</Name>
             <Title>Wheat plots</Title>
             <ogc:Filter>
               <ogc:PropertyIsEqualTo>
                 <ogc:PropertyName>type</ogc:PropertyName>
                 <ogc:Literal>ble</ogc:Literal>
               </ogc:PropertyIsEqualTo>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <CssParameter name="fill">#66FF66</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>
           <Rule>
             <Name>Maize</Name>
             <Title>Maize plots</Title>
             <ogc:Filter>
               <ogc:PropertyIsEqualTo>
                 <ogc:PropertyName>type</ogc:PropertyName>
                 <ogc:Literal>mais</ogc:Literal>
               </ogc:PropertyIsEqualTo>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <CssParameter name="fill">#33CC33</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>
           <Rule>
             <Name>Barley</Name>
             <Title>Barley plot</Title>
             <ogc:Filter>
               <ogc:PropertyIsEqualTo>
                 <ogc:PropertyName>type</ogc:PropertyName>
                 <ogc:Literal>orge</ogc:Literal>
               </ogc:PropertyIsEqualTo>
             </ogc:Filter>
             <PolygonSymbolizer>
               <Fill>
                 <CssParameter name="fill">#009900</CssParameter>
               </Fill>
             </PolygonSymbolizer>
           </Rule>
         </FeatureTypeStyle>
          </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
```

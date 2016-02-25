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
- [PostGIS/PostgreSQL](#postGIS)
  - [Introduction](#postGIS_intro)
  - [Création d'une base de données](#postGIS_createdb)
  - [Suppression d'une base de données](#postGIS_deletedb)
  - [Accéder à une base](#postGIS_getdb)
  - [Créer une nouvelle table](#postGIS_createTable)
  - [Supprimer une table](#postGIS_deleteTable)
  - [Remplir une table](#postGIS_fillTable)
  - [Interroger une table](#postGIS_requestTable)
  - [Données spatiales](#postGIS_spatialData)

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

# PostGIS/PostgreSQL <a id="postGIS"></a>

## Introduction <a id="postGIS_intro"></a>

- documentation [PostGIS](http://postgis.net/docs/manual-2.2/)
- documentation [PostgreSQL](http://docs.postgresql.fr/9.5/)

Cette partie est un court et rapide résumé de PostgreSQL et PostGIS.

PostgreSQL utilise un modèle client/serveur.
- Le serveur gère les fichiers de la base de données, accepte les connexions clients, effectue les actions des clients. Le programme serveur est appelé `postgres`.
- Le client va effectuer des actions sur la base de données en communiquant avec le serveur.

Quand le client et le serveur ne sont pas sur la même machine, ils communiquent via TCP/IP. Le serveur démarre un nouveau processus pour chaque client.

## Création d'une base de données <a id="postGIS_createdb"></a>

En ligne de commande :
```
createdb ma_base
```

## Suppression d'une base de données <a id="postGIS_deletedb"></a>

En ligne de commande :
```
dropdb ma_base
```

## Accéder à une base <a id="postGIS_getdb"></a>

- Lancer psql :

```
$psql ma_base

psql (9.3.11)
Type "help" for help.

ma_base=#
```

## Créer une nouvelle table <a id="postGIS_createTable"></a>
```sql
CREATE TABLE animaux (
  type  varchar(80),
  nom   varchar(80),
  age   int
  refuge varchar(80) references refuges
);
```

Définir une table avec des emplacements géographiques :
```sql
CREATE TABLE refuges (
  nom         varchar(80) primary key,
  emplacement point
);
```

## Supprimer une table <a id="postGIS_deleteTable"></a>
```sql
DROP TABLE nom_table;
```

## Remplir une table <a id="postGIS_fillTable"></a>
```sql
INSERT INTO animaux VALUES ('chien', 'Shana', 9, 'SPA Montpellier');
INSERT INTO refuges VALUES ('SPA Montpellier', '(-194.0, 53.0)');
```

On peut aussi utiliser `COPY` pour charger de grandes quantités de données depuis des fichiers texte (Cf [COPY](http://docs.postgresqlfr.org/9.0/sql-copy.html)). Plus rapide car la commande est optimisée pour cet emplois.
```sql
COPY animaux FROM '/path/to/file/animaux_donnees';
```
Format du fichier :
```
chien Pepita  5
chien Gold    6
chat  Dickens 3
```
## Interroger une table <a id="postGIS_requestTable"></a>
Comme en SQL :
```sql
SELECT * FROM animaux;
SELECT * FROM animaux a, refuges r
         WHERE a.refuge = r.nom;
SELECT * FROM animaux
         INNER JOIN refuges ON (animaux.refuge = refuges.nom);
```

## Données spatiales <a id="postGIS_spatialData"></a>

- On a un type de données `geometry` et un type de données `geography`. Il faudra choisir en fonction de l'environnement et des données traitées quel est le type à utiliser (Cf documentation : [When to use Geography Data type over Geometry data type](http://postgis.net/docs/manual-2.2/using_postgis_dbmanagement.html#PostGIS_GeographyVSGeometry)). Il y a plusieurs types de représentation des données :
```
POINT(0 0)
LINESTRING(0 0, 1 1, 1 2)
POLYGON((0 0, 4 0, 4 4, 0 0), (1 1, 2 1, 2 2, 1 2, 1 1))
MULTIPOINT((0 0), (1 2))
MULTILINESTRING((0 0, 1 1, 1 2) (2 3, 3 2, 5 4))
MULTIPOLYGON((0 0, 4 0, 4 4, 0 0), (1 1, 2 1, 2 2, 1 2, 1 1), (-1 -1, -1 -2, -2 -2, -1 -1))
GEOMETRYCOLLECTION(POINT(0 0), LINESTRING(0 0, 1 1, 1 2))
```


```sql
CREATE TABLE villes (
      id int4,
	  	nom varchar(25),
      position geography(POINT,4326)
);

CREATE TABLE refuges (
      id int4,
	  	nom varchar(25),
      position geometry
);

INSERT INTO refuges VALUES(1, 'SPA Béziers',ST_GeomFromText('POINT(0 0)') );
INSERT INTO villes (name, location) VALUES (1, Montpellier, ST_GeographyFromText('SRID=4326;POINT(-110 30)') );
```

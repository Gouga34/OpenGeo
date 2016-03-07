<?php

header('Access-Control-Allow-Origin: *');
include_once('constants.php');

//required data :
//FORMAT (ex: image/png)
//QUERY_LAYERS (ex : nyc:parcelles)
//LAYERS (ex : nyc:parcelles)
//INFO_FORMAT (ex : application/json)
//CRS (ex : EPSG:3857)

$format = $_GET["FORMAT"];
$query_layers = $_GET["QUERY_LAYERS"];
$layers = $_GET["LAYERS"];
$info_format = $_GET["INFO_FORMAT"];
$crs = $_GET["CRS"];

echo file_get_contents(SERVICE_URL . "?SERVICE=" . SERVICE
     . "&VERSION=" . VERSION
     . "&REQUEST=" . REQUEST
     . "&FORMAT=" . $format
     . "&TRANSPARENT=" . TRANSPARENT
     . "&QUERY_LAYERS=" . $query_layers
     . "&LAYERS=" . $layers
     . "&INFO_FORMAT=" . $info_format
     . "&I=" . I
     . "&J=" . J
     . "&CRS=" . $crs
     . "&STYLES=" . STYLES
     . "&WIDTH=" . WIDTH
     . "&HEIGHT=" . HEIGHT
     . "&BBOX=" . BBOX);

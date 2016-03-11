<?php

header('Access-Control-Allow-Origin: *');
include_once('constants.php');

$format = $_GET["FORMAT"];
$query_layers = $_GET["QUERY_LAYERS"];
$layers = $_GET["LAYERS"];
$info_format = $_GET["INFO_FORMAT"];
$crs = $_GET["CRS"];
$bbox = $_GET["BBOX"];
$request = $_GET["REQUEST"];
$transparent = $_GET["TRANSPARENT"];
$i = $_GET["I"];
$j = $_GET["J"];
$styles = $_GET["STYLES"];
$width = $_GET["WIDTH"];
$height = $_GET["HEIGHT"];

echo file_get_contents(SERVICE_URL . "?SERVICE=" . SERVICE
     . "&VERSION=" . VERSION
     . "&REQUEST=" . $request
     . "&FORMAT=" . $format
     . "&TRANSPARENT=" . $transparent
     . "&QUERY_LAYERS=" . $query_layers
     . "&LAYERS=" . $layers
     . "&INFO_FORMAT=" . $info_format
     . "&I=" . $i
     . "&J=" . $j
     . "&CRS=" . $crs
     . "&STYLES=" . $styles
     . "&WIDTH=" . $width
     . "&HEIGHT=" . $height
     . "&BBOX=" . $bbox);

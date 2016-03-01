<?php
  include_once("GeoServerManager/GeoServerManager.php");

  echo "GeoServerManager Get test";

  $geoServerManager = new GeoServerManager();

  $geoServerManager->initializeSession();
  $geoServerManager->debuggingSettings();

  echo "Get test";

  $geoServerManager->postSettings();
  
  $data = "<workspace><name>newWorkspace</name></workspace>";
  
  $geoServerManager->postData($data);
  
  $geoServerManager->closeSession();
  
  $geoServerManager->initializeSession();
  $geoServerManager->debuggingSettings();
  $geoServerManager->requestSettings();
  
  $geoServerManager->getSettings();
  $geoServerManager->getData();

  $geoServerManager->closeSession();

  echo "Get done - see log file";

<?php
  include_once("GeoServerManager/GeoServerManager.php");

  echo "GeoServerManager <br/><br/>";

  $geoServerManager = new GeoServerManager(WORKSPACE_REQUEST);

  $geoServerManager->initializeSession();
  $geoServerManager->debuggingSettings();

  echo "POST <br/>";

  $geoServerManager->postSettings();
  
  $data = "<workspace><name>newWorkspace</name></workspace>";

  $geoServerManager->postData($data);
  
  $geoServerManager->closeSession();
  
  echo "done - see log file <br/><br/>";
  
  echo "GET <br/>";
  
  $geoServerManager->initializeSession();
  $geoServerManager->debuggingSettings();
   
  $geoServerManager->getSettings();
  $geoServerManager->getData();

  $geoServerManager->closeSession();

  echo "done - see log file<br/><br/>";
  
  echo "DELETE <br/>";
  
  $geoServerManager->setUrlRequest(WORKSPACE_REQUEST . WORKSPACE);
  $geoServerManager->initializeSession();
  $geoServerManager->debuggingSettings();
  
  $geoServerManager->deleteSettings();
  $geoServerManager->deleteData();
  
  $geoServerManager->closeSession();
  echo "done - see log file<br/><br/>";
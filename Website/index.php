<?php
  include_once("GeoServerManager/GeoServerManager.php");

  echo "GeoServerManager Post test";

  $geoServerManager = new GeoServerManager();

  $geoServerManager->initializeSession();
  $geoServerManager->debuggingSettings();

  echo "Post test";

  $geoServerManager->postRequestSettings();

  $data = "<workspace><name>newWorkspace</name></workspace>";

  $geoServerManager->postData($data);

  $geoServerManager->closeSession();

  echo "Post done - see log file";

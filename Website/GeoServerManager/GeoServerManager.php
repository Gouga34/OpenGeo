<?php
include_once("Constants.php");

class GeoServerManager {

  private $logFile; //Contient la ressource représentant le pointeur vers le fichier de log.
  private $url;
  private $ch;
  
  public function __construct() {
      $this->url = SERVICE . REQUEST;
  }

  private function openLogFile() {
    $this->logFile = fopen(LOG_FILENAME, 'w') or die("can't open log file");
  }

  private function writeInFile($data) {
    fwrite($this->logFile, $data);
  }

  private function closeFile() {
    fclose($this->logFile);
  }

  private function freecURLRessource() {
    curl_close($this->ch);
  }

  private function initiatecUrlSession() {
    $this->ch = curl_init($this->url);
  }
  
  public function initializeSession() {
    $this->openLogFile();
    $this->initiatecUrlSession();
  }

  public function closeSession() {
    $this->freecURLRessource();
    $this->closeFile();
  }

  public function debuggingSettings() {
    curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true); //options to return string
    curl_setopt($this->ch, CURLOPT_VERBOSE, true);
    curl_setopt($this->ch, CURLOPT_STDERR, $this->logFile); //logs curl messages
  }
  
  public function requestSettings() {
    $usernameAndPassword = GEOSERVER_USERNAME . ":" . GEOSERVER_PASSWORD;
    curl_setopt($this->ch, CURLOPT_USERPWD, $usernameAndPassword);
  }

  public function postSettings() {
      curl_setopt($this->ch, CURLOPT_POST, true);
  }
  
  public function getSettings() {
      curl_setopt($this->ch, CURLOPT_HTTPGET, True);
  }

  public function postData($data) {
    curl_setopt($this->ch, CURLOPT_HTTPHEADER, array(POST_HEADER));
    curl_setopt($this->ch, CURLOPT_POSTFIELDS, $data);

    $buffer = curl_exec($this->ch);

    $this->checkForErrorAndProcessResult($buffer);
  }
  
  public function getData() {
    curl_setopt($this->ch, CURLOPT_HTTPHEADER, array("Accept: application/xml"));

    $buffer = curl_exec($this->ch);

    $this->checkForErrorAndProcessResult($buffer);
  }

  private function checkForErrorAndProcessResult($buffer) {
    $info = curl_getinfo($this->ch);

    if($info['http_code'] != OK_CODE && $info['http_code']!=CREATED_CODE ) {
      $message = REQUEST_ERROR_MESSAGE . "[" . $info['http_code'] . "]\n";
    } else {
      $message = REQUEST_SUCCESS_MESSAGE . "[" . $info['http_code'] . "]\n";
    }
    
    $this->writeInFile($message);
    $this->writeInFile($buffer . "\n");
  }
}


function createView() {
  return new ol.View({
    center: MAP_CENTER,
    zoom: MAP_ZOOM
  });
}

function getWMSSource() {
  return new ol.source.ImageWMS({
    url: WMS_SERVICE_URL,
    params: {'LAYERS': WMS_SERVICE_LAYERS},
    serverType: SERVER_TYPE,
    crossOrigin: null
  });
}

function getWMSLayer(wmsSource) {
  return new ol.layer.Image({
    source: wmsSource
  });
}

function generateAndGetMap(view, wmsLayer) {
  return new ol.Map({
    layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              }),
              wmsLayer
            ],
    target: 'map',
    view: view
  });
}

function getRequestUrl(wmsSource, evt, viewResolution) {
  if (INFO_FORMAT == JSON_FORMAT) {
    var urlGeoServer = wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': INFO_FORMAT});
    var urlTab = urlGeoServer.split("http://localhost:8080/geoserver/wms");
    var url = urlTab[1];
  } else if (INFO_FORMAT == HTML_FORMAT || INFO_FORMAT == TEXT_FORMAT) {
    var url = wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': INFO_FORMAT});
  }
  return url;
}

function getAndPrintJSONData(url) {
  $.get(
    SERVER_URL + url,
      // success callback
    function (data) {
          var elementData = JSON.parse(data);

          var dataToPrint = "<table class=\"table\">"
                            + "<tr>"
                              + "<th> id </th>"
                              + "<th> name </th>"
                              + "<th> type </th>"
                            + "</tr>"
                            + "<tr>"
                              + "<td>" + elementData.features[0].properties.id + "</td>"
                              + "<td>" + elementData.features[0].properties.nom + "</td>"
                              + "<td>" + elementData.features[0].properties.type + "</td>"
                              + "</tr>"
                          + "</table>";

          document.getElementById('info').innerHTML = dataToPrint;
    }
  );
}

function getAndPrintTextData(url) {
  document.getElementById('info').innerHTML =
      '<iframe seamless src="' + url + '" width="600" height="200"></iframe>';
}

function onSingleClickPrintInformations(map, view, wmsSource) {
  map.on('singleclick', function(evt) {
    document.getElementById('info').innerHTML = '';
    var viewResolution = /** @type {number} */ (view.getResolution());

    var url = getRequestUrl(wmsSource, evt, viewResolution);

    if (url) {
      if (INFO_FORMAT == JSON_FORMAT) {
        getAndPrintJSONData(url);
      } else if (INFO_FORMAT == HTML_FORMAT || INFO_FORMAT == TEXT_FORMAT) {
        getAndPrintTextData(url);
      }
    }
  });
}

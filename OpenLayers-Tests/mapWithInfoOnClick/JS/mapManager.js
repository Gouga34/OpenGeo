
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

function onSingleClickPrintInformations(map, view, wmsSource) {
  map.on('singleclick', function(evt) {
    document.getElementById('info').innerHTML = '';
    var viewResolution = /** @type {number} */ (view.getResolution());
    var url = wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': INFO_FORMAT});
    if (url) {
      document.getElementById('info').innerHTML =
          '<iframe seamless src="' + url + '"></iframe>';
    }
  });
}

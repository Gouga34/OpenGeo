
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

function getView() {
  return new ol.View({
    center: MAP_CENTER,
    zoom: MAP_ZOOM
  });
}

function getViewControls() {
  return ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  });
}

function getViewLayers() {
  layers =  [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Tile({
          source: new ol.source.TileWMS({
            projection: MAP_PROJECTION,
            url: WMS_SERVICE_URL,
            params: {
              'LAYERS': WMS_SERVICE_LAYERS
            }
          })
        })
  ];
  return layers;
}

function generateAndGetMap() {
  view = getView();
  controls = getViewControls();
  layers = getViewLayers();

  var map = new ol.Map({
    target: 'map',
    layers: layers,
    view: view,
    controls: controls
  });

  return map;
}

function getVectorLayer(startPoint, destPoint) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [startPoint, destPoint]
    })
  });
}

function addPoint(event, startPoint) {
  startPoint.setGeometry(new ol.geom.Point(event.coordinate));
}

function onClickAddPoint(map, startPoint) {
  map.on('click', function(event) {
      addPoint(event, startPoint);
  });
}

function onClickClear(startPoint, destPoint) {
  var clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', function(event) {
    // Reset the "start" and "destination" features.
    startPoint.setGeometry(null);
    destPoint.setGeometry(null);
    // Remove the result layer.
  });
}

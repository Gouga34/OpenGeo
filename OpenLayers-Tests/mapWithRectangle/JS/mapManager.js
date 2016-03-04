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
        }),
  ];
  return layers;
}

function generateAndGetMap(vectorSource) {
  view = getView();
  controls = getViewControls();
  layers = getViewLayers(vectorSource);

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

function setPoint(coordinate, point) {
  point.setGeometry(new ol.geom.Point(coordinate));
}

function transformCoordinatesIntoRectangle(map, startPoint, destPoint) {
  var transform = ol.proj.getTransform('EPSG:3857', 'EPSG:4326');
  var startCoord = transform(startPoint.getGeometry().getCoordinates());
  var destCoord = transform(destPoint.getGeometry().getCoordinates());

  var polygonCoord = [
          {
              "lng": startCoord[0],
              "lat": startCoord[1]
          },
          {
              "lng": destCoord[0],
              "lat": startCoord[1]
          },
          {
              "lng": destCoord[0],
              "lat": destCoord[1]
          },
          {
              "lng": startCoord[0],
              "lat": destCoord[1]
          },
  ];
  var ring = [
    [polygonCoord[0].lng, polygonCoord[0].lat], [polygonCoord[1].lng, polygonCoord[1].lat],
    [polygonCoord[1].lng, polygonCoord[1].lat], [polygonCoord[2].lng,polygonCoord[2].lat],
    [polygonCoord[2].lng, polygonCoord[2].lat], [polygonCoord[3].lng, polygonCoord[3].lat],
    [polygonCoord[3].lng, polygonCoord[3].lat], [polygonCoord[0].lng, polygonCoord[0].lat],
  ];

  // A polygon is an array of rings, the first ring is
  // the exterior ring, the others are the interior rings.
  // In your case there is one ring only.
  var polygon = new ol.geom.Polygon([ring]);
  polygon.transform('EPSG:4326', 'EPSG:3857');

  var feature = new ol.Feature(polygon);

  // Create vector source and the feature to it.
  var vectorSource = new ol.source.Vector();
  vectorSource.addFeature(feature);

  // Create vector layer attached to the vector source.
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  // Add the vector layer to the map.
  map.addLayer(vectorLayer);
}

function onClickAddPoint(map, startPoint, destPoint) {
  map.on('click', function(event) {
    if(startPoint.getGeometry() == null) {
      setPoint(event.coordinate, startPoint);
    } else if(destPoint.getGeometry() == null) {
      setPoint(event.coordinate, destPoint);
      transformCoordinatesIntoRectangle(map, startPoint, destPoint);
    }
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

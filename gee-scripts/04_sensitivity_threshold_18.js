// Project 2 — Monsoon Surface Water Signal Analysis, Barisal Division
// Script 4: Sensitivity Testing — Threshold -18 dB
// Orbit: 114 ASCENDING | Time range: 2015-2025 | Threshold: -18 dB

var barisal = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq('ADM1_NAME', 'Barisal'));

var years = ee.List.sequence(2015, 2025);
var threshold = -18;

// Build annual binary water masks
var annualMasks = years.map(function(year) {
  var composite = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(barisal)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.calendarRange(7, 9, 'month'))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', 114))
    .filter(ee.Filter.calendarRange(year, year, 'year'))
    .select('VV')
    .median();

  var waterMask = composite
    .lt(threshold)
    .rename('water')
    .set('year', year);

  return waterMask;
});

// Stack all annual masks and sum = frequency raster
var maskCollection = ee.ImageCollection(annualMasks);
var frequencyRaster = maskCollection.sum().toFloat().clip(barisal).rename('frequency');

// Visualise
Map.centerObject(barisal, 8);
Map.addLayer(barisal, {color: 'blue'}, 'Barisal');
Map.addLayer(frequencyRaster, {min: 0, max: 11, palette: ['white', 'lightblue', 'blue', 'darkblue']}, 'Surface Water Frequency t18');

print('Frequency raster t18:', frequencyRaster);

// Export frequency raster to Google Drive
Export.image.toDrive({
  image: frequencyRaster,
  description: 'barisal_surface_water_frequency_2015_2025_t18',
  folder: 'project2_barisal',
  fileNamePrefix: 'barisal_swf_2015_2025_t18',
  region: barisal.geometry(),
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

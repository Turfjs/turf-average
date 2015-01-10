var inside = require('turf-inside');

/**
 * Calculates the average value of a field for points
 * within a set of polygons.
 *
 * @module turf/average
 * @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
 * @param {FeatureCollection} points a FeatureCollection of {@link Point} features
 * @param {string} field the field in the `points` features from which to pull values to average
 * @param {string} outputField the field in the `polygons` FeatureCollection to put results of the averages
 * @return {FeatureCollection} a FeatureCollection of {@link Polygon} features with the value of `outField` set to the calculated average
 * @example
 * var poly1 = turf.polygon([[[0,0],[10,0],[10,10], [0,10]]]);
 * var poly2 = turf.polygon([[[10,0],[20,10],[20,20], [20,0]]]);
 * var polyFC = turf.featurecollection([poly1, poly2]);
 * var pt1 = turf.point(5,5, {population: 200});
 * var pt2 = turf.point(1,3, {population: 600});
 * var pt3 = turf.point(14,2, {population: 100});
 * var pt4 = turf.point(13,1, {population: 200});
 * var pt5 = turf.point(19,7, {population: 300});
 * var ptFC = turf.featurecollection([pt1, pt2, pt3, pt4, pt5]);
 * var averaged = turf.average(polyFC, ptFC, 'population', 'pop_avg');
 *
 * //=averaged
 */
module.exports = function(polyFC, ptFC, inField, outField, done){
  polyFC.features.forEach(function(poly){
    if(!poly.properties) poly.properties = {};
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) values.push(pt.properties[inField]);
    });
    poly.properties[outField] = average(values);
  });

  return polyFC;
}

function average(values) {
  var sum = 0;
  for (var i = 0; i < values.length; i++) {
    sum += values[i];
  }
  return sum / values.length;
}

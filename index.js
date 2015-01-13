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
 * var poly1 = turf.polygon([[[10.666351,59.890659],[10.666351,59.936784],[10.762481,59.936784],[10.762481,59.890659],[10.666351,59.890659]]]);
 * var poly2 = turf.polygon([[[10.764541,59.889281],[10.764541,59.937128],[10.866165,59.937128],[10.866165,59.889281],[10.764541,59.889281]]]);
 * var polygons = turf.featurecollection([poly1, poly2]);
 * var pt1 = turf.point(10.724029,59.926807, {population: 200});
 * var pt2 = turf.point(10.715789,59.904778, {population: 600});
 * var pt3 = turf.point(10.746002,59.908566, {population: 100});
 * var pt4 = turf.point(10.806427,59.908910, {population: 200});
 * var pt5 = turf.point(10.79544,59.931624, {population: 300});
 * var points = turf.featurecollection([pt1, pt2, pt3, pt4, pt5]);
 *
 * var averaged = turf.average(polygons, points, 'population', 'pop_avg');
 *
 * var result = turf.featurecollection(points.features.concat(averaged.features));
 *
 * //=result
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

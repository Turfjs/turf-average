var inside = require('turf-inside')

module.exports = function(polyFC, ptFC, inField, outField, done){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {}
    }
    var values = []
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    })
    poly.properties[outField] = average(values)
  })

  return polyFC;
}

function average(values) {
  var sum = 0;
  for (var i = 0; i < values.length; i++) {
    sum += values[i];
  }
  return sum / values.length;
}

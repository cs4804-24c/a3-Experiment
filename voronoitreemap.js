function weightAccessor(d) {
  return d.weight; // computes the weight of one of your data; depending on your data, it may be 'd.area', or 'd.percentage', ...
}
var rootNode = d3.hierarchy(nestedData); // a d3-hierarchy of your nested data
rootNode.sum(weightAccessor); // assigns the adequate weight to each node of the d3-hierarchy

var voronoiTreemap = d3.voronoiTreemap().clip([
  [0, 0],
  [0, height],
  [width, height],
  [width, 0],
]); // sets the clipping polygon
voronoiTreemap(rootNode); // computes the weighted Voronoi tessellation of the d3-hierarchy; assigns a 'polygon' property to each node of the hierarchy

var allNodes = rootNode.descendants();
d3.selectAll("path")
  .data(allNodes)
  .enter()
  .append("path")
  .attr("d", function (d) {
    // d is a node
    return d3.line()(d.polygon) + "z"; // d.polygon is the computed Voronoï cell encoding the relative weight of your underlying original data
  })
  .style("fill", function (d) {
    return fillScale(d.data); // d.data is your original data
  });

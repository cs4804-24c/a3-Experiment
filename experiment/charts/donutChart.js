/**
 * Draw the donut chart
 * @param data {{value: number, marked: boolean}[]} - The data to be used to draw the donut chart
 *
 */
function drawDonutChart(data){
    const container = d3.select('#donutChart')

    // Clear the container
    container.selectAll('*').remove()

    // Set the dimensions and margins of the graph
    var width = 450,
        height = 450,
        margin = 40;

    // The radius of the donut chart is half the smallest side of the canvas
    var radius = Math.min(width, height) / 2 - margin;

    // Create the SVG element
    var svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Compute the position of each group on the donut chart
    var pie = d3.pie()
        .value(function(d) { return d.value; });

    var pieData = pie(data);

    // The outer radius is the radius of the pie, to make the donut chart,
    // set the inner radius to a value greater than zero
    var outerRadius = radius;
    var innerRadius = radius / 2; // This will create a donut chart with a hole radius equal to half of the pie radius

    // Build the donut chart by setting the innerRadius to half of the outerRadius
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    svg
        .selectAll('whatever')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', "white")
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Place a dot on the centroid of the marked slices
    svg.selectAll('.pieDot')
        .data(pieData)
        .enter()
        .filter(function(d) { return d.data.marked; }) // Filter only the marked slices
        .append('circle')
        .attr('transform', function(d) {
            var c = arc.centroid(d);
            return "translate(" + c[0] + "," + c[1] + ")";
        })
        .attr('r', 5)
        .attr('fill', 'black');
}

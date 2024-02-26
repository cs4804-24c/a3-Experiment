/**
 * Draw the bubble chart with d3 force to bring the bubbles closer together
 * @param data {{value: number, marked: boolean}[]} - The data to be used to draw the bubble chart
 *
 */
function drawBubbleChart(data) {
    const container = d3.select('#bubbleChart');

    // Clear the container
    container.selectAll('*').remove();

    // Set the dimensions and margins of the graph
    var width = 450,
        height = 450;

    // Create the SVG element
    var svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    // Scale for bubble size
    var sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range([0, 40]); // Radius range increased for better force interaction

    // Create a force simulation
    var simulation = d3.forceSimulation(data)
        .force("charge", d3.forceManyBody().strength(5)) // Repulsion/attraction between nodes
        .force("center", d3.forceCenter(width / 2, height / 2)) // Attraction to the center of the svg area
        .force("collision", d3.forceCollide().radius(function(d) {
            return sizeScale(d.value);
        }));

    // Create the bubbles
    var bubbles = svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("r", function(d) { return sizeScale(d.value); })
        .attr("fill", "white")
        .style("opacity", "0.7")
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .call(d3.drag() // Add drag capabilities
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Add a dot at the center of the marked bubbles
    var centerDots = svg.selectAll(".center-dot")
        .data(data.filter(function(d) { return d.marked; }))
        .enter().append("circle")
        .attr("class", "center-dot")
        .attr("r", 3)
        .attr("fill", "black");

    // Update the simulation on each tick
    simulation.on("tick", function() {
        bubbles
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        centerDots
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

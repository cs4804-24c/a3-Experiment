/**
 * Draw the vertical bar chart
 * @param data {{value: number, marked: boolean}[]} - The data to be used to draw the vertical bar chart
 *
 */
function drawVerticalBarChart(data) {
    const container = d3.select('#verticalBarChart');

    // Clear the container
    container.selectAll('*').remove();

    // Set the dimensions and margins of the graph
    var width = 450,
        height = 450,
        margin = {top: 20, right: 20, bottom: 30, left: 40};

    var innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    var svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the scales
    var xScale = d3.scaleBand()
        .range([0, innerWidth])
        .padding(0.1)
        .domain(data.map(function(d, i) { return i; }));

    var yScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([0, d3.max(data, function(d) { return d.value; })]);

    // Create the bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
            d.x= xScale(i);
            d.cx = d.x + xScale.bandwidth()/2;
            return d.x;
        })
        .attr("y", function(d) {
            d.y = yScale(d.value);
            d.cy = yScale(d.value/2);

            return d.y;
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return innerHeight - yScale(d.value); })
        .attr("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "2px");

    // Add a dot at the center of the marked bars
    svg.selectAll(".marked-dot")
        .data(data.filter(function(d) { return d.marked; })) // Filter only marked data
        .enter().append("circle")
        .attr("class", "marked-dot")
        .attr("cx", d=>d.cx)  // Center of the bar
        .attr("cy", d=>d.cy) // Middle of the bar's height
        .attr("r", 5)
        .attr("fill", "black");

    // Add the x-axis
    svg.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xScale).tickFormat(function(d, i) { return i+1; }));

    // Add the y-axis
    // svg.append("g")
    //     .call(d3.axisLeft(yScale));
}

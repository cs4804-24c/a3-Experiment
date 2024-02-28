
/**
 * Draw a treemap with a dot at the center of marked cells
 * @param data - Hierarchical data object with value and marked properties
 */
function drawTreemapChart(data) {
    // Set the dimensions and margins of the graph
    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#treemapChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("border", "2px solid black")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create a root node from the hierarchical data
    const root = d3.hierarchy(data).sum(d => d.value); // Here the size of each leave is given in the 'value' field in input data

    // Compute the treemap layout
    d3.treemap()
        .size([width, height])
        .padding(1)
        (root);

    // Draw each cell as a rectangle
    svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("fill", "white");

    // Add a dot at the center of marked cells
    svg.selectAll("circle")
        .data(root.leaves().filter(d => d.data.marked))
        .enter()
        .append("circle")
        .attr("cx", d => d.x0 + (d.x1 - d.x0) / 2)
        .attr("cy", d => d.y0 + (d.y1 - d.y0) / 2)
        .attr("r", 4)
        .style("fill", "black");
}


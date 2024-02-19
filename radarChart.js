/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

function RadarChart(id, data, options) {
	var cfg = {
	 w: 800,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 50}, //The margins of the SVG
	 levels: 5,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: .1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 hasFill: false,
	 color: ["red", "green","blue"]	//Color function
	};

	function randomPoints(){
		let d = [
	        [
	        //employee 1
	            {axis:"Creativity", value: Math.floor(Math.random()*100)},
	            {axis:"Leadership", value: Math.floor(Math.random()*100)},
	            {axis:"Communication", value: Math.floor(Math.random()*100)},
	            {axis:"Time Management", value: Math.floor(Math.random()*100)},
	            {axis:"Teamwork",value:  Math.floor(Math.random()*100)},
	        ],
	        [
	        //employee 2
	            {axis:"Creativity", value: Math.floor(Math.random()*100)},
	            {axis:"Leadership", value: Math.floor(Math.random()*100)},
	            {axis:"Communication", value: Math.floor(Math.random()*100)},
	            {axis:"Time Management", value: Math.floor(Math.random()*100)},
	            {axis:"Teamwork",value: Math.floor(Math.random()*100)},
	        ],
	        [
	        //employee 3
	            {axis:"Creativity", value: Math.floor(Math.random()*100)},
	            {axis:"Leadership", value: Math.floor(Math.random()*100)},
	            {axis:"Communication", value: Math.floor(Math.random()*100)},
	            {axis:"Time Management", value: Math.floor(Math.random()*100)},
	            {axis:"Teamwork",value:  Math.floor(Math.random()*100)},
	        ] 
	    ];
		return d;
	}
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	

	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left ) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	function createLegend(){
		svg.append("g")
			.attr("transform", "translate(5,0)")
			.attr("class", "line-legend")
			.append("rect")
			.attr("width", 100)
			.attr("height", 100)
			.attr("fill", "none")
			.attr("stroke", "black")

		svg.select(".line-legend")
			.append("text")
			.text("Legend")
			.attr("font-size", 15)
			.attr("transform", "translate(22,15)");


		svg.selectAll('text.line-legend')
			.data(["A","B"])
			.enter()
			.append("text")
			.attr("font-size", 13)
			.attr("x",65)
			.attr("y", function(d,i){
				return(45 + i*25)})
			.text(function(d){return(d)})
			.attr("color", function(d,i){
				return(cfg.color(i))})
		
		svg.select(".line-legend")
			.append("line")
			.attr("x1", 15)
			.attr("y1", 40)
			.attr("x2", 55)
			.attr("y2", 40)
			.style("stroke", cfg.color(0))
			.style("stroke-width", cfg.strokeWidth + "px")
			.style("stroke-dashArray", ("15,5"))

			svg.select(".line-legend")
			.append("line")
			.attr("x1", 15)
			.attr("y1", 65)
			.attr("x2", 55)
			.attr("y2", 65)
			.style("stroke", cfg.color(1))
			.style("stroke-width", cfg.strokeWidth + "px")
			.style("stroke-dashArray", ("4,4"))

		}
	
	createLegend();
	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	function makeGrid(){
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	//Draw the background circles
	
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles);
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");

	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");
	

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	}
	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	function plotPoints(){
	//The radial line function
	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", (cfg.hasFill) ? cfg.opacityArea: 0);
		
	//Create the outlines	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-dashArray", function(d,i){ return (0 == i) ? ("15,5"):											((1 == i) ? ("4,4"):"none")})
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i);})
		.style("fill", "none");
	
	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d;})
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j);})
		.style("fill-opacity", 0.8);


}
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	

	/////////////////////////////////////////////////////////
	/////////////////// Manage Test /////////////////////
	/////////////////////////////////////////////////////////

	var testCount = 1;
	var result = [];
	result.push(["isFilled", "hasColors", "isRound", "selection", "answer"]);

	d3.select("#sb").on("click", nextTest);
	
function nextTest(){
    if(testCount < 20){
		var choice = d3.select('#percent').property('value');
		result.push([cfg.hasFill, (cfg.color(i) == "red"), cfg.roundStrokes, choice, answer]);
        testCount++;
		
        data = randomPoints();
        svg.selectAll(".axisWrapper").remove();
		svg.selectAll(".radarWrapper").remove();
		svg.selectAll('.line-legend').remove();
		d3.select('.count').remove();
        cfg.hasFill = false;
        cfg.color = d3.scale.ordinal()
		.range(["grey","grey","grey"])
		cfg.roundStrokes = false;
		var toChange = Math.floor(Math.random()*3+1);
		
		switch(toChange){
			case 1:
				cfg.hasFill = true;
				break;
			case 2:
				cfg.color = d3.scale.ordinal()
				.range(["red","green","blue"])	
				break;
			case 3:
				cfg.roundStrokes = true;
				break;
		}
        answer = calcAnswer();
        makeGrid();
        plotPoints();
		createLegend();
		d3.select("body").append("g").attr("class", "count")
			.append("text")
			.text(testCount);
	    }
    else {
		var choice = d3.select('#percent').property('value');
		result.push([cfg.hasFill, (cfg.color(i) == "red"), cfg.roundStrokes, choice, answer]);
        const textToBLOB = new Blob([result.join("\n")], { type: "text/csv" });
        var filename = "FinishedTest";
        let newLink = document.createElement("a");
        newLink.download = filename;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        } else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
            }

        newLink.click();
        
    location.href = "https://kylieflerlage.github.io/a3-Experiment//end.html";
    }
}

function calcAnswer(){
	let sumA = 0;
	let sumB = 0;
	for(let i = 0;i < data[0].length;i++){
		sumA += data[0][i].value;
		sumB += data[1][i].value;
	}
	max = Math.max(sumA,sumB);
	
	if(sumA == max) return Math.floor((sumB/sumA)*100);
	else return Math.floor((sumA/sumB)*100);
	
}
makeGrid();
plotPoints();
var answer = calcAnswer();
d3.select("body").append("g").attr("class", "count")
	.append("text")
	.text(testCount);
}//RadarChart

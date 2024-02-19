const colors = d3.scaleOrdinal(d3.schemeCategory10);

const margin = {top: 20, right: 20, bottom: 20, left: 30};
const legendSize = 100;
const plotWidth = window.innerWidth * 0.8 - margin.left - margin.right - legendSize;
const plotHeight = 600 - margin.top - margin.bottom;

let svg = d3.select('#barchart-container').append('svg')
    .attr('width', plotWidth + margin.left + margin.right + legendSize)
    .attr('height', plotHeight + margin.top + margin.bottom)
    .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

// get all players
let players=[]
let selectedPlayer={};

fetch('/api/playerindex?LeagueID=00&Season=2023-24&SeasonType=Regular+Season')
    .then(res => res.json())
    .then( res => {
        res['PlayerIndex'].forEach( e => {
            players.push({"PlayerID": e['PERSON_ID'], "PTS": e['PTS']})
        })
        nextPlayer()
    })

function nextPlayer() {
    selectedPlayer = players.splice(Math.floor(Math.random() * players.length),1)[0];
    draw(selectedPlayer['PlayerID']);
}

let guessCount=0;
document.getElementById('submitGuess').onclick = () => {
    let guess = document.getElementById('guess').value
    if (guess !== "") {
        let body = {
            'filename': 'bar_vis.csv',
            'actualVal': selectedPlayer['PTS'],
            'guessedVal': guess
        }
        console.log(body)
        fetch('/submitGuess', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        document.getElementById('guess').value = ""
        guessCount++;
        if (guessCount!=10) nextPlayer()
        else document.querySelector('body').innerHTML = "Testing complete, please close this tab."
    } 
}

function draw(playerID) {
    svg.selectAll("*").remove()

    playerIDs = [playerID];

    Promise.all(playerIDs.map(playerID =>
        fetch(`/api/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${playerID}&Season=2023-24&SeasonType=Regular+Season`)
            .then(response => response.json())
            .then(data => data['PlayerGameLog'])
    ))
    .then(playerGameLogs => {
        // Calculate PPG
        playerPPGs = playerGameLogs.map(playerGameLog => {
            const totalPoints = playerGameLog.reduce((sum, game) => sum + parseInt(game['PTS']), 0);
            const totalGames = playerGameLog.length;
            const ppg = totalPoints / totalGames;
            return ppg;
        });

        // Merge player data
        const playersCombined = playerGameLogs.flatMap((playerGameLog, index) => {
            const playerID = playerIDs[index];
            return playerGameLog.map(game => ({
                playerID,
                date: new Date(game['GAME_DATE']),
                points: game['PTS']
            }));
        });

        const xScale = d3.scaleTime()
            .domain(d3.extent(playersCombined, d => d.date))
            .range([0, plotWidth]);

        const yScale = d3.scaleLinear()
            .domain([-0.25, d3.max(playersCombined, d => d.points)])
            .range([plotHeight, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${plotHeight})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .call(d3.axisLeft(yScale));

        // bars
        svg.selectAll('mybar')
            .data(playersCombined)
            .enter()
            .append("rect")
                .attr("x", function(d) { return xScale(d.date); })
                .attr("y", function(d) { return yScale(d.points); })
                .attr("width", 10)
                .attr("height", function(d) { return plotHeight - yScale(d.points); })
                .attr("fill", function(d) { 
                    if(d.points == 0) {
                        return 'red';
                    } else {
                        return 'green';  
                    }})
    
        // top right next to scatterplot
        const legend = svg.append('g')
            .attr('transform', `translate(${plotWidth + margin.right},${margin.top})`);
            

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', 'green');
    
        legend.append('text')
            .attr('x', 15)
            .attr('y', 30)
            .attr('dy', '0.35em')
            .text(playerID);
    })
}
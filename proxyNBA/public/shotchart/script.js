let svg = d3.select("#svg-holder").append('svg'),
    width = 500
    height = 940

svg.attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black")

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
    populateGames(selectedPlayer['PlayerID'] );
    gameselect.onchange = e => draw(selectedPlayer['PlayerID'] , gameselect.value);
}

let gameselect = document.getElementById('game-select');
let guessCount=0;
document.getElementById('submitGuess').onclick = () => {
    let guess = document.getElementById('guess').value
    if (guess !== "") {
        let body = {
            'filename': 'shotchart_vis.csv',
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
        if (guessCount!=20) nextPlayer()
        else document.querySelector('body').innerHTML = "Testing complete, please close this tab."
    } 
}

function populateGames(playerID) {
    d3.select('#game-select').selectAll('*').remove()
    fetch(`/api/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${playerID}&Season=2023-24&SeasonType=Regular+Season`)
        .then(res => res.json())
        .then( data => {
            data = data['PlayerGameLog']
            let games = new Set(data.map(e => (JSON.stringify({
                'name': `${e['MATCHUP']} - ${e['GAME_DATE']}`,
                'ID': e['Game_ID']
            }))))
            let tempOption = document.createElement('option')
            tempOption.innerText = 'All Games';
            tempOption.value="";
            gameselect.appendChild(tempOption)
            games.forEach( e => {
                e = JSON.parse(e);
                let option = document.createElement('option')
                option.innerText = e.name
                option.value = e.ID
                gameselect.appendChild(option)
            })
            draw(playerID, "");
        })
}


function drawCourt() {
    let xFeet = d3.scaleLinear()
    .domain([-25,25])
    .range([0,width])

    let yFeet = d3.scaleLinear()
        .domain([-47,47])
        .range([height,0])

    //Backboard
    svg.append('line')
        .attr('x1', xFeet(-3))
        .attr('x2', xFeet(3))
        .attr('y1', yFeet(-43))
        .attr('y2', yFeet(-43))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(-3))
        .attr('x2', xFeet(3))
        .attr('y1', yFeet(43))
        .attr('y2', yFeet(43))
        .attr('stroke', 'black')

    // Center Circle
    svg.append('circle')
        .attr("cx", xFeet(0))
        .attr('cy', yFeet(0))
        .attr('r', xFeet(-19))
        .attr('fill-opacity', 0)
        .attr('stroke', 'black')

    //Free throw circle

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(-28)} A 1 1 0 0 1 ${xFeet(6)} ${yFeet(-28)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(-28)} A 1 1 0 0 0 ${xFeet(6)} ${yFeet(-28)}`)
        .attr('stroke', 'black')
        .attr('stroke-dasharray',xFeet(-24))
        .attr('fill-opacity', 0)

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(28)} A 1 1 0 0 0 ${xFeet(6)} ${yFeet(28)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(28)} A 1 1 0 0 1 ${xFeet(6)} ${yFeet(28)}`)
        .attr('stroke', 'black')
        .attr('stroke-dasharray',xFeet(-24))
        .attr('fill-opacity', 0)

    // Inner Paint lines
    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(-8))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-28))
        .attr('stroke', 'black')
    
    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(-28))
        .attr('y2', yFeet(-28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(-8))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(28))
        .attr('stroke', 'black')
    
    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(28))
        .attr('y2', yFeet(28))
        .attr('stroke', 'black')

    // 3 point lines

    svg.append('line')
        .attr('x1', xFeet(-22))
        .attr('x2', xFeet(-22))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-33))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(22))
        .attr('x2', xFeet(22))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-33))
        .attr('stroke', 'black')

    svg.append('path')
      .attr('d', `M ${xFeet(-22)} ${yFeet(-33)} A 237 237 0 0 1 ${xFeet(22)} ${yFeet(-33)}`)
      .attr('stroke', 'black')
      .attr('fill-opacity', 0)

      svg.append('line')
      .attr('x1', xFeet(-22))
      .attr('x2', xFeet(-22))
      .attr('y1', yFeet(47))
      .attr('y2', yFeet(33))
      .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(22))
        .attr('x2', xFeet(22))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(33))
        .attr('stroke', 'black')

    svg.append('path')
        .attr('d', `M ${xFeet(-22)} ${yFeet(33)} A 237 237 0 0 0 ${xFeet(22)} ${yFeet(33)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    //Mid court line

    svg.append('line')
        .attr('x1', xFeet(-25))
        .attr('x1', xFeet(25))
        .attr('y1', yFeet(0))
        .attr('y2', yFeet(0))
        .attr('stroke','black')

}


// draw(1628369)
function draw(playerID, game) {
    svg.selectAll("*").remove()
    drawCourt()
    fetch(`/api/shotchartdetail?ContextMeasure=FGA&Month=0&OpponentTeamID=0&Period=0&PlayerID=${playerID}&Season=2023-24&TeamID=0&GameID=${game}&SeasonType=Regular+Season`)
    .then(resp => resp.json())
    .then(res => {
        let data = res['Shot_Chart_Detail']     
        let x = d3.scaleLinear()
            .domain([-250, 250])
            .range([ 0, width ]);

        let y = d3.scaleLinear()
            .domain([-50, 890])
            .range([height, 0]);

        var shape = d3.scaleOrdinal()
            .domain([1,0])
            .range([ d3.symbolCircle, d3.symbolTimes])

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("path")
                .attr("transform", d => `translate(${x(-d.LOC_X)}, ${y(d.LOC_Y)})`)
                .attr("stroke", d => d.SHOT_MADE_FLAG ? "#00FF00" : "#FF0000")
                .attr("stroke-width", 3)
                .attr('d', d3.symbol().size(50).type(d => shape(d.SHOT_MADE_FLAG)))
                .style("fill", d => d.SHOT_MADE_FLAG ? "#00AA00" : "#FF0000")
                .attr('fill-opacity', 0.25)
                .style('cursor', 'pointer')
                .on("click", (e,d) => {
                    fetch(`/forceapi/videoeventsasset?GameEventID=${d['GAME_EVENT_ID']}&GameID=${d['GAME_ID']}`)
                        .then(res => res.json())
                        .then( data => {
                            let videoplayer = document.getElementById('video-player');
                            videoplayer.style.visibility = 'visible';
                            videoplayer.setAttribute('src', data['resultSets']["Meta"]["videoUrls"][0]["lurl"])
                            videoplayer.setAttribute('poster', data['resultSets']["Meta"]["videoUrls"][0]["lth"])
                        })
                })
    })
}
let numCollected = 0;

let playerIDs = [];
let playerPPGs = [];

let player1PPG = 0;//, player2PPG = 0;

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const margin = {top: 20, right: 20, bottom: 20, left: 20};
const legendSize = 100;
const plotWidth = window.innerWidth * 0.8 - margin.left - margin.right - legendSize;
const plotHeight = 600 - margin.top - margin.bottom;

// Scatterplot
const svg = d3.select('#scatterplot-container').append('svg')
.attr('width', plotWidth + margin.left + margin.right + legendSize)
.attr('height', plotHeight + margin.top + margin.bottom)
.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`);

fetch('/api/playerindex?LeagueID=00&Season=2023-24')
    .then(response => response.json())
    .then(res => {
        let players = [];
        res['PlayerIndex'].forEach( e => {
            players.push({"PlayerID": e['PERSON_ID'], "PTS": e['PTS']})
        });
        playerIDs = getRandomPlayerIDs(players, 1);
        //console.log('Randomly selected player IDs:', playerIDs); // TODO: Just for debugging purposes

        playerPPGs = playerIDs.map(playerID => {
            const selectedPlayer = players.find(player => player.PlayerID === playerID);
            console.log(selectedPlayer);
            return selectedPlayer.PTS;
        });
        
        // Ensure all player data gets fetched first
        Promise.all(playerIDs.map(playerID =>
            fetch(`/api/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${playerID}&Season=2023-24&SeasonType=Regular+Season`)
                .then(response => response.json())
                .then(data => data['PlayerGameLog'])
        ))
        .then(playerGameLogs => {
            //console.log('Player PPGs:', playerPPGs); // TODO: Just for debugging purposes

            // Merge player data
            const playersCombined = playerGameLogs.flatMap((playerGameLog, index) => {
                const playerID = playerIDs[index];
                return playerGameLog.map(game => ({
                    playerID,
                    date: new Date(game['GAME_DATE']),
                    points: game['PTS']
                }));
            });

            drawScatterPlot(playersCombined, playerIDs);
            
            // Pick two random players and update question element
            const index1 = Math.floor(Math.random() * playerIDs.length);
            /*
            let index2 = Math.floor(Math.random() * playerIDs.length);
            while (index2 === index1) {
                index2 = Math.floor(Math.random() * playerIDs.length);
            }
            */

            const player1ID = playerIDs[index1];
            player1PPG = playerPPGs[index1];

            //const player2ID = playerIDs[index2];
            //player2PPG = playerPPGs[index2];

            const questionElement = document.getElementById("ppg-question");
            questionElement.textContent = `(${numCollected+1}/10) What is the points per game (PPG) average that Player ${player1ID} scored? (rounded to the nearest whole number)`;
        })
    })

// Helper function to pick X random NBA players
function getRandomPlayerIDs(data, count) {
    const randomPlayerIDs = [];
    let personIds = [];
    for (let i = 0; i < data.length; i++) {
        personIds.push(data[i]['PlayerID'])
    }
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * personIds.length);
        randomPlayerIDs.push(personIds[randomIndex]);
    }
    return randomPlayerIDs;
}

// Helper function to check answer
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("user-answer").value);

    //const actualDiff = Math.abs(player1PPG - player2PPG); 
    //const roundedDiff = Math.round(actualDiff); \
    const roundedDiff = Math.round(player1PPG);
    const resultElement = document.getElementById("result");

    if (userAnswer === roundedDiff) {
        resultElement.textContent = `Correct! The actual PPG average was ${roundedDiff} PPG.`;
    } else {
        resultElement.textContent = `Incorrect! The actual PPG average is ${roundedDiff} PPG.`;
    }

    let body = {
        'filename': 'scatter_vis.csv',
        'actualVal': roundedDiff,
        'guessedVal': userAnswer
    }
    
    //console.log(body); //TODO: For testing purposes

    fetch('/submitGuess', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });

    document.getElementById('user-answer').value = "";
    svg.selectAll("*").remove();

    numCollected++;

    if (numCollected != 10) {
        loadNextTest();
    } else {
        document.querySelector('body').innerHTML = "Testing complete, please close this tab."
    }
}

// Helper function to draw the scatterplot
function drawScatterPlot(playersCombined, playerIDs) {
    const xScale = d3.scaleTime()
                .domain(d3.extent(playersCombined, d => d.date))
                .range([0, plotWidth]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(playersCombined, d => d.points)])
                .range([plotHeight, 0]);

            svg.append('g')
                .attr('transform', `translate(0,${plotHeight})`)
                .call(d3.axisBottom(xScale));

            svg.append('g')
                .call(d3.axisLeft(yScale));

            // datapoints
            svg.selectAll('circle')
                .data(playersCombined)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.date))
                .attr('cy', d => yScale(d.points))
                .attr('r', 5)
                .attr('fill', d => colors(d.playerID));
            
            // datapoint line
            playerIDs.forEach(playerID => {
                const playerData = playersCombined.filter(d => d.playerID === playerID);
                svg.append('path')
                    .datum(playerData)
                    .attr('fill', 'none')
                    .attr('stroke', colors(playerID))
                    .attr('stroke-width', 2)
                    .attr('d', d3.line()
                        .x(d => xScale(d.date))
                        .y(d => yScale(d.points))
                    );
            });

            // top right next to scatterplot
            const legend = svg.append('g')
                .attr('transform', `translate(${plotWidth + margin.right},${margin.top})`);

            playerIDs.forEach((playerID, i) => {
                legend.append('rect')
                    .attr('x', 0)
                    .attr('y', i * 20)
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', colors(playerID));

                legend.append('text')
                    .attr('x', 15)
                    .attr('y', i * 20 + 10)
                    .attr('dy', '0.35em')
                    .text(playerID);
            });
}

// Helper function to load a new scatterplot test; bit of a lazy copy paste
function loadNextTest() {
    fetch('/api/playerindex?LeagueID=00&Season=2023-24')
    .then(response => response.json())
    .then(res => {
        let players = [];
        res['PlayerIndex'].forEach( e => {
            players.push({"PlayerID": e['PERSON_ID'], "PTS": e['PTS']})
        });
        playerIDs = getRandomPlayerIDs(players, 1);
        //console.log('Randomly selected player IDs:', playerIDs); // TODO: Just for debugging purposes

        playerPPGs = playerIDs.map(playerID => {
            const selectedPlayer = players.find(player => player.PlayerID === playerID);
            console.log(selectedPlayer);
            return selectedPlayer.PTS;
        });
        
        // Ensure all player data gets fetched first
        Promise.all(playerIDs.map(playerID =>
            fetch(`/api/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${playerID}&Season=2023-24&SeasonType=Regular+Season`)
                .then(response => response.json())
                .then(data => data['PlayerGameLog'])
        ))
        .then(playerGameLogs => {
            //console.log('Player PPGs:', playerPPGs); // TODO: Just for debugging purposes

            // Merge player data
            const playersCombined = playerGameLogs.flatMap((playerGameLog, index) => {
                const playerID = playerIDs[index];
                return playerGameLog.map(game => ({
                    playerID,
                    date: new Date(game['GAME_DATE']),
                    points: game['PTS']
                }));
            });

            drawScatterPlot(playersCombined, playerIDs);
            
            // Pick two random players and update question element
            const index1 = Math.floor(Math.random() * playerIDs.length);
            /*
            let index2 = Math.floor(Math.random() * playerIDs.length);
            while (index2 === index1) {
                index2 = Math.floor(Math.random() * playerIDs.length);
            }
            */

            const player1ID = playerIDs[index1];
            player1PPG = playerPPGs[index1];

            //const player2ID = playerIDs[index2];
            //player2PPG = playerPPGs[index2];

            const questionElement = document.getElementById("ppg-question");
            questionElement.textContent = `(${numCollected+1}/10) What is the points per game (PPG) average that Player ${player1ID} scored? (rounded to the nearest whole number)`;
        })
    })
}
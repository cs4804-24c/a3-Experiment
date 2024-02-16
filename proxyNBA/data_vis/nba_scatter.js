let playerIDs = [];
let playerPPGs = [];

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const margin = {top: 20, right: 20, bottom: 20, left: 20};
const legendSize = 100;
const plotWidth = window.innerWidth * 0.8 - margin.left - margin.right - legendSize;
const plotHeight = 600 - margin.top - margin.bottom;

fetch('/api/playerindex?LeagueID=00&Season=2023-24')
    .then(response => response.json())
    .then(res => {
        let players = [];
        res['PlayerIndex'].forEach( e => {
            players.push(e);
        });
        playerIDs = getRandomPlayerIDs(players, 5);
        console.log('Randomly selected player IDs:', playerIDs);
        
        // Ensure all player data gets fetched first
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

            console.log('Player PPGs:', playerPPGs);

            // Merge player data
            const playersCombined = playerGameLogs.flatMap((playerGameLog, index) => {
                const playerID = playerIDs[index];
                return playerGameLog.map(game => ({
                    playerID,
                    date: new Date(game['GAME_DATE']),
                    points: game['PTS']
                }));
            });

            // Scatterplot
            const svg = d3.select('#scatterplot-container').append('svg')
                .attr('width', plotWidth + margin.left + margin.right + legendSize)
                .attr('height', plotHeight + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

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
        })
        .catch(error => console.error('playerGameLog error:', error));
    })
    .catch(error => console.error('playerIndex error:', error));

// Helper function to pick X random NBA players
function getRandomPlayerIDs(data, count) {
    const randomPlayerIDs = [];
    let personIds = [];
    for (let i = 0; i < data.length; i++) {
        personIds.push(data[i]['PERSON_ID'])
    }
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * personIds.length);
        randomPlayerIDs.push(personIds[randomIndex]);
    }
    return randomPlayerIDs;
}
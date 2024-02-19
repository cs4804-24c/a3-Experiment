function randomPoints(){
    var data = [
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
    return data;
}

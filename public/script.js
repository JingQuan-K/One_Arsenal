async function setNextMatch(id){
    const url ="/football/nextmatch"
    const response = await fetch(url)
    const match = await response.json()
    
    const comp = match.competition.name;
    const home = match.homeTeam;
    const away = match.awayTeam;
    const date = new Date(match.utcDate);

    setInterval(setCountdown, 1000, date);

    document.querySelector('.next-match-competition').innerText = comp;
    document.querySelector('.home div').innerText = home.name.slice(0,-3);
    document.querySelector('.away div').innerText = away.name.slice(0,-3);
    document.querySelector('.home img').src = `https://crests.football-data.org/${home.id}.svg`;
    document.querySelector('.away img').src = `https://crests.football-data.org/${away.id}.svg`;

    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNo = date.getDate();
    const month = date.getMonth();
    const hour = date.getHours();
    let minute = date.getMinutes();
    if(minute === 0)
        minute = "00";

    document.querySelector('.next-match-time .date').innerText = dayNo + " " + monthName[month];
    document.querySelector('.next-match-time .day').innerText = dayName[date.getDay()];
    document.querySelector('.next-match-time .time').innerText =  hour + ":" + minute;      
}

function setCountdown(date){
    let now = new Date().getTime();
    
    let distance = date - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('#day').innerText = days;
    document.querySelector('#hour').innerText = hours;
    document.querySelector('#minute').innerText = minutes;
    document.querySelector('#second').innerText = seconds;
}

async function setVideo(){

    const url ="/youtube/video"
    const response = await fetch(url)
    const video = await response.json()

    document.querySelector(".video").src = `http://www.youtube.com/embed/${video}`;

}

async function getTable(){
    const url ="/football/table"
    const response = await fetch(url)
    const table = await response.json()

    table.forEach(club => {
        var bgColor = "#FFFFFF"

        //To delete " FC"
        var clubName = club.team.name.slice(0,-3)

        if (clubName === "Arsenal")
            bgColor = "#F2F2F2"
        document.getElementById("standings").innerHTML += 
        `<tr style='background-color:${bgColor}'><td>${club.position}</td><td><img src='${club.team.crestUrl}'/></td><td>${clubName}</td><td>${club.playedGames}</td><td>${club.won}</td><td>${club.draw}</td><td>${club.lost}</td><td>${club.goalsFor}</td><td>${club.goalsAgainst}</td><td>${club.goalDifference}</td><td>${club.points}</td></tr>`
    });
}

setNextMatch(57).catch(error => {
    console.log('There is an error!');
    console.error(error);
})

getTable().catch(error => {
    console.log('There is an error!');
    console.error(error);
})

// setVideo().catch(error => {
//     console.log('There is an error!');
//     console.error(error);
// })
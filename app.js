const timeTxt = document.querySelector("h1.time");
const dateTxt = document.querySelector("h2.date");
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function updateTime(){
    let now = new Date();
    let hour = now.getHours();
    let mins = now.getMinutes();

    if(hour <= 9){
        hour = "0" + now.getHours();
    }
    if(mins <= 9){
        mins = "0" + now.getMinutes();
    }

    dateTxt.innerHTML = days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate();
    timeTxt.innerHTML = hour + ":" + mins;

}

updateTime();
setInterval(updateTime,1000);
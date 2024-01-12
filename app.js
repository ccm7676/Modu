//Elements
const timeTxt = document.querySelector("h1.time");
const dateTxt = document.querySelector("h2.date");
const widgetContainer = document.querySelector("div.widget-container");
const mainContainer = document.querySelector("div.main-container");

//Date Arrays
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

//widget class array
let widgets = ["widget","widget","widget","widget","widget","widget","widget x2"];

//drag vars
let initMX = 0;
let initMY = 0;
let initWX = 0;
let initWY = 0;
let downM = false;


//updates formats and updates date and time
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

function genWidgets() {
    for(i = 0; i < widgets.length; i++ ) {
        //calculate row and column for widget
        wrow = Math.floor(i/4) +1;
        wcol = (i+1) - (wrow-1)*4;

        //create widget
        let newWidget = document.createElement("div");

        //set classes and id
        newWidget.classList = widgets[i];
        newWidget.id = i;

        //check for large widgets
        if (widgets[i].includes("x2")) {
            wcol = wcol.toString() + "/" + (wcol + 2).toString();
        }

        //set row and column positioning 
        newWidget.style.setProperty("grid-row", wrow.toString());
        newWidget.style.setProperty("grid-column", wcol.toString());

        //DRAG FUNCTIONS
        newWidget.addEventListener("mousedown", (e) => {
            let wrect = widgetContainer.getBoundingClientRect();
            let offsetX = wrect.left;
            let offsetY = wrect.top;

            e.preventDefault();
            let rect = newWidget.getBoundingClientRect();
            downM = true;
            initMX = e.clientX;
            initMY = e.clientY;
            initWX = rect.left;
            initWY = rect.top;

            document.onmousemove = (e) => {
                e.preventDefault()
                if (downM) {

                    newWidget.style.setProperty("position", "absolute");
                    newWidget.style.setProperty("top", (initWY - initMY + e.clientY - offsetY).toString() + "px");
                    newWidget.style.setProperty("left", (initWX - initMX + e.clientX - offsetX).toString() + "px");
                    newWidget.style.left = e.clientX;
                  
                    widgetContainer.insertBefore(newWidget, document.elementsFromPoint(e.clientX,e.clientY)[0]);
              
                    
                }
            };

            document.onmouseup = (e) => {
                newWidget.style.setProperty("position", "unset");
                document.onmousemove = null;
            }
        });

        

        widgetContainer.appendChild(newWidget);
    }
}

genWidgets();


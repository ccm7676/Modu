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

        //create widget
        let newWidget = document.createElement("div");

        //set classes and id
        newWidget.classList = widgets[i];


        //DRAG FUNCTIONS
        newWidget.addEventListener("mousedown", (e) => {

            e.preventDefault();
            downM = true;

            let rect = newWidget.getBoundingClientRect();

            initMX = e.clientX;
            initMY = e.clientY;
            initWX = rect.left;
            initWY = rect.top;

            //update postion of element being draged
            document.onmousemove = (e) => {
                e.preventDefault()
                if (downM) {

                    newWidget.style.setProperty("position", "absolute");
                    newWidget.style.setProperty("top", (initWY - initMY + e.clientY).toString() + "px");
                    newWidget.style.setProperty("left", (initWX - initMX + e.clientX).toString() + "px");
                    newWidget.style.left = e.clientX;
                    mainContainer.appendChild(newWidget);
                    
                }
            };

            document.onmouseup = (e) => {
                //get element at mouse position
                let mouseElmnt = document.elementsFromPoint(e.clientX,e.clientY)[0];

                newWidget.style.setProperty("position", "unset");
                widgetContainer.appendChild(newWidget);

                //check if element is inside widget cointainer
                if(mouseElmnt.parentElement == widgetContainer){
                    widgetContainer.insertBefore(newWidget, mouseElmnt);
                }
                
                document.onmousemove = null;
            }
        });

        

        widgetContainer.appendChild(newWidget);
    }
}

genWidgets();


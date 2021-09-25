var textoGuardado = "null";
var textBitacora = "null";
var checkbox = "";
var value = "";
var validPage = false;
var urlValid = "file:///C:/Users/PC-CASA/Desktop/index.html";

asyncCall();
console.log("me hicieron click");

async function asyncCall() {


    // var micookie = chrome.cookies.getAll(VISITOR_INFO1_LIVE:"name");



    //obtener las propiedades de la pestaña
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let url = new URL(tab.url);
const sdf = url.hostname;

var cookies = document.cookie;

console.log(cookies);


    if (tab.url != urlValid) {

        console.log("me hicieron click2");
        validPage = true;
        document.querySelector("#changeColor").disabled = false;
        
        changeColor.addEventListener("click", async () => {

        //si hacemos click cuando está en true el checkbox pasará a false
        if (localStorage.getItem("checkboxchangeColor") == "true") {
            document.querySelector("#changeColor").checked = false;    
            checkbox =  document.querySelector("#changeColor").checked;
            localStorage.setItem("checkboxchangeColor", checkbox);
        } else {
            document.querySelector("#changeColor").checked = true;
            checkbox =  document.querySelector("#changeColor").checked;
            localStorage.setItem("checkboxchangeColor", checkbox);
        }

        value = checkbox;

        //guardamos la variable value para ser leída luego dentro de la pestaña
        chrome.storage.sync.set({key: value}, function() {
        });

        // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        //inyectar script dentro de la pestaña
        chrome.scripting.executeScript({
            target: { tabId: tab.id},
            function: setPageBackgroundColor
        });
        });
    } else {
        validPage = false;
        document.querySelector("#changeColor").disabled = true;
    }
}

document.querySelector("#changeColor").checked = localStorage.getItem("checkboxchangeColor");

if (localStorage.getItem("checkboxchangeColor") == "true") {
    document.querySelector("#changeColor").checked = true;
    checkbox =  document.querySelector("#changeColor").checked;
    localStorage.setItem("checkboxchangeColor", checkbox);
}

if (localStorage.getItem("checkboxchangeColor") == "false") {
    document.querySelector("#changeColor").checked = false;
    checkbox =  document.querySelector("#changeColor").checked;
    localStorage.setItem("checkboxchangeColor", checkbox);
}

function setPageBackgroundColor() {

    let checkbox = false;
    // var cookies = document.cookie;

console.log(document.cookie);

    function  escribirFecha(e) {
        //obtenemos el valor guardado de value dentro de la pestaña
        chrome.storage.sync.get(["key"], function(result) {

            let timeHours = "00";
            let time = "00:00";
            let today = "DD-MM-AAAA";

            checkbox = result.key;
    
            if(checkbox == false) {
                document.removeEventListener("keydown", escribirFecha);
            } else {
                if (e.key == "Shift") {
                    today = new Date();
                    if (today.getHours() < 10) {
                        timeHours = "0" + today.getHours();
                    } else {
                        timeHours = today.getHours();
                    }
                    if(today.getMinutes() < 10){
                        time = timeHours + ":0" + today.getMinutes();
                    } else {
                        time = timeHours + ":" + today.getMinutes();
                    }
                    if(document.querySelector("#textExtension").value == "") {
                        textBitacora = document.querySelector("#textExtension");
                        document.querySelector("#textExtension").value = document.getElementById("textExtension").value + time + " ";    
                    } else {
                        textBitacora = document.querySelector("#textExtension");
                        document.querySelector("#textExtension").value = document.getElementById("textExtension").value + "\n" + time + " ";    
                    }
                }
            }
        });
    }
    document.addEventListener("keydown", escribirFecha, event);
}
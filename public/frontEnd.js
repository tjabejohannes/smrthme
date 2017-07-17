/**
 * Created by LittleGpNator on 15/07/2017.
 */

var lastStatReg="off";
var socket = io();

$(document).ready(function () {
    getAndSettState();

    $("#executable").click(function (e) {
        e.preventDefault();
        postStateChange();
    });
});

//posts to the server that the state has changed
function postStateChange() {
    $.ajax({
        type: "POST",
        url: "/",
        success: function (result) {

            if (result === "off"){
                setSVG('off');
                lastStatReg='off';
            }else{
                setSVG('on');
                lastStatReg='on';
            }
        },
        complete: function (xhr, status) {  	// code to run regardless of success or failure
            socket.emit('pinHasBeenSet', lastStatReg);
        }
    });
}

//Asks server for current state and if its note the activ state it svitjes state.
function getAndSettState() {
    $.ajax({
        type: "GET",
        url: "/getState",
        success: function (result) {
            var stateNow =result;
            if (stateNow !== lastStatReg){
                setSVG(stateNow);
            }
        },
        complete: function (xhr, status) {  	// code to run regardless of success or failure
        }
    });
}

//function that sett's the svg "image" to the one correlating to the state given in the parameter.
function setSVG(state) {
    lastStatReg = state;
    var starLines = "";
    var mainLogoBody = "";
    if (state === "on"){
        starLines='#e1a741';
        mainLogoBody=starLines;
        document.body.style.backgroundColor = "white";
    }else{
        starLines='black';
        mainLogoBody='white';
        document.body.style.backgroundColor  = "black";
    }
    document.getElementById("starEf").setAttribute('style', 'fill: '+starLines+'');
    document.getElementById("mainLogoBody").setAttribute('style', 'fill: '+mainLogoBody+'');
}



//function that reacts on brodcast
$(function () {
    socket.on('pinHasBeenSetTo', function(state){
        if (state !== lastStatReg){
            setSVG(state);
        }
    });
});
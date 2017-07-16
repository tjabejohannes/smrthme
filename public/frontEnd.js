/**
 * Created by LittleGpNator on 15/07/2017.
 */

var lastStatReg;

$(document).ready(function () {
    getState();
    $("#executable").click(function (e) {
        e.preventDefault();
        postState();
    });
});

function postState() {
    $.ajax({
        type: "POST",
        url: "/",
        success: function (result) {

            if (result === "0"){
                setSVG('off');
            }else{
                setSVG('on');
            }
        },
        complete: function (xhr, status) {  	// code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}

function getState() {
    $.ajax({
        type: "GET",
        url: "/getState",
        success: function (result) {

            if (result === "0"){
                setSVG('off');
            }else{
                setSVG('on');
            }
        },
        complete: function (xhr, status) {  	// code to run regardless of success or failure
            console.log("The request is complete!");
        }
    });
}

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
    socket.emit('pinHasBeenSet', state);
}


$(function () {

    socket.on('pinHasBeenSetTo', function(stateSend){
        if (stateSend !== lastStatReg){
            setSVG(stateSend);
        }
    });
});
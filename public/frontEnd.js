/**
 * Created by LittleGpNator on 15/07/2017.
 */



$(document).ready(function () {
    $("#execute").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/",
            data: {id:"hallo Server!"},
            success: function (result) {
                var resultNow = result;
                console.log(result);

                if (result === "0"){
                    setSVG('off');
                    //document.getElementById("title").style.color = "white";
                    document.body.style.backgroundColor  = "black";
                }else{
                    setSVG('on');
                    //document.getElementById("title").style.color = "black";
                    document.body.style.backgroundColor = "white";
                }
            },
            complete: function (xhr, status) {  	// code to run regardless of success or failure
                console.log("The request is complete!");
            }
        });
    });
});

function setSVG(state) {
    var starLines = "";
    var mainLogoBody = "";
    if (state === "on"){
        starLines='#e1a741';
        mainLogoBody=starLines;
    }else{
        starLines='black';
        mainLogoBody='white';
    }
    document.getElementById("starEf").setAttribute('style', 'fill: '+starLines+'');
    document.getElementById("mainLogoBody").setAttribute('style', 'fill: '+mainLogoBody+'');
    socket.emit('pin has been set', state);
}

$(function () {
    var socket = io();
    socket.on('pin has been set', function(msg){
        console.log(msg);
    });
});
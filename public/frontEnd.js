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
                console.log("result: "+result);
            },
            complete: function (xhr, status) {  	// code to run regardless of success or failure
                console.log("The request is complete!");
            }
        });
    });
});
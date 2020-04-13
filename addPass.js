function submitData(){
//Absolutely must validate this input
var newUsername = document.getElementById("username").value;
var newPassword = document.getElementById("password").value;
var newSite = document.getElementById("site").value;

$.getJSON("data.json", function (data) {
    //'json' is a javascript object file
        data.count = data.count + 1;
        data.data.push({domain:newSite,username:newUsername,password:newPassword});
        alert(JSON.stringify(data));
        //Could use Google's Storage API to hold json
    });
}//end submit

window.onload=function(){
    $("#submitPassButton").click(function(){submitData();});
}





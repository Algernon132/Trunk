function addPass(nameField,urlField,usernameField,passwordField){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc";
    var userIDtest = "5ea74d8c2cc9423cf7c8bd20";
    alert(userIDtest + " " + nameField + urlField + usernameField + passwordField);
    $.post(serverAddress,
        {userID: userIDtest,
        name: usernameField,
        url: urlField,
        accUsername: usernameField,
        accPassword: passwordField})
    .done(function(data){
        console.log("data: " + data);
        alert(JSON.stringify(data));
        })
    .fail(function(jqXHR,textStatus,error){
        alert("Error adding password: " + error);
        });
    }//end addPass

window.onload=function(){
    $("#submitPassButton").click(function(){
        console.log("submitPassword onclick fired");
        var name = document.getElementById("name").value;
        var url = document.getElementById("site").value;  //url
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        addPass(name,url,username,password);
    });
};
function addPass(nameField,urlField,usernameField,passwordField){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc";
    var userIDtest = "5eab2f96d4b18c04c7acd561";
    // alert(userIDtest + " " + nameField + " " + urlField + " " + usernameField + " " + passwordField);
    // $.post(serverAddress,
    //     JSON.stringify({userID: userIDtest,
    //     name: usernameField,
    //     url: urlField,
    //     accUsername: usernameField,
    //     accPassword: passwordField}))
    // .done(function(data){
    //     console.log("data: " + data);
    //     alert(JSON.stringify(data));
    //     })
    // .fail(function(error){
    //     alert("Error adding password: " + error);
    //     })
    // .always(function(){
    //     console.log("always");
    // });


    $.ajax ({
        url: serverAddress,
        type: "POST",
        data:{ userID: "5eab2f96d4b18c04c7acd561",
                name: "usernameField",
                url: "urlField",
                accUsername: "usernameField",
                accPassword: "passwordField"
            },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(){
            alert("success!");
        }
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
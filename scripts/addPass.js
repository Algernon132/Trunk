function addPass(nameField,urlField,usernameField,passwordField){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc";

    chrome.storage.sync.get("userID", function(result) {
        if('userID' in result && result.userID != null){
            $.post(serverAddress,
                    ({userID: result.userID,
                    name: nameField,
                    url: urlField,
                    accUsername: usernameField,
                    accPassword: passwordField})
                    )
                .done(function(data){
                    console.log("data: " + JSON.stringify(data));
                    window.alert(JSON.stringify(data));
                    })
                .fail(function(error){
                    window.alert("Error adding password: " + JSON.stringify(error));
                    })
                .always(function(){
                    console.log("always");
                });
        }else{
            console.log("Failed to retrieve credentials");
            return null;
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

// function addPass(nameField,urlField,usernameField,passwordField){
//     var xmlhttp = new XMLHttpRequest();
//     var theUrl = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc";
//     xmlhttp.onreadystatechange = function() {
//         console.log("xmlhttp status: " + this.status);
//         if (this.readyState == 4 && this.status == 200) {
//           console.log(this.responseText);
//         }
//       };
//     xmlhttp.open("POST", theUrl);
//     xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xmlhttp.send(JSON.stringify({
//             userID: "5eab2f96d4b18c04c7acd561",
//              name: nameField,
//              url: urlField,
//              accUsername: usernameField,
//              accPassword: passwordField}));
// }
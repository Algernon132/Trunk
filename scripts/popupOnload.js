    /*Called when popup.html loads.*/
window.onload=function(){
    $("#retrieveUsername").click(function(){getCredentials();});
    $("#setUsername").click(function(){setCredentialsFromPopup();});
    $("#registerButton").click(function(){register();});

    //getCredentials() is asynchronous. Can't check value before it is returned

    this.checkIfLoggedIn();
}

function checkIfLoggedIn(){
    chrome.storage.sync.get("userID", function(result) {
        console.log(result);
        if('userID' in result && result.userID!=null){
            //user is logged in
            document.getElementById("loginButtonPopup").innerHTML="Logout";
            $("#loginForm").attr("action","/popup.html");   //change the button behavior to prevent loading the login page
            $("#loginButtonPopup").click(function(){logout();});
        }
      });
}

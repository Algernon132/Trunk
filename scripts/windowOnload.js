window.onload=function(){
    $("#testServerConnection").click(function(){connectToServerTest();});
    $("#retrieveUsername").click(function(){getCredentials();});
    $("#setUsername").click(function(){setCredentialsFromPopup();});
    $("#registerButton").click(function(){register();});
    $("#loginButton").click(function(){login();});
    this.retrieveData();
}
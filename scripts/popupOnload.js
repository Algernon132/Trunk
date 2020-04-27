window.onload=function(){
    $("#retrieveUsername").click(function(){getCredentials();});
    $("#setUsername").click(function(){setCredentialsFromPopup();});
    $("#registerButton").click(function(){register();});

    if(this.getCredentials() == null){
        console.log("no creds");
        $("#loginButton").click(function(){login();});
    }else{
        console.log("creds found")
        $("#loginButon").value="Logout";
        $("#loginButton").click(function(){logout();});
    }
}
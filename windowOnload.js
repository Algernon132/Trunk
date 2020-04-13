window.onload=function(){
    $("#testServerConnection").click(function(){connectToServerTest();});
    $("#retrieveUsername").click(function(){getCredentials();});
    $("#setUsername").click(function(){setCredentialsFromPopup();});
    this.retrieveData();
}
function login(formUsername, formPassword){
    if(formUsername == null || formPassword == null){
        return;
    }
    console.log(formUsername);
    console.log(formPassword);
    //$("#loginButton").hide();

    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login";
    $.post( serverAddress, { username: formUsername, password: formPassword },dataType="json")
    .done(function( data ) {
        console.log(JSON.stringify(data));
        //check if id field exists. If it does, login was successful. Save ID to google sync
        if('id' in data){
            setCredentials(data.id);
            window.location.href = "/popup.html";
        }else if('error' in data){
            alert("Error: " + data.error);
        }
    });
}

window.onload=function(){
    //event.preventDefault() allows the post to run before the page is refreshed
    $("#loginButton").click(function(event){event.preventDefault();console.log("loginOnclickFired");login(document.getElementById("usernameField").value,document.getElementById("passwordField").value)});
    

    $("#registerButton").click(function(event){
        event.preventDefault();
        console.log("registerOnclickFired");
        register(document.getElementById("usernameField").value,document.getElementById("passwordField").value,document.getElementById("nameField").value);
    });

}
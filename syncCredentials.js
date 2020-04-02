
//Will want to get some sort of encryption or something on the user data
function setCredentials(newUsername, newPassword){
    chrome.storage.sync.set({'username': newUsername},function(){
    })

    chrome.storage.sync.set({'password': newPassword},function(){
    })
    console.log("credentials set");
    console.log(newUsername);
    console.log(newPassword);
}

function getCredentials(){
    chrome.storage.sync.get("username", function(result) {
        alert("username: " + result.username);
      });

    chrome.storage.sync.get("password", function(result) {
        alert("password: " + result.password);
      });
      //these are asynchronous, will have to account for that when using their values

}

//Just works for the shitty mockup
function setCredentialsFromPopup(){
    var newUsername=document.getElementById('newUsername');
    setCredentials(newUsername.value,"testPassword");
}

window.onload=function(){
    document.getElementById('retrieveUsername').addEventListener('click',getCredentials);
    document.getElementById('setUsername').addEventListener('click',setCredentialsFromPopup);
}
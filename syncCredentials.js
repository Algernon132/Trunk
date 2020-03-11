function setCredentials(newUsername, newPassword){
    chrome.storage.sync.set({username: newUsername},function(){
    })

    chrome.storage.sync.set({password: newPassword},function(){
    })

}

function getCredentials(){
    password='';
    username='';
    chrome.storage.sync.get(['password']),function(result){
        password=result;
    }

    chrome.storage.sync.get(['username']),function(result){
        username=result;
    }

    alert('Username: ' + username + "<br>Password: " + password);
}
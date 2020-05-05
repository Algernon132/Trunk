function retrieveData(){
    var table = "dataTable";                //id of table to be filled
    var location = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/getAllAcc";
    var data={userID: getCredentials()};                          //data will be sent to the server. Can use this for user authentication
    console.log(data);
    //shorthand for ajax call (ASYNC)
    $.getJSON(location, data,
        function (data, textStatus, jqXHR) {
            console.log("db request fired");
           if(textStatus == "success"){
            const userData = new UserData(data);
            //userData.fillTable(table);
            userData.printToConsole();
           }else{
               console.log("An error occured.");
               console.log(textStatus);
           }
        }
    );  //end getJSON
}

// window.onload=function(){console.log("onload fired");retrieveData();}


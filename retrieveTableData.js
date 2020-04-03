function retrieveData(){
    //id of table to be filled
    var table = "dataTable";
    var location = "data.json";
    var data=null;
    //data will be sent to the server. Can use this for user authentication
    //shorthand for ajax call (ASYNC)
    $.getJSON(location, data,
        function (data, textStatus, jqXHR) {
            console.log("request fired");
           if(textStatus == "success"){
            const userData = new UserData(data);
            userData.fillTable(table);
           }else{
               console.log("An error occured.");
               console.log(textStatus);
           }
        }
    );  //end getJSON
}

window.onload=function(){
    console.log("onload fired");
    this.retrieveData();
}


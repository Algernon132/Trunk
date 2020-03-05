function retrieveData(){
    var indexInTable = 1;   //will have table headers
    var JSONData = getDataFromJSON('data.json');

    var table = document.getElementById("dataTable");
    var row = table.insertRow(indexInTable);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}

//asynchronously loads JSON data
//https://stackoverflow.com/questions/16991341/json-parse-file-path
function getDataFromJSON(location){
    var request = new XMLHttpRequest();
    request.open("GET", location, false);
    request.send(null);
    request.onreadystatechange = function() {
      if ( request.readyState === 4 && request.status === 200 ) {
        var my_JSON_object = JSON.parse(request.responseText);
        return(my_JSON_object);
      }
    }
}
window.onload=function(){
    document.getElementById('retrieveButton').addEventListener('click',retrieveData);
}
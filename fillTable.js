function retrieveData(){
    var indexInTable = 1;   //will have table headers
    var location = "json.data";
    var table = document.getElementById("dataTable");

    $.getJSON("data.json", function(json) { //asynchronous call
        for(i=0;i<json.count;i++){
            var row = table.insertRow(indexInTable);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = json.data[i].domain;
            cell2.innerHTML = json.data[i].username;
            cell3.innerHTML = json.data[i].password;
        }
    });
}

window.onload=function(){
    this.retrieveData();
}
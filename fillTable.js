function displayData(){
    var indexInTable = 1;   //will have table headers
    var table = document.getElementById("dataTable");
    var tableDataAsJson = retrieveData();
        for(i=0;i<tableDataAsJson.count;i++){
            var row = table.insertRow(indexInTable);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = tableDataAsJson.data[i].domain;
            cell2.innerHTML = tableDataAsJson.data[i].username;
            cell3.innerHTML = tableDataAsJson.data[i].password;
        }
}

window.onload=function(){
    this.displayData();
}
function retrieveData(){
    var indexInTable = 1;   //will have table headers
    var location = "json.data";
    var table = document.getElementById("dataTable");

    $.getJSON("data.json", function(json) {
        console.log(json); // this will show the info it in firebug console

        for(i=0;i<json.count;i++){
            var row = table.insertRow(indexInTable);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "NEW CELL1";
            cell2.innerHTML = "NEW CELL2";
        }
    });
}

window.onload=function(){
    document.getElementById('retrieveButton').addEventListener('click',retrieveData);
}
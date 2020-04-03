class UserData{
    constructor(jsonData){
        var i;
        //domain,username,password are arrays
        this.numberofRows = jsonData.count;
        this.domain = [];
        this.username=[];
        this.password=[];
        for(i=0;i++;i<=count){
            domain.push(jsonData.data[i].domain);
            username.push(jsonData.data[i].username);
            password.push(jsonData.data[i].password);
        }
        console.log(this.numberofRows);

    }

   fillTable(tableID){
       var table=document.getElementById(tableID);
       console.log(this.numberofRows);
       var i = 0;
       var indexInTable = 1;    //headers have index 0
    for(i=0;i<this.numberOfRows;i++){
        var row = table.insertRow(indexInTable++);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = this.domain[i];
        cell2.innerHTML = this.username[i];
        cell3.innerHTML = this.password[i];
    }

   }

   

}
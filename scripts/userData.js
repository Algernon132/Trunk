//class for holding and retrieving user data. A single object of class UserData can hold and display all user data.

class UserData{
    constructor(jsonData){
        var i;
        //domain,username,password are arrays
        this.numberOfRows = jsonData.count;
        //this.parsedData = JSON.parse(jsonData);
        this.domain=[];
        this.username=[];
        this.password=[];
        for(i=0;i<this.numberOfRows;i++){
            console.log(JSON.stringify(jsonData.data[i]));
            this.domain.push(jsonData.data[i].domain);
            this.username.push(jsonData.data[i].username);
            this.password.push(jsonData.data[i].password);
        }

    }

   fillTable(tableID){
       var table=document.getElementById(tableID);
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

   printToConsole(){
       console.log(JSON.stringify(this.domain));
       console.log(JSON.stringify(this.username));
       console.log(JSON.stringify(this.password));
   }
   

}
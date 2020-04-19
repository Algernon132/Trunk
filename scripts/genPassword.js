function generatePassword(length, containsUppercase, containsLowercase, containsNumbers, containsSymbols){
    //Takes parameters and returns the password
    //all "contains" variables should be boolean
    var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  //26
    var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";  //26    
    var numbers = "0123456789";                         //10
    var symbols = "!@#$%^&*()_+-=[];',./{}|:?";         //26
    var i = 0;
    var result = "";

    console.log(containsUppercase);
    console.log(containsLowercase);
    
    //confirm there is a password to be generated
    if(length == 0){
        return"";
    }
    if(containsUppercase != true && containsLowercase != true && containsNumbers != true && containsSymbols != true){
        return "";
    }

    for(i=0;i<length;i++){
        while(result.length == i){   //will loop until a letter is added
            var typeOfChar = getRandomInt(4);
            var newletter = "";
            switch(typeOfChar){
                case 0:
                    if(containsUppercase == true){
                        result = result.concat(uppercaseChars.charAt(getRandomInt(uppercaseChars.length)));
                    }
                    break;
                case 1:
                    if(containsLowercase == true){
                        result = result.concat(lowercaseChars.charAt(getRandomInt(lowercaseChars.length)));
                    }
                    break;
                case 2:
                    if(containsNumbers == true){
                        result = result.concat(numbers.charAt(getRandomInt(numbers.length)));
                    }
                    break;
                case 3:
                    if(containsSymbols == true){
                        result = result.concat(symbols.charAt(getRandomInt(symbols.length)));
                    }
                    break;
                default:
            }
        }
        
    }
    return result;

}

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

window.onload=function(){
    $("#passwordButton").click(function(){generatePasswordFromPage()});
}

function generatePasswordFromPage(){
    var length = 20;
    var containsUppercase = document.getElementById("containsUppercase").checked;
    var containsLowercase = document.getElementById("containsLowercase").checked;
    var containsNumbers = document.getElementById("containsNumbers").checked;
    var containsSymbols = document.getElementById("containsSymbols").checked;
    alert(generatePassword(length,containsUppercase,containsLowercase,containsNumbers,containsSymbols));
}
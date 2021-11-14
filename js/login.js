
var email=document.getElementById("exampleInputEmail1");
var pwd=document.getElementById("exampleInputPassword1")
var text1=document.getElementById("emailHelp");
var text2=document.getElementById("pwdHelp");
var form=document.getElementById("login");
var failureIcon=document.getElementsByClassName("failure-icon");
var successIcon=document.getElementsByClassName("success-icon");
var regexp = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;

function validate(){
    if(regexp.test(email.value)==true&&pwd.value.length>=8){
        text1.innerText="The email format is correct";
        text1.style.color="green";
        text2.innerText="The password format is correct"
        text2.style.color="green";
        
        successIcon[0].style.opacity="1"
        successIcon[1].style.opacity="1"
        failureIcon[0].style.opacity="0"
        failureIcon[1].style.opacity="0"
        return true;
    }

    else if(regexp.test(email.value)==false){
        text1.innerText="Enter valid format";
        text1.style.color="red";
        failureIcon[0].style.opacity="1";
        return false;
    }
    else if(pwd.value.length<8){
        text2.style.color="red";
        failureIcon[1].style.opacity="1";
        return false;
    }
}




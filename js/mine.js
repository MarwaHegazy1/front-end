var nameSignup = document.getElementById("nameSignupId")
var emailSignup =document.getElementById("emailSignupId")
var passSignup = document.getElementById("passSignupId")

var emailLogin = document.getElementById("emailSignin")
var passLogin = document.getElementById("passSignin")


var usersName;
if (localStorage.getItem('ourUsers') == null) {
    usersName = []
} else {
    usersName = JSON.parse(localStorage.getItem('ourUsers'));
}

/*validation*/
var regexName=/^[a-zA-Z]+\s/
var regexEmail=/(@gmail)\.(com)$/
var regexPassword=/[a-zA-Z0-9]{9}/

/*signup*/
function signUp(){
    if(signUpInputsIsEmpty() == true){
        document.getElementById("msg").innerHTML=`<span class="text-danger m-3">All inputs is required</span>`
        clearData()
    }
    else{
        if(regexName.test(nameSignup.value)&&regexEmail.test(emailSignup.value)&&regexPassword.test(passSignup.value)){
            let users={
                name:nameSignup.value,
                email:emailSignup.value,
                password:passSignup.value
            }
            if (usersName.length == 0) {
            usersName.push(users)
            localStorage.setItem("ourUsers",JSON.stringify(usersName))
            document.getElementById("msg").innerHTML=`<span class="text-danger m-3">Success</span>`
            clearData()
            window.location.href = "./index.html";
            }
            else{ 
                if(emailExist()==false){
                    document.getElementById("msg").innerHTML=`<span class="text-danger m-3">Email already exists</span>`
                    
                }
                else{
                    usersName.push(users)
                    localStorage.setItem("ourUsers",JSON.stringify(usersName))
                    document.getElementById("msg").innerHTML=`<span class="text-danger m-3">Success</span>`
                    clearData()
                    window.location.href = "./index.html";
                }
            }
        }
        else{
            document.getElementById("msg").innerHTML=`<span class="text-danger m-3">incorrect email or password</span>`
            clearData()
        }
    }
    

}

function emailExist(){
    for (let i = 0; i < usersName.length; i++) {
        if (usersName[i].email == emailSignup.value) {
            return false
        }
    }
}

function signUpInputsIsEmpty(){
    if((nameSignup.value=="") || (emailSignup.value=="") || (passSignup.value=="")){
        return true
    }return false
}

function clearData(){
    nameSignup.value=""
    emailSignup.value=""
    passSignup.value=""
}
/*login */
function clearLogin(){
    emailLogin.value = ""
    passLogin.value = ""
}

function login(){
    localStorage.removeItem("loginUserName");
    if((emailLogin.value=="") || (passLogin.value=="")){
        document.getElementById("msgLogin").innerHTML=`<span class="text-danger m-3">All inputs is required</span>`
        clearLogin()
    }
    for(var i=0 ; i < usersName.length ; i++){
        if ((usersName[i].email == emailLogin.value)&&(usersName[i].password == passLogin.value) ) {
            localStorage.setItem("loginUserName",JSON.stringify(usersName[i].name))
          break;
        }
    }
    if(localStorage.getItem("loginUserName")==null){
        document.getElementById("msgLogin").innerHTML=`<span class="text-danger m-3">incorrect email or password</span>`
        clearLogin()
    }
    else {
        window.location.href = "./home.html";
    }
}

/*logout */
 function logout(){
    localStorage.removeItem('loginUserName');
    window.location.href = "./index.html";
 }


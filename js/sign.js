// Variables popup sign user
const formSignUp = document.getElementById('signUp'),
formSignIn = document.getElementById('signIn'), 
btnSignUp = document.getElementById('btn-sign-up'),
btnSignin = document.getElementById("btn-sign-in"),
container = document.querySelector('.sign .container');
// Variables user login
const formlogin = document.getElementById('formsignin'),
emailLogin = document.getElementById('usernamelogin'),
passwordLogin = document.getElementById('passwordlogin');
// Variables user signup
let usernameSignUp = document.getElementById('user-name-signup'),
emailSignUp = document.getElementById('user-email-signup'),
imageSignUp = document.getElementById('image-user-signup'),
passwordSignUp = document.getElementById('password-signup'),
conformpasswordSignUp = document.getElementById('conform-password-signup');

// popup active 
btnSignUp.addEventListener('click',()=> {
container.classList.add('sign-up-mode')
})
btnSignin.addEventListener('click',()=> {
  container.classList.remove('sign-up-mode')
})

const btnSigninActive = document.getElementById('btnSignin'),
 btnSignupActive = document.getElementById('btnSignup'),
 closeSign = document.querySelector('.close-sign'),
 formSign = document.querySelector('.sign');



btnSigninActive.addEventListener('click',()=> {
  formSign.classList.add('active')
  noScroll()
})
closeSign.addEventListener('click',()=> {
  formSign.classList.remove('active')
  container.classList.remove('sign-up-mode')
  enableScroll()
})

btnSignupActive.addEventListener('click' ,()=>  {
  formSign.classList.add('active')
  container.classList.add('sign-up-mode')
  noScroll()
})

//////////////////////////////////////////////////////////////////

// formsignup
formSignUp.addEventListener('submit',e => {
  e.preventDefault(); 
 getSignUpFormErrors(usernameSignUp.value,emailSignUp.value,passwordSignUp.value,conformpasswordSignUp.value,imageSignUp.files[0]);
 
 

})
// fortm login
formlogin.addEventListener('click', e => {
  e.preventDefault();
  getLoginFormErrors(emailLogin.value,passwordLogin.value)
})
// function signup
function getSignUpFormErrors (userName,userEmail,password,conformPassword,image) {

  let informationUser = {'username':'','name':'','email':'','password':'','conformPassword':''}

if(userName === '' || userName === null ) {
  setErrorFor(usernameSignUp,'username requried')
}else {
  setSuccessFor(usernameSignUp)
  informationUser.username= 
  informationUser.name=userName
  
}

setSuccessFor(imageSignUp)

if(userEmail === '' || userEmail === null){
  setErrorFor(emailSignUp,'email is required')
}
else if (!validateEmail(userEmail)) {
  setErrorFor(emailSignUp,'Invalid email address')
  return false;
}
else {
  setSuccessFor(emailSignUp)
  informationUser.email=userEmail
  
}
if(password === '' || password.length < 8  ){
  setErrorFor(passwordSignUp,'password gehter than 8')
}else {
  setSuccessFor(passwordSignUp)
  informationUser.password=password
  
}
if(conformPassword === '' || conformPassword === null ) {
  setErrorFor(conformpasswordSignUp,'password is required')
}else if (conformPassword != password){
  setErrorFor(conformpasswordSignUp,'Password does not match')
}else {
  setSuccessFor(conformpasswordSignUp)
  informationUser.conformPassword=conformPassword
  
}

let formData = new FormData()


if( !(informationUser.username === '' || informationUser.userEmail === '' || informationUser.password === '' || informationUser.conformPassword === '')) {

  if(image) {
    formData.append('image',image)
  }
  formData.append('name',informationUser.name)
  formData.append('username',informationUser.username)
  formData.append('email',informationUser.email)
  formData.append('password',informationUser.password)
 
  signApi('register',formData,'Successfully registered!')
  conformpasswordSignUp.value=''
  passwordSignUp.value=''
  emailSignUp.value=''
  usernameSignUp.value=''
}

}
// function login
function getLoginFormErrors(email,password) {

  const userLogin = {
    'username':'',
    'password':''

  }

  if(email === '' || email === null) {
    setErrorFor(emailLogin,'email is required')
  }
  else {
    setSuccessFor(emailLogin)
    userLogin.username=email
  }
  if(password === '' || password.length > 9) {
    setErrorFor(passwordLogin,'Password gehter than 8 ')
  }else{
    setSuccessFor(passwordLogin)
    userLogin.password=password
  }

  if(!(userLogin.username === '' || userLogin.password === '')) {
    signApi('login',userLogin,'Login Successfully')
    email.value=''
    password.value=''
    
  }

}
// function seterror
function setErrorFor (input , message) {
  const formControl = input.parentElement
  formControl.classList.add('error')
  const error = formControl.querySelector('small')
  formControl.querySelector('i').classList.add('error')
  error.innerText = message;
} 
// function setsuccess
function setSuccessFor (input ) {
  const formControl = input.parentElement;
  formControl.classList.remove('error')
  const error = formControl.querySelector('small')
  formControl.querySelector('i').classList.remove('error')
  error.innerText = '';
}

const allinputs = [usernameSignUp,emailSignUp,passwordSignUp,conformpasswordSignUp,emailLogin,passwordLogin,imageSignUp];
changeInput(allinputs)
// function change delete error once toched
function changeInput (arrar) {
  arrar.forEach(input => {
    input.addEventListener('input',()=> {
      if(input.parentElement.classList.contains('error')){
        input.parentElement.classList.remove('error')
        input.parentElement.querySelector('small').innerHTML=''
        input.parentElement.querySelector('i').classList.remove('error')
      }
    })
  })
}
// function validatoin email
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
// function send api
function signApi (typelogin,params,toastrmessage) {
  const url = `${baseURl}${typelogin}`
  axios.post(url,params , {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(
    (response)=>{
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      localStorage.setItem('login','true')
      toastr('success',toastrmessage)
      themeUl()
      enableScroll()
      
  }).catch((error)=> {
    toastr('error',error.response.data.message)
// console.log(error.response.data.message);

  })
}

// themeUl website login user
themeUl()
function themeUl () {
  const token = localStorage.getItem('token'),
  user = JSON.parse(localStorage.getItem('user')),
  userSign = document.querySelector('.user__sign'),
  userLogin = document.querySelector('.user__login'),
  userProfile = document.querySelector('.userProfile'), 
  userProfileIcon = document.querySelector('.user>i'),
  userName = document.querySelector('.username'),
  pageProfile = document.querySelector('.linkProfile'),
  addPost = document.querySelector('.btn_Add_post');

  
  

    

  
  if(token && user) {
    userSign.style.display='none'
    userLogin.style.display='flex'
    formSign.classList.remove('active')
  container.classList.remove('sign-up-mode')
  body.classList.remove('scroll')
  userName.innerHTML=user.username
  pageProfile.style.display='inline'
  pageProfile.href=`profile.html?userId=${user.id}`
  addPost.style.display='block'

  
 
  if(Object.values(user.profile_image).length === 0) {
    userProfile.style.display='none'
    userProfileIcon.style.display='block'
    
  }else {
    userProfile.style.display='block'
    userProfile.src=user.profile_image
    userProfileIcon.style.display='none'


    
  }
  
  
  
  


  
  
  
  }else {
    userSign.style.display='flex'
    userLogin.style.display='none'
    pageProfile.style.display='none'
  addPost.style.display='none'

  }
  
} 

function logOutUser () {
  const logOut = document.querySelector('.logout')
  logOut.addEventListener('click',()=> {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('login')
    
    
    toastr('success','user logout successfully')
    window.location='index.html'
    themeUl()
    enableScroll()
    
  })
}

// logout user
logOutUser()
themeUl()

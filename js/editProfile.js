const closeprofile = document.querySelector('.closeprofile'),
profileEdit = document.querySelector('.profileEdit'),
userName = document.getElementById('userNameEdit'),
name = document.getElementById('nameEdit'),
email = document.getElementById('emailEdit'),
image = document.getElementById('imageProfile'),
btnEditProfile = document.getElementById('editProfile')


closeprofile.addEventListener('click', ()=> {
profileEdit.style.display='none'
userName.value=''
name.value=''
email.value=''
})

function updateProfile (info) {
  let user = info
  
  userName.value = user.username
  name.value=user.name
  email.value=user.email
  
   let formData = new FormData();
    
   formData.append('username' , userName.value)
   formData.append('name' , name.value)
   formData.append('email' , email.value)
   formData.append('profile_image' , image.files[0])
   formData.append('_method','put')
   
   
   
   
  }
  
  
  btnEditProfile.addEventListener('click',(e)=> {
    e.preventDefault()   
    updateProfileApi('Update profile successfully')
})


function updateProfileApi (message) {
  let formData = new FormData();
  formData.append('username' , userName.value)
  formData.append('name' , name.value)
  formData.append('email' , email.value)
  formData.append('profile_image' , image.files[0])
  formData.append('_method','put')
  let token = localStorage.getItem('token')
  let url = `${baseURl}updatePorfile`
  axios.post(url,formData,{
    headers : {
      'authorization':`Bearer ${token}`,

    }
}).then((response)=> {
  console.log(response.data);
  
}).catch((error)=> {
  toastr('error',error.response.data.message)
  
})
}
userName.addEventListener('input', checkInput);
name.addEventListener('input', checkInput);
email.addEventListener('input', checkInput);
// imagePostinput.addEventListener('input', checkInput);
btnEditProfile.addEventListener('touchstart', checkInput);
function checkInput() {
  if (userName.value.trim() === ''  & name.value.trim() === '' & email.value.trim() === '') {
    btnEditProfile.classList.add('disabled');
  } else {
    btnEditProfile.classList.remove('disabled');
      
  }
}


const 
btnActivePost = document.querySelector('.btn_Add_post'),
closePost  = document.querySelector('.closepost'),
btnCloseDelete  = document.querySelector('.btnClose'),
btnDeletePost  = document.querySelector('.btn-delete'),
formDelete  = document.querySelector('.form_delete'),
formPost = document.querySelector('.form_post'), 
titlePostinput = document.getElementById('titlePost'), 
bodyPostinput = document.getElementById('bodyPost'), 
tagPostinput = document.getElementById('tagPost'), 
imagePostinput = document.getElementById('imagePost'), 
btnPost = document.getElementById('addpost'),
titleForm = document.querySelector('.title_form  h4');
// console.log(btnPost);



btnActivePost.addEventListener('click' , ()=> {
  formPost.style.display='block'
  noScroll()
})

closePost.addEventListener('click' , ()=> {
  formPost.style.display='none'
  bodyPostinput.value=''
  titlePostinput.value=''
  imagePostinput.value=''
  titleForm.innerHTML='Add Post'
  btnPost.textContent = 'Add Post'
  btnPost.setAttribute('data-type','add')
  btnPost.setAttribute('post-id','')
  enableScroll()
  
  
})
btnPost.addEventListener('click' , (e)=> {
  e.preventDefault()
  let btnType  = btnPost.getAttribute('data-type');
  
  pos(btnType)
  
     
  
})

function updatePost (post) {
 
  formPost.style.display='block'
  titlePostinput.value = post.title
  bodyPostinput.value = post.body
  titleForm.innerHTML='Edit Post'
  btnPost.textContent = 'Edit Post'
  btnPost.setAttribute('data-type','edit')
  btnPost.setAttribute('post-id',post.id)
  noScroll()

//   const myFile = new File(['image content'], `${post.image}`, {
//     type: `image/${extractedText}`,
//   });

//   const dataTransfer = new DataTransfer();
// dataTransfer.items.add(myFile);


//   imagePostinput.files =  dataTransfer.files;
}

function pos (typerequest) {
  let formData = new FormData();
  formData.append('title', titlePostinput.value);
  formData.append('body', bodyPostinput.value);
  // formData.append('tags', tagPostinput.value);
  formData.append('image', imagePostinput.files[0]);
  if(typerequest == 'add') {
    let url = `${baseURl}posts`
  apiPost(formData,url,'created Post successfully')

  
  }
  else if (typerequest == 'edit') {
    formData.append('_method','put')
    let postId = btnPost.getAttribute('post-id')
    let url = `${baseURl}posts/${postId}`
    apiPost(formData,url,'Updata Post successfully')
  }
  else{
    window.location = `index.html`
  }
  
  
  
}



function apiPost (formData ,url ,message) {
  
  
  let token = localStorage.getItem('token')
  axios.post(url,formData,{
    headers : {
      'authorization':`Bearer ${token}`,

    }
  }).then((response)=> {
    formPost.style.display='none'
    btnPost.setAttribute('data-type','add')
    toastr('success',message)
    setTimeout(() => {
      window.location.reload()
    }, 800);
    getPosts()
  

  }).catch((error)=> {
  //  console.log(error);
   
    toastr('error',error.response.data.message)
  })



}



// Delete post

btnCloseDelete.addEventListener('click' , (e)=> {
  e.preventDefault()
  formDelete.style.display='none'
  enableScroll()
})

function removePost (post) {
formDelete.style.display='block'
btnDeletePost.setAttribute('post-id',post)
noScroll()
}

btnDeletePost.addEventListener('click' , ()=> {
  let postId = btnDeletePost.getAttribute('post-id')
  deletePost(postId,'Delete post successfully')
  formDelete.style.display='none'
})

function deletePost(id,message) {
  
  let token = localStorage.getItem('token')
  let url = `${baseURl}posts/${id}`
  axios.delete(url,{
    headers : {
      'authorization':`Bearer ${token}`,

    }
  }).then((response)=> {
    toastr('success',message)
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  formPost.style.display='none'
  btnPost.setAttribute('data-type','add')

  }).catch((error)=> {
  //  console.log(error);
   
    // toastr('error',error.data.message)
  })
  
}



titlePostinput.addEventListener('input', checkInput);
bodyPostinput.addEventListener('input', checkInput);
// imagePostinput.addEventListener('input', checkInput);
btnPost.addEventListener('touchstart', checkInput);
function checkInput() {
  if (bodyPostinput.value.trim() === ''  & titlePostinput.value.trim() === '') {
      btnPost.classList.add('disabled');
  } else {
      btnPost.classList.remove('disabled');
      
  }
}


const urlparams = new URLSearchParams(window.location.search)
const userId = urlparams.get("userId")


let 
dataUserContainer  = document.getElementById('dataUser') ;
// imageUser = document.querySelector('.image_user img')
// userEmail = document.getElementById('userEmail'),
// userName = document.getElementById('userName'),
// user_Name = document.getElementById('user_Name'),
// userPosts = document.getElementById('userPosts'),
// userComments = document.getElementById('userComments')





getInfoUser(userId)
function getInfoUser (id) {
  
  getDataUser(id)
}


function getDataUser (id) {
  let url = `${baseURl}users/${id}` 
  document.querySelector('.loader').style.display='block'
  document.querySelector('.profile').style.display='none'
  axios.get(`${url}`)
  .then((response) => { 
    
    
    document.querySelector('.loader').style.display='none'
    document.querySelector('.profile').style.display='flex'
    
    let info = response.data.data
    let content = `
     <div class="left">
          <div class="image_user">
            <img src="${Object.values(info.profile_image).length === 0  ? 'assets/image/user.jpg' : info.profile_image}" alt="" >
          </div>
          <div class="info_user">
            <h4 id="userEmail">${info.email === null ? "" : info.email}</h4>
            <h5 id="userName">${info.username === null ? "" : info.username}</h5>
            <h6 id="user_Name">${info.name === null ? "" : info.name}</h6>
            
            <div class=''>
          <button class='btn btn-edit-profile ' onclick='editProfile(${decodeURIComponent(JSON.stringify(info))})'>
          <i class="fa-regular fa-pen-to-square"></i>
          Edit Profile</button>
          </div>

          </div>
        </div>
        <div class="right">
        
          <div class="">
            <div class="">
              <h1 id="userPosts">${info.posts_count}</h1><span >Posts</span>
            </div>
            <div class="">
              <h1 id="userComments">${info.comments_count}</h1><span >Comments </span>
            </div>
          </div>
          
        </div>
    `

   getPostsUser(id)

    document.querySelector('.profile').innerHTML = content
    document.querySelector('.title_user').innerHTML = `<h4>Posts ${info.name}</h4>`
      
  }).catch ((error)=> {
    document.querySelector('.loader').style.display='block'
    document.querySelector('.profile').style.display='none'
    
  })
}

function getPostsUser (id) {
  let url = `${baseURl}users/${id}/posts` 
  axios.get(`${url}`)
  .then((response)=> {
    
    let postsUser = response.data.data
    const cards = document.querySelector('.cards');
    
    if(Object.values(postsUser).length != 0 ) {

      for(post of postsUser) {
        let user = post.author
          let tag = post.tags
    let userId = JSON.parse(localStorage.getItem('user'))

          let  content = `
          <div class="card" >

         
     <div class="header__card">
          <div onclick='getProfile(${user.id})' >
            <div class="img__user">
              <img src="${Object.values(user.profile_image).length === 0 ? 'assets/image/user.jpg' : user.profile_image  }" alt="">
            </div>
              <p>${user.name}</p>
          </div>
          ${
            userId === null ? '' : 
            user.id === userId.id ? 
            
            ` <div class="settingsPost">
              <i class="fa-solid fa-ellipsis-vertical"></i>
              <div>
                <div class="edit" onclick='editPost(${decodeURIComponent(JSON.stringify(post))})' >
                  <i class="fa-regular fa-pen-to-square"></i>
                  <span >Edit</span>
                </div>
                <div class="delete" onclick='deletePostId(${decodeURIComponent(JSON.stringify(post))})'>
                  <i class="fa-regular fa-trash-can"></i>
                   <span >Delete</span>
                </div>
              </div>
            </div>
            `
            
            : ''
            
            
          }
           
          </div>

          <div class="body__card" onclick='getpost(${post.id})' >
            <div class="image__card" style="background-image: url(${post.image}); ${Object.values(post.image).length === 0 ? 'height: 0px;' : 'height: 400px;'} ">
            </div>
           <div class="description__card">
            <p><span>${post.created_at}</span> </p>
            <p>${post.title}</p>
            <p>${post.body}</p>
           </div>
           <div class="footer__card">
            <p><i class="fa-solid fa-pen"></i> ${post.comments_count} Comments</p>
            <ul class='listTags'>
           ${
            Object.values(tag).length === 0 ? 
            ''
            :
            tag.map(tag=> 
              `<li><a href="#">${tag.name}</a></li>`
            ) 
           }
            </ul>
           </div>
          </div>
        </div>
          `
          
          cards.innerHTML +=  content
          
      }
    }else {

      cards.innerHTML =`<h4 class='notPosts'>You have no posts</h4>`
    }


    
    
    
  }).catch((error)=> {
    console.log(error);
    
  })
}
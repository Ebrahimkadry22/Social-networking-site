

// posts

let page = 1;
let lastPage = 1
function handleInfiniteScroll () {
  const endPage  = window.innerHeight + window.scrollY   >= document.body.offsetHeight;
  if(endPage == true && page < lastPage ) {
    page = page + 1 

    getPosts(false , page)
  }
}
// infinte scrolling  down
window.addEventListener("scroll", handleInfiniteScroll);



getPosts()


function getPosts (reload = true , page = 1 ) {
  loader(true)
  axios.get(`${baseURl}posts?limit=10&page=${page}`)
    .then(function (response) {
    //  console.log(response);
      loader(false)
      const cards = document.querySelector('.cards');
      const posts = response.data.data ;
      lastPage = response.data.meta.last_page;
      
      if(reload) {
        cards.innerHTML=''
      }
      



      for(let post of posts) {
        let user = post.author
        let tag = post.tags
        let userId = JSON.parse(localStorage.getItem('user'))
        
       
        let content = `
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
               <div class="edit" onclick='editPost(${decodeURIComponent(JSON.stringify(post))})'>
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
            <p>${post.title === null ? '' : post.title}</p>
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
        cards.innerHTML += content 
      }
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      if(error.code == "ERR_NETWORK") {
        document.querySelector('.nav').style.display='none'
        document.querySelector('.theme').style.display='none'
        document.querySelector('.loader').style.display='none'
        document.querySelector('.disconnected').style.display='flex'
        console.log(error.code);
      }
    })

}




function getProfile (id) {
  window.location = `profile.html?userId=${id}`
}

window.onload = function() {
  if(localStorage.getItem('CommentAdded') == 'true') {
    window.location.reload();
    localStorage.removeItem('CommentAdded')
  }
}
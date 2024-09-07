const urlparams = new URLSearchParams(window.location.search)
const id = urlparams.get("postId")


const postElemant = document.querySelector('.post')
const token = localStorage.getItem('token')
const userLogin = JSON.parse(localStorage.getItem('user'))
let userComment = ''
userLogin ? userComment = userLogin.name : ''










function getpost(id) {
  axios.get(`${baseURl}posts/${id}`)
    .then((response) => {
      let post = response.data.data
      let commentsPost = post.comments
      let user = post.author
      let tag = post.tags
      let userId = JSON.parse(localStorage.getItem('user'))




      const cardpost = `
      <div class="cards" ${commentsPost.length ? "" : "style='height: calc(100vh - 2vh);'"}>
          <div class="header__card">
          <div onclick='getProfile(${user.id})' >
            <div class="img__user">
              <img src="${Object.values(user.profile_image).length === 0 ? 'assets/image/user.jpg' : user.profile_image}" alt="">
            </div>
              <div>
              <p>${user.name}</p>
              <p class='timepost'> <span>${post.created_at}</span> </p>
              </div>

          </div>
          ${userId === null ? '' :

          user.id === userId.id ?

            ` <div class="settingsPost">
             <i class="fa-solid fa-ellipsis"></i>
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
        

          <div class="description__card">
            <p>${post.title === null ? '' : post.title}</p>
            <p>${post.body}</p>
           </div>
          
          <div class="body__card"  >
            <div class="image__card" style="background-image: url(${post.image}); ${Object.values(post.image).length === 0 ? 'height: 0px;' : 'height: 400px;' + 'background-size: contain;'} ">
            </div>
           
           <div class="footer__card">
            <p>${post.comments_count} <i class="fa-regular fa-comment"></i></p>
            <ul class='listTags'>
           ${Object.values(tag).length === 0 ?
          ''
          :
          tag.map(tag =>
            `<li><a href="#">${tag.name}</a></li>`
          ).join('')
        }
            </ul>
           </div>
          </div>
          <div class="form_comment"  >
          <input type="text" class="input_comment" id="commentInput" placeholder='comment as ${userComment}'>
          <button class="btn btn_send disabled" id="sendComment" data-id=${post.id}><i class="fa-regular fa-paper-plane"></i></button>
        </div>
           <div class="comments" ${commentsPost.length ? "style='padding:.6rem 0;'" : ''} >
          ${commentsPost.length ?

          commentsPost.map(comment =>
            `
              <div class="comment"  >
            <div class="header_comment">
              <div class="image_user">
                <img src="${Object.values(comment.author.profile_image).length === 0 ? 'assets/image/user.jpg' : comment.author.profile_image}" alt="">
              </div>
              <p>${comment.author.username}</p>
            </div>
            <div class="body_comment">
              <p>${comment.body}</p>
            </div>
          </div>
              `
          ).join('')


          :

          `
            <p class='notComment'>Not comments</p>
            `
        }
          </div>

            
              
         
        </div>
        </div>
    `


      if (post) {
        postElemant.innerHTML = cardpost

      } else {
        postElemant.innerHTML = ``
        loader(true)


      }
      const commentInput = document.getElementById('commentInput')
      const sendComment = document.getElementById("sendComment")


      commentInput.addEventListener('input', checkInput);
      sendComment.addEventListener('touchstart', checkInput);
      sendComment.addEventListener('click', () => {
        const bodyComment = commentInput.value;

        let params = {
          'body': bodyComment
        }

        let token = localStorage.getItem("token")
        let url = `${baseURl}posts/${id}/comments`

        sendDataApi(url, params, token)
        localStorage.setItem('CommentAdded', 'true')




      })
      const comment = document.querySelector('.form_comment')

      if (token === null || user === null) {
        comment.style.display = 'none'

      }



    }).catch((error) => {
      window.location = 'index.html'

    })


}

getpost(id)

function checkInput() {
  if (commentInput.value.trim() === '') {
    sendComment.classList.add('disabled');
  } else {
    sendComment.classList.remove('disabled');

  }
}

function sendDataApi(url, params, token) {

  axios.post(url, params, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then((response) => {
    toastr('success', 'The Comment has been created successfully')
    getpost(id)
  }).catch((error) => {

    toastr('error', error.response.data.message)
  })

}




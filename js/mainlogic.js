window.addEventListener ('scroll' , function(){
  const nav = document.querySelector('.nav');
  if(window.scrollY > 0 ) {
    nav.classList.add('fixed')
    // console.log('hello');
  }else {
    nav.classList.remove('fixed')
  }
  
})



// // navbar
document.querySelector('.bar .open').addEventListener('click',()=> {
  document.querySelector('.lists').classList.toggle('active')
  document.querySelector('.bar .open').style.display='none'
  document.querySelector('.bar .close').style.display='block'
  document.querySelector('.bar .open').style.animation= 'rotatere .5s ease';
  
})
document.querySelector('.bar .close').addEventListener('click' ,()=> {
  document.querySelector('.lists').classList.toggle('active')
  document.querySelector('.bar .open').style.display='block'
  document.querySelector('.bar .close').style.display='none'

})


document.addEventListener('DOMContentLoaded', () => {
  const toggleModeBg = document.querySelector('.theme .icon');
  const toggleModeMoon = document.querySelector('.theme .icon .moon');
  const toggleModeSun = document.querySelector('.theme .icon .sun');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Set the initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Update the display based on the current theme
  if (currentTheme === 'dark') {
      toggleModeSun.style.display = 'block';
      toggleModeMoon.style.display = 'none';
      toggleModeBg.style.backgroundColor = '#ffffff';
  } else {
      toggleModeSun.style.display = 'none';
      toggleModeMoon.style.display = 'block';
      toggleModeBg.style.backgroundColor = '#000000';
  }

  // Add event listener to the sun icon for toggling theme
  toggleModeSun.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
          theme = 'light';
          toggleModeSun.style.display = 'none';
          toggleModeMoon.style.display = 'block';
          toggleModeBg.style.backgroundColor = '#000000';
      } else {
          theme = 'dark';
          toggleModeSun.style.display = 'block';
          toggleModeMoon.style.display = 'none';
          toggleModeBg.style.backgroundColor = '#ffffff';
      }
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  });

  // Add event listener to the moon icon for toggling theme
  toggleModeMoon.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
          theme = 'light';
          toggleModeSun.style.display = 'none';
          toggleModeMoon.style.display = 'block';
          toggleModeBg.style.backgroundColor = '#000000';
      } else {
          theme = 'dark';
          toggleModeSun.style.display = 'block';
          toggleModeMoon.style.display = 'none';
          toggleModeBg.style.backgroundColor = '#ffffff';
      }
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  });
});

function loader (loader = true) {
  if(loader) {
    document.querySelector('.loader').style.display='none'
  }
  document.querySelector('.loader').style.display='block'
}

// function tostr
function toastr(type,message) {
  new Noty({
    text: `${message}`,
    type: `${type}`,
    layout: 'bottomRight',
    timeout: 3000
}).show();
}
// function send postid
function getpost (id) {
  window.location = `postDetails.html?postId=${id}`
  
}
// function send id user
function getProfile (id) {
  window.location = `profile.html?userId=${id}`
}
// function Edit profile
function editProfile (info) {

  let activeProfile = document.querySelector('.btn-edit-profile'),
  profileEdit = document.querySelector('.profileEdit'),
  btnEditProfile = document.getElementById('editProfile')
  activeProfile.addEventListener('click',()=> {
    profileEdit.style.display='block'
    updateProfile(info)
  })
  
}
// edit post

function editPost (post) {
updatePost(post)
}
// delete post

function deletePostId (post) {
removePost(post.id)


}

function preventScroll(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

function noScroll () {
  document.body.addEventListener('wheel', preventScroll, { passive: false });
}

function enableScroll() {
  document.body.removeEventListener('wheel', preventScroll);
}

const baseURl = 'https://tarmeezacademy.com/api/v1/'
class NavbarCompoment extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
    <nav  class="nav">
    <div class="container">
      <header class="header">
        <div class="logo">
          <a href="index.html">
            <img class="logo-icon" src="assets/image/logo-icon.png" alt="">
          </a>
        </div>
        <div class="lists ">
          <ul>
            <li><a href="index.html" class=" ${this.getAttribute('active') === '/' ? 'active' : null}">Home</a></li>
            <li ><a class='linkProfile ${this.getAttribute('active') === '/profile.html' ? 'active' : null}' href="/profile.html">Profile</a></li>
          </ul>
        </div>
        <div class="left">
        
          <div class="user__sign">
            <div class="signin">
              <button class="btn btn__signin" id="btnSignin">Sign in</button>
            </div>
            <div class="signup">
              <button class="btn btn__signup" id="btnSignup">Sign up</button>
            </div>
          </div>

          <div class="user__login">
            <div class="user">
              <i class="fa-solid fa-user"></i>
              <img class="userProfile" src="" alt="">
              <span class="username">ibrahim</span>
            </div>
  
            <div class="logout">
              <button class="btn btnRed ">Logout</button>
            </div>
          </div>


          <div class="bar">
            <div class="open">
              <i class="fa-solid fa-bars"></i>
            </div>
            <div class="close">
              <i class="fa-solid fa-close"></i>
            </div>
          </div>

        </div>
      </header>
    </div>
  </nav>
    
    `
  }
}

customElements.define('navbar-compoment',NavbarCompoment);
class ThemeDarkCompoment extends HTMLElement {
  constructor () {
    super () 
    this.innerHTML = 
    `
     <div class="theme" id="theme">
    <div class="icon">
      <div class="moon">
        <i class="fa-solid fa-moon"></i>
      </div>
      <div class="sun">
        <i class="fa-solid fa-sun"></i>
      </div>
    </div>
   </div>

    `
  }
}

customElements.define('themedark-compoment',ThemeDarkCompoment);
class DisconnectedCompoment extends HTMLElement {
  constructor() {
    super()
    this.innerHTML =
      `
 <div class="disconnected container">
  <div>
    <img src="assets/image/disconnected.png" style="width: 200px;" alt="">
    <h1>You're not connected</h1>
    <p>And the web just isn't the same without you. Let's get you back online! You could try:</p>
    <ul>
      <li>Checking your network cables, modem, and routers</li>
      <li>Reconnecting to your wireless network</li>
    </ul>
  </div>
 </div>

    `
  }
}

customElements.define('disconnected-compoment', DisconnectedCompoment);
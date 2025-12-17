class AuthPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        * { box-sizing: border-box; }
        body, html { font-family: Arial, sans-serif; }
        .container { max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; }
        h2 { text-align: center; }
        form { display: flex; flex-direction: column; }
        label { margin: 5px 0 2px; }
        input, select, button { padding: 8px; margin-bottom: 10px; font-size: 14px; }
        button { cursor: pointer; background-color: #4CAF50; color: white; border: none; }
        button:hover { background-color: #45a049; }
        .toggle { text-align: center; margin: 10px 0; color: blue; cursor: pointer; text-decoration: underline; }
      </style>
      <div class="container">
        <h2 id="formTitle">Нэвтрэх / Бүртгүүлэх</h2>

        <form id="signupForm" style="display:none;">
          <label>Нэр</label><input type="text" name="name" required>
          <label>Төрөл</label>
          <select name="type" required>
            <option value="">Сонгоно уу</option>
            <option value="Хувь хүн">Хувь хүн</option>
            <option value="Байгууллага">Байгууллага</option>
          </select>
          <label>Нас</label><input type="number" name="age">
          <label>Хүйс</label>
          <select name="gender">
            <option value="">Сонгоно уу</option>
            <option value="Эрэгтэй">Эрэгтэй</option>
            <option value="Эмэгтэй">Эмэгтэй</option>
          </select>
          <label>Утас</label><input type="number" name="phone" required>
          <label>Нууц үг</label><input type="password" name="password" required>
          <label>Өндөр (см)</label><input type="number" name="height">
          <label>Чадвар</label><input type="text" name="ability">
          <label>Туршлага</label><input type="text" name="experience">
          <label>Нэмэлт мэдээлэл</label><input type="text" name="addition">
          <label>Профайл зураг URL</label><input type="text" name="profileImg">
          <label>Банкны данс</label><input type="number" name="bankaccount" required>
          <button type="submit">Бүртгүүлэх</button>
        </form>

        <form id="loginForm">
          <label>Email эсвэл Утас</label><input type="text" name="emailOrPhone" required>
          <label>Нууц үг</label><input type="password" name="password" required>
          <button type="submit">Нэвтрэх</button>
        </form>

        <div class="toggle" id="toggleForm">Бүртгэл рүү шилжих</div>
      </div>
    `;
  }

  connectedCallback() {
    const signupForm = this.shadowRoot.getElementById('signupForm');
    const loginForm = this.shadowRoot.getElementById('loginForm');
    const toggle = this.shadowRoot.getElementById('toggleForm');
    const title = this.shadowRoot.getElementById('formTitle');

    // Form toggle
    toggle.addEventListener('click', () => {
      if (signupForm.style.display === 'none') {
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
        title.textContent = 'Бүртгүүлэх';
        toggle.textContent = 'Нэвтрэх рүү шилжих';
      } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
        title.textContent = 'Нэвтрэх';
        toggle.textContent = 'Бүртгэл рүү шилжих';
      }
    });

    // Sign up submit
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(signupForm));
      ['age', 'phone', 'height', 'bankaccount'].forEach(key => {
        if (data[key]) data[key] = Number(data[key]);
      });

      try {
        const res = await fetch('/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.message || result.error);
        if (result.message) signupForm.reset();
      } catch (err) {
        alert('Алдаа гарлаа: ' + err.message);
      }
    });

    // Login submit
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { emailOrPhone, password } = Object.fromEntries(new FormData(loginForm));

      try {
        const res = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrPhone, password })
        });
        const result = await res.json();

        if (result.message) {
          // Амжилттай login → localStorage-д хадгалах
          localStorage.setItem('user', JSON.stringify(result.user));
          loginForm.reset();
          window.location.hash = '#home'; // home page руу шилжих
        } else {
          alert(result.error);
        }
      } catch (err) {
        alert('Алдаа гарлаа: ' + err.message);
      }
    });
  }
}

customElements.define('auth-page', AuthPage);

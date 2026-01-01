export class LoginPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
        /* Login card */
        .login-card {
        width: 360px;
        background-color: #fff;
        padding: 32px 24px;
        border-radius: 12px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        font-family: 'Arial', sans-serif;
        display: flex;
        flex-direction: column;
        gap: 16px;
        }

        .login-card h2 {
        text-align: center;
        margin-bottom: 16px;
        color: #111827;
        }

        .login-card input,
        .login-card select {
        width: 100%;
        padding: 12px 10px;
        font-size: 14px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.2s;
        }

        .login-card input:focus,
        .login-card select:focus {
        border-color: #2563eb;
        }

        .login-card button {
        width: 100%;
        padding: 12px;
        background-color: #2563eb;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
        }

        .login-card button:hover {
        background-color: #1d4ed8;
        }

        .login-card .toggle {
        text-align: center;
        font-size: 14px;
        color: #2563eb;
        cursor: pointer;
        margin-top: 8px;
        user-select: none;
        }

        .hidden { display: none; }
    </style>

    <div class="login-card">
        <h2 id="title">Нэвтрэх</h2>
        <form id="authForm">
        <div id="registerFields" class="hidden">
            <input type="text" id="name" placeholder="Нэр" />
            <select id="type">
            <option value="Хувь хүн">Хувь хүн</option>
            <option value="Байгууллага">Байгууллага</option>
            </select>
        </div>
        <input type="text" id="phone" placeholder="Утасны дугаар" required />
        <input type="password" id="password" placeholder="Нууц үг" required />
        <button type="submit">Нэвтрэх</button>
        </form>
        <div class="toggle" id="toggleBtn">Бүртгүүлэх</div>
    </div>
    `;

    const toggleBtn = this.querySelector('#toggleBtn');
    const title = this.querySelector('#title');
    const registerFields = this.querySelector('#registerFields');
    const form = this.querySelector('#authForm');
    const button = form.querySelector('button');
    let isLogin = true;

    // Toggle login/register
    toggleBtn.addEventListener('click', () => {
      isLogin = !isLogin;
      title.textContent = isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх';
      button.textContent = isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх';
      toggleBtn.textContent = isLogin ? 'Бүртгүүлэх' : 'Нэвтрэх';
      registerFields.classList.toggle('hidden');
    });

    // Submit event
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: this.querySelector('#name').value,
        type: this.querySelector('#type').value,
        phone: this.querySelector('#phone').value,
        password: this.querySelector('#password').value
      };

      try {
        if (isLogin) {
          const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: data.phone, password: data.password })
          });

          const result = await res.json();
          if (res.ok) {
            alert('Амжилттай нэвтэрлээ!');
            console.log('User info:', result);
          } else {
            alert('Нэвтрэхэд алдаа гарлаа: ' + result.message);
          }

        } else {
          const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          const result = await res.json();
          if (res.ok) {
            alert('Амжилттай бүртгүүллээ!');
            isLogin = true;
            title.textContent = 'Нэвтрэх';
            button.textContent = 'Нэвтрэх';
            toggleBtn.textContent = 'Бүртгүүлэх';
            registerFields.classList.add('hidden');
            form.reset();
          } else {
            alert('Бүртгүүлэхэд алдаа гарлаа: ' + result.message);
          }
        }
      } catch (err) {
        console.error(err);
        alert('Сервертэй холбогдож чадсангүй.');
      }
    });
  }
}

// Custom element define
customElements.define('login-page', LoginPage);
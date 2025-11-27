export class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
      .footer {
        background: linear-gradient(90deg, var(--color2), var(--color6) 90%);
        color: var(--color4);
        padding: 2rem 2rem;
      }

      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .footer-inner {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .footer-links {
        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          a {
            margin-top: 0.5rem;
            display: block;
            color: var(--color4);
            text-decoration: none;
          }
        }
      }

      .contact-item {
        display: flex;
        margin-top: 0.5rem;
        gap: 0.5rem;
        align-items: center;
      }

      .footer-bottom {
        margin-top: 0.5rem;
        text-align: center;
      }
      </style>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-links">
          <h4>Хурдан холбоос</h4>
          <ul>
            <li><a href="/dashboard">Хяналтын самбар</a></li>
            <li><a href="/timesheets">Цагийн хуудсууд</a></li>
            <li><a href="/help">Тусламж</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Холбоо барих</h4>
          <div class="contact-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="1.5"
                d="M12.735 20.191a15.2 15.2 0 0 1-.92-.447a19.012 19.012 0 0 1-4.1-3.12A18.002 18.002 0 0 1 3.88 11.42a11.259 11.259 0 0 1-1.022-3.325a5.925 5.925 0 0 1 .37-3.465c.289-.47.637-.9 1.035-1.279a1.801 1.801 0 0 1 1.278-.601c.505.076.962.34 1.278.742c.69.767 1.43 1.457 2.159 2.186c.287.246.466.595.498.972c-.012.317-.134.62-.345.857c-.242.307-.536.588-.817.882a1.535 1.535 0 0 0-.46 1.279a3.67 3.67 0 0 0 .881 1.457c.486.665.971 1.28 1.52 1.931a13.573 13.573 0 0 0 3.463 2.865a1.277 1.277 0 0 0 1.278.153a4.05 4.05 0 0 0 1.137-.946c.275-.335.669-.55 1.099-.601c.383.02.744.184 1.01.46c.344.294.638.64.958.959c.319.32.575.55.843.844c.321.283.624.586.907.908c.22.284.324.64.294.997a2.1 2.1 0 0 1-.703 1.087a4.78 4.78 0 0 1-3.756 1.458a10.673 10.673 0 0 1-4.05-1.049Z"
              />
            </svg>
            <span>Утас: +976 9999 0000</span>
          </div>

          <div class="contact-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <rect width="18.5" height="17" x="2.682" y="3.5" rx="4" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.729 7.59l7.205 4.13a3.956 3.956 0 0 0 3.975 0l7.225-4.13"
                />
              </g>
            </svg>
            <span>Имэйл: support@example.mn</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>Бүх эрх хуулиар хамгаалагдсан.</p>
      </div>
    </footer>
    `;
  }
}

customElements.define("footer-component", FooterComponent);

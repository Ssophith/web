export class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
      .header {
        height: 100%;
        background-color: var(--color4);
        color: var(--color6);
        box-shadow: 0rem 2px 7px var(--color5);
      }

      .flex-navbar {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 5rem;
          height: auto;
          margin-left: 0.5rem;
        }

        .button {
          display: flex;
          margin-right: 0.5rem;
          align-items: center;
          text-decoration: none;
          background-color: var(--color4);
          border: none;
          color: var(--color6);
          gap: 0.5rem;
        }

        .button:hover {
          color: var(--color1);
        }
      }

      .flex-navbarbottom {
        width: 60%;
        display: flex;
        justify-content: space-between;

        a {
          text-decoration: none;
          color: var(--color6);
          font-size: var(--fontsize2);

          div {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
        }

        a:hover {
          color: var(--color1);
        }
      }
      </style>

    <header class="header">
      <nav class="flex-navbar">
        <img src="../images/logo.png" />
        <div class="flex-navbarbottom">
          <a href="./zarHarah.html">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z"
                />
              </svg>
              <p>Зар</p>
            </div>
          </a>
          <a href="./miniiZar.html">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.192 19.385v-3h-3v-1h3v-3h1v3h3v1h-3v3h-1ZM3.423 20q-.69 0-1.153-.463q-.462-.462-.462-1.152V5.615q0-.69.462-1.153Q2.733 4 3.423 4h12.77q.69 0 1.152.463q.463.462.463 1.152V10h-1V7.385h-14v11q0 .269.173.442t.442.173h12.385v1H3.423ZM2.808 6.385h14v-.77q0-.269-.173-.442T16.192 5H3.423q-.27 0-.442.173t-.173.442v.77Zm0 0V5v1.385Z"
                />
              </svg>
              <p>Миний зар</p>
            </div>
          </a>
          <a href="./miniiAjil.html">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path
                    d="M2 14c0-2.809 0-4.213.674-5.222a4 4 0 0 1 1.104-1.104C4.787 7 6.19 7 9 7h6c2.809 0 4.213 0 5.222.674a4 4 0 0 1 1.104 1.104C22 9.787 22 11.19 22 14s0 4.213-.674 5.222a4 4 0 0 1-1.104 1.104C19.213 21 17.81 21 15 21H9c-2.809 0-4.213 0-5.222-.674a4 4 0 0 1-1.104-1.104C2 18.213 2 16.81 2 14m14-7c0-1.886 0-2.828-.586-3.414S13.886 3 12 3s-2.828 0-3.414.586S8 5.114 8 7"
                  />
                  <path
                    d="m6 11l.652.202a18.3 18.3 0 0 0 10.696 0L18 11m-6 1v2"
                  />
                </g>
              </svg>
              <p>Миний ажил</p>
            </div>
          </a>
          <a href="./profile.html">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"
                  />
                  <path
                    d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
                  />
                </g>
              </svg>
              <p>Би</p>
            </div>
          </a>
        </div>
        <div>
          <a href="./login.html" class="button">
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
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7M16 15.5l3.5-3.5L16 8.5m-6.5 3.496h10"
              />
            </svg>
            <p>Гарах</p>
          </a>
        </div>
      </nav>
    </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);

export class JobCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
      .main {
        grid-area: main;
        display: flex;
        gap: 1rem;
      }

      .grid-layout {
        display: grid;
        margin-top: 2rem;
        margin-bottom: 2rem;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
        justify-content: space-evenly;
        gap: 2rem;
        transition: grid-template-columns 0.3s ease;
      }

      .grid-layout.full-width {
        grid-template-columns: repeat(4, 1fr);
      }
      .card {
        width: 15vw;
        height: auto;
        padding: 2rem;
        background-color: var(--color4);
        /* border: var(--bordersize1) solid var(--color6); */
        border-radius: var(--border_radius1);
        box-shadow: 0rem 2px 7px var(--color5);

        h2 {
          font-size: var(--fontsize1);
          text-align: center;
        }

        .flex-nav {
          display: flex;
          gap: 1rem;
          font-size: var(--fontsize3);
        }
      }

      .info {
        margin: 0;
        height: auto;
        padding: 1rem;
        font-size: var(--fontsize2);
        background-color: var(--color2);
        border-radius: var(--border_radius1);
      }

      .details-btn {
        width: 100%;
        height: 2.5rem;
        background-color: var(--color4);
        border: none;
        color: var(--color1);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
      }

      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      @media (max-width: 720px) {
        .footer-inner {
          gap: 16px;
        }
        .footer-col {
          flex-basis: 100%;
        }
        .footer-bottom {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
      }

      @media (max-width: 900px) {
        .grid-layout {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 600px) {
        .grid-layout {
          grid-template-columns: 2fr;
        }
      }
    </style>
      <article class="card">
        <div class="flex-nav">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/>
                <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/>
              </g>
            </svg>
          </div>
          <div>
            <div class="flex">
              <p>${this.getAttribute(`name`) || ""}</p>
              <p>${this.getAttribute(`type`) || ""}</p>
            </div>
            <div>
              <p>Нийтэлсэн хугацаа: ${this.getAttribute(`date`) || ""}</p>
            </div>
          </div>
        </div>

        <div>
          <h2>${this.getAttribute(`title`) || ""}</h2>
        </div>

        <div class="info">
          <div>
            <div class="flex">
              <p>${this.getAttribute(`workDate`) || ""}</p>
              <p>${this.getAttribute(`workTime`) || ""}</p>
            </div>

            <div>
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 3a7 7 0 0 0-7 7c0 2.862 1.782 5.623 3.738 7.762A26.158 26.158 0 0 0 12 20.758a26.14 26.14 0 0 0 3.262-2.994C17.218 15.623 19 12.863 19 10a7 7 0 0 0-7-7Zm0 20.214l-.567-.39l-.003-.002l-.006-.005l-.02-.014l-.075-.053a25.34 25.34 0 0 1-1.214-.94a28.157 28.157 0 0 1-2.853-2.698C5.218 16.876 3 13.637 3 10a9 9 0 0 1 18 0c0 3.637-2.218 6.877-4.262 9.112a28.145 28.145 0 0 1-3.796 3.44a16.794 16.794 0 0 1-.345.251l-.021.014l-.006.005l-.002.001l-.568.39ZM12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z"/>
                </svg>
                <p>${this.getAttribute(`location`) || ""}</p>
              </div>
              <p>${this.getAttribute(`salary`) || ""}</p>
            </div>
          </div>
        </div>
          <button class="details-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path fill="currentColor" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"/>
            </svg>
          </button>
          </div>
      </article>
    `;
    const btn = this.querySelector(".details-btn");
    btn.addEventListener("click", () => {
      const jobId = this.getAttribute("jobId");

      this.dispatchEvent(
        new CustomEvent("show-job-detail", {
          detail: { jobId },
          bubbles: true,
        })
      );
    });
  }
}
customElements.define("job-card", JobCard);

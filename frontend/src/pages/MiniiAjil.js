import "../component/Header.js";
import "../component/Footer.js";

export class MiniiAjil extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <style>
        .container {
          display: grid;
          min-height: 100vh;
          font-family: var(--font1);
          background-color: var(--color3);
          margin: 0;
          padding: 0;

          grid-template-areas:
            "header"
            "main"
            "footer";

          grid-template-rows: 8vh 1fr 35vh;
        }

        header-component {
          grid-area: header;
        }

        .main {
          grid-area: main;
          padding: 1rem;
          gap: 1rem;
          position: relative;
        }

        footer-component {
          grid-area: footer;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          justify-items: center;
          justify-content: space-evenly;
          gap: 2rem;
        }

        .section-title {
          font-size: var(--fontsize1);
          color: var(--color6);
          margin: 2rem 0 1rem 0;
        }

        .card {
          width: 100%;
          max-width: 400px;
          height: auto;
          margin: 1rem;
          padding: 2rem;
          padding-right: 1rem;
          background-color: var(--color4);
          border-radius: var(--border_radius1);
          box-shadow: 0rem 2px 7px var(--color2);
          transition: all 0.2s ease;
          display: grid;
          grid-template-columns: 7fr 1fr;
          gap: 1rem;
          overflow: visible;
        }

        .card h2 {
          font-size: var(--fontsize1);
          text-align: center;
        }

        .flex-nav {
          display: flex;
          gap: 1rem;
          font-size: var(--fontsize4);
          width: 100%;
        }

        .flex-nav-title {
          display: flex;
          justify-content: space-between;
        }

        .info {
          margin: 0;
          height: auto;
          padding: 1rem;
          font-size: var(--fontsize2);
          background-color: var(--color2);
          border-radius: var(--border_radius1);
          color: var(--color4);
        }

        .info-date {
          display: flex;
          justify-content: space-between;
        }

        .card:hover {
          box-shadow: 0rem 4px 10px var(--color1);
          transform: scale(1.02);
        }

        .card-inactive {
          width: 100%;
          max-width: 400px;
          height: auto;
          margin: 1rem;
          padding: 2rem;
          background-color: var(--color4);
          border-radius: var(--border_radius1);
          box-shadow: 0rem 2px 7px var(--color6);
          transition: all 0.2s ease;
          display: grid;
          gap: 1rem;
          overflow: visible;
        }

        .card-inactive h2 {
          font-size: var(--fontsize1);
          text-align: center;
        }

        .info-inactive {
          margin: 0;
          height: auto;
          padding: 1rem;
          font-size: var(--fontsize2);
          background-color: var(--color3);
          border-radius: var(--border_radius1);
          color: var(--color6);
          border: 1px solid var(--color5);
        }

        .card-inactive:hover {
          box-shadow: 0rem 4px 10px var(--color1);
          transform: scale(1.02);
        }

        .empty-message {
          text-align: center;
          padding: 2rem;
          color: var(--color5);
          font-size: var(--fontsize2);
        }
      </style>

      <div class="container">
        <header-component></header-component>
        <main class="main">
          <div>
            <section>
              <h2 class="section-title">Баталгаажуулсан</h2>
              <div class="grid-layout" id="confirmed-jobs">
                <div class="empty-message">Ачааллаж байна...</div>
              </div>
            </section>
            <section>
              <h2 class="section-title">Бүртгүүлсэн</h2>
              <div class="grid-layout" id="registered-jobs">
                <div class="empty-message">Ачааллаж байна...</div>
              </div>
            </section>
          </div>
        </main>
        <footer-component></footer-component>
      </div>
    `;

    await this.loadJobs();
  }

  async loadJobs() {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = currentUser.id || currentUser._id;

    if (!userId) {
      this.querySelector("#confirmed-jobs").innerHTML = `
        <div class="empty-message">Нэвтэрнэ үү. Ажлуудыг харахын тулд нэвтэрсэн байх шаардлагатай.</div>
      `;
      this.querySelector("#registered-jobs").innerHTML = `
        <div class="empty-message">Нэвтэрнэ үү.</div>
      `;
      return;
    }

    try {
      // Бүх ажлын байрны мэдээлэл авах
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Алдаа гарлаа");
      
      const allJobs = await res.json();
      
      // Энэ хэрэглэгч бүртгүүлсэн ажлуудыг олох
      // Энэ нь хэрэглэгч job-д бүртгүүлсэн эсэхийг шалгах хэрэгтэй
      // Одоогоор бүх ажлуудыг харуулна (дараа нь бүртгэл хийх функц нэмэх боломжтой)
      const userJobs = allJobs; // Одоогоор бүх ажлууд

      // Баталгаажуулсан ажлууд (hiredWorkers > 0 эсвэл тодорхой статус)
      const confirmedJobs = userJobs.filter(job => 
        job.hiredWorkers > 0 || job.status === "confirmed"
      );

      // Бүртгүүлсэн ажлууд (hiredWorkers === 0)
      const registeredJobs = userJobs.filter(job => 
        job.hiredWorkers === 0 && job.status !== "confirmed"
      );

      this.renderJobs(confirmedJobs, "confirmed-jobs");
      this.renderJobs(registeredJobs, "registered-jobs");
    } catch (error) {
      console.error("Ажлуудыг авахад алдаа:", error);
      this.querySelector("#confirmed-jobs").innerHTML = `
        <div class="empty-message">Алдаа гарлаа: ${error.message}</div>
      `;
      this.querySelector("#registered-jobs").innerHTML = `
        <div class="empty-message">Алдаа гарлаа</div>
      `;
    }
  }

  renderJobs(jobs, containerId) {
    const container = this.querySelector(`#${containerId}`);
    
    if (jobs.length === 0) {
      container.innerHTML = `
        <div class="empty-message">Ажил байхгүй байна</div>
      `;
      return;
    }

    const isInactive = containerId === "registered-jobs";
    const cardClass = isInactive ? "card-inactive" : "card";
    const infoClass = isInactive ? "info-inactive" : "info";

    container.innerHTML = jobs.map(job => `
      <article class="${cardClass}">
        <div>
          <div class="flex-nav">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/>
                <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/>
              </g>
            </svg>
            <div>
              <div class="flex-nav-title">
                <p>${job.userId?.name || "Тодорхойгүй"}</p>
                <p>${job.userId?.type || ""}</p>
              </div>
              <div>
                <p>Нийтэлсэн: ${new Date(job.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div>
            <h2>${job.title || ""}</h2>
          </div>
          <div class="${infoClass}">
            <div class="info-date">
              <p>${job.workDate || ""}</p>
              <p>${job.workTime || ""}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12 3a7 7 0 0 0-7 7c0 2.862 1.782 5.623 3.738 7.762A26.158 26.158 0 0 0 12 20.758a26.14 26.14 0 0 0 3.262-2.994C17.218 15.623 19 12.863 19 10a7 7 0 0 0-7-7Zm0 20.214l-.567-.39l-.003-.002l-.006-.005l-.02-.014l-.075-.053a25.34 25.34 0 0 1-1.214-.94a28.157 28.157 0 0 1-2.853-2.698C5.218 16.876 3 13.637 3 10a9 9 0 0 1 18 0c0 3.637-2.218 6.877-4.262 9.112a28.145 28.145 0 0 1-3.796 3.44a16.794 16.794 0 0 1-.345.251l-.021.014l-.006.005l-.002.001l-.568.39ZM12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z"/>
              </svg>
              <p>${job.location || ""}</p>
              <p>${job.salary || ""}</p>
            </div>
          </div>
        </div>
      </article>
    `).join("");
  }
}

customElements.define("minii-ajil", MiniiAjil);

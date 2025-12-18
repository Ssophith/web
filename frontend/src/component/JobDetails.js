export class JobDetail extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
      .container {
        display: grid;
        font-family: var(--font1);
        padding: 0;
        margin: 0;
        justify-content: center;
        background-color: var(--color3);
        grid-template-areas:
          "header header"
          "maindialog sidebar1"
          "maindialog sidebar2";

        gap: 1rem;
      }

      .header {
        padding: 0rem 1rem;
        grid-area: header;
        color: var(--color6);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .flex-profl {
          display: flex;
          gap: 1rem;
          font-size: var(--fontsize3);
        }

        a {
          text-decoration: none;
          background-color: var(--color4);
          border: none;
          color: var(--color6);
        }

        a:hover {
          color: var(--color1);
        }
      }

      .maindialog {
        grid-area: maindialog;
        padding: 0 0 0 1rem;
      }

      .sidebar1 {
        grid-area: sidebar1;
        margin: 0 0 0 1rem;
        padding: 0 1rem 0 0;
      }

      .sidebar2 {
        grid-area: sidebar2;
        margin: 0 0 0 1rem;
        padding: 0 1rem 0 0;
      }

      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      h1 {
        font-size: var(--fontsize2);
      }

      h2 {
        font-size: var(--fontsize1);;
        text-align: center;
      }

      .maindiv {
        height: auto;
        padding: 1rem;
        background-color: var(--color4);
        border-radius: var(--border_radius1);
        box-shadow: 0rem 2px 7px var(--color5);
      }

      .sectiondiv {
        height: auto;
        padding: 1rem;
        background-color: var(--color4);
        border-radius: var(--border_radius1);
        box-shadow: 0rem 2px 7px var(--color5);
      }

      #closeDialog {
        cursor: pointer;
        transition: transform 0.2s;
      }
    </style>
      <div class="container">
        <header class="header">
          <div class="flex-profl">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
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
          <div id="closeDialog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z"
              />
            </svg>
          </div>
        </header>
        <section class="maindialog">
          <h1>Үндсэн мэдээлэл</h1>
          <div class="maindiv">
            <h2>${this.getAttribute("title") || ""}</h2>
            <p>Цалин: ${this.getAttribute("salary") || ""}</p>
            <p>Ажлын төрөл: ${this.getAttribute("jobType") || ""}</p>
            <p>Байршил: ${this.getAttribute("location") || ""}</p>
            <p>Өдөр: ${this.getAttribute("workdate") || ""}</p>
            <p>Цаг: ${this.getAttribute("worktime") || ""}</p>
            <p>Ажилд авах хүний тоо: ${
              this.getAttribute("requiredworker") || ""
            }</p>
            <p>Ажилд авсан хүний тоо: ${
              this.getAttribute("gettingworker") || ""
            }</p>
          </div>
        </section>
        <section class="sidebar1">
          <h1>Шаардлага</h1>
          <div class="sectiondiv">
            <p>Нас: ${this.getAttribute("age") || ""}</p>
            <p>Хүйс: ${this.getAttribute("gender") || ""}</p>
            <p>Туршлага: ${this.getAttribute("exp") || ""}</p>
            <p>Хувцас: ${this.getAttribute("clothes") || ""}</p>
            <p>Бусад шаардлага: ${this.getAttribute("otherRequirements") || ""}</p>
          </div>
        </section>
        <section class="sidebar2">
          <h1>Нэмэлт мэдээлэл</h1>
          <div class="sectiondiv">
            <p>Хоол: ${this.getAttribute("food") || ""}</p>
            <p>Унаа: ${this.getAttribute("transport") || ""}</p>
            <p>Нэмэлт тайлбар: ${this.getAttribute("note") || ""}</p>
          </div>
        </section>
        </div>
        `;

    const closeBtn = this.querySelector("#closeDialog");
    closeBtn?.addEventListener("click", () => {
      location.hash = "home";
      const dialog = this.closest("dialog");
      if (dialog) dialog.close();
    });
  }
}

customElements.define("job-detail", JobDetail);

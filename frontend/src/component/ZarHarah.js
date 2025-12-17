import "../component/Header.js";
import "../component/SearchBar.js";
import "../component/JobCategory.js";
import "../component/JobList.js";
import "../component/JobdetailList.js";
import "../component/Footer.js";

class ZarHarah extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
      .container {
        display: grid;
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
      }

      footer-component {
        grid-area: footer;
      }

      .left-panel {
        justify-content: space-between;
        width: 250px;
        height: 100vh;
        overflow-y: auto;
        position: sticky;
        top: 0;
        background: var(--color4);
        box-sizing: border-box;
        transition: transform 0.3s ease;
      }

      .left-panel.hidden {
        display: none;
      }

      .right-panel {
        flex: 1;
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
        <div class="container">
                <main class="main">
                    <aside class="left-panel">
                        <job-category></job-category>
                    </aside>
                    <sidebar class="right-panel">
                        <search-bar></search-bar>
                        <job-list></job-list>
                    </sidebar>
                </main>
        </div>
        <job-detail-list></job-detail-list>
    `;
    const sidebar = document.querySelector(".left-panel");
    const closeBtn = document.querySelector(".closeBtn");
    const showBtn = document.querySelector(".show-sidebar-btn");
    const grid = document.querySelector(".grid-layout");
    const jobList = document.querySelector("job-list");
    const categoryEl = document.querySelector("job-category");
    const jobListEl = document.querySelector("job-list");

    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("hidden");
      grid.classList.add("full-width"); // 4 column
      showBtn.style.display = "block"; // show button appears
    });

    showBtn.addEventListener("click", () => {
      sidebar.classList.remove("hidden");
      grid.classList.remove("full-width");
      showBtn.style.display = "none";
    });

    document.querySelector("search-bar").addEventListener("search", (e) => {
      jobList.filter(e.detail);
    });

    document
      .querySelector("search-bar")
      .addEventListener("sidebar-toggle", (e) => {
        console.log("Sidebar:", e.detail);
      });

    categoryEl.addEventListener("category-change", (e) => {
      jobListEl.filterByCategories(e.detail);
    });
  }
}

customElements.define("zar-harah", ZarHarah);

import "./component/Header.js";
import "./component/Footer.js";
import "./pages/ZarHarah.js";
// import "../pages/miniiZar.html";
// import "../pages/miniiAjil.html";
// import "../pages/profile.html";
// import ".../pages/login.html";

export class PageRouter extends HTMLElement {
  connectedCallback() {
    this._views = Array.from(this.querySelectorAll("[data-route]"));
    window.addEventListener("hashchange", () => this.applyRoute());
    this.applyRoute();
  }

  applyRoute() {
    let hash = (location.hash || "#home").replace("#", "");

    // hash == "home/info" бол home section дотор info-г харуулна
    let [mainRoute, subRoute] = hash.split("/");

    this._views.forEach((section) => {
      if (section.dataset.route === mainRoute) {
        section.hidden = false;

        const infoDiv = section.querySelector(".job-info");
        if (infoDiv) {
          infoDiv.hidden = subRoute !== "info";
        }
      } else {
        section.hidden = true;
      }
    });

    const links = document.querySelectorAll(".top-menu a");
    links.forEach((a) => {
      a.classList.toggle(
        "is-active",
        a.getAttribute("href") === `#${mainRoute}`
      );
    });

    if (!location.hash) {
      history.replaceState(null, "", "#home");
    }
  }
}

customElements.define("page-router", PageRouter);

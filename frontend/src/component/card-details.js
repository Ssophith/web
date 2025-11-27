class JobDetail extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
      <a href="./zarHarah.html">
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
      </a>
    </header>
    <section class="main">
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
  }
}
customElements.define("job-detail", JobDetail);

class JobDetailList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <div id="list-container"></div>
          `;
  }

  set items(list) {
    const container = this.querySelector("#list-container");
    let html = "";

    list.forEach((item) => {
      html += `
        <job-detail 
          name="${item.name}"
          type="${item.type}"
          date="${item.date}"

          title="${item.title}"
          salary="${item.salary}"
          jobType="${item.jobType}"
          location="${item.location}"
          workdate="${item.workDate}"
          worktime="${item.workTime}"

          requiredworker="${item.requiredworker}"
          gettingworker="${item.gettingworker}"

          age="${item.age}"
          gender="${item.gender}"
          exp="${item.exp}"
          clothes="${item.clothes}"
          otherRequirements="${item.otherRequirements}"

          food="${item.food}"
          transport="${item.transport}"
          note="${item.note}"
        ></job-detail>`;
    });

    container.innerHTML = html;
  }
}
customElements.define("job-detail-list", JobDetailList);

document.addEventListener(`DOMContentLoaded`, () => {
  const offers = [
    {
      name: "Солонго",
      type: "Хувь хүн",
      date: "2025-10-22",

      title: "Газар ухна",
      salary: "80000₮",
      jobType: "Бүтэн цаг",

      location: "Сүхбаатар дүүрэг",

      workDate: "2025-11-02",
      workTime: "09:00 - 18:00",

      requiredworker: "5",
      gettingworker: "2",

      age: "18-35",
      gender: "Эрэгтэй",
      exp: "Туршлага шаардахгүй",
      clothes: "Ажлын бээлий, ботинк",
      otherRequirements: "Хариуцлагатай, цаг баримталдаг",

      food: "Өдрийн 1 хоолтой",
      transport: "Унааны мөнгө олгоно",
      note: "Ачаалал бага, ажил энгийн.",
    },
  ];

  document.querySelector("#offers").items = offers;
});

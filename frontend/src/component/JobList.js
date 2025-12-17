import "./JobCard.js";
import { jobs } from "../data/jobs.js";
import { users } from "../data/users.js";

export class JobList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .alert {
          position: fixed;
          top: 0; 
          left: 40%;
          width: 20%; /* дэлгэцийн бүх өргөн */
          padding: 1rem;
          background-color: #f9c54bff; 
          font-size: var(--fontsize2);
          color: var(--color4);
          text-align: center;
          z-index: 9999; /* бусад элементээс дээр харагдах */
          display: none; /* анх харагдахгүй */
          border-radius: var(--border_radius1);
        }

        .flex{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .alertclosebtn {
          color: white;
          font-weight: bold;
          float: right;
          font-size: var(--fontsize1);
          line-height: 20px;
          cursor: pointer;
          transition: 0.3s;
        }

        .closebtn:hover {
          color: black;
        }
      </style>
      <div class="grid-layout"></div>
        <div id="noResultAlert" class="alert" style="display: none">
          <span class="alertclosebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>Warning!</strong>
          <p>Хайлтын үр дүн олдсонгүй.</p>
        </div>
              `;

    // 1. job + user data-г нэгтгэх
    const merged = jobs.map((job) => {
      const user = users.find((u) => u.id === job.userId) || {};
      return {
        ...job,
        name: user.name || "",
        type: user.type || "",
        date: job.workDate || "",
        jobtype: job.type || "",
        salary: job.salary || "",
        location: job.location || "",
      };
    });

    this.fullList = merged; // ← бүх өгөгдлийг хадгална
    this.items = merged; // ← дэлгэц дээр харуулах
  }

  filter(query) {
    const q = query.toLowerCase();
    const alertBox = this.querySelector("#noResultAlert");

    // query хоосон бол бүх жагсаалтыг буцаана
    if (!q) {
      this.items = this.fullList;
      alertBox.style.display = "none";
      return;
    }

    const filtered = this.fullList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
    );

    // Хэрвээ үр дүн байхгүй бол анхны бүх list-ийг буцаана
    if (filtered.length === 0) {
      this.items = this.fullList;
      alertBox.style.display = "block";
      return;
    }

    // Үр дүн байвал filtered-ийг харуулна
    this.items = filtered;
    alertBox.style.display = "none";
  }

  filterByCategories(selections) {
    const alertBox = this.querySelector("#noResultAlert");

    // selections объект undefined байж магадгүй тул default өгөх
    selections = selections || { jobtype: [], salary: [], location: [] };
    selections.jobtype = selections.jobtype || [];
    selections.salary = selections.salary || [];
    selections.location = selections.location || [];

    console.log("Selections passed to filter:", selections);
    console.log("Full job list:", this.fullList);

    const filtered = this.fullList.filter((job) => {
      let match = true;

      if (selections.jobtype.length > 0) {
        match = match && selections.jobtype.includes(job.jobType);
        console.log("Checking jobtype:", job.jobtype, "=> match:", match);
      }

      if (selections.salary.length > 0) {
        const inRange = selections.salary.some((range) => {
          if (range === "0-500") return job.salary <= 500;
          if (range === "500-1000")
            return job.salary > 500 && job.salary <= 1000;
          if (range === "1000+") return job.salary > 1000;
          return false;
        });
        match = match && inRange;
        console.log(
          "Checking salary:",
          job.salary,
          "=> inRange:",
          inRange,
          "match:",
          match
        );
      }

      if (selections.location.length > 0) {
        match = match && selections.location.includes(job.location);
        console.log("Checking location:", job.location, "=> match:", match);
      }

      return match;
    });

    console.log("Filtered list:", filtered);

    if (filtered.length === 0) {
      this.items = [];
      alertBox.style.display = "block";
      return;
    }

    this.items = filtered;
    alertBox.style.display = "none";
  }

  set items(list) {
    const row = this.querySelector(".grid-layout");
    row.innerHTML = list
      .map(
        (item) => `
        <job-card
          jobId="${item.id}"
          name="${item.name}"
          type="${item.type}"
          date="${item.date}"
          title="${item.title}"
          workDate="${item.workDate}"
          workTime="${item.workTime}"
          location="${item.location}"
          salary="${item.salary}"
        ></job-card>
      `
      )
      .join("");
  }
}

customElements.define("job-list", JobList);

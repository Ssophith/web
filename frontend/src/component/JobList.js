import "./JobCard.js";
import { jobs } from "../data/jobs.js";
import { users } from "../data/users.js";

export class JobList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="grid-layout"></div>`;

    // 1. job + user data-г нэгтгэх
    const merged = jobs.map(job => {
      const user = users.find(u => u.id === job.userId) || {};
      return {
        ...job,
        name: user.name || "",
        type: user.type || "",
        date: job.workDate || "",     
      };
    });

    this.items = merged;
  }

  set items(list) {
    const row = this.querySelector(".grid-layout");
    row.innerHTML = list
      .map(
        item => `
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

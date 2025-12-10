import "./JobDetails.js";
import { jobs } from "../data/jobs.js";
import { users } from "../data/users.js";

export class JobDetailList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
      dialog {
        margin: auto;
        border: none;
        padding: 0;
        border-radius: var(--border_radius1);
        background-color: var(--color3);
      }

      dialog::backdrop {
        background: var(--color7);
        backdrop-filter: blur(10rem);
      }

    </style>
    <dialog id="jobDialog">
      <div id="dialog-body"></div>
    </dialog>
  `;

    this.dialog = this.querySelector("#jobDialog");

    // Event listener job detail харах
    document.addEventListener("show-job-detail", (e) => {
      this.showDetail(e.detail.jobId);
    });

    // Dialog хаагдах үед scroll lock арилгах
    this.dialog.addEventListener("close", () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      this.querySelector("#dialog-body").innerHTML = ""; // хуучин content-ийг цэвэрлэх
    });
  }

  showDetail(jobId) {
    const job = jobs.find((j) => j.id == jobId);
    const user = users.find((u) => u.id == job.userId) || {};

    const item = {
      ...job,
      name: user.name || "",
      type: user.type || "",
      date: job.workDate || "",
    };

    const html = `
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
      ></job-detail>
  `;

    this.querySelector("#dialog-body").innerHTML = html;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbarWidth + "px";

    this.dialog.showModal();
  }
}

customElements.define("job-detail-list", JobDetailList);

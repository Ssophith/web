import "./JobDetails.js";
import { jobs } from "../data/jobs.js";
import { users } from "../data/users.js";

export class JobDetailList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
        dialog {
            position: fixed;
            width: 80%;  /* Өргөн */
            height: auto; /* Content-оос хамаарах өндөр */
            padding: 0; /* dialog дотор padding, өөр div-д тавина */
            border: none; 
            border-radius: var(--border_radius1);
            background-color: var(--color3); 
            box-shadow: 0 4px 30px rgba(0,0,0,0.3); /* Shadow */
            z-index: 1000; /* Өөр элементүүдээс дээгүүр */
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.5); /* Хагас тунгалаг хар */
            backdrop-filter: blur(2px); /* Blur нэмж болно */
            overflow: hidden; /* Scroll-ыг хаах */
            position: fixed;  /* Хуудасны байрлалыг тогтоох */
            width: 100%;      /* Хажуугийн тасалдлыг багасгах */
        }
    </style>
    <dialog id="jobDialog">
      <div id="dialog-body"></div>
    </dialog>
  `;

    this.dialog = this.querySelector("#jobDialog");

    document.addEventListener("show-job-detail", (e) => {
      this.showDetail(e.detail.jobId);
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
    this.dialog.showModal();
  }
}
customElements.define("job-detail-list", JobDetailList);

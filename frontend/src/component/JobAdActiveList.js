import { jobs } from "../data/jobs";

export class JobAdActiveList extends HTMLElement {
    connectedCallback() {
        jobs.forEach(job => {
            const el = document.createElement("job-ad");

            el.setAttribute("name", job.name);
            el.setAttribute("type", job.type);
            el.setAttribute("time", job.time);
            el.setAttribute("title", job.title);
            el.setAttribute("position", job.position);
            el.setAttribute("salary", job.salary);
            el.setAttribute("count", job.count);
            el.setAttribute("allcnt", job.allCnt);
            el.setAttribute("nowcnt", job.nowCnt);

            this.appendChild(el);
        });
    }
}

customElements.define("job-list", JobAdActiveList);
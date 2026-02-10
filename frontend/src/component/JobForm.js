export class JobForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
        }

        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 100vh;
          font-family: var(--font1);
          background: linear-gradient(135deg, #6dd5fa, #ffffff);
          padding: 20px;
        }

        .container {
          background-color: #fff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          max-width: 800px;
          width: 100%;
          position: relative;
        }

        /* Close button */
        .close-btn {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: none;
          background: #3b82f6;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: 0.2s;
        }

        .close-btn:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 35px;
          font-size: 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px 30px;
        }

        .form-item {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        input, select, textarea {
          padding: 12px 15px;
          border: 1.5px solid #d0d7de;
          border-radius: 10px;
          font-size: 15px;
          background-color: #f9fafb;
          transition: all 0.2s ease;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #3b82f6;
          background-color: #fff;
          box-shadow: 0 0 6px rgba(59,130,246,0.25);
          outline: none;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .checkbox-group {
          padding: 15px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          background-color: #f9fafb;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        button[type="submit"] {
          margin-top: 30px;
          padding: 14px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 17px;
          cursor: pointer;
          width: 100%;
          transition: 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #2563eb;
          transform: scale(1.02);
        }

        .checkbox-option {
          margin-bottom: 12px;
        }

        .extra-input {
          margin-top: 8px;
          padding-left: 20px;
        }

        .extra-input input {
          padding: 10px;
          border-radius: 8px;
        }

        .hidden {
          display: none;
        }
      </style>

      <div class="container">

        <button class="close-btn" id="close-btn">✕</button>

        <h1>Ажилтан Авах Зар Нэмэх</h1>

        <form>
          <div class="form-grid">

            <div class="form-item">
              <label>Ажлын нэр</label>
              <input type="text" id="job-name" required />
            </div>

            <div class="form-item">
              <label>Цалин</label>
              <input type="text" id="salary" required />
            </div>

            <div class="form-item">
              <label>Ажлын төрөл</label>
              <select id="job-type" required>
                <option value="">Сонгоно уу</option>
                <option value="part-time">Part-Time</option>
                <option value="full-time">Full-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div class="form-item">
              <label>Байршил</label>
              <input type="text" id="location" required />
            </div>

            <div class="form-item">
              <label>Ажил эхлэх өдөр</label>
              <input type="date" id="start-date" required />
            </div>

            <div class="form-item">
              <label>Ажлын цаг</label>
              <input type="text" id="work-hours" required />
            </div>

            <div class="form-item">
              <label>Утас</label>
              <input type="tel" id="phone" required />
            </div>

            <div class="form-item">
              <label>Ажилд авах тоо</label>
              <input type="number" id="num-employees" min="1" required />
            </div>

            <div class="form-item full-width">
              <label>Шаардлага</label>
              <textarea id="requirements"></textarea>
            </div>

            <div class="form-item full-width checkbox-group">
              <label>Давуу тал</label>

              <div class="checkbox-option">
                <label>
                  <input type="checkbox" id="meal" />
                  Өдрийн хоол
                </label>
                <div id="meal-details" class="hidden extra-input">
                  <input type="text" />
                </div>
              </div>

              <div class="checkbox-option">
                <label>
                  <input type="checkbox" id="transport" />
                  Унааны мөнгө
                </label>
                <div id="transport-details" class="hidden extra-input">
                  <input type="text" />
                </div>
              </div>
            </div>

            <div class="form-item full-width">
              <label>Нэмэлт тайлбар</label>
              <textarea id="additional-notes"></textarea>
            </div>

          </div>

          <button type="submit">Зар Нийтлэх</button>
        </form>
      </div>
    `;

    this.initEvents();
    this.initFormSubmit();
    this.initCloseButton();
  }

  initEvents() {
    const meal = this.querySelector("#meal");
    const transport = this.querySelector("#transport");
    const mealBox = this.querySelector("#meal-details");
    const transportBox = this.querySelector("#transport-details");

    meal?.addEventListener("change", () => {
      mealBox.classList.toggle("hidden", !meal.checked);
    });

    transport?.addEventListener("change", () => {
      transportBox.classList.toggle("hidden", !transport.checked);
    });
  }

  initCloseButton() {
    this.querySelector("#close-btn")?.addEventListener("click", () => {
      window.location.hash = "#zar";
    });
  }

  initFormSubmit() {
    this.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = currentUser.id || currentUser._id;

    if (!userId) {
      alert("Нэвтэрнэ үү");
      window.location.hash = "#login";
      return;
    }

    const formData = {
      userId,
      title: this.querySelector("#job-name")?.value,
      salary: this.querySelector("#salary")?.value,
      jobType: this.querySelector("#job-type")?.value,
      location: this.querySelector("#location")?.value,
      workDate: this.querySelector("#start-date")?.value,
      workTime: this.querySelector("#work-hours")?.value,
      requiredWorkers: Number(this.querySelector("#num-employees")?.value),
      otherRequirements: this.querySelector("#requirements")?.value,
      food: this.querySelector("#meal")?.checked
        ? this.querySelector("#meal-details input")?.value
        : "Байхгүй",
      transport: this.querySelector("#transport")?.checked
        ? this.querySelector("#transport-details input")?.value
        : "Байхгүй",
      note: this.querySelector("#additional-notes")?.value,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Алдаа гарлаа");

      const result = await res.json();
      alert("Амжилттай");

      this.querySelector("form")?.reset();

      document.dispatchEvent(new CustomEvent("job-added", {
        detail: { job: result.job }
      }));

      window.location.hash = "#zar";

    } catch (err) {
      alert(err.message);
    }
  }
}

customElements.define("job-form", JobForm);

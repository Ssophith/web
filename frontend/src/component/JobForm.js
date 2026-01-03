export class JobForm extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <style>
          *, *::before, *::after {
            box-sizing: border-box;
          }
  
          :host {
            display: block;
            width: 100%;
            padding: 40px 0;
            font-family: var(--font1);
            background: linear-gradient(135deg, #6dd5fa, #ffffff);
          }
  
          .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
            position: relative;
          }

          .back-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background-color: #f3f4f6;
            color: #333;
            border: 1.5px solid #d0d7de;
            border-radius: 10px;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 20px;
            text-decoration: none;
          }

          .back-button:hover {
            background-color: #e5e7eb;
            border-color: #9ca3af;
            transform: translateX(-2px);
          }

          .back-button svg {
            width: 20px;
            height: 20px;
          }
  
          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 35px;
            font-size: 28px;
            letter-spacing: 1px;
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
            box-shadow: 0 0 6px rgba(59, 130, 246, 0.25);
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
  
          button {
            margin-top: 30px;
            padding: 14px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 17px;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
  
          button:hover {
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
            border: 1.5px solid #d0d7de;
            border-radius: 8px;
            width: 100%;
            background-color: #f9fafb;
            font-size: 14px;
          }
  
          .hidden {
            display: none;
          }
        </style>
  
        <div class="container">
          <button class="back-button" id="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Буцах
          </button>
          
          <h1>Ажилтан Авах Зар Нэмэх</h1>
  
          <form>
            <div class="form-grid">
  
              <div class="form-item">
                <label for="job-name">Ажлын нэр</label>
                <input type="text" id="job-name" required />
              </div>
  
              <div class="form-item">
                <label for="salary">Цалин</label>
                <input type="text" id="salary" placeholder="Жишээ: 50000 төгрөг/цаг" required />
              </div>
  
              <div class="form-item">
                <label for="job-type">Ажлын төрөл</label>
                <select id="job-type" required>
                  <option value="">Сонгоно уу</option>
                  <option value="part-time">Part-Time</option>
                  <option value="full-time">Full-Time</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
  
              <div class="form-item">
                <label for="location">Байршил</label>
                <input type="text" id="location" placeholder="Жишээ: Улаанбаатар, Сүхбаатар дүүрэг" required />
              </div>
  
              <div class="form-item">
                <label for="start-date">Ажил эхлэх өдөр</label>
                <input type="date" id="start-date" required />
              </div>
  
              <div class="form-item">
                <label for="work-hours">Ажлын цаг</label>
                <input type="text" id="work-hours" placeholder="Жишээ: 09:00-17:00, 8 цаг" required />
              </div>
  
              <div class="form-item">
                <label for="phone">Утасны дугаар</label>
                <input type="tel" id="phone" placeholder="Жишээ: 99999999" required />
              </div>
  
              <div class="form-item">
                <label for="num-employees">Ажилд авах хүний тоо</label>
                <input type="number" id="num-employees" min="1" required />
              </div>
  
              <div class="form-item full-width">
                <label for="requirements">Шаардлага</label>
                <textarea id="requirements" placeholder="Ажилд шаардлагатай ур чадвар, туршлага"></textarea>
              </div>
  
              <div class="form-item full-width checkbox-group">
                <label>Давуу талууд:</label>
  
                <div class="checkbox-option">
                  <label>
                    <input type="checkbox" id="meal" />
                    Өдрийн хоол
                  </label>
                  <div id="meal-details" class="hidden extra-input">
                    <input type="text" placeholder="Жишээ: 3 удаа хоол" />
                  </div>
                </div>
  
                <div class="checkbox-option">
                  <label>
                    <input type="checkbox" id="transport" />
                    Унааны мөнгө
                  </label>
                  <div id="transport-details" class="hidden extra-input">
                    <input type="text" placeholder="Жишээ: 3000₮ / өдөр" />
                  </div>
                </div>
              </div>
  
              <div class="form-item full-width">
                <label for="additional-notes">Нэмэлт тайлбар</label>
                <textarea id="additional-notes"></textarea>
              </div>
  
            </div>
  
            <button type="submit">Зар Нийтлэх</button>
          </form>
        </div>
      `;
  
      this.initEvents();
      this.initFormSubmit();
      this.initBackButton();
    }
  
    initEvents() {
      const meal = this.querySelector("#meal");
      const transport = this.querySelector("#transport");
  
      const mealBox = this.querySelector("#meal-details");
      const transportBox = this.querySelector("#transport-details");
  
      if (meal && mealBox) {
        meal.addEventListener("change", () => {
          mealBox.classList.toggle("hidden", !meal.checked);
        });
      }
  
      if (transport && transportBox) {
        transport.addEventListener("change", () => {
          transportBox.classList.toggle("hidden", !transport.checked);
        });
      }
    }
  
    initBackButton() {
      const backBtn = this.querySelector("#back-btn");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          // #zar route руу шилжих
          window.location.hash = "#zar";
        });
      }
    }

    initFormSubmit() {
      const form = this.querySelector("form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleSubmit();
        });
      }
    }
  
async handleSubmit() {
  const formData = {
    title: this.querySelector("#job-name")?.value,
    salary: this.querySelector("#salary")?.value,
    jobType: this.querySelector("#job-type")?.value,
    location: this.querySelector("#location")?.value,
    workDate: this.querySelector("#start-date")?.value,
    workTime: this.querySelector("#work-hours")?.value,
    requiredWorkers: Number(this.querySelector("#num-employees")?.value),

    // schema-д тааруулж rename хийв
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

    alert("Зар амжилттай нэмэгдлээ");
    window.location.hash = "#zar";

  } catch (err) {
    console.error(err);
    alert("Зар нэмэхэд алдаа гарлаа");
  }
}
}

  
  customElements.define("job-form", JobForm);
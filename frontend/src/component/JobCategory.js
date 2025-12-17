class JobCategory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .category {
          padding: 1rem;

          .closeBtn {
            background: var(--color4);
            color: var(--color6);
            border: none;
            cursor: pointer;
          }

          .closeBtn:hover {
            color: var(--color1);
          }
        }

      .category-group {
        gap: 0.5rem; /* checkbox хооронд зай */

        .category-list {
          .category-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            label {
              cursor: pointer;

              input {
                display: none;
              }
            }

            label:has(input:checked) {
              svg {
                transform: rotate(180deg);
                transition: transform 0.3s ease;
              }
            }
          }

          .category-main {
            display: none;

            label {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.3rem 0.5rem;
              border-radius: 4px;
              cursor: pointer;
              transition: background-color 0.2s ease;
            }

            label:hover {
              background-color: rgba(0, 0, 0, 0.05);
            }

            input[type="checkbox"] {
              accent-color: #007bff;
              width: 18px;
              height: 18px;
            }
          }
        }
      }
      </style>
          <div class="category">
            <div class="flex">
              <h3>Категори</h3>
              <button class="closeBtn">
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
              </button>
            </div>
            <div class="category-group">
              <div class="category-list">
                <div class="category-head">
                  <p>Ажлын чиглэл</p>
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#000000"
                    >
                      <g fill="#000000">
                        <path d="m15.68 7.116l-6 5l.64.768l6-5l-.64-.768Z" />
                        <path
                          d="m16.32 7.884l-6 5c-.512.427-1.152-.341-.64-.768l6-5c.512-.427 1.152.341.64.768Z"
                        />
                        <path d="m3.68 7.884l6 5l.64-.768l-6-5l-.64.768Z" />
                        <path
                          d="m4.32 7.116l6 5c.512.427-.128 1.195-.64.768l-6-5c-.512-.427.128-1.195.64-.768Z"
                        />
                      </g>
                    </svg>
                    <input type="checkbox" check name="" id="" />
                  </label>
                </div>
                <div class="category-main">
                  <label>
                    <input type="checkbox" name="category" value="IT / Программчлал" />
                    IT / Программчлал
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Маркетинг" />
                    Маркетинг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Газар шороо" />
                    Газар шороо
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Хоол үйлчилгээ" />
                    Хоол үйлчилгээ
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Борлуулалт" />
                    Борлуулалт
                  </label>
                </div>
              </div>
              <div class="category-list">
                <div class="category-head">
                  <p>Ажлын төрөл</p>
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#000000"
                    >
                      <g fill="#000000">
                        <path d="m15.68 7.116l-6 5l.64.768l6-5l-.64-.768Z" />
                        <path
                          d="m16.32 7.884l-6 5c-.512.427-1.152-.341-.64-.768l6-5c.512-.427 1.152.341.64.768Z"
                        />
                        <path d="m3.68 7.884l6 5l.64-.768l-6-5l-.64.768Z" />
                        <path
                          d="m4.32 7.116l6 5c.512.427-.128 1.195-.64.768l-6-5c-.512-.427.128-1.195.64-.768Z"
                        />
                      </g>
                    </svg>
                    <input type="checkbox" check name="" id="" />
                  </label>
                </div>
                <div class="category-main">
                  <label>
                    <input type="checkbox" name="category" value="Бүтэн цаг" />
                    Бүтэн цаг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Хагас цаг" />
                    Хагас цаг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Тодорхойгүй" />
                    Тодорхойгүй
                    </label>
                </div>
              </div>
              <div class="category-list">
                <div class="category-head">
                  <p>Байршил</p>
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#000000"
                    >
                      <g fill="#000000">
                        <path d="m15.68 7.116l-6 5l.64.768l6-5l-.64-.768Z" />
                        <path
                          d="m16.32 7.884l-6 5c-.512.427-1.152-.341-.64-.768l6-5c.512-.427 1.152.341.64.768Z"
                        />
                        <path d="m3.68 7.884l6 5l.64-.768l-6-5l-.64.768Z" />
                        <path
                          d="m4.32 7.116l6 5c.512.427-.128 1.195-.64.768l-6-5c-.512-.427.128-1.195.64-.768Z"
                        />
                      </g>
                    </svg>
                    <input type="checkbox" check name="" id="" />
                  </label>
                </div>
                <div class="category-main">
                  <label>
                    <input type="checkbox" name="category" value="Сүхбаатар дүүрэг" />
                    Сүхбаатар дүүрэг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Баянзүрх дүүрэг" />
                    Баянзүрх дүүрэг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Хан-Уул дүүрэг" />
                    Хан-Уул дүүрэг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Чингэлтэй дүүрэг" />
                    Чингэлтэй дүүрэг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="Багануур дүүрэг" />
                    Багануур дүүрэг
                  </label>
                </div>
              </div>
              <div class="category-list">
                <div class="category-head">
                  <p>Цалин</p>
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#000000"
                    >
                      <g fill="#000000">
                        <path d="m15.68 7.116l-6 5l.64.768l6-5l-.64-.768Z" />
                        <path
                          d="m16.32 7.884l-6 5c-.512.427-1.152-.341-.64-.768l6-5c.512-.427 1.152.341.64.768Z"
                        />
                        <path d="m3.68 7.884l6 5l.64-.768l-6-5l-.64.768Z" />
                        <path
                          d="m4.32 7.116l6 5c.512.427-.128 1.195-.64.768l-6-5c-.512-.427.128-1.195.64-.768Z"
                        />
                      </g>
                    </svg>
                    <input type="checkbox" check name="" id="" />
                  </label>
                </div>
                <div class="category-main">
                  <label>
                    <input type="checkbox" name="category" value="it" />
                    Доод тал нь 100,000₮
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="marketing" />
                    Маркетинг
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="management" />
                    Менежмент
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="design" />
                    Дизайн
                  </label>
                  <label>
                    <input type="checkbox" name="category" value="sales" />
                    Борлуулалт
                  </label>
                </div>
              </div>
            </div>
          </div>
    `;

    this.querySelectorAll(".category-list").forEach((categoryList) => {
      const head = categoryList.querySelector(".category-head");
      const main = categoryList.querySelector(".category-main");
      const input = head.querySelector('input[type="checkbox"]');

      // Accordion toggle checkbox
      input.addEventListener("change", () => {
        main.style.display = input.checked ? "block" : "none";
      });

      // Зөвхөн тухайн category-main доторхи checkbox-д listener нэмэх
      main.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", () => {
          const categories =
            Array.from(
              main.querySelectorAll('input[type="checkbox"]:checked')
            ).map((c) => c.value) || []; // ← undefined бол [] болгож өгнө

          // Custom event зөвхөн тухайн category-г дамжуулна
          this.dispatchEvent(
            new CustomEvent("category-change", {
              detail: categories,
              bubbles: true,
              composed: true,
            })
          );
        });
      });
    });
  }

  getSelectedCategories() {
    const selections = { jobtype: [], salary: [], location: [] };
    this.querySelectorAll(".category-list").forEach((list) => {
      const headText = list
        .querySelector(".category-head span")
        .textContent.toLowerCase();
      list.querySelectorAll("input[type=checkbox]:checked").forEach((cb) => {
        if (headText.includes("ажлын төрөл")) selections.jobtype.push(cb.value);
        if (headText.includes("цалин")) selections.salary.push(cb.value);
        if (headText.includes("байршил")) selections.location.push(cb.value);
      });
    });
    return selections;
  }
}

customElements.define("job-category", JobCategory);

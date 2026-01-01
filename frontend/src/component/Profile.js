import "./Header.js";
import "./Footer.js";

export class ProfilePage extends HTMLElement {
  async connectedCallback() {
    // URL-аас user ID-г авах (#profile/userId эсвэл #profile?userId=...)
    const hash = location.hash || "#profile";
    let userId = this.getUserIdFromHash(hash);
    
    // Хэрэв userId байхгүй бол localStorage-аас одоогийн хэрэглэгчийн ID-г авах
    if (!userId) {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      userId = currentUser.id || currentUser._id;
    }
    
    if (!userId) {
      this.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <p>Хэрэглэгчийн ID олдсонгүй. Нэвтэрнэ үү.</p>
          <a href="#login" style="color: var(--color1);">Нэвтрэх</a>
        </div>
      `;
      return;
    }

    // Хэрэглэгчийн мэдээлэл авах
    await this.loadUserData(userId);
  }

  getUserIdFromHash(hash) {
    // #profile/userId форматаар байж болно
    const parts = hash.split("/");
    if (parts.length > 1 && parts[0] === "profile") {
      return parts[1];
    }
    // Query parameter-аас авах
    const params = new URLSearchParams(window.location.search);
    return params.get("userId");
  }

  async loadUserData(userId) {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) {
        throw new Error("Хэрэглэгч олдсонгүй");
      }
      const userData = await res.json();
      
      // Одоогийн хэрэглэгчийн ID-г localStorage-аас авах
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const isOwnProfile = currentUser.id === userId || currentUser._id === userId;
      
      this.render(userData, isOwnProfile);
    } catch (error) {
      console.error("Хэрэглэгчийн мэдээлэл авахад алдаа:", error);
      this.innerHTML = `<p>Алдаа: ${error.message}</p>`;
    }
  }

  render(userData, isOwnProfile) {
    this.innerHTML = `
      <style>
        .container {
          display: grid;
          font-family: var(--font1);
          background-color: var(--color3);
          margin: 0;
          padding: 0;
          min-height: 100vh;

          grid-template-areas:
            "header"
            "main"
            "footer";

          grid-template-rows: 8vh 1fr 35vh;
        }

        header-component {
          grid-area: header;
        }

        .main {
          grid-area: main;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        footer-component {
          grid-area: footer;
        }

        .profile-card {
          background-color: var(--color4);
          border-radius: var(--border_radius1);
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--color3);
          padding-bottom: 1rem;
        }

        .profile-title {
          font-size: var(--fontsize1);
          color: var(--color6);
          margin: 0;
        }

        .edit-button {
          padding: 10px 20px;
          background-color: var(--color1);
          color: var(--color4);
          border: none;
          border-radius: 10px;
          font-size: var(--fontsize2);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-button:hover {
          background-color: var(--color2);
          transform: scale(1.05);
        }

        .profile-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .info-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-label {
          font-weight: 600;
          color: var(--color6);
          font-size: var(--fontsize2);
        }

        .info-value {
          color: var(--color5);
          font-size: var(--fontsize2);
          padding: 0.5rem;
          background-color: var(--color3);
          border-radius: 8px;
        }

        .info-value input,
        .info-value textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1.5px solid var(--color2);
          border-radius: 8px;
          font-size: var(--fontsize2);
          font-family: var(--font1);
        }

        .info-value textarea {
          resize: vertical;
          min-height: 100px;
        }

        .save-button {
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: var(--fontsize2);
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.2s ease;
        }

        .save-button:hover {
          background-color: #2563eb;
          transform: scale(1.02);
        }

        .hidden {
          display: none;
        }
      </style>

      <div class="container">
        <header-component></header-component>
        <main class="main">
          <div class="profile-card">
            <div class="profile-header">
              <h1 class="profile-title">Хэрэглэгчийн мэдээлэл</h1>
              ${isOwnProfile ? `
                <button class="edit-button" id="edit-btn">Засах</button>
              ` : ''}
            </div>

            <div class="profile-content" id="profile-content">
              <div class="info-group">
                <span class="info-label">Нэр:</span>
                <span class="info-value" data-field="name">${userData.name || "-"}</span>
              </div>

              <div class="info-group">
                <span class="info-label">Төрөл:</span>
                <span class="info-value" data-field="type">${userData.type || "-"}</span>
              </div>

              <div class="info-group">
                <span class="info-label">Утасны дугаар:</span>
                <span class="info-value" data-field="phone">${userData.phone || "-"}</span>
              </div>

              ${userData.age ? `
                <div class="info-group">
                  <span class="info-label">Нас:</span>
                  <span class="info-value" data-field="age">${userData.age}</span>
                </div>
              ` : ''}

              ${userData.gender ? `
                <div class="info-group">
                  <span class="info-label">Хүйс:</span>
                  <span class="info-value" data-field="gender">${userData.gender}</span>
                </div>
              ` : ''}

              ${userData.height ? `
                <div class="info-group">
                  <span class="info-label">Өндөр:</span>
                  <span class="info-value" data-field="height">${userData.height} см</span>
                </div>
              ` : ''}

              ${userData.introduction ? `
                <div class="info-group" style="grid-column: 1 / -1;">
                  <span class="info-label">Танилцуулга:</span>
                  <span class="info-value" data-field="introduction">${userData.introduction}</span>
                </div>
              ` : ''}

              ${userData.experience ? `
                <div class="info-group" style="grid-column: 1 / -1;">
                  <span class="info-label">Туршлага:</span>
                  <span class="info-value" data-field="experience">${userData.experience}</span>
                </div>
              ` : ''}

              ${userData.addition ? `
                <div class="info-group" style="grid-column: 1 / -1;">
                  <span class="info-label">Нэмэлт мэдээлэл:</span>
                  <span class="info-value" data-field="addition">${userData.addition}</span>
                </div>
              ` : ''}

              ${userData.bankaccount ? `
                <div class="info-group">
                  <span class="info-label">Банкны данс:</span>
                  <span class="info-value" data-field="bankaccount">${userData.bankaccount}</span>
                </div>
              ` : ''}
            </div>

            ${isOwnProfile ? `
              <button class="save-button hidden" id="save-btn">Хадгалах</button>
            ` : ''}
          </div>
        </main>
        <footer-component></footer-component>
      </div>
    `;

    if (isOwnProfile) {
      this.initEditMode(userData);
    }
  }

  initEditMode(userData) {
    const editBtn = this.querySelector("#edit-btn");
    const saveBtn = this.querySelector("#save-btn");
    const profileContent = this.querySelector("#profile-content");
    let isEditing = false;
    const originalData = { ...userData };

    editBtn.addEventListener("click", () => {
      isEditing = !isEditing;
      
      if (isEditing) {
        // Edit mode руу шилжих
        editBtn.textContent = "Цуцлах";
        saveBtn.classList.remove("hidden");
        
        // Бүх талбаруудыг input болгох
        profileContent.querySelectorAll(".info-value").forEach((el) => {
          const field = el.dataset.field;
          const value = originalData[field] || "";
          
          if (field === "introduction" || field === "experience" || field === "addition") {
            el.innerHTML = `<textarea>${value}</textarea>`;
          } else if (field === "type") {
            el.innerHTML = `
              <select>
                <option value="Хувь хүн" ${value === "Хувь хүн" ? "selected" : ""}>Хувь хүн</option>
                <option value="Байгууллага" ${value === "Байгууллага" ? "selected" : ""}>Байгууллага</option>
              </select>
            `;
          } else if (field === "age" || field === "height") {
            el.innerHTML = `<input type="number" value="${value}">`;
          } else {
            el.innerHTML = `<input type="text" value="${value}">`;
          }
        });
      } else {
        // View mode руу буцах
        editBtn.textContent = "Засах";
        saveBtn.classList.add("hidden");
        
        // Бүх талбаруудыг text болгох
        profileContent.querySelectorAll(".info-value").forEach((el) => {
          const field = el.dataset.field;
          const value = originalData[field] || "";
          
          if (field === "height") {
            el.textContent = value ? `${value} см` : "-";
          } else {
            el.textContent = value || "-";
          }
        });
      }
    });

    saveBtn.addEventListener("click", async () => {
      // Засварласан мэдээллийг цуглуулах
      const updatedData = {};
      profileContent.querySelectorAll(".info-value").forEach((el) => {
        const field = el.dataset.field;
        const input = el.querySelector("input, textarea, select");
        if (input) {
          let value = input.value;
          if (field === "age" || field === "height") {
            value = value ? parseInt(value) : null;
          }
          updatedData[field] = value;
        }
      });

      // API руу илгээх
      try {
        const res = await fetch(`/api/users/${originalData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!res.ok) {
          throw new Error("Мэдээлэл засахад алдаа гарлаа");
        }

        const updatedUser = await res.json();
        
        // localStorage-д шинэчлэх
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (currentUser.id === originalData._id || currentUser._id === originalData._id) {
          localStorage.setItem("user", JSON.stringify({
            ...currentUser,
            ...updatedUser
          }));
        }

        // Мэдээлэл амжилттай засагдлаа
        alert("Мэдээлэл амжилттай засагдлаа!");
        
        // View mode руу буцах
        editBtn.click();
        
        // Мэдээллийг дахин ачаалах
        await this.loadUserData(originalData._id);
      } catch (error) {
        console.error("Мэдээлэл засахад алдаа:", error);
        alert(`Алдаа: ${error.message}`);
      }
    });
  }
}

customElements.define("profile-page", ProfilePage);


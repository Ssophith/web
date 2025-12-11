export class SearchBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <style>
            .search {
                position: sticky;
                top: 0;
                background-color: var(--color3);
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;

                .show-sidebar-btn {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                overflow: hidden;
                background: var(--color1);
                color: var(--color4);
                border: none;
                border-radius: 0 var(--border_radius1) var(--border_radius1) 0;
                cursor: pointer;
                z-index: 999;
                white-space: nowrap;
                display: none;
                transition: width 0.5s ease-in-out;
                }

                .show-sidebar-btn:hover,
                .show-sidebar-btn:focus {
                width: 70px;
                }
                
                .search-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30rem;
                height: 3rem;
                border-radius: var(--border_radius1);
                background-color: var(--color4);
                box-shadow: 0rem 2px 7px var(--color5);
                overflow: hidden;

                input {
                    padding-left: 2ch;
                    border: none;
                    width: 90%;
                    height: 100%;
                    border: none;
                    outline: none;
                    overflow: hidden;
                }

                input:focus {
                    outline: none;

                }

                .search-btn {
                    height: 100%;
                    width: 10%;
                    /* border-radius: var(--border_radius1); */
                    cursor: pointer;
                    border: none;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                }
            }
        </style>
        <div class="search">
            <button class="show-sidebar-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
                />
              </svg>
            </button>
            <div class="search-container">
              <input
                type="text"
                placeholder="Хайх утга..."
                name="search"
                aria-label="Хайх"
              />
              <button class="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10.44 3a7.44 7.44 0 1 0 4.803 13.122c-.022.271.07.55.278.757l3.84 3.84a.96.96 0 1 0 1.358-1.358l-3.84-3.84a.96.96 0 0 0-.757-.278A7.44 7.44 0 0 0 10.44 3m-6 7.44a6 6 0 1 1 12 0a6 6 0 0 1-12 0"
                  />
                </svg>
              </button>
            </div>
        </div>
    `;


    const searchInput = this.querySelector('input[name="search"]');
    const searchButton = this.querySelector('.search-btn');
    const showSidebarBtn = this.querySelector('.show-sidebar-btn');

    const emitSearch = () => {
      this.dispatchEvent(new CustomEvent('search', {
        detail: searchInput.value.trim(),
        bubbles: true,
        composed: true
      }));
    };

    searchButton.addEventListener('click', emitSearch);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') emitSearch();
    });

    // showSidebarBtn.addEventListener("click", () => {
    //       sidebar.classList.remove("hidden");
    //       grid.classList.remove("full-width");
    //       showBtn.style.display = "none"; // hide button again
    //});

  }
}

customElements.define('search-bar', SearchBar);

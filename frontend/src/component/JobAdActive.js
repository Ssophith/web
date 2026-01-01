export class JobAdActive extends HTMLElement {
    connectedCallback() {
        this.name = this.getAttribute("name") || '';
        this.type = this.getAttribute("type") || '';
        this.time = this.getAttribute("time") || '';
        this.title = this.getAttribute("title") || '';
        this.position = this.getAttribute("position") || '';
        this.salary = this.getAttribute("salary") || '';
        this.count = this.getAttribute("count") || 0;
        this.allcnt = this.getAttribute("allcnt") || 0;
        this.nowcnt = this.getAttribute("nowcnt") || 0;
        this.innerHTML=/*html*/`
        <style>
            .buttons {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                justify-items: center;
                overflow: visible;
                gap: 1rem;
            }

            .button {
                position: relative;
                width: 40px;
                height: 40px;
                display: flex;
                cursor: pointer;
                color: var(--color2);
                border-radius: 50%;
                background-color: var(--color3);
                align-items: center;
                justify-content: center;
                border: 1px solid var(--color2);
                box-shadow: 2px 2px 3px var(--color2);
                transition: all 0.2s ease;
                z-index: 1;
            }

            .button:hover{
                transform: scale(1.05);
                box-shadow: 3px 3px 4px var(--color1);
                border:2px solid var(--color2);
                transform-origin: center;
                z-index: 10;
            }

            .button-inactive {
                position: relative;
                width: 40px;
                height: 40px;
                display: flex;
                cursor: pointer;
                color: var(--color2);
                border-radius: 50%;
                background-color: var(--color3);
                align-items: center;
                justify-content: center;
                border: 1px solid var(--color5);
                box-shadow: 2px 2px 3px var(--color2);
                transition: all 0.2s ease;
                z-index: 1;
            }

            .button-inactive:hover{
                transform: scale(1.05);
                box-shadow: 3px 3px 4px var(--color1);
                border:2px solid var(--color2);
                transform-origin: center;
                z-index: 10;
            }

            .badge {
                position: absolute;
                bottom: 0;
                right: 0;
                transform: translate(25%, 25%);
                background-color: var(--color2);
                color: var(--color4);
                font-size: var(--fontsize4);
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .badge.hide{
                display: none;
            }

            .badge-people{
                white-space: nowrap;
                position: absolute;
                bottom: 0;
                right: 0;
                transform: translate(25%, 50%);
                background-color: var(--color2);
                color: var(--color4);
                font-size: var(--fontsize4);
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .flex{
                display:flex;
            }

            .card {
                width: 25vw;
                height: auto;
                margin: 2rem;
                padding: 2rem;
                padding-right: 1rem;
                background-color: var(--color4);
                border-radius: var(--border_radius1);
                box-shadow: 0rem 2px 7px var(--color2);
                transition: all 0.2s ease;
                display: grid;
                grid-template-columns: 7fr 1fr;
                gap: 1rem;
                overflow: visible;

                h2 {
                font-size: var(--fontsize1);
                text-align: center;
                }

                .flex-nav {
                display: flex;
                gap: 1rem;
                font-size: var(--fontsize4);
                width: 100%;

                .flex-nav-title {
                    display: flex;
                    justify-content: space-between;
                }
                }

                .info {
                margin: 0;
                height: auto;
                padding: 1rem;
                font-size: var(--fontsize2);
                background-color: var(--color2);
                border-radius: var(--border_radius1);
                color: var(--color4);

                .info-date{
                    display: flex;
                    justify-content: space-between;
                }
                }
            }

            .card:hover{
                box-shadow: 0rem 4px 10px var(--color1);
                transform: scale(1.02);
            }

            .card-inactive {
                width: 25vw;
                height: auto;
                margin: 2rem;
                padding: 2rem;
                background-color: var(--color4);
                border-radius: var(--border_radius1);
                box-shadow: 0rem 2px 7px var(--color6);
                transition: all 0.2s ease;
                display: grid;
                grid-template-columns: 7fr 1fr;
                gap: 1rem;
                overflow: visble;

                h2 {
                font-size: var(--fontsize1);
                text-align: center;
                }

                .flex-nav {
                display: flex;
                gap: 1rem;
                font-size: var(--fontsize3);

                .flex-nav-title {
                    display: flex;
                    justify-content: space-between;
                }
                }

                .info-inactive {
                margin: 0;
                height: auto;
                padding: 1rem;
                font-size: var(--fontsize2);
                background-color: var(--color3);
                border-radius: var(--border_radius1);
                color: var(--color6);
                border: 1px solid var(--color5);
                }
            }

            .card-inactive:hover{
                box-shadow: 0rem 4px 10px var(--color1);
                transform: scale(1.02);
            }

            .card-inactive:hover .info-inactive{
                border: 1px solid var(--color2);
                background-color: var(--color3);
                color: var(--color6);
            }
        </style>
        <article class="card">
            <div>
            <div class="flex-nav">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/>
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/>
                </g>
                </svg>
                <div>
                <div class="flex-nav-title">
                    <p>${this.name}</p>
                    <p>${this.type}</p>
                </div>
                <div>
                    <p>Нийтэлсэн хугацаа: ${this.time}</p>
                </div>
                </div>
            </div>
            <div>
                <h2>${this.title}</h2>
            </div>
            <div class="info">
                <div class="info-date">
                <p>2025-11-08</p>
                <p>09:00 - 20:00<p>
                </div>
                <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M12 3a7 7 0 0 0-7 7c0 2.862 1.782 5.623 3.738 7.762A26.158 26.158 0 0 0 12 20.758a26.14 26.14 0 0 0 3.262-2.994C17.218 15.623 19 12.863 19 10a7 7 0 0 0-7-7Zm0 20.214l-.567-.39l-.003-.002l-.006-.005l-.02-.014l-.075-.053a25.34 25.34 0 0 1-1.214-.94a28.157 28.157 0 0 1-2.853-2.698C5.218 16.876 3 13.637 3 10a9 9 0 0 1 18 0c0 3.637-2.218 6.877-4.262 9.112a28.145 28.145 0 0 1-3.796 3.44a16.794 16.794 0 0 1-.345.251l-.021.014l-.006.005l-.002.001l-.568.39ZM12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z"/>
                </svg>
                <p>${this.position}</p>
                <p>${this.salary}₮</p>
                </div>
            </div>
            </div>
            <div class="buttons">
            <div class="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <path fill="#ffffff" stroke="currentColor" stroke-width="2" d="M4 19V9a8 8 0 0 1 16 0v10M1 19h22m-8 0v1a3 3 0 1 1-6 0v-1"/>
                </svg>
                <span class="badge">${this.count}</span>
            </div>
            <div class="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547a9.005 9.005 0 0 1 5.9 8.18a.751.751 0 0 1-1.5.045a7.5 7.5 0 0 0-14.993 0a.75.75 0 0 1-1.499-.044a9.005 9.005 0 0 1 5.9-8.181A5.496 5.496 0 0 1 3.5 8ZM9 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 1 1-.212-1.484a4.53 4.53 0 0 1 3.38 8.097a6.69 6.69 0 0 1 3.956 6.107a.75.75 0 0 1-1.5 0a5.193 5.193 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8Z"/>
                </svg>
                <span class="badge-people">${this.allcnt} / ${this.nowcnt}</span>
            </div>
            <div class="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256">
                <path fill="currentColor" d="M244.24 60a8 8 0 0 0-7.75-.4c-42.93 21-73.59 11.16-106 .78c-34-10.89-69.25-22.14-117.95 1.64A8 8 0 0 0 8 69.24v119.93a8 8 0 0 0 11.51 7.19c42.93-21 73.59-11.16 106.05-.78c19.24 6.15 38.84 12.42 61 12.42c17.09 0 35.73-3.72 56.91-14.06a8 8 0 0 0 4.49-7.18V66.83a8 8 0 0 0-3.72-6.83M232 181.67c-40.6 18.17-70.25 8.69-101.56-1.32c-19.24-6.15-38.84-12.42-61-12.42a122 122 0 0 0-45.4 9V74.33c40.6-18.17 70.25-8.69 101.56 1.32S189.14 96 232 79.09ZM128 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16M56 96v48a8 8 0 0 1-16 0V96a8 8 0 1 1 16 0m144 64v-48a8 8 0 1 1 16 0v48a8 8 0 1 1-16 0"/>
                </svg>
            </div>
            </div>
        </article>
        `
        
        const badge = this.querySelector(".badge");
        badge.classList.toggle("hide", this.count === 0);
    }
}

customElements.define('job-ad', JobAdActive);
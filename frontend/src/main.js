class JobCard extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <article class="card">
        <div class="flex-nav">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/>
                <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/>
              </g>
            </svg>
          </div>
          <div>
            <div class="flex">
              <p>${this.getAttribute(`name`) || ''}</p>
              <p>${this.getAttribute(`type`) || ''}</p>
            </div>
            <div>
              <p>Нийтэлсэн хугацаа: ${this.getAttribute(`date`) || ''}</p>
            </div>
          </div>
        </div>

        <div>
          <h2>${this.getAttribute(`title`) || ''}</h2>
        </div>

        <div class="info">
          <div>
            <div class="flex">
              <p>${this.getAttribute(`workDate`) || ''}</p>
              <p>${this.getAttribute(`workTime`) || ''}</p>
            </div>

            <div>
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 3a7 7 0 0 0-7 7c0 2.862 1.782 5.623 3.738 7.762A26.158 26.158 0 0 0 12 20.758a26.14 26.14 0 0 0 3.262-2.994C17.218 15.623 19 12.863 19 10a7 7 0 0 0-7-7Zm0 20.214l-.567-.39l-.003-.002l-.006-.005l-.02-.014l-.075-.053a25.34 25.34 0 0 1-1.214-.94a28.157 28.157 0 0 1-2.853-2.698C5.218 16.876 3 13.637 3 10a9 9 0 0 1 18 0c0 3.637-2.218 6.877-4.262 9.112a28.145 28.145 0 0 1-3.796 3.44a16.794 16.794 0 0 1-.345.251l-.021.014l-.006.005l-.002.001l-.568.39ZM12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z"/>
                </svg>
                <p>${this.getAttribute(`location`) || ''}</p>
              </div>
              <p>${this.getAttribute(`salary`) || ''}</p>
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

// Custom элемент бүртгэх
window.customElements.define('card', JobCard);

class JobList extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="grid-layout">
        </div>
        `
    }

    set items(list){
        const row = this.querySelector('.grid-layout');
        row.innerHTML = '';
        list.forEach(item => {
            const card = document.createElement('card');
            card.setAttribute('name', item.name);
            card.setAttribute('type', item.type);
            card.setAttribute('date', item.date);
            card.setAttribute('title', item.title);
            card.setAttribute('workDate', item.workDate);
            card.setAttribute('workTime', item.workTime);
            card.setAttribute('location', item.location);
            card.setAttribute('salary', item.salary);
            row.appendChild(card);
        });
    }
}
customElements.define('job-list', JobList);

document.addEventListener(`DOMContentLoaded`, () => {
    const offers = [
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
        {name: 'Солонго', type: 'Хувь хүн', date: '2025-10-22', title: 'Газар ухна', workDate: '2025-11-02', workTime: '9:00-18:00', location: 'Сүхбаатар дүүрэг', salary: '80000₮'},
    ];
    document.querySelector('#offers').items = offers;
});


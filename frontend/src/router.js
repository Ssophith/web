export function router() {
  const app = document.getElementById("app");
  
  // Хэрэглэгч нэвтэрсэн эсэхийг localStorage-аас шалгах
  // const user = JSON.parse(localStorage.getItem('user'));

  // Хэрвээ login хийгээгүй бол login page руу чиглүүлэх
  // if (!user && window.location.hash !== "#login") {
  //   window.location.hash = "#login";
  //   return;
  // }

  // default hash
  // if (!window.location.hash) {
  //   window.location.hash = "#home";
  //   return;
  // }

  const hash = window.location.hash;

  switch (hash) {
    case "#home":
      app.innerHTML = `<zar-harah></zar-harah>`;
      break;

    case "#miniiZar":
      app.innerHTML = `<minii-zar></minii-zar>`;
      break;

    case "#miniiAjil":
      app.innerHTML = `<minii-ajil></minii-ajil>`;
      break;

    case "#profile":
      app.innerHTML = `<profile-page></profile-page>`;
      break;

    case "#login":
      app.innerHTML = `<auth-page></auth-page>`; // login / sign up page
      break;

    default:
      app.innerHTML = `<zar-harah></zar-harah>`;
  }
}

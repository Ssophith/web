// router.js
export function navigate(path){
  window.history.pushState({}, '', path);
  window.dispatchEvent(new CustomEvent('route-changed', {detail: path}));
}

window.addEventListener('popstate', () => {
  window.dispatchEvent(new CustomEvent('route-changed', {detail: window.location.pathname}));
});

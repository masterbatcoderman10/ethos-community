let toastTimer;

export function showToast(msg) {
  let el = document.getElementById("__toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "__toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

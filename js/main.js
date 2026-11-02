// Language switch (EN default), sticky nav, scroll reveal, YouTube click-to-load, image lightbox.
(function () {
  const root = document.documentElement;

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved === "es" ? "es" : "en");

  document.querySelectorAll(".lang-toggle").forEach((b) =>
    b.addEventListener("click", () => setLang(root.dataset.lang === "en" ? "es" : "en"))
  );

  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  document.querySelectorAll(".yt").forEach((el) => {
    const id = el.dataset.id;
    el.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
    el.innerHTML = '<button aria-label="Play video"></button>';
    el.addEventListener("click", () => {
      el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="YouTube video"></iframe>`;
    }, { once: true });
  });

  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = "<img alt=''>";
  document.body.appendChild(box);
  box.addEventListener("click", () => box.classList.remove("open"));
  document.addEventListener("keydown", (e) => e.key === "Escape" && box.classList.remove("open"));
  document.querySelectorAll(".gallery figure").forEach((f) =>
    f.addEventListener("click", () => {
      const img = f.querySelector("img");
      box.firstChild.src = img.src;
      box.firstChild.alt = img.alt;
      box.classList.add("open");
    })
  );
})();

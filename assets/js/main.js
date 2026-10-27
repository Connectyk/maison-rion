(function () {
  var PHONE_WA = "33640845823";
  var EMAIL = "rioni05@outlook.fr";

  // Menu mobile
  var t = document.querySelector(".nav-toggle"), nav = document.getElementById("nav");
  if (t && nav) {
    t.addEventListener("click", function () {
      var o = nav.classList.toggle("open");
      t.setAttribute("aria-expanded", o ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); t.setAttribute("aria-expanded", "false"); }
    });
  }

  // Réalisations : filtre + voir plus
  var gal = document.querySelector(".grid-gal");
  var tabs = document.querySelectorAll(".tab");
  var more = document.getElementById("more-btn");
  function applyCat(cat) {
    gal.querySelectorAll("figure").forEach(function (f) {
      f.hidden = !(cat === "all" || f.dataset.cat === cat);
    });
    if (cat === "all") gal.setAttribute("data-collapsed", ""); else gal.removeAttribute("data-collapsed");
    if (more) more.parentNode.hidden = cat !== "all";
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { x.setAttribute("aria-pressed", x === t ? "true" : "false"); });
      applyCat(t.dataset.cat);
    });
  });
  if (more) more.addEventListener("click", function () {
    gal.removeAttribute("data-collapsed");
    more.parentNode.hidden = true;
  });

  // Visionneuse
  var lb = document.getElementById("lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = lb.querySelector("img"), lbTxt = lb.querySelector("p");
    document.querySelectorAll(".gallery button").forEach(function (b) {
      b.addEventListener("click", function () {
        var img = b.querySelector("img");
        lbImg.src = b.dataset.full; lbImg.alt = img.alt;
        lbTxt.textContent = b.parentNode.querySelector("figcaption").textContent;
        lb.showModal();
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  // Formulaire de devis → WhatsApp ou e-mail
  var form = document.getElementById("devis-form");
  if (form) {
    var err = form.querySelector(".form-error");
    function build() {
      var d = new FormData(form);
      var nom = (d.get("nom") || "").trim(), tel = (d.get("tel") || "").trim(), ville = (d.get("ville") || "").trim();
      if (!nom || !tel || !ville) {
        err.textContent = "Indiquez votre nom, votre téléphone et votre commune pour envoyer la demande.";
        return null;
      }
      err.textContent = "";
      return "Bonjour Maison Rion, je souhaite un devis.\n\n" +
        "Nom : " + nom + "\nTéléphone : " + tel + "\nCommune : " + ville +
        "\nTravaux : " + (d.get("travaux") || "") +
        "\nSurface / pièces : " + (d.get("surface") || "non précisé") +
        "\n\n" + (d.get("message") || "");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = build(); if (!m) return;
      window.open("https://wa.me/" + PHONE_WA + "?text=" + encodeURIComponent(m), "_blank", "noopener");
    });
    var mailBtn = form.querySelector("[data-mail]");
    if (mailBtn) mailBtn.addEventListener("click", function () {
      var m = build(); if (!m) return;
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Demande de devis peinture") + "&body=" + encodeURIComponent(m);
    });
  }
})();

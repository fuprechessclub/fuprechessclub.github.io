async function loadRules() {
  try {
    const res = await fetch("data/rulebook.json?nocache=" + Date.now());
    const data = await res.json();
    const grid = document.getElementById("rulesGrid");
    if (!grid) return;

    grid.innerHTML = "";

    data.rules.forEach(cat => {
      // Create card wrapper
      const card = document.createElement("div");
      card.className = "rule-card";
      card.style.borderTop = `4px solid ${cat.color}`;

      // Build icon HTML
      const iconHTML = `<i class="${cat.icon}" style="color:${cat.color};"></i>`;

      // Render card
      card.innerHTML = `
        <div class="rule-header" role="button" tabindex="0" aria-expanded="false">
          <span class="rule-title">${iconHTML} ${cat.category}</span>
          <span class="toggle">+</span>
        </div>
        <div class="rule-items">
          <ol>
            ${cat.items.map(item => `<li>${item}</li>`).join("")}
          </ol>
        </div>
      `;

      // Toggle expand/collapse
      const header = card.querySelector(".rule-header");
      const toggle = card.querySelector(".toggle");

      const toggleCard = () => {
        const isActive = card.classList.toggle("active");
        toggle.textContent = isActive ? "−" : "+";
        header.setAttribute("aria-expanded", isActive);
      };

      header.addEventListener("click", toggleCard);
      header.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCard();
        }
      });

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading rulebook:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadRules);

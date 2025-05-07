const headers = document.querySelectorAll("h1, h2, h3");

headers.forEach(header => {
  header.addEventListener("mouseenter", () => {
    header.style.transition = "all 0.3s ease";
    header.style.color = "#FF0000"; 
    header.style.transform = "scale(1.05)";
  });

  header.addEventListener("mouseleave", () => {
    header.style.color = "";
    header.style.transform = "scale(1)";
  });
});
function addItem(sectionId, placeholderText) {
  const section = document.getElementById(sectionId);
  const input = document.createElement("textarea");
  input.placeholder = placeholderText;
  input.className = "dynamic-input";
  input.style.padding = "10px";
  input.style.borderRadius = "8px";
  input.style.border = "1px solid #ccc";
  input.style.marginTop = "10px";
  input.style.width = "100%";
  input.style.fontSize = "14px";
  input.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = " Save";
  saveBtn.className = "save-btn";
  saveBtn.style.background = "linear-gradient(to right, #1f3244, #3a5a6d)";
  saveBtn.style.color = "white";
  saveBtn.style.border = "none";
  saveBtn.style.padding = "10px 16px";
  saveBtn.style.borderRadius = "8px";
  saveBtn.style.cursor = "pointer";
  saveBtn.style.marginTop = "10px";
  saveBtn.style.fontSize = "14px";
  saveBtn.style.transition = "all 0.3s ease";

  saveBtn.onmouseover = () => {
    saveBtn.style.transform = "scale(1.05)";
    saveBtn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  };

  saveBtn.onmouseleave = () => {
    saveBtn.style.transform = "scale(1)";
    saveBtn.style.boxShadow = "none";
  };

  saveBtn.onclick = () => {
    const value = input.value.trim();
    if (value !== "") {
      const newItem = document.createElement("p");
      newItem.textContent = value;
      newItem.className = "deyisdirilebilen";
      section.insertBefore(newItem, input);
      input.remove();
      saveBtn.remove();
      attachEditable(newItem);
    }
  };

  section.appendChild(input);
  section.appendChild(saveBtn);
}

const editableSelectors = "h1, h2, h3, h4, h5, h6, p, li";

// Başlıqlar və mətnlərə funksiyaları tətbiq et
document.querySelectorAll(editableSelectors).forEach(el => {
  attachEditable(el);

  if (el.tagName.toLowerCase().startsWith("h")) {
    addToggleButton(el);
  }
});

// 🖊 Redaktə oluna bilən element funksiyası
function attachEditable(el) {
  el.style.cursor = "pointer";

  el.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-btn")) return; // toggle kliklərindən çıx

    const isMultiline = ["p", "li"].includes(el.tagName.toLowerCase());
    const editor = isMultiline ? document.createElement("textarea") : document.createElement("input");

    if (!isMultiline) editor.type = "text";

    editor.value = el.innerText;
    editor.style.width = "100%";
    editor.style.fontSize = "14px";
    editor.style.padding = "6px";
    editor.style.border = "1px solid #ccc";
    editor.style.borderRadius = "6px";
    editor.style.boxSizing = "border-box";
    editor.style.marginTop = "4px";

    el.replaceWith(editor);
    editor.focus();

    editor.addEventListener("blur", () => {
      const newEl = document.createElement(el.tagName.toLowerCase());
      newEl.innerText = editor.value;
      newEl.className = el.className;
      attachEditable(newEl);

      if (el.classList.contains("has-toggle")) {
        addToggleButton(newEl);
      }

      editor.replaceWith(newEl);
    });

    editor.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (!isMultiline || !e.shiftKey)) {
        e.preventDefault();
        editor.blur();
      }
    });
  });
}

// 🔽 Toggle düyməsini başlıqlara əlavə edən funksiya
function addToggleButton(headerEl) {
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "▼";
  toggleBtn.className = "toggle-btn";
  toggleBtn.style.marginLeft = "10px";
  toggleBtn.style.fontSize = "0.8em";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.background = "none";
  toggleBtn.style.border = "none";
  toggleBtn.style.color = "#333";

  headerEl.appendChild(toggleBtn);
  headerEl.classList.add("has-toggle");

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Redaktəni blokla

    const content = getNextContent(headerEl);
    if (content) {
      const isHidden = content.style.display === "none";
      content.style.display = isHidden ? "block" : "none";
      toggleBtn.textContent = isHidden ? "▼" : "▲";
    }
  });
}

// 🔍 Başlıqdan sonra gələn paraqraf, siyahı və ya div-i tap
function getNextContent(headerEl) {
  let next = headerEl.nextElementSibling;
  while (next) {
    const tag = next.tagName.toLowerCase();
    if (["p", "ul", "ol", "div"].includes(tag)) return next;
    next = next.nextElementSibling;
  }
  return null;
}

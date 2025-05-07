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

function attachEditable(el) {
  el.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.value = el.innerText;
    textarea.style.width = "100%";
    textarea.style.minHeight = "60px";
    textarea.style.fontSize = "14px";
    textarea.style.padding = "8px";
    textarea.style.borderRadius = "6px";
    textarea.style.border = "1px solid #ccc";

    el.replaceWith(textarea);
    textarea.focus();

    textarea.addEventListener('blur', () => {
      const newElement = document.createElement(el.tagName.toLowerCase());
      newElement.className = 'deyisdirilebilen';
      newElement.innerText = textarea.value;
      textarea.replaceWith(newElement);
      attachEditable(newElement);
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        textarea.blur();
      }
    });
  });
}
document.querySelectorAll('.deyisdirilebilen').forEach(attachEditable);

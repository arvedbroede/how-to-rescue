// Verhindert das Öffnen des Kontextmenüs (Rechtsklick)
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  alert("Rechtsklick ist deaktiviert!");
});

// Verhindert das Drücken der F12-Taste (Entwicklertools öffnen)
document.addEventListener('keydown', function(event) {
  // Blockiert F12, Strg+Shift+I (Entwicklertools), Strg+U (Quellcode anzeigen)
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.key === 'u')) {
    event.preventDefault();
    alert("Diese Funktion ist deaktiviert!");
  }
});

// NAV DROP-DOWN

document.addEventListener("DOMContentLoaded", function() {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  let timeout;

  dropdown.addEventListener("mouseenter", function() {
      clearTimeout(timeout);
      dropdownContent.style.display = "block";
  });

  dropdown.addEventListener("mouseleave", function() {
      timeout = setTimeout(function() {
          dropdownContent.style.display = "none";
      }, 150); // Ändern Sie die Verzögerungszeit nach Bedarf
  });
});

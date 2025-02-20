// Funktion zum Öffnen des Popups mit Schritt-für-Schritt Bildern + Text
function openPopup(step) {
    var popup = document.getElementById("popup");
    var title = document.getElementById("popup-title");
    var textList = document.getElementById("popup-text");

    // Stelle sicher, dass das Popup-Element existiert
    if (!popup || !title || !textList) {
        console.error("Popup-Elemente nicht gefunden!");
        return;
    }

    // Vorherige Inhalte löschen
    textList.innerHTML = ""; 

    var steps = [];

    if (step === 'stable-side') {
        title.innerText = "Stabile Seitenlage";
        steps = [
            { src: '../bilder/erste-hilfe-anleitungen/stabile-seitenlage/schritt-1.jpg', text: "Arm anwinkeln" },
            { src: '../bilder/erste-hilfe-anleitungen/stabile-seitenlage/schritt-2.jpg', text: "Zweiten Arm an gegenüberliegende Backe legen" },
            { src: '../bilder/erste-hilfe-anleitungen/stabile-seitenlage/schritt-3.jpg', text: "Bein anwinkeln" },
            { src: '../bilder/erste-hilfe-anleitungen/stabile-seitenlage/schritt-4.jpg', text: "Person drehen" },
            { src: '../bilder/erste-hilfe-anleitungen/stabile-seitenlage/schritt-5.jpg', text: "Kopf überstrecken" }
        ];
    } else if (step === 'child-breathing') {
        title.innerText = "Atemspende bei Kindern";
        steps = [
            { src: '../bilder/erste-hilfe-anleitungen/reanimation-kind/schritt-0.jpg', text: "Mundraum kontrollieren - Kopf überstrecken - Beatmung 2x" },
            { src: '../bilder/erste-hilfe-anleitungen/reanimation-kind/schritt-1.jpg', text: "Oberkörperkompression 30x" },
            { src: '../bilder/erste-hilfe-anleitungen/reanimation-kind/schritt-2.jpg', text: "Kind in Rückenlage bringen" }
        ];
    } else if (step === 'notruf-child') {
        title.innerText = "Notruf";
        steps = [
            { src: '../bilder/erste-hilfe-anleitungen/notruf/notrufnummer.jpg', text: "Notruf wählen" },
        ];
    }
    
    // Bilder + Beschreibung ins Popup einfügen
    steps.forEach(function(stepItem) {
        var container = document.createElement("div");
        container.classList.add("step-container"); // Für sauberes Styling

        var img = document.createElement("img");
        img.src = stepItem.src;
        img.alt = stepItem.text;
        img.classList.add("step-icon");

        var description = document.createElement("p");
        description.innerText = stepItem.text;
        description.classList.add("step-description");

        container.appendChild(img);
        container.appendChild(description);
        textList.appendChild(container);
    });

    // Popup anzeigen
    popup.style.display = "flex";

    // Dynamische Größenanpassung
    setTimeout(() => {
        var popupContent = document.querySelector(".popup-content");
        popupContent.style.height = "auto"; 
        popupContent.style.width = "auto"; 
        popupContent.style.minWidth = "400px"; // Mindestbreite setzen
        popupContent.style.maxWidth = "90%"; 
    }, 200);
}

// Funktion zum Schließen des Popups
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Funktion zum Navigieren zum nächsten Schritt
function nextStep(step) {
    var steps = document.querySelectorAll('.question');
    steps.forEach(function(stepElement) {
        stepElement.classList.add('hidden');
    });

    var nextStepElement = document.getElementById(step);
    if (nextStepElement) {
        nextStepElement.classList.remove('hidden');
    } else {
        console.error("Schritt nicht gefunden: " + step);
    }
}

// Funktion zum Zurückgehen zum vorherigen Schritt
function previousStep(step) {
    var steps = document.querySelectorAll('.question');
    steps.forEach(function(stepElement) {
        stepElement.classList.add('hidden');
    });

    var previousStepElement = document.getElementById(step);
    if (previousStepElement) {
        previousStepElement.classList.remove('hidden');
    } else {
        console.error("Vorheriger Schritt nicht gefunden: " + step);
    }
}

// TIMER //

let timerInterval;
let timeLeft = 120; // 2 Minuten in Sekunden
let breathingMessageVisible = false;

// Funktion zum Starten des Timers
function startTimer() {
    const timerElement = document.getElementById("timer");
    const messageElement = document.getElementById("breathing-check-message");

    if (!timerElement || !messageElement) {
        console.error("Timer-Elemente nicht gefunden!");
        return;
    }
    
    // Falls der Timer schon läuft, stoppen wir den alten Timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Start des Timers
    timerInterval = setInterval(function () {
        timeLeft--;
        
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if (timeLeft <= 0 && !breathingMessageVisible) {
            breathingMessageVisible = true;

            // Timer ausblenden und Nachricht anzeigen
            timerElement.classList.add("hidden");
            messageElement.classList.remove("hidden");

            // Nachricht für 15 Sekunden anzeigen
            setTimeout(function () {
                messageElement.classList.add("hidden");
                timerElement.classList.remove("hidden");

                // Timer zurücksetzen
                timeLeft = 120;
                breathingMessageVisible = false;
            }, 15000);
        }

        if (!breathingMessageVisible) {
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

// Funktion für den nächsten Schritt und Timer starten
function nextStep(step) {
    var steps = document.querySelectorAll('.question');
    steps.forEach(function(stepElement) {
        stepElement.classList.add('hidden');
    });

    var nextStepElement = document.getElementById(step);
    if (nextStepElement) {
        nextStepElement.classList.remove('hidden');
    } else {
        console.error("Schritt nicht gefunden: " + step);
    }

    if (step === 'step3a') {
        startTimer();
    }
}

// Funktion für den "KEINE Atmung"-Button, der zu Schritt 3b führt
function goToStep3b() {
    var steps = document.querySelectorAll('.question');
    steps.forEach(function(stepElement) {
        stepElement.classList.add('hidden');
    });

    var step3b = document.getElementById('step3b');
    if (step3b) {
        step3b.classList.remove('hidden');
    } else {
        console.error("Schritt 3b nicht gefunden!");
    }
}

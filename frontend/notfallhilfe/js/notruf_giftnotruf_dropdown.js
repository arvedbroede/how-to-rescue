function openDropdownOnClick() {
    var dropdown = document.getElementById("bundesland-auswahl");
    if (dropdown.size === 1) {
        dropdown.size = 17; // Hier wird die Dropdown-Liste angezeigt
    } else {
        dropdown.size = 1; // Hier wird die Dropdown-Liste wieder auf 1 gesetzt
    }
}

function closeDropdownOnLeave() {
    var dropdown = document.getElementById("bundesland-auswahl");
    dropdown.size = 1; // Hier wird die Dropdown-Liste wieder auf 1 gesetzt
}

function hideDropdown() {
    var dropdown = document.getElementById("bundesland-auswahl");
    dropdown.size = 1; // Hier wird die Dropdown-Liste wieder auf 1 gesetzt
}

function showEmergencyNumber() {
    var dropdown = document.getElementById("bundesland-auswahl");
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    var emergencyTitle = document.querySelector("#notrufnummer .notruf-titel");
    var emergencyNumber = document.querySelector("#notrufnummer .notruf-nummer");

    switch(selectedOption) {
        case "Berlin":
            emergencyTitle.textContent = "Berlin:";
            emergencyNumber.textContent = "030 - 19240";
            break;
        case "Nordrhein-Westfalen":
            emergencyTitle.textContent = "Bonn:";
            emergencyNumber.textContent = "0228 - 19240";
            break;
        case "Thüringen":
            emergencyTitle.textContent = "Erfurt:";
            emergencyNumber.textContent = "0361 - 730730";
            break;
        case "Baden-Württemberg":
            emergencyTitle.textContent = "Freiburg:";
            emergencyNumber.textContent = "0761 - 19240";
            break;
        case "Niedersachsen":
            emergencyTitle.textContent = "Göttingen:";
            emergencyNumber.textContent = "0551 - 19240";
            break;
        case "Schleswig-Holstein":
            emergencyTitle.textContent = "Kiel:";
            emergencyNumber.textContent = "431 - 19240";
            break;
        case "Sachsen-Anhalt":
            emergencyTitle.textContent = "Magdeburg:";
            emergencyNumber.textContent = "0391 - 19240";
            break;
        case "Sachsen":
            emergencyTitle.textContent = "Leipzig:";
            emergencyNumber.textContent = "0341 - 19240";
            break;
        case "Saarland":
            emergencyTitle.textContent = "Homburg/Saar:";
            emergencyNumber.textContent = "06841 - 19240";
            break;
        case "Rheinland-Pfalz":
            emergencyTitle.textContent = "Mainz:";
            emergencyNumber.textContent = "06131 - 19240";
            break;
        case "Mecklenburg-Vorpommern":
            emergencyTitle.textContent = "Rostock:";
            emergencyNumber.textContent = "0381 - 19240";
            break;
        case "Hessen":
            emergencyTitle.textContent = "Gießen:";
            emergencyNumber.textContent = "0641 - 19240";
            break;
        case "Hamburg":
            emergencyTitle.textContent = "Hamburg:";
            emergencyNumber.textContent = "040 - 19240";
            break;
        case "Bremen":
            emergencyTitle.textContent = "Bremen:";
            emergencyNumber.textContent = "0421 - 19240";
            break;
        case "Brandenburg":
            emergencyTitle.textContent = "Potsdam:";
            emergencyNumber.textContent = "0331 - 19240";
            break;
        case "Bayern":
            emergencyTitle.textContent = "München:";
            emergencyNumber.textContent = "089 - 19240";
            break;
        default:
            emergencyTitle.textContent = "";
            emergencyNumber.textContent = "";
            break;
    }

    hideDropdown(); // Hier wird das Dropdown-Menü nach der Auswahl geschlossen
}

// Event-Listener für das Klicken hinzufügen
document.getElementById("bundesland-auswahl").addEventListener("click", openDropdownOnClick);

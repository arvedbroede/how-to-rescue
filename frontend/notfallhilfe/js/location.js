function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15
    });

    var infoCoordinates = document.getElementById("coordinates");
    var infoAddress = document.getElementById("address");
    var dropdownContainer = document.querySelector(".giftnotruf-dropdown-container");
    var emergencyResult = document.querySelector(".giftnotruf-ergebnis");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map.setCenter(userLocation);

                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Ihr Standort"
                });

                // Koordinaten anzeigen
                infoCoordinates.textContent = `${userLocation.lat}, ${userLocation.lng}`;

                // Adresse mit Geocoding abrufen
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: userLocation }, function(results, status) {
                    if (status === "OK") {
                        if (results[0]) {
                            infoAddress.textContent = results[0].formatted_address;
                            getFederalState(results[0]);
                        } else {
                            infoAddress.textContent = "Keine Adresse gefunden.";
                            showDropdown(true);
                        }
                    } else {
                        infoAddress.textContent = "Geocoding fehlgeschlagen: " + status;
                        showDropdown(true);
                    }
                });

                console.log("Standort:", userLocation.lat, userLocation.lng);
            },
            function() {
                alert("Standortzugriff verweigert oder nicht verfügbar.");
                showDropdown(true);
            }
        );
    } else {
        alert("Geolocation wird von Ihrem Browser nicht unterstützt.");
        showDropdown(true);
    }
}

// 📌 Funktion zur Ermittlung des Bundeslands
function getFederalState(geocodeResult) {
    var bundesland = "";
    geocodeResult.address_components.forEach(component => {
        if (component.types.includes("administrative_area_level_1")) {
            bundesland = component.long_name;
        }
    });

    if (bundesland) {
        console.log("📌 Ermitteltes Bundesland:", bundesland);
        setDropdownValue(bundesland);
        showEmergencyNumber(bundesland);
        updateGiftnotrufView(bundesland); // Direkt das Ergebnis anzeigen
    } else {
        showDropdown(true);
    }
}

// 📌 Funktion zum Setzen des Dropdown-Werts
function setDropdownValue(bundesland) {
    var dropdown = document.getElementById("bundesland-auswahl");

    for (var i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === bundesland) {
            dropdown.selectedIndex = i;
            return;
        }
    }
}

// 📌 Funktion zum Verstecken des Dropdowns und Anzeigen des Ergebnisses
function updateGiftnotrufView(bundesland) {
    var dropdownContainer = document.querySelector(".giftnotruf-dropdown-container");
    var emergencyResult = document.querySelector(".giftnotruf-ergebnis");

    if (bundesland) {
        dropdownContainer.style.display = "none"; // Dropdown ausblenden
        emergencyResult.style.display = "block"; // Ergebnis anzeigen
        showEmergencyNumber(bundesland);
    } else {
        dropdownContainer.style.display = "block";
        emergencyResult.style.display = "none";
    }
}

// 📌 Notrufnummern je Bundesland
function showEmergencyNumber(bundesland) {
    var emergencyTitle = document.querySelector("#notrufnummer .notruf-titel");
    var emergencyNumber = document.querySelector("#notrufnummer .notruf-nummer");

    var notrufNummern = {
        "Berlin": "030 - 19240",
        "Nordrhein-Westfalen": "0228 - 19240",
        "Thüringen": "0361 - 730730",
        "Baden-Württemberg": "0761 - 19240",
        "Niedersachsen": "0551 - 19240",
        "Schleswig-Holstein": "431 - 19240",
        "Sachsen-Anhalt": "0391 - 19240",
        "Sachsen": "0341 - 19240",
        "Saarland": "06841 - 19240",
        "Rheinland-Pfalz": "06131 - 19240",
        "Mecklenburg-Vorpommern": "0381 - 19240",
        "Hessen": "0641 - 19240",
        "Hamburg": "040 - 19240",
        "Bremen": "0421 - 19240",
        "Brandenburg": "0331 - 19240",
        "Bayern": "089 - 19240"
    };

    if (notrufNummern[bundesland]) {
        emergencyTitle.textContent = bundesland + ":";
        emergencyNumber.textContent = notrufNummern[bundesland];
    } else {
        emergencyTitle.textContent = "Keine Nummer gefunden";
        emergencyNumber.textContent = "N/A";
    }
}

// 📌 Event Listener für manuelle Auswahl im Dropdown
document.getElementById("bundesland-auswahl").addEventListener("change", function() {
    var selectedBundesland = this.value;
    console.log("📌 Manuell ausgewähltes Bundesland:", selectedBundesland);
    showEmergencyNumber(selectedBundesland);
    updateGiftnotrufView(selectedBundesland); // Manuell auch direkt Ergebnis anzeigen
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchResultsContainer = document.querySelector('.search-results');
  
    const pages = [
        { title: 'Startseite', url: '../global/index.html', content: 'Home, How, To, Rescue, Main, Startseite, Index' },
        { title: 'Über uns', url: '../global/über-uns.html', content: 'Über Uns, About, Impressum' },
        { title: 'Notruf', url: '../notfallhilfe/notruf.html', content: 'Notruf, Hilfe, Telefon, Nummer, Feuerwehr, Rettungsdienst, Krangenwagen, Polizei, Ärztlicher Bereitschaftsdienst, Arzt' },
        { title: 'Notrufnummern', url: '../notfallhilfe/notruf.html', content: 'Kontakt, Hilfe, E-Mail, Telefon, Nummer' },
        { title: 'Impressum', url: '../global/impressum.html', content: 'Impressum' },
        { title: 'Bewusstlosigkeit', url: '../notfallhilfe/content/erste-hilfe-anleitungen/bewusstlosigkeit.html', content: 'Bewegungslos, Reanimation, Nicht Ansprechbar' },
        { title: 'Erste Hilfe', url: '../notfallhilfe/erste_hilfe.html', content: 'Erst Hilfe, First Aid, Helfen' },
        { title: 'Reanimation', url: '../notfallhilfe/content/erste-hilfe-anleitungen/bewusstlosigkeit.html', content: 'tot, Tod, Atemstillstand, Reanimation, Herz Lungen Wiederbelebung' },
    ];
    
    function displayResults(query) {
        searchResultsContainer.innerHTML = '';
  
        // Ergebnisse nur anzeigen, wenn mindestens 3 Zeichen eingegeben wurden
        if (query.length < 2) {
            searchResultsContainer.style.display = 'none';
            return;
        }
  
        const results = pages.filter(page =>
            page.title.toLowerCase().includes(query) ||
            page.content.toLowerCase().includes(query)
        );
  
        // Sortierung nach Genauigkeit der Übereinstimmung
        results.sort((a, b) => {
            const aTitleMatch = a.title.toLowerCase() === query;
            const bTitleMatch = b.title.toLowerCase() === query;
            const aContentMatch = a.content.toLowerCase() === query;
            const bContentMatch = b.content.toLowerCase() === query;
  
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            if (aContentMatch && !bContentMatch) return -1;
            if (!aContentMatch && bContentMatch) return 1;
  
            return a.title.localeCompare(b.title);
        });
  
        if (results.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.textContent = 'Keine Ergebnisse gefunden.';
            searchResultsContainer.appendChild(noResultsMessage);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = result.title;
                resultItem.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                searchResultsContainer.appendChild(resultItem);
            });
        }
  
        searchResultsContainer.style.display = 'block';
    }
  
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        displayResults(query);
    });
  
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        displayResults(query);
    });
  
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            displayResults(query);
        }
    });
  });
  
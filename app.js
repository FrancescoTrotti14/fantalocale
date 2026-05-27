// Database dei dati storici delle stagioni della Lega
const datiStagioni = {
    attuale: {
        titolo: "Stagione 2025/26",
        campionato: { primo: "FC BOTTIGLIA", secondo: "FC CADAVERI", terzo: "AM MUERT" },
        coppa: { vincente: "FC BOTTIGLIA", perdente_finale: "AC TROTTORIO" },
        classifica: [
            { pos: 1, squadra: "FC Bottiglia",   punti: "67", punteggio: 2591   },
            { pos: 2, squadra: "FC Cadaveri",    punti: "62", punteggio: 2616   },
            { pos: 3, squadra: "Am Muert",       punti: "57", punteggio: 2502.5 },
            { pos: 4, squadra: "Herta Vernello", punti: "49", punteggio: 2582   },
            { pos: 5, squadra: "AC Trottorio",   punti: "49", punteggio: 2540.5 },
            { pos: 6, squadra: "Sushi Gang",     punti: "42", punteggio: 2488   },
            { pos: 7, squadra: "Briatellekers",  punti: "39", punteggio: 2414   },
            { pos: 8, squadra: "MSC Cipolla",    punti: "29", punteggio: 2337   }
        ]
    },
    "2024_25": {
        titolo: "Stagione 2024/25",
        campionato: { primo: "AC TROTTORIO", secondo: "FC CADAVERI", terzo: "AM MUERT" },
        coppa: { vincente: "AC TROTTORIO", perdente_finale: "FC BOTTIGLIA" },
        classifica: [
            { pos: 1, squadra: "AC Trottorio", punti: "72", punteggio: 2650 },
            { pos: 2, squadra: "FC Cadaveri",  punti: "65", punteggio: 2580 },
            { pos: 3, squadra: "Am Muert",     punti: "58", punteggio: 2490 },
            { pos: 4, squadra: "FC Bottiglia", punti: "50", punteggio: 2410 }
        ]
    },
    "2023_24": {
        titolo: "Stagione 2023/24",
        campionato: { primo: "Briatellekers", secondo: "AC Trottorio", terzo: "Herta Vernello" },
        coppa: { vincente: "AC Trottorio", perdente_finale: "FC Cadaveri" },
        classifica: [
            { pos: 1, squadra: "Briatellekers",  punti: "69", punteggio: 2610 },
            { pos: 2, squadra: "AC Trottorio",   punti: "64", punteggio: 2550 },
            { pos: 3, squadra: "Herta Vernello", punti: "55", punteggio: 2500 },
            { pos: 4, squadra: "FC Cadaveri",    punti: "48", punteggio: 2420 }
        ]
    }
};

// Funzione per aggiornare la UI in base alla stagione selezionata
function aggiornaPagina(chiave) {
    const d = datiStagioni[chiave];
    if (!d) return;

    // Aggiornamento Titolo Hero con animazione
    const titolo = document.getElementById('titolo-stagione');
    titolo.classList.remove('fade');
    void titolo.offsetWidth; // Trigger reflow per riavviare l'animazione CSS
    titolo.classList.add('fade');
    titolo.innerHTML = d.titolo.replace(/(\d{4}\/\d{2,4})/, '<span>$1</span>');

    // Aggiornamento Podio Reale e Box Coppa
    document.getElementById('podio-1').innerText = d.campionato.primo;
    document.getElementById('podio-2').innerText = d.campionato.secondo;
    document.getElementById('podio-3').innerText = d.campionato.terzo;
    document.getElementById('podio-coppa').innerText = d.coppa.vincente;
    document.getElementById('podio-coppa-secondo').innerText = 'vs ' + d.coppa.perdente_finale;

    // Generazione dinamica delle righe della Tabella Classifica
    const tbody = document.getElementById('tabella-stagione');
    tbody.innerHTML = '';
    tbody.classList.remove('fade');
    void tbody.offsetWidth;
    tbody.classList.add('fade');

    d.classifica.forEach(r => {
        let badge;
        if (r.pos === 1) badge = `<span class="badge-pos badge-1">1</span>`;
        else if (r.pos === 2) badge = `<span class="badge-pos badge-2">2</span>`;
        else if (r.pos === 3) badge = `<span class="badge-pos badge-3">3</span>`;
        else badge = `<span style="color:var(--muted);font-family:'DM Mono',monospace;font-weight:500;font-size:.78rem">${r.pos}</span>`;

        tbody.innerHTML += `
        <tr>
            <td class="td-pos">${badge}</td>
            <td class="td-squadra">${r.squadra}</td>
            <td class="td-num">${r.punti}</td>
            <td class="td-num">${r.punteggio}</td>
        </tr>`;
    });
}

// Event Listeners per la gestione del cambio opzione
document.getElementById('selettore-stagione').addEventListener('change', e => aggiornaPagina(e.target.value));

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => aggiornaPagina('attuale'));
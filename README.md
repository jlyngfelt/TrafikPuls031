# TrafikPuls031

Ett modernt webbgränssnitt för att visa trafikinformation för Göteborgsområdet. Applikationen hämtar och filtrerar trafikdata från Sveriges Radios öppna API och visar relevanta trafikmeddelanden för Göteborg och närliggande områden.

## Funktioner

- **Filtrera trafikmeddelanden**: Visar endast meddelanden relaterade till Göteborgsområdet
- **Prioritetsvisualisering**: Färgkodning baserad på händelsens prioritet
- **Responsiv design**: Fungerar på både desktop och mobila enheter
- **Uppdatering i realtid**: Möjlighet att uppdatera data med ett knapptryck


## Teknologier

- **React 19**: För användargränssnittet
- **Vite**: Som byggverktyg
- **Sveriges Radio API**: Som datakälla för trafikinformation

## Projektstruktur

```
trafikpuls/
├── public/
├── src/
│   ├── components/
│   │   ├── BackgroundColor.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── InfoBox.jsx
│   │   ├── RefreshButton.jsx
│   │   ├── TraficCard.jsx
│   │   ├── TraficCardList.jsx
│   │   └── TraficGrid.jsx
│   ├── styles/
│   │   ├── cards.css
│   │   ├── footer.css
│   │   ├── grid.css
│   │   ├── header.css
│   │   ├── layout.css
│   │   ├── styles.css
│   │   └── variables.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Prioritetsnivåer

Applikationen använder följande färgkodning för trafikhändelser:

| Nivå | Beskrivning | Färg |
|------|-------------|------|
| 1 | Mycket allvarlig händelse | Orange (#cf8943) |
| 2 | Stor händelse | Olivgrön (#7c844e) |
| 3 | Störning | Turkos (#4e8482) |
| 4 | Information | Blå (#6276a3) |
| 5 | Mindre störning | Lila (#99668b) |


## API

Applikationen använder Sveriges Radios öppna API för att hämta trafikdata:
```
https://api.sr.se/api/v2/traffic/messages
```

För mer information om API:et, besök [Sveriges Radio Öppet API](https://sverigesradio.se/oppetapi).

## Licens

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE) för detaljer.

## Upphovsmän

- Jack Svensson
- Julia Lyngfelt

---

Skapad med [Vite](https://vitejs.dev/) och [React](https://reactjs.org/).
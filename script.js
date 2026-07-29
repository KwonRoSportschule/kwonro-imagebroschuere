const themen = {
    selbstvertrauen: {
        label: "Mehr Selbstvertrauen",
        titel: "Ich kann das schaffen.",
        absatzEins:
            "Kinder erleben im Training viele kleine Erfolge. Dabei merken sie: Mit Übung kann ich Herausforderungen meistern und über mich hinauswachsen.",
        absatzZwei:
            "Dieses Gefühl stärkt den Mut, auch außerhalb der Sportschule an die eigenen Fähigkeiten zu glauben."
    },

    disziplin: {
        label: "Disziplin spielerisch entwickeln",
        titel: "Dranbleiben lohnt sich.",
        absatzEins:
            "Klare Abläufe, gemeinsame Regeln und erreichbare Ziele geben Kindern Orientierung. Dabei lernen sie, aufmerksam zu bleiben und Verantwortung zu übernehmen.",
        absatzZwei:
            "Disziplin entsteht bei KwonRo nicht durch Druck, sondern durch positive Erfahrungen, regelmäßige Übung und Freude am Fortschritt."
    },

    fremde: {
        label: "Sicherer Umgang mit Fremden",
        titel: "Aufmerksam und selbstbewusst handeln.",
        absatzEins:
            "Kinder üben, auf ihr Gefühl zu achten, Abstand zu halten und deutlich Nein zu sagen, wenn ihnen eine Situation unangenehm vorkommt.",
        absatzZwei:
            "Außerdem lernen sie, sich frühzeitig an vertraute Erwachsene zu wenden und Hilfe zu holen."
    },

    noten: {
        label: "Lernen und Konzentration",
        titel: "Mit mehr Fokus bei der Sache.",
        absatzEins:
            "Im Training hören Kinder aufmerksam zu, merken sich Bewegungsfolgen und setzen Aufgaben Schritt für Schritt um.",
        absatzZwei:
            "Diese Gewohnheiten stärken Konzentration, Ausdauer und eine strukturierte Lernhaltung. Das kann sich durchaus positiv auf die schulischen Leistungen auswirken."
    },

    koordination: {
        label: "Koordination",
        titel: "Bewegungen sicher verbinden.",
        absatzEins:
            "Taekwondo verbindet Gleichgewicht, Reaktion, Beweglichkeit und die gezielte Zusammenarbeit von Armen und Beinen.",
        absatzZwei:
            "Durch abwechslungsreiche Übungen entwickeln Kinder ein besseres Körpergefühl und gewinnen Sicherheit in ihren Bewegungen."
    },

    mobbing: {
        label: "Sicher bei Mobbing",
        titel: "Haltung zeigen und Hilfe holen.",
        absatzEins:
            "Eine klare Stimme, eine aufrechte Haltung und das Wahrnehmen eigener Grenzen können Kindern in schwierigen Situationen mehr Sicherheit geben.",
        absatzZwei:
            "Bei KwonRo lernen sie: Konflikte möglichst vermeiden, deutlich Grenzen setzen und Unterstützung bei Erwachsenen suchen."
    },

    ausgleich: {
        label: "Ausgleich zum Schulalltag",
        titel: "Bewegen, abschalten, neue Energie sammeln.",
        absatzEins:
            "Nach einem langen Schultag hilft Bewegung dabei, den Kopf freizubekommen und angestaute Energie positiv zu nutzen.",
        absatzZwei:
            "Feste Trainingszeiten, Gemeinschaft und Erfolgserlebnisse schaffen einen wohltuenden Gegenpol zum Alltag."
    },

    selbstverteidigung: {
        label: "Selbstverteidigung",
        titel: "Gefahren früh erkennen.",
        absatzEins:
            "Gute Selbstverteidigung beginnt nicht mit einem Kampf. Kinder lernen, aufmerksam zu sein, Abstand zu schaffen und gefährliche Situationen möglichst zu verlassen.",
        absatzZwei:
            "Altersgerechte Techniken geben zusätzliche Handlungsmöglichkeiten, wenn Weggehen und Hilfeholen allein nicht ausreichen."
    }
};


const themaButtons = document.querySelectorAll(".thema-button");
const themenInhalt = document.getElementById("themenInhalt");


themaButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const ausgewaehltesThema = button.dataset.thema;
        const inhalt = themen[ausgewaehltesThema];

        themaButtons.forEach((andererButton) => {
            andererButton.classList.remove("aktiv");
            andererButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("aktiv");
        button.setAttribute("aria-pressed", "true");
        themenInhalt.classList.add("wechsel");

        window.setTimeout(() => {
            themenInhalt.innerHTML = `
                <p class="ergebnis-label">${inhalt.label}</p>
                <h3>${inhalt.titel}</h3>
                <p>${inhalt.absatzEins}</p>
                <p>${inhalt.absatzZwei}</p>
            `;

            themenInhalt.classList.remove("wechsel");
        }, 180);
    });
});


const bereiche = document.querySelectorAll(
    "#start, #taekwondo, #stundenplan, #programme, #events, #sponsoren"
);

const navLinks = document.querySelectorAll(".nav-link");


if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (eintraege) => {
            eintraege.forEach((eintrag) => {
                if (!eintrag.isIntersecting) {
                    return;
                }

                navLinks.forEach((link) => {
                    link.classList.remove("aktiv");
                });

                const passenderLink = document.querySelector(
                    `.nav-link[href="#${eintrag.target.id}"]`
                );

                if (passenderLink) {
                    passenderLink.classList.add("aktiv");
                }
            });
        },
        {
            rootMargin: "-20% 0px -55% 0px",
            threshold: 0
        }
    );

    bereiche.forEach((bereich) => {
        observer.observe(bereich);
    });
}


const animationsZiele = document.querySelectorAll(
    [
        ".willkommen",
        ".fotobereich",
        ".dunkelbereich > .eyebrow",
        ".dunkelbereich > h2",
        ".dunkelbereich > .einleitung",
        ".themen-auswahl",
        ".ergebnis-karte",
        ".standort-karte",
        ".abschluss-karte",
        ".programm-karte",
        ".graduierung",
        ".events-bereich > .eyebrow",
        ".events-bereich > h2",
        ".events-bereich > .einleitung",
        ".event-karte",
        ".sponsoren-bereich > .eyebrow",
        ".sponsoren-bereich > h2",
        ".sponsoren-flaeche"
    ].join(",")
);

const wenigerBewegung = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !wenigerBewegung) {
    animationsZiele.forEach((element, index) => {
        element.classList.add("einflug");

        if (index % 2 !== 0) {
            element.classList.add("einflug-von-rechts");
        }
    });

    const einflugObserver = new IntersectionObserver(
        (eintraege) => {
            eintraege.forEach((eintrag) => {
                if (!eintrag.isIntersecting) {
                    return;
                }

                eintrag.target.classList.add("sichtbar");
                einflugObserver.unobserve(eintrag.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    animationsZiele.forEach((element) => {
        einflugObserver.observe(element);
    });
}

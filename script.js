const themen = {
    sicherheit: {
        label: "Sicherheit/Selbstverteidigung",
        text:
            "Im Taekwondo lernen Kinder, sich in schwierigen Situationen richtig zu verhalten. Sie entwickeln ein gutes Gespür dafür, Gefahren frühzeitig zu erkennen und Konflikten möglichst aus dem Weg zu gehen. Falls es doch einmal nötig wird, kennen sie einfache und wirkungsvolle Techniken, um sich zu schützen. Das gibt Sicherheit und sorgt dafür, dass Kinder mit einem ganz anderen Gefühl durchs Leben gehen."
    },

    selbstbewusstsein: {
        label: "Selbstbewusstsein",
        text:
            "Jedes Kind wächst an seinen eigenen Erfolgen. Eine neue Technik, die nächste Gürtelprüfung oder ein schwieriges Ziel, das plötzlich gelingt, stärkt das Vertrauen in die eigenen Fähigkeiten. Dieses Selbstbewusstsein bleibt nicht in der Sportschule. Viele Kinder treten auch in der Schule, im Freundeskreis und im Alltag sicherer auf."
    },

    stress: {
        label: "Stress reduzieren",
        text:
            "Der Schulalltag fordert Kinder heute mehr denn je. Im Training können sie den Kopf freibekommen und sich ganz auf die Bewegung konzentrieren. Das hilft dabei, den Alltag für eine Weile auszublenden und neue Energie zu sammeln. Viele Eltern berichten, dass ihre Kinder nach dem Training ausgeglichener und entspannter sind."
    },

    fitness: {
        label: "Fitness/Beweglichkeit",
        text:
            "Taekwondo trainiert den ganzen Körper auf eine abwechslungsreiche Weise. Kraft, Ausdauer und Beweglichkeit entwickeln sich mit jeder Trainingseinheit. Die Übungen fördern eine gesunde Körperhaltung und machen Kinder fit für den Alltag. Dabei steht nicht Leistung im Vordergrund, sondern die Freude an der Bewegung."
    },

    koordination: {
        label: "Koordination",
        text:
            "Viele Techniken im Taekwondo verlangen ein gutes Zusammenspiel von Armen, Beinen und dem ganzen Körper. Dadurch verbessern Kinder ihre Koordination Schritt für Schritt. Auch Gleichgewicht und Reaktionsvermögen entwickeln sich weiter. Diese Fähigkeiten helfen nicht nur im Sport, sondern oft auch beim Lernen und in vielen Alltagssituationen."
    },

    "anti-mobbing": {
        label: "Anti-Mobbing",
        text:
            "Kinder, die selbstbewusst auftreten, werden häufig anders wahrgenommen. Im Taekwondo lernen sie, Grenzen klar zu setzen und auch in schwierigen Momenten ruhig zu bleiben. Gleichzeitig gehören Respekt und ein fairer Umgang mit anderen fest zum Training. So entwickeln sie die Stärke, Konflikte selbstbewusst und besonnen zu begegnen, ohne Gewalt als erste Lösung zu sehen."
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
                <p>${inhalt.text}</p>
            `;

            themenInhalt.classList.remove("wechsel");
        }, 180);
    });
});


const bereiche = document.querySelectorAll(
    "#start, #taekwondo, #stundenplan, #programme, #events, #sponsoren, #team, #stimmen"
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
                    passenderLink.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
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
        ".sponsoren-flaeche",
        ".team-bereich > .eyebrow",
        ".team-bereich > h2",
        ".team-bereich > .einleitung",
        ".team-karte",
        ".stimmen-bereich > .eyebrow",
        ".stimmen-bereich > h2",
        ".stimme-karte"
    ].join(",")
);

const wenigerBewegung = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if ("IntersectionObserver" in window && !wenigerBewegung) {
    animationsZiele.forEach((element) => {
        element.classList.add("einflug");
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


function alterAktualisieren() {
    const heute = new Date();
    const altersFelder = document.querySelectorAll("[data-geburtstag]");

    altersFelder.forEach((feld) => {
        const [jahr, monat, tag] = feld.dataset.geburtstag
            .split("-")
            .map(Number);

        let alter = heute.getFullYear() - jahr;
        const geburtstagWarSchon =
            heute.getMonth() + 1 > monat ||
            (
                heute.getMonth() + 1 === monat &&
                heute.getDate() >= tag
            );

        if (!geburtstagWarSchon) {
            alter -= 1;
        }

        feld.textContent = alter;
    });
}


alterAktualisieren();

const jetzt = new Date();
const naechsteMitternacht = new Date(
    jetzt.getFullYear(),
    jetzt.getMonth(),
    jetzt.getDate() + 1
);

window.setTimeout(() => {
    alterAktualisieren();
    window.setInterval(alterAktualisieren, 24 * 60 * 60 * 1000);
}, naechsteMitternacht - jetzt);

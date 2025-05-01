// EXISTANT :
function showEvent(eventId) {
    const events = document.querySelectorAll(".event");
    events.forEach((event) => (event.style.display = "none"));

    const selectedEvent = document.getElementById(eventId);
    if (selectedEvent) {
        launchConfetti();
        selectedEvent.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showEvent("event1");
    launchConfetti();
});

// IMAGE MODALE
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = imgElement.src;
    modal.classList.add("show");
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    modal.classList.remove("show");
}

// FORM MODALE
function openFormModal() {
    document.getElementById("formModal").style.display = "flex";
}

function closeFormModal(e) {
    if (e.target.id === "formModal") {
        document.getElementById("formModal").style.display = "none";
    }
}

// Gérer le formulaire
document
    .getElementById("responseForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("send").classList.add("hide");
        const nom = document.getElementById("nom").value;
        const nombre = document.getElementById("nombre").value;

        const serviceID = "default_service";
        const templateID = "template_xbtwwjy";

        emailjs.sendForm(serviceID, templateID, this).then(
            () => {
                alert(`Merci ${nom} ! ${nombre} personne(s) enregistrée(s).`);
                this.reset();
                document.getElementById("formModal").style.display = "none";
                document.getElementById("send").classList.remove("hide");
            },
            (err) => {
                alert(JSON.stringify(err));
                this.reset();
                document.getElementById("formModal").style.display = "none";
            }
        );
    });

// Détails MODALE
function openDetailsModal() {
    document.getElementById("detailsModal").style.display = "flex";
}

function closeDetailsModal(e) {
    if (e.target.id === "detailsModal") {
        document.getElementById("detailsModal").style.display = "none";
    }
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

const canvas = document.getElementById("scratchCanvas");
const hiddenContent = document.getElementById("hiddenContent");

if (canvas && hiddenContent) {
    const ctx = canvas.getContext("2d");
    let isScratching = false;
    let confettiTriggered = false;

    function resizeCanvasToMatch() {
        const rect = hiddenContent.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        // Dimensions physiques (interne canvas)
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;

        // Dimensions visuelles (style CSS)
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";

        // On ne scale pas le contexte (sinon le cercle sera déformé)
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Couleur de couverture
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function getCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const ratioX = canvas.width / rect.width;
        const ratioY = canvas.height / rect.height;

        return {
            x: (event.clientX - rect.left) * ratioX,
            y: (event.clientY - rect.top) * ratioY,
        };
    }

    function scratch(e) {
        if (!isScratching) return;

        const { x, y } = getCoordinates(e);

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2); // rayon 40 pour bien voir le rond
        ctx.fill();
    }

    function startScratch(e) {
        e.preventDefault();
        isScratching = true;
        scratch(e);
    }

    function stopScratch() {
        isScratching = false;

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;
        let transparentPixels = 0;

        for (let i = 3; i < imageData.length; i += 4) {
            if (imageData[i] === 0) {
                transparentPixels++;
            }
        }

        const transparency =
            (transparentPixels / (canvas.width * canvas.height)) * 100;

        if (transparency > 30 && !confettiTriggered) {
            canvas.style.display = "none";
            launchConfetti();
            confettiTriggered = true;
        }
    }

    // Événements
    canvas.addEventListener("pointerdown", startScratch);
    canvas.addEventListener("pointermove", scratch);
    canvas.addEventListener("pointerup", stopScratch);
    canvas.addEventListener("pointercancel", stopScratch);

    // Init + resize dynamique
    resizeCanvasToMatch();
    window.addEventListener("resize", resizeCanvasToMatch);
}

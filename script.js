// EXISTANT :
function showEvent(eventId) {
    const events = document.querySelectorAll('.event');
    events.forEach(event => event.style.display = 'none');

    const selectedEvent = document.getElementById(eventId);
    if (selectedEvent) {
        selectedEvent.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showEvent('event1');
});

// IMAGE MODALE
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    modal.style.display = 'flex';
    modalImg.src = imgElement.src;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}

// FORM MODALE
function openFormModal() {
    document.getElementById('formModal').style.display = 'flex';
}

function closeFormModal(e) {
    if (e.target.id === 'formModal') {
        document.getElementById('formModal').style.display = 'none';
    }
}

// Gérer le formulaire
document.getElementById('responseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;

    alert(`Merci ${name} ! ${guests} personne(s) enregistrée(s).`);

    this.reset();
    document.getElementById('formModal').style.display = 'none';
});

// Détails MODALE
function openDetailsModal() {
    document.getElementById('detailsModal').style.display = 'flex';
}

function closeDetailsModal(e) {
    if (e.target.id === 'detailsModal') {
        document.getElementById('detailsModal').style.display = 'none';
    }
}

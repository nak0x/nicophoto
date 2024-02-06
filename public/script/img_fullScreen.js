console.log("coucou");

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.modal-trigger'); // Sélectionne toutes les images
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    images.forEach(image => {
        image.addEventListener('click', function() {
            modalImage.src = this.src; // Définit la source de l'image du modal à celle de l'image cliquée
            modal.classList.remove('hidden'); // Affiche le modal
        });
    });

    modal.addEventListener('click', closeImageModal); // Ajoute un écouteur pour fermer le modal
});

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden'); // Cache le modal
}




document.getElementById('closeModal').addEventListener('click', function(event) {
    event.stopPropagation(); // Empêche l'événement de se propager au modal lui-même
    closeImageModal();
});



// Exemple de fonction pour naviguer vers l'image précédente
document.getElementById('prevImage').addEventListener('click', function(event) {
    event.stopPropagation();
    // Logique pour passer à l'image précédente
});



// Exemple de fonction pour naviguer vers l'image suivante
document.getElementById('nextImage').addEventListener('click', function(event) {
    event.stopPropagation();
    // Logique pour passer à l'image suivante
});
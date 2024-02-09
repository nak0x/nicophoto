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


// Ajout d'options sur le modal

document.getElementById('closeModal').addEventListener('click', function(event) {
    event.stopPropagation(); // Empêche l'événement de se propager au modal lui-même
    closeImageModal();
});

const images = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    // Ajoute d'autres URLs d'images selon tes besoins
];
let currentIndex = 0; // Index de l'image actuellement affichée

function showImage(index) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = images[index];
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Retour au début si on est à la fin
    }
    showImage(currentIndex);
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1; // Aller à la fin si on est au début
    }
    showImage(currentIndex);
}

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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nextImage').addEventListener('click', function(event) {
        event.stopPropagation();
        nextImage();
    });

    document.getElementById('prevImage').addEventListener('click', function(event) {
        event.stopPropagation();
        prevImage();
    });
    
});

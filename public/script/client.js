
let imageUrls = [];

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.modalImage');
    imageUrls = Array.from(images).map((img) => (
        { url: img.getAttribute('data-url'), uid: img.getAttribute('data-uid') }
    ));

    console.log(imageUrls);
    // const result = await fetchData("https://picsum.photos/v2/list", "GET");
    const grid = document.querySelector('.masonry-grigri');



    // Initialisation de Masonry après l'ajout des images

    var msnry = new Masonry('.masonry-grigri', {
        columnWidth: 416,
        itemSelector: '.grid-item'

    });

    imagesLoaded(grid, () => {
        msnry.layout();
    })




    // imageUrls = result.map(element => element.download_url); // Stocke les URLs dans le tableau global

    addImageListeners();
    setupNavigation();
    updateFavoriteVisualState(); // Met à jour l'état visuel des favoris après l'affichage des images

})








// Assurez-vous que cette nouvelle fonction est appelée lors du chargement de la page
function addImageListeners() {
    const images = document.querySelectorAll('.modal-trigger');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const cross = document.getElementById('closeModal');

    images.forEach(image => {
        image.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            showModalImage(index);
            modal.classList.remove('hidden');
        });
    });

    // ferme l'image en cliquant sur la croix
    cross.addEventListener('click', function () {
        modal.classList.add('hidden');
    });

    // fonction de navigation
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeImageModal(); // sort de l'image plein écran en appuyant sur echap
        } else if (event.key === 'ArrowLeft') {
            previousImage(event); // déplace vers la gauche avec les flèches
        } else if (event.key === 'ArrowRight') {
            nextImage(event); // déplace vers la droite avec les flèches
        }
    });
}


function showModalImage(index) {
    const modalImage = document.getElementById('modalImage');
    const dlImage = document.getElementById('dl-image');
    const favButton = document.getElementById('add-fav-image');
    // if (index >= 0 && index < imageUrls.length) {
    modalImage.src = imageUrls[index].url;
    modalImage.setAttribute('data-index', index);
    dlImage.setAttribute('data-uid', imageUrls[index].uid);
    updateFavoriteVisualState();

    // favButton.onclick = () => toggleFavorite(imageUrls[index], index); // Ajoute l'image aux favoris ou la supprime

}
// }

document.querySelector('#dl-image').addEventListener("click", downloadImage) 

async function downloadImage() {
    const img = await fetchData(`/album/${document.querySelector('body').getAttribute("data-uid")}/images/download`, 'POST', {
        image_uids: [document.querySelector('#dl-image').getAttribute('data-uid')]
    })
    console.log(img);

}


// Cache le modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');

}

// Empeche l'événement de se propager au modal lui-même
function previousImage(event) {
    event.stopPropagation();
    navigateModal(-1);
}

// Empeche l'événement de se propager au modal lui-même
function nextImage(event) {
    event.stopPropagation();
    navigateModal(1);
}







function setupNavigation() {
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');

    prevButton.addEventListener('click', (event) => {
        previousImage(event);
    });

    nextButton.addEventListener('click', (event) => {
        nextImage(event);
    });
}

function navigateModal(direction) {
    let currentIndex = parseInt(document.getElementById('modalImage').getAttribute('data-index'), 10);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < imageUrls.length) {
        showModalImage(newIndex);
    }
}





// fin favoris

// changement de l'état des favoris
function toggleFavorite(index) {
    // Récupère le tableau des favoris depuis localStorage, ou initialise un tableau vide si aucun favori n'est trouvé
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const isFavorite = favorites.includes(index);
    const svgIcon = document.querySelector(`#add-fav-image-${index} svg`);

    if (isFavorite) {
        // Si l'image est déjà un favori, la retire du tableau
        svgIcon.classList.remove('active');

        favorites = favorites.filter(i => i !== index);
    } else {
        // Si l'image n'est pas un favori, l'ajoute au tableau
        svgIcon.classList.add('active');

        favorites.push(index);
    }

    // Met à jour le tableau des favoris dans localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Met à jour visuellement l'icône de favori
    updateFavoriteVisualState();
}

// fin changement de l'état des favoris



function updateFavoriteVisualState() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.modal-trigger').forEach((img) => {
        const svgIcon = document.querySelector(`#add-fav-image-${img.getAttribute('data-uid')} svg`);
        if (favorites.includes(img.getAttribute('data-uid'))) {
            svgIcon.classList.add('active');
        } else {
            svgIcon.classList.remove('active');
        }
    });
}


function getFavorites() {
    // favorites existe dans le localStorage
    if (localStorage.getItem('favorites')) {
        // Récup 'favorites' converti en tableau et retourner
        return JSON.parse(localStorage.getItem('favorites'));
    } else {
        // Si 'favorites' n'existe pas, retourner un tableau vide
        console.log('Aucun favori trouvé.');
        return [];
    }
}

// Utilisation de la fonction
const favorites = getFavorites();
console.log(favorites); // Affichera vos favoris ou un tableau vide
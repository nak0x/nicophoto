let imageUrls = [];

// nouvelle version

async function fetchAndDisplayImages() {
    try {
       
        const result = await fetchData("https://picsum.photos/v2/list", "GET");
        const grid = document.getElementById('photo-grid');
        const columnCount = 4; // Nombre de colonnes
        const columns = Array.from({ length: columnCount }, () => document.createElement('div'));
        columns.forEach(column => {
            column.className = 'grid gap-4 h-fit';
            grid.appendChild(column);
        });
        imageUrls = result.map(element => element.download_url); // Stocke les URLs dans le tableau global


        result.forEach((element, index) => {
            const imgDiv = document.createElement('div');
            const img = document.createElement('img');
            imgDiv.className = "h-fit overflow-hidden rounded-lg relative";
            img.src = element.download_url; // Utilise la propriété correcte de l'API
            img.className = "modal-trigger modalImage h-auto w-full rounded-lg cursor-pointer hover:scale-110 transition-transform duration-500 block";
            img.alt = "Image loaded from API";
            img.setAttribute('data-index', index); // placé après la création de `img`
            
            const favDiv = document.createElement('div');
            favDiv.className = "absolute top-0 right-0 p-2"; // Positionne l'icône en haut à droite
            favDiv.innerHTML = `
                <a href="" id="add-fav-image-${index}" class="add-fav-image"> <!-- Ajoutez un index pour rendre l'ID unique -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="favorite-icon h-6 w-6 text-white hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.492 4.492 0 00-6.364 0z" />
                    </svg>
                </a>
            `;

            favDiv.querySelector('.add-fav-image').addEventListener('click', function(event) {
                event.preventDefault(); // Empêche le comportement par défaut du lien
                event.stopPropagation(); // Empêche l'événement de cliquer sur l'image elle-même
                toggleFavorite(imageUrls[index], index);
            });
        
            imgDiv.appendChild(img);
            imgDiv.appendChild(favDiv); // Ajoute l'icône de favori à imgDiv
            columns[index % columnCount].appendChild(imgDiv);
        });
        addImageListeners();
        setupNavigation();
        
         
        updateFavoriteVisualState(); // Met à jour l'état visuel des favoris après l'affichage des images
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayImages);



function toggleFavorite(imageUrl, index) {
    
    // Récupère le tableau des favoris depuis localStorage, ou initialise un tableau vide si aucun favori n'est trouvé
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Trouve l'élément SVG de l'icône de favori basé sur l'index
    const svgIcon = document.querySelector(`#add-fav-image-${index} svg`);

    // Vérifie si l'URL de l'image est déjà dans le tableau des favoris
    const isFavorite = favorites.includes(imageUrl);

    if (isFavorite) {
        // Si l'image est déjà un favori, la retire du tableau et supprime la classe 'active'
        favorites = favorites.filter(url => url !== imageUrl);
        svgIcon.classList.remove('active');
    } else {
        // Si l'image n'est pas un favori, l'ajoute au tableau et applique la classe 'active'
        favorites.push(imageUrl);
        svgIcon.classList.add('active');
    }

    // Met à jour le tableau des favoris dans localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Fonction pour mettre à jour l'état visuel des favoris
function updateFavoriteVisualState() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.modalImage').forEach((img) => {
        const imageUrl = img.getAttribute('src');
        const favIcon = img.nextElementSibling.querySelector('.favorite-icon');
        if (favorites.includes(imageUrl)) {
            favIcon.classList.add('active');
        } else {
            favIcon.classList.remove('active');
        }
    });
}



// Assurez-vous que cette nouvelle fonction est appelée lors du chargement de la page
function addImageListeners() {
    const images = document.querySelectorAll('.modal-trigger');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const cross = document.getElementById('closeModal');

    images.forEach(image => {
        image.addEventListener('click', function() {
            const index = this.getAttribute('data-index'); 
            showModalImage(index); 
            modal.classList.remove('hidden');
        });
    });
    cross.addEventListener('click', function() {
        modal.classList.add('hidden'); // ferme l'image en cliquant sur la croix
    });






    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeImageModal(); // sort de l'image plein écran en appuyant sur echap
        } else if(event.key === 'ArrowLeft'){
            console.log("left")
            previousImage(event); // déplace vers la gauche avec les flèches
        }else if(event.key === 'ArrowRight'){
            console.log("right");
            nextImage(event); // déplace vers la droite avec les flèches
        }
    });
}


function showModalImage(index) {
    const modalImage = document.getElementById('modalImage');
    const dlImage = document.getElementById('dl-image');
    const favButton = document.getElementById('add-fav-image');
    if (index >= 0 && index < imageUrls.length) {
        modalImage.src = imageUrls[index];
        modalImage.setAttribute('data-index', index);
        dlImage.href = imageUrls[index]; // set l'adresse url du lien en fonction de l'image actuel
        dlImage.setAttribute('data-index', index);

        // favButton.onclick = () => toggleFavorite(imageUrls[index], index); // Ajoute l'image aux favoris ou la supprime

    }
}













function closeImageModal() {
     const modal = document.getElementById('imageModal');
     modal.classList.add('hidden'); // Cache le modal

 }

 function previousImage(event){
        event.stopPropagation(); // Empêche l'événement de se propager au modal lui-même
        navigateModal(-1); 
 }

 function nextImage(event){
    event.stopPropagation(); // Empêche l'événement de se propager au modal lui-même
    navigateModal(1); 
}







 function setupNavigation() {
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');

    prevButton.addEventListener('click', (event) => {
        console.log('test');
        previousImage(event);
    });

    nextButton.addEventListener('click', (event) => {
        console.log('test');
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

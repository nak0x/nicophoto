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
            imgDiv.className = "h-fit overflow-hidden rounded-lg";
            img.src = element.download_url; // Utilise la propriété correcte de l'API
            img.className = "modal-trigger modalImage h-auto w-full rounded-lg cursor-pointer hover:scale-110 transition-transform duration-500 block";
            img.alt = "Image loaded from API";
            img.setAttribute('data-index', index); // placé après la création de `img`
            
            imgDiv.appendChild(img);
            // qjoute l'image à la colonne correspondante en utilisant une distribution équitable
            columns[index % columnCount].appendChild(imgDiv);
        });
        addImageListeners();
        setupNavigation(); 
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayImages);

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
        modal.classList.add('hidden');
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeImageModal();
        } else if(event.key === 'ArrowLeft'){
            console.log("left")
            previousImage(event);
        }else if(event.key === 'ArrowRight'){
            console.log("right");
            nextImage(event);
        }
    });
}


function showModalImage(index) {
    const modalImage = document.getElementById('modalImage');
    const dlImage = document.getElementById('dl-image');
    if (index >= 0 && index < imageUrls.length) {
        modalImage.src = imageUrls[index];
        modalImage.setAttribute('data-index', index);
        dlImage.src = imageUrls[index];
        dlImage.setAttribute('data-index', index);
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


// fetchData("https://picsum.photos/v2/list", "GET").then(result=>{ 
//     const urlsImages = [];
//         result.forEach(element => {
            
//             urlsImages.push(element.url); // ajoute l'url de chaque image au tableau urlsImages
        
//     });
//     console.log(urlsImages);
// })



// fetchData("https://picsum.photos/v2/list", "GET").then(result => {
//     const grid = document.getElementById('photo-grid');
//     const columnCount = 4; // Nombre de colonnes
//     const columns = Array.from({ length: columnCount }, () => document.createElement('div'));
//     columns.forEach(column => {
//         column.className = 'grid gap-4 h-fit';
//         grid.appendChild(column);
//     });

//     result.forEach((element, index) => {
//         const imgDiv = document.createElement('div');
//         const img = document.createElement('img');
//         imgDiv.className = "h-fit";
//         img.src = element.download_url; // Utilise la propriété correcte de l'API
//         img.className = "modal-trigger modalImage h-auto w-full rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 block";
//         img.alt = "Image loaded from API";
        
//         imgDiv.appendChild(img);
//         // Ajoute l'image à la colonne correspondante en utilisant une distribution équitable
//         columns[index % columnCount].appendChild(imgDiv);
//     });
// }).catch(error => console.error('Error:', error));


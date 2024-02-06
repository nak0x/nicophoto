async function fetchData(url, method, data) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

const baseUrl = 'http://localhost:8000';

const adminUrl = `${baseUrl}/admin`;
fetchData(adminUrl, 'GET')
    .then(response => {
        console.log('Connecté à la page d\'admin', response);
    })
    .catch(error => {
        console.error('Impossible de se connecter à la page d\'admin:', error);
    });

const addAlbumUrl = `${baseUrl}/albums`;
const albumData = { title: 'New Album' };
fetchData(addAlbumUrl, 'POST', albumData)
    .then(response => {
        console.log('Album ajouté:', response);
    })
    .catch(error => {
        console.error('Impossible d\'ajouté un nouvel album:', error);
    });

const albumId = 1;
const updateAlbumUrl = `${baseUrl}/albums/${albumId}`;
const updatedAlbumData = { title: 'Mise à jour de l\'album' };
fetchData(updateAlbumUrl, 'PUT', updatedAlbumData)
    .then(response => {
        console.log('Album mis à jour:', response);
    })
    .catch(error => {
        console.error('Echec de la mise à jour de l\'album:', error);
    });

const deleteAlbumUrl = `${baseUrl}/albums/${albumId}`;
fetchData(deleteAlbumUrl, 'DELETE')
    .then(response => {
        console.log('Album supprimé:', response);
    })
    .catch(error => {
        console.error('Impossible de supprimer l\'album:', error);
    });

const addImagesUrl = `${baseUrl}/images`;
const imageUrls = ['image1.jpg', 'image2.jpg'];
const imageData = { albumId: albumId, urls: imageUrls };
fetchData(addImagesUrl, 'POST', imageData)
    .then(response => {
        console.log('Image rajoutée:', response);
    })
    .catch(error => {
        console.error('Impossible d\'ajouter les images:', error);
    });

const removeImagesUrl = `${baseUrl}/images`;
const imageIds = [1, 2];
const removeImageData = { albumId: albumId, imageIds: imageIds };
fetchData(removeImagesUrl, 'DELETE', removeImageData)
    .then(response => {
        console.log('Image supprimée:', response);
    })
    .catch(error => {
        console.error('Impossible de supprimer les images:', error);
    });
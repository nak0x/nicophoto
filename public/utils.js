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
        console.log('Connected to admin:', response);
    })
    .catch(error => {
        console.error('Failed to connect to admin:', error);
    });

const addAlbumUrl = `${baseUrl}/albums`;
const albumData = { title: 'New Album' };
fetchData(addAlbumUrl, 'POST', albumData)
    .then(response => {
        console.log('Album added:', response);
    })
    .catch(error => {
        console.error('Failed to add album:', error);
    });

const albumId = 1;
const updateAlbumUrl = `${baseUrl}/albums/${albumId}`;
const updatedAlbumData = { title: 'Updated Album' };
fetchData(updateAlbumUrl, 'PUT', updatedAlbumData)
    .then(response => {
        console.log('Album updated:', response);
    })
    .catch(error => {
        console.error('Failed to update album:', error);
    });

const deleteAlbumUrl = `${baseUrl}/albums/${albumId}`;
fetchData(deleteAlbumUrl, 'DELETE')
    .then(response => {
        console.log('Album deleted:', response);
    })
    .catch(error => {
        console.error('Failed to delete album:', error);
    });

const addImagesUrl = `${baseUrl}/images`;
const imageUrls = ['image1.jpg', 'image2.jpg'];
const imageData = { albumId: albumId, urls: imageUrls };
fetchData(addImagesUrl, 'POST', imageData)
    .then(response => {
        console.log('Images added:', response);
    })
    .catch(error => {
        console.error('Failed to add images:', error);
    });

// Remove images
const removeImagesUrl = `${baseUrl}/images`;
const imageIds = [1, 2]; // IDs of the images to remove
const removeImageData = { albumId: albumId, imageIds: imageIds };
fetchData(removeImagesUrl, 'DELETE', removeImageData)
    .then(response => {
        console.log('Images removed:', response);
    })
    .catch(error => {
        console.error('Failed to remove images:', error);
    });
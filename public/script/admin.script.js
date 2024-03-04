document.addEventListener('DOMContentLoaded', () => {
    const folderButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const folderModal = document.getElementById('folder-creation-modal');
    
    folderButton.addEventListener('click', function() {
        folderModal.classList.remove('hidden'); // Affiche le modal de création de dossier
    });

    closeButton.addEventListener('click', function() {
        folderModal.classList.add('hidden');
    });

});

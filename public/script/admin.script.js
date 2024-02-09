// document.addEventListener('DOMContentLoaded', () => {
    const folderButton = document.querySelector('[data-modal-toggle="folder-creation-modal"]'); // Sélectionnez votre bouton de déclenchement de la modal de création de dossier
    const folderModal = document.getElementById('folder-creation-modal');

    folderButton.addEventListener('click', function() {
        folderModal.classList.remove('hidden'); // Affiche le modal de création de dossier
    });

    folderModal.addEventListener('click', function(event) {
        if (event.target === this) {
            folderModal.classList.add('hidden'); // Cache le modal de création de dossier si l'utilisateur clique à l'extérieur de la modal
        }
    });

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function(event) {
        folderModal.classList.add('hidden'); // Cache le modal de création de dossier lorsque le bouton de fermeture est cliqué
    });
// });

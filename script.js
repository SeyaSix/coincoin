// ===== SCRIPT POUR LA BARRE DE SCROLL PERSONNALISÉE AVEC CANARD =====

// Récupération des éléments DOM
const customScrollbar = document.querySelector('.custom-scrollbar');
const waterColumn = document.querySelector('.water-column');
const duckScroll = document.querySelector('.duck-scroll');

// ===== MODALE DONALD =====
const donaldLink = document.getElementById('donald-link');
const donaldModal = document.getElementById('donald-modal');
const closeModal = document.getElementById('close-modal');

if (donaldLink && donaldModal && closeModal) {
    // Ouvre la modale au clic sur le lien
    donaldLink.addEventListener('click', function(e) {
        e.preventDefault();
        donaldModal.style.display = 'block';
    });
    // Ferme la modale au clic sur la croix
    closeModal.addEventListener('click', function() {
        donaldModal.style.display = 'none';
    });
    // Ferme la modale au clic en dehors du contenu
    window.addEventListener('click', function(event) {
        if (event.target === donaldModal) {
            donaldModal.style.display = 'none';
        }
    });
}

// Fonction pour mettre à jour la position du canard et de l'eau
function updateScrollPosition() {
    // Calcul du pourcentage de scroll (0 à 100)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min((scrollTop / scrollHeight) * 100, 100);
    
    // Calcul de la hauteur de l'eau (inverse du scroll pour que l'eau monte quand on descend)
    const waterHeight = 100 - scrollPercentage;
    
    // Mise à jour de la hauteur de la colonne d'eau
    waterColumn.style.height = waterHeight + '%';
    
    // Calcul de la position du canard (il doit flotter sur l'eau)
    const duckPosition = Math.max(waterHeight - 10, 5); // Le canard flotte 10% au-dessus de l'eau, minimum 5%
    
    // Mise à jour de la position du canard
    duckScroll.style.bottom = duckPosition + '%';
    
    // Effet visuel : changement de couleur de l'eau selon la profondeur
    const waterOpacity = Math.max(0.3, waterHeight / 100);
    waterColumn.style.background = `linear-gradient(to bottom, transparent, rgba(135, 206, 235, ${waterOpacity}))`;
}

// Fonction d'initialisation
function initCustomScrollbar() {
    // Vérification que tous les éléments nécessaires existent
    if (!customScrollbar || !waterColumn || !duckScroll) {
        console.error('Éléments de la barre de scroll personnalisée non trouvés');
        return;
    }
    
    // Écouteur d'événement pour le scroll
    window.addEventListener('scroll', updateScrollPosition);
    
    // Initialisation au chargement de la page
    updateScrollPosition();
    
    console.log('Barre de scroll personnalisée initialisée avec succès ! 🦆');
}

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', initCustomScrollbar);

// Écouteur d'événement pour le redimensionnement de la fenêtre
window.addEventListener('resize', updateScrollPosition); 
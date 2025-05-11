document.addEventListener('DOMContentLoaded', () => {

  console.log("DOM chargé, initialisation de FlipDown..."); // Message de débogage

  // --- Initialisation de FlipDown ---

  // 1. Définir la date/heure de fin du compte à rebours
  //    Date cible : 17 Juillet 2025 à 00:00:00 UTC
  var targetDate = new Date('2025-07-17T00:00:00Z'); // 'Z' indique UTC
  var futureTimestamp = targetDate.getTime() / 1000; // Convertit en timestamp UNIX (secondes)

  // L'ancienne méthode (3 jours à partir de maintenant) est supprimée/remplacée par celle ci-dessus.

  // 2. Vérifier si l'élément existe avant d'initialiser
  var flipdownElement = document.getElementById('flipdown');

  if (flipdownElement) {
    // Vérifier si le timestamp est valide (dans le futur)
    if (futureTimestamp > (new Date().getTime() / 1000)) {
        console.log("Élément #flipdown trouvé. Timestamp cible (secondes):", futureTimestamp); // Débogage

        // 3. Initialiser FlipDown
        try {
          var flipdown = new FlipDown(futureTimestamp, 'flipdown', { // 'flipdown' est l'ID de votre div
            theme: 'light', // Options : 'dark' ou 'light'
            // headings: ["Jours", "Heures", "Minutes", "Secondes"], // Décommentez pour traduire
          })
          .start() // Démarre le compte à rebours
          .ifEnded(() => { // Fonction appelée quand le compte à rebours est terminé
            console.log('Le compte à rebours est terminé !');
            flipdownElement.innerHTML = "<h2 style='color: white; text-shadow: 1px 1px 3px rgba(0,0,0,0.7);'>Le festival a commencé !</h2>"; // Message de fin
          });

          console.log("FlipDown initialisé."); // Débogage

          // --- Affichage de la version (Optionnel) ---
          var verElement = document.getElementById('ver');
          if (verElement) {
            verElement.innerHTML = flipdown.version;
          }

        } catch (e) {
          console.error("Erreur lors de l'initialisation de FlipDown:", e);
          // Afficher un message d'erreur à l'utilisateur si nécessaire
          flipdownElement.innerHTML = "<p style='color:red; background: white; padding: 5px;'>Erreur compteur.</p>";
        }
    } else {
        console.warn("La date cible est dans le passé. Le compteur ne démarrera pas ou affichera 0.");
        flipdownElement.innerHTML = "<p style='color:orange; background: white; padding: 5px;'>Date cible passée.</p>"; // Message si date passée
    }
  } else {
    console.error("L'élément avec l'ID 'flipdown' n'a pas été trouvé dans le DOM.");
  }

}); // Fin de DOMContentLoaded

console.log("Archivo de música cargado correctamente");

function toggleMusic() {
    console.log("Clic detectado en el emoji");
    const player = document.getElementById("music-player");
    
    if (!player) {
        console.error("Error: No se encontró el div music-player");
        return;
    }

    // Usamos esto para asegurarnos de que cambie sí o sí
    if (player.classList.contains("music-hidden")) {
        player.classList.remove("music-hidden");
        player.classList.add("music-show");
        console.log("Mostrando reproductor...");
    } else {
        player.classList.remove("music-show");
        player.classList.add("music-hidden");
        console.log("Ocultando reproductor...");
    }
}
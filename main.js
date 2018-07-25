//Service worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los service workers');

    //registramos un sw
    navigator.serviceWorker.register('./sw.js')
        //esto devuelve una promesa, y lo que devuelva lo capturamos en un resultado y lo devolvemos en la consola

    .then(res => console.log('serviceWorker cargado correctamente', res))
        .catch(err => console.log('serviceWorker no se ha podido registrar', err));



} else {
    console.log('No se puede usar los service worker');

}




//Scroll suavizado
$(document).ready(function() {
    $("#menu a").click(function(e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top

        });
        return false;
    });
});
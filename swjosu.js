//Asignar nombre y versión de cache
const CACHE_NAME = 'v1_cache_josu_motoso_pwa';
//Ficheros a cachear en la aplicación
// Ficheros a cachear en la aplicación
urlsToCache = [
    '../',
    '../css/styles.css',
    '../js/main.js',
    '../img/favicon.png',
    '../img/1.png',
    '../img/2.png',
    '../img/3.png',
    '../img/4.png',
    '../img/5.png',
    '../img/6.png',
    '../img/facebook.png',
    '../img/instagram.png',
    '../img/twitter.png'
];


//Eventos para la instalacion activacion y fetch (consigue toda la info de internet, hace una consulta al backend)
//Utilizamos la variable self que es la variable del sw. 
//Evento Install (se encarga de la instalacion del serviceworker y almacenar en cache los recursos estaticos de la aplicación -- urlsToCache)
self.addEventListener('install', e => {

    e.waitUntil(

        caches.open(CACHE_NAME)
        //esto devuelve una promesa
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    //espera a que se guarden todos los archivos en cache
                    self.skipwaiting();
                });

        })
        .catch(err => console.log('No se ha registrado el cache', err))

    );

});


//Evento activate
//Una vez que se instale el service worker, este evento hace que se active y funcione sin conexión
//Esto va a tener una función de callback que va a recoger el evento como parámetro
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        //keys lo que hace es recoger todos los elementos que hay en la cache
        caches.keys()
        //esto es una promesa
        .then(cacheNames => {
            return Promise.all(
                //recorremos todos los elementos d ela cache (.map nos permite recorrer un array)
                //cacheNames tiene todos los elementos guardados en el navegador
                cacheNames.map(cacheName => {
                    //en cada iteración cogemos cada uno de los elementos en la cache y creamos una variable llamada CacheName
                    //buscamos dentro de esa cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        //borramos los elementos que no necestamos
                        // si hay algun elemento que ya no exista (ya que con keys, estamos recogiendo todos los elementos en cache del navegador) en la cache lo borramos
                        return caches.delete(cacheName);
                    }
                })

            );
        })

        .then(() => {

            //activa la cache en el dispositivo
            self.clients.claim();

        })


    );

});


//Evento fetch
//para páginas con diferentes secciones, si no existe los elementos de esa sección en cache, los cachea.
self.addEventListener('fetch', e => {
    //respondeme con datos que hay en la cache o datos conseguidos desde el navegador
    e.respondWith(
        //miramos si esta información ya esta cacheada
        caches.match(e.request)
        .then(res => {
            //si la info ya esta en cache, me devuelve los datos de la propia cache
            if (res) {
                //if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
                //return;
                return res;
            }

            //devuelvo los datos de la cache
            //en cualquier otro caso
            //Recojo la información del navegador mediante una petición Ajax
            return fetch(e.request);
        })

    );

});
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {

        if (sobreFestival.getBoundingClientRect().top < 0) { //ya pasamos el elemento
            barra.classList.add('barra-fija');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('barra-fija');
            body.classList.remove('body-scroll');
        }
    })
}

//crear el efecto de scroll cuando el usuario sellecion un item del menu
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value; //traer el a ref del enlace
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        })
    });
}

//insertar una galeria desde java script
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `;
        imagen.onclick = function() { //Para pasarle parametros lo tenemos que hace ccoo call back
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }

    function mostrarImagen(id) {
        const imagen = document.createElement('picture');
        //crea la imagen
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria">
        `;

        //crea el overlay (sombra de fondo)
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen); //crear e espacio a donde se muestra la imagen
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        //Bton para cerrar la ventana modal
        const cerralModal = document.createElement('body');
        cerralModal.textContent = 'X';
        cerralModal.classList.add('btn-cerrar');
        cerralModal.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        overlay.appendChild(cerralModal);


        //Añade al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
    }
}
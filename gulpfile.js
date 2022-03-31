//gulp
const { src, dest, watch, parallel } = require('gulp');
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //se asegura de que la hoja de estilos funcionen bien en el navegador
const cssnano = require('cssnano'); //comprime el codigo de css
const postcss = require('gulp-postcss'); //hace algunos ajustes mas
const sourcemaps = require('gulp-sourcemaps'); //

//JavaScript
const terser = require('gulp-terser-js');

//imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done) {
    src('src/scss/**/*.scss') //Identificar archivo sass (scss) a compilar
        .pipe(sourcemaps.init()) //inicia
        .pipe(plumber()) //para que no se detenga cada que hay un error
        .pipe(sass()) //compilar el archivo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.')) //. para que se guarde en la misma ubicación)
        .pipe(dest('build/css')) //guardar el nuevo archivo css
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}') //Busca todas las imagenes que tengan esos dos formatos
        .pipe(webp(opciones)) //convirte las imagenes a webp
        .pipe(dest('build/img')) //almacena las imagenes en el disco duro
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{jpg,png}') //Busca todas las imagenes que tengan esos dos formatos
        .pipe(avif(opciones)) //convirte las imagenes a webp
        .pipe(dest('build/img')) //almacena las imagenes en el disco duro
    done();
}

//Aligerar imagenes
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

//Java Script
function javaScript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}

function dev(done) {
    //Cuando nota un cambio en le archivo scss, compila la funcion css
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javaScript);
    done();
}

exports.css = css;
exports.js = javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;


exports.dev = parallel(imagenes, versionWebp, versionAvif, javaScript, dev);
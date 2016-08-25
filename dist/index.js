module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/apple/Proyectos/clan";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = {
	"api": "api.clan.dev",
	"cdn": "cdn.clan.dev",
	"www": "clan.dev",
	"port": 3000,
	"host": "localhost",
	"dropbox": "bJx2wgr3ZKoAAAAAAAA2dR6HYSs0GduIV4cgGWKjNGnVE4hYS-1hrNAyXEDD7G7-",
	"header": "Photos"
};

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("@angular/core");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("@angular/router");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(7);
var CONFIG = __webpack_require__(0);
var Events = (function () {
    function Events(http) {
        this.http = http;
        this.future = [];
        this.past = [];
    }
    Events.prototype.getFuture = function () {
        var _this = this;
        return this.http.get('/future').subscribe(function (res) { return _this.future = res.json().event; });
    };
    Events.prototype.getPast = function () {
        var _this = this;
        return this.http.get('/past').subscribe(function (res) { return _this.past = res.json().event; });
    };
    Events.prototype.isSend = function (name, data) {
        return this.http.post(CONFIG.api + 'sendata', { name: name, data: data })
            .subscribe(function (res) { return res.data; });
    };
    Events = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Events);
    return Events;
}());
exports.Events = Events;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(7);
var CONFIG = __webpack_require__(0);
var Photos = (function () {
    function Photos(http) {
        this.http = http;
        this.headers = [];
        this.photos = [];
    }
    Photos.prototype.getPath = function () {
        return this.http.get('http://' + CONFIG.api + '/photos/' + name)
            .toPromise()
            .then(function (res) { return res.json().photos; })
            .catch(this.handleError);
    };
    Photos.prototype.getHeader = function () {
        return this.http.get('http://' + CONFIG.api + '/photos/' + CONFIG.header)
            .toPromise()
            .then(function (res) { return res.json().photos; })
            .catch(this.handleError);
    };
    Photos.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    Photos = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Photos);
    return Photos;
}());
exports.Photos = Photos;


/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("@angular/http");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("@angular/platform-browser");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("moment");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var angular2_universal_1 = __webpack_require__(29);
var router_1 = __webpack_require__(3);
var common_1 = __webpack_require__(28);
var app_1 = __webpack_require__(20);
var route_1 = __webpack_require__(27);
var CONFIG = __webpack_require__(0);
function ngApp(req, res) {
    var baseUrl = '/';
    var url = req.originalUrl || '/';
    var config = {
        directives: [
            app_1.App
        ],
        platformProviders: [
            {
                provide: angular2_universal_1.ORIGIN_URL,
                useValue: 'http://' + CONFIG.www
            },
            {
                provide: common_1.APP_BASE_HREF,
                useValue: baseUrl
            },
        ],
        providers: [
            {
                provide: angular2_universal_1.REQUEST_URL,
                useValue: url
            },
            angular2_universal_1.NODE_HTTP_PROVIDERS,
            router_1.provideRouter(route_1.routes),
            angular2_universal_1.NODE_LOCATION_PROVIDERS
        ],
        CONFIG: CONFIG,
        async: true,
        preboot: false
    };
    res.render('index.pug', config);
}
exports.ngApp = ngApp;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var express = __webpack_require__(2);
var events = __webpack_require__(24);
var photo = __webpack_require__(25);
var CONFIG = __webpack_require__(0);
exports.api = express();
exports.api.set('host', CONFIG.api);
exports.api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
exports.api.get('/events', events.all, events.future);
exports.api.get('/evidence', events.all, events.past);
exports.api.get('/photos/:path?', photo.all);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var express = __webpack_require__(2);
var render = __webpack_require__(26);
var CONFIG = __webpack_require__(0);
var isImg = ':img(jpg|gif|png|ico)';
exports.cdn = express();
exports.cdn.set('host', CONFIG.cdn);
exports.cdn.set('x-powered-by', false);
exports.cdn.all('/lib/:file/*', render.component, render.send);
exports.cdn.all('/css/:file.css', render.CSS, render.send);
exports.cdn.all('/js/:file.js', render.JS, render.send);
exports.cdn.all("/" + isImg + "/:file." + isImg, render.IMG);


/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("angular2-universal/polyfills");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("pug");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("vhost");

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = "<div class=\"all-100 minum\"><nav class=\"ng-navigation ng-grid\"><ul class=\"menu horizontal white push-left\"><li><a href=\"/\"><img src=\"//cdn.clan.dev/png/logo-33.png\"/><span class=\"hide-all\">CLAN Digital</span></a></li><li [hidden]=\"show\"><a><span>{{name}}</span></a></li></ul><ul class=\"menu horizontal white push-right\"><li><a href=\"http://opensai.org/donaciones\">Donativos</a></li><li><a href=\"/contacto\">Contacto</a></li><li><a class=\"fa fa-share-alt\"></a><ul class=\"submenu\"><li><a class=\"fa fa-facebook-official\"></a></li><li><a class=\"fa fa-twitter\"></a></li></ul></li></ul></nav></div><nav class=\"ng-navigation all-100 fader image-carusel\" [style.backgroundImage]=\"image\" [style.height.px]=\"big\"><ul class=\"pagination chevron\" [hidden]=\"big &lt; 100\"><li class=\"previous\"><a class=\"put\" (click)=\"isClick(-1)\"><span>Atras</span></a></li><li class=\"next\"><a class=\"put\" (click)=\"isClick(1)\"><span>Siguiente</span></a></li></ul></nav><router-outlet class=\"hide-all\"></router-outlet><footer class=\"all-70 medium-x80 small-100 tiny-100 push-center\"><nav class=\"ng-navigation large-double-vertical-padding medium-vertical-padding small-no-padding tiny-no-padding push-center align-center\"><ul class=\"orange breadcrumbs double-top-padding\"><li><a class=\"small\" href=\"tel:+573208192263\"><i class=\"fa fa-phone\"></i>(+57) 3208192263</a></li><li><a class=\"small\" href=\"mailto:academic@opensai.org\">academic@opensai.org</a></li></ul><ul class=\"orange breadcrumbs\"><li><a class=\"small\" href=\"http://opensai.org\">OpenSai</a></li><li><a class=\"small\" href=\"http://twitter.com/OpenSAI\">@OpenSAI</a></li><li><a class=\"small\" href=\"http://facebook.com/opensai.org\">/openSAI.org</a></li></ul></nav></footer>";

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = "<div class=\"double-vertical-padding all-60 medium-75 small-100 tiny-100 push-center push-center\"><div class=\"ng-grid from-ng double-top-padding\"><h1 class=\"ng-hide all-hide\">¡Cuentanos!</h1><div class=\"column-group gutters\"><div class=\"control-group all-50 small-100 tiny-100\"><label class=\"ng-hide all-hide\" for=\"name\">Nombre</label><div class=\"control required\"><input class=\"half-padding all-100\" id=\"name\" placeholder=\"Nombres y Apellidos *\" type=\"text\" [(model)]=\"data.name\" required=\"required\"/></div></div><div class=\"control-group all-50 small-100 tiny-100\"><label class=\"ng-hide all-hide\" for=\"email\">Email</label><div class=\"control required\"><input class=\"half-padding all-100\" id=\"email\" placeholder=\"E-Mail *\" type=\"email\" [(model)]=\"data.email\" required=\"required\"/></div></div></div><div class=\"control-group all-100\"><label class=\"ng-hide all-hide\" for=\"email\">Email</label><div class=\"control required\"><textarea class=\"half-padding all-100\" id=\"email\" placeholder=\"¡Cuentanos!\" [(model)]=\"data.text\" required=\"required\"></textarea></div></div><div class=\"control-group top-space\"><button class=\"ng-button orange all-100 half-padding\" (click)=\"isSender()\">Enviar</button></div></div></div>";

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = "";

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = "<div class=\"all-100\"><div class=\"orange toBisel\"><div class=\"ng-grid bisel orange top-padding tiny-100 small-85 medium-75 large-65 xlarge-55\"><h3 class=\"white align-center\">Nuestro propósito</h3><p class=\"align-center\">Empoderar tecnológicamente a Latinoamérica con talleres y laboratorios a través de tecnologías con código abierto para fortalecer e innovar economías locales y auto-sostenibles.</p><p class=\"align-center\">Clan DIGITAL es una iniciativa que promueve el uso y apropiación de nuevas tecnologías que liberan el potencial humano en pro de la innovación educativa y social.</p></div></div></div><div class=\"all-100 double-vertical-padding\"><div class=\"ng-grid\"><div class=\"column-group gutters\"><h3 class=\"align-center all-100\">Propuesta de Valor</h3><div class=\"all-50 tiny-100 small-100 medium-100\"><p>Los laboratorios Clan DIGITAL son virtuales y presenciales para difundir conocimiento que reduzca la actual brecha tecnológica en nuestro continente y se promueva su uso responsable.</p></div><div class=\"all-50 tiny-100 small-100 medium-100\"><p>Lo logramos generando consciencia en el SER, brindándole capacitación en tecnologías abiertas para empoderarlo monetizando su trabajo con acompañamiento, a través de nuestra red de empresarios y talentos.</p></div></div></div></div><div class=\"all-100 blue\"><div class=\"ng-grid\"><div class=\"column-group toBisel\"><div class=\"all-50 bisel blue show-xlarge show-large hide-all\"><figure class=\"ng-image\"><img [src]=\"data.carrusel\"/><figcaption class=\"dark over-bottom\">Profesor, por su compromiso, enseñanzas y por entrar en nuestros corazones ¡ muchas gracias!</figcaption></figure></div><div class=\"all-50 tiny-100 small-100 medium-100 half-left-padding\"><ul><h2 class=\"white\">Nuestros laboratorios</h2><li>Empoderamiento del SER.</li><li>Fomento, uso y apropiación de tecnologías abiertas.</li><li>Producción y edición de imagen. Desarrollo web.</li><li>Producción y edición audiovisual.</li><li>Producción de contenidos digitales (Animación y videojuegos).</li><li>Emprendimiento de base tecnológica.</li></ul></div></div></div></div><div class=\"all-100 double-vertical-padding\"><div class=\"ng-grid\"><div class=\"column-group gutters\"><div class=\"all-50 vertical-padding tiny-100 small-100 medium-100\"><h3 class=\"align-center\">Responsabilidad Social</h3><p>Clan DIGITAL apoya a las empresas con proyectos tecnológicos a través del modelo de Responsabilidad Social Empresarial.º</p><p>Con el apoyo de los puntos Vive Digital, las empresas y las alcaldías, desarrollamos talleres que permiten principalmente a las poblaciones de escasos recursos promover nuevos modelos económicos para el desarrollo de la región.</p></div><div class=\"all-50 vertical-padding tiny-100 small-100 medium-100\"><h3 class=\"align-center\">Transferencia de conocimiento</h3><p>Clan DIGITAL promueve el libre conocimiento y acceso a la información. Todos los proyectos realizados son registrados bajo la licencia Creative Commons, para que las empresas y la comunidad se puedan beneficiar de las investigaciones realizadas y puedan replicar sus competencias para prolongar el impacto que tienen las nuevas tecnologías en la región.</p></div></div></div></div><div class=\"all-100 blue\"><div class=\"ng-grid\"><div class=\"column-group toBisel\"><div class=\"all-50 tiny-100 small-100 medium-100 half-right-padding\"><ul><h2 class=\"white\">Nuestros objetivos</h2><li>Disminuir la piratería y el software ilegal.</li><li>Reducir de la brecha digital que tienen los municipios.</li><li>Incentivar la producción de contenidos a través de tecnologías abiertas.</li><li>Promover actividades para aprovechar el tiempo libre de los jóvenes.</li><li>Generación de nuevas economías locales y global.</li><li>Vinculación de empresarios y talentos a nuestra red Empoderamiento y mejora de calidad de vida.</li><li>Impulsar el uso productivo e infraestructura de los puntos PVD y PVD+.</li></ul></div><div class=\"all-50 bisel blue show-xlarge show-large hide-all\"><figure class=\"ng-image\"><img [src]=\"data.clan\"/><figcaption class=\"dark over-bottom align-right\">Gracias al programa Clan DIGITAL y su misión. Lo que hemos aprendido es increíble.</figcaption></figure></div></div></div></div><div class=\"all-100 double-vertical-padding\"><div class=\"ng-grid vertical-padding\"><h3 class=\"align-center\">Alianza Empresarial</h3><p class=\"align-center push-center all-70 tiny-100 small-100 medium-100\">Clan DIGITAL es el programa estrella de aprendizaje inmersivo de OpenSAI y gracias a ello, nuestra relación con empresas del sector público y privado fortalece la inversión en Responsabilidad Social Empresarial, para que los involucrados puedan acceder a los incentivos tributarios que ofrece el gobierno.</p></div></div>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(3);
var platform_browser_1 = __webpack_require__(8);
var photos_1 = __webpack_require__(6);
var CONFIG = __webpack_require__(0);
var VEL = 5;
var App = (function () {
    function App(box, router, sanitizer) {
        this.box = box;
        this.router = router;
        this.sanitizer = sanitizer;
        this.nums = 0;
        this.data = [];
        this.big = 500;
    }
    App.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (url) { return _this.putUrl(url); });
        this.box.getHeader()
            .then(function (photo) { return _this.putPhotos(photo); })
            .catch(function (error) { return console.log(error); });
    };
    App.prototype.putUrl = function (data) {
        this.big = data.url.length === 1 ? 500 : 47;
    };
    App.prototype.putPhotos = function (data) {
        if (data === void 0) { data = []; }
        this.data = data;
        this.isClick(this.data.length - 1);
    };
    App.prototype.isClick = function (num) {
        var _this = this;
        if (this.ins) {
            clearInterval(this.ins);
            this.ins = null;
        }
        this.nums += num;
        var srx = this.data[Math.abs(this.nums % this.data.length)];
        this.image = "url(" + srx + ")";
        this.ins = setInterval(function () { return _this.isClick(1); }, VEL * 1000);
    };
    App = __decorate([
        core_1.Component({
            moduleId: __filename,
            selector: 'body',
            directives: router_1.ROUTER_DIRECTIVES.slice(),
            providers: [photos_1.Photos, platform_browser_1.DomSanitizationService],
            template: __webpack_require__(16)
        }), 
        __metadata('design:paramtypes', [photos_1.Photos, router_1.Router, platform_browser_1.DomSanitizationService])
    ], App);
    return App;
}());
exports.App = App;

/* WEBPACK VAR INJECTION */}.call(exports, "src/component/app.ts"))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var event_1 = __webpack_require__(5);
var Contact = (function () {
    function Contact(box) {
        this.box = box;
        this.data = {};
        this.send = false;
    }
    Contact.prototype.isSend = function () {
        this.send = true;
        this.box.isSend('contact', this.data);
    };
    Contact = __decorate([
        core_1.Component({
            moduleId: __filename,
            template: __webpack_require__(17),
            providers: [event_1.Events]
        }), 
        __metadata('design:paramtypes', [event_1.Events])
    ], Contact);
    return Contact;
}());
exports.Contact = Contact;

/* WEBPACK VAR INJECTION */}.call(exports, "src/component/contact.ts"))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var event_1 = __webpack_require__(5);
var Cursos = (function () {
    function Cursos(es) {
        this.es = es;
    }
    Cursos.prototype.ngOnInit = function () {
        this.events = this.es.getFuture();
    };
    Cursos.prototype.isSend = function () {
        this.events[this.select.num].send = true;
        var name = this.select.description.replace(' ', '-') + '-';
        name += this.select.id;
        this.es.isSend(name, this.data);
    };
    Cursos.prototype.isSelect = function (num) {
        this.select = this.events[num];
        this.select.num = num;
    };
    Cursos.prototype.clear = function () {
        this.select = null;
    };
    Cursos = __decorate([
        core_1.Component({
            moduleId: __filename,
            template: __webpack_require__(18),
            providers: [event_1.Events]
        }), 
        __metadata('design:paramtypes', [event_1.Events])
    ], Cursos);
    return Cursos;
}());
exports.Cursos = Cursos;

/* WEBPACK VAR INJECTION */}.call(exports, "src/component/cursos.ts"))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(8);
var router_1 = __webpack_require__(3);
var photos_1 = __webpack_require__(6);
var CONFIG = __webpack_require__(0);
var Home = (function () {
    function Home(box, sanitizer) {
        this.box = box;
        this.sanitizer = sanitizer;
        this.data = [];
    }
    Home.prototype.ngOnInit = function () {
        var dt = this.box.getPath(CONFIG.home);
        for (var i = dt.length - 1; i >= 0; i--) {
            this.data.push(dt[i]);
        }
    };
    Home = __decorate([
        core_1.Component({
            moduleId: __filename,
            selector: '.all-100.justi',
            directives: router_1.ROUTER_DIRECTIVES.slice(),
            template: __webpack_require__(19),
            providers: [photos_1.Photos, platform_browser_1.DomSanitizationService]
        }), 
        __metadata('design:paramtypes', [photos_1.Photos, platform_browser_1.DomSanitizationService])
    ], Home);
    return Home;
}());
exports.Home = Home;

/* WEBPACK VAR INJECTION */}.call(exports, "src/component/home.ts"))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var moment = __webpack_require__(9);
var CONFIG = __webpack_require__(0);
var ical = __webpack_require__(34);
function all(req, res, next) {
    ical.fromURL(process.env.CAL_EVENTS || CONFIG.events, {}, function (error, data) {
        if (error) {
            return next(error);
        }
        next(data);
    });
}
exports.all = all;
function future(data, req, res) {
    var event = [];
    for (var i in data) {
        var dates = data[i].end || data[i].start;
        if (moment(dates).diff(moment(), 'h') >= 0) {
            event.push(data[i]);
        }
    }
    res.json(event);
}
exports.future = future;
function past(data, req, res) {
    var event = [];
    for (var i in data) {
        var dates = data[i].end || data[i].start;
        if (moment(dates).diff(moment(), 'h') < 0) {
            event.push(data[i]);
        }
    }
    ;
    res.json(event);
}
exports.past = past;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Dropbox = __webpack_require__(32);
var CONFIG = __webpack_require__(0);
var DROPBOX = 'www.dropbox.com';
var SHOW = 'dl.dropboxusercontent.com';
var dbx = new Dropbox({ accessToken: process.env.DROPBOX || CONFIG.dropbox });
function all(req, res, next) {
    var photos = [];
    dbx
        .sharingGetSharedLinks()
        .then(function (data) {
        for (var i = data.links.length - 1; i >= 0; i--) {
            if (data.links[i].path && (!req.params.path || data.links[i].path.lastIndexOf(req.params.path) >= 0)) {
                photos.push(data.links[i].url.replace(DROPBOX, SHOW));
            }
        }
        res.json({ photos: photos });
    })
        .catch(function (error) { return res.json({ error: error }); });
}
exports.all = all;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
var moment = __webpack_require__(9);
var fs = __webpack_require__(33);
var path_1 = __webpack_require__(4);
var os_1 = __webpack_require__(37);
var mime_1 = __webpack_require__(35);
var child_process_1 = __webpack_require__(31);
var _ = __webpack_require__(38);
var async = __webpack_require__(30);
var sass = __webpack_require__(36);
var COMPRESS = true;
var ROOT = path_1.join(__dirname, '..', '..', '..', 'public');
var TIME = 31104000;
var JSS = /(css|swf|map|otf|eot|svg|ttf|woff|woff2|js)$/i;
var NOT = /(?:Gruntfile|gulpfile|conf|example|demo|support|specs|builder|bin|readme|src|test|scss|\.\.)/i;
function renderCSS(scr, out, cb) {
    sass.render({
        file: scr,
        noLineComments: !COMPRESS,
        sourceMapContents: !COMPRESS,
        sourceComments: !COMPRESS,
        outputStyle: COMPRESS ? 'compressed' : 'nested',
        includePaths: [
            path_1.join(ROOT, 'style', 'lib'),
            path_1.join(ROOT, 'style', 'contrib')
        ]
    }, function (err, result) {
        if (err) {
            return cb(err);
        }
        fs.writeFile(out, result.css.toString().replace(/\}/g, '} '), 'utf8', function (err) {
            cb(err || out);
        });
    });
}
function cache(req, res, next) {
    var cc = '';
    if (TIME) {
        cc += 'max-age=' + TIME + ',';
    }
    res.setHeader('Expires', moment().add(TIME, 'ms').toString());
    res.setHeader('Cache-Control', cc + 'no-transform');
    res.setHeader('X-Cache', 'HIT');
    next();
}
exports.cache = cache;
function component(req, res, next) {
    if (_.isEmpty(req.params[0]) || !JSS.test(req.params[0]) || NOT.test(req.params[0]) || NOT.test(req.params.file)) {
        return next(new Error('NOT Found'));
    }
    async.map(process.mainModule.paths, function (uis, otro) {
        var file = path_1.join(uis, _.dasherize(req.params.file), req.params[0]);
        fs.exists(file, function (found) {
            otro(found ? file : null);
        });
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        var file;
        for (var i = results.length - 1; i >= 0; i--) {
            if (results[i]) {
                file = results[i];
            }
        }
        next(file || new Error('No exist the file'));
    });
}
exports.component = component;
function CSS(req, res, next) {
    if (NOT.test(req.params.file)) {
        return next(new Error('Not Found'));
    }
    var scssPath = path_1.join(ROOT, 'style', req.params.file + '.scss');
    var cssPath = path_1.join(os_1.tmpdir(), req.params.file + '.css');
    async.parallel({
        scss: function (callback) {
            fs.stat(scssPath, callback);
        },
        css: function (callback) {
            fs.exists(cssPath, function (found) {
                if (found) {
                    return fs.stat(cssPath, callback);
                }
                callback();
            });
        }
    }, function (err, reslt) {
        if (err && _.isEmpty(reslt.scss)) {
            return next(err);
        }
        if (_.isEmpty(reslt.css) || reslt.scss.mtime > reslt.css.mtime || req.start) {
            return renderCSS(scssPath, cssPath, next);
        }
        next(cssPath);
    });
}
exports.CSS = CSS;
function IMG(req, res, next) {
    if (/\.\./.test(req.params.file)) {
        return next(new Error('Not Found'));
    }
    var com = path_1.join(ROOT, 'image', req.params.file.split('-')[0] + '.' + req.params.img);
    fs.stat(com, function (err, found) {
        if (err || !found.isFile()) {
            return next(new Error('No exist file'));
        }
        res.header('Last-Modified', moment(found.mtime).toString());
        var convert = child_process_1.spawn('convert', [com, '+dither', '-resize', req.params.file.split('-')[1], '-']);
        res.contentType(mime_1.lookup(com));
        convert.stdout.pipe(res);
    });
}
exports.IMG = IMG;
function JS(req, res, next) {
    if (NOT.test(req.params.file)) {
        return next(new Error('Not Found'));
    }
    var InPath = path_1.join(ROOT, 'script', req.params.file + '.js');
    next(InPath || new Error('No exist the file'));
}
exports.JS = JS;
function send(file, req, res, next) {
    if (file instanceof Error || !_.isString(file)) {
        return next(file instanceof Error ? file : new Error(file.toString().replace(/error(\s)?:/i, '')));
    }
    fs.stat(file, function (err, found) {
        if (err || !found.isFile()) {
            return next(err || new Error('Not exist file ' + file));
        }
        res.header('Last-Modified', moment(found.mtime).toString());
        res.contentType(mime_1.lookup(file));
        res.header('Content-Length', found.size);
        var stream = fs.ReadStream(file);
        stream.setMaxListeners(0);
        stream.pipe(res);
    });
}
exports.send = send;

/* WEBPACK VAR INJECTION */}.call(exports, "src/route/cdn"))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var cursos_1 = __webpack_require__(22);
var contact_1 = __webpack_require__(21);
var home_1 = __webpack_require__(23);
exports.routes = [
    { path: '', component: home_1.Home },
    { path: 'cursos', component: cursos_1.Cursos },
    { path: 'contacto', component: contact_1.Contact },
];


/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("@angular/common");

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = require("angular2-universal");

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("async");

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = require("child_process");

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = require("dropbox");

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = require("ical");

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports = require("mime");

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports = require("node-sass");

/***/ },
/* 37 */
/***/ function(module, exports) {

module.exports = require("os");

/***/ },
/* 38 */
/***/ function(module, exports) {

module.exports = require("underscore");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
__webpack_require__(13);
var path_1 = __webpack_require__(4);
var express = __webpack_require__(2);
var vhost = __webpack_require__(15);
var pug = __webpack_require__(14);
var CONFIG = __webpack_require__(0);
var api_1 = __webpack_require__(11);
var cdn_1 = __webpack_require__(12);
var core_1 = __webpack_require__(1);
core_1.enableProdMode();
var main_node_1 = __webpack_require__(10);
var app = express();
var ROOT = path_1.join(path_1.resolve(__dirname, 'component'));
app.use(vhost(cdn_1.cdn.get('host'), cdn_1.cdn));
app.use(vhost(api_1.api.get('host'), api_1.api));
app.engine('pug', pug.__express);
app.set('views', path_1.join(ROOT, '..', '..', 'view'));
function indexFile(req, res) {
    res.render('index.pug', { root: __dirname, CONFIG: CONFIG });
}
app.get('/', main_node_1.ngApp);
app.get('/cursos', main_node_1.ngApp);
app.get('/cursos/*', main_node_1.ngApp);
app.get('/contacto', main_node_1.ngApp);
app.get('/aliados', main_node_1.ngApp);
app.get('/evidencia', main_node_1.ngApp);
app.get('/evidencia/*', main_node_1.ngApp);
app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || CONFIG.port, process.env.OPENSHIFT_NODEJS_IP || CONFIG.host, function () {
    console.log('Listening on: http://localhost:3000');
});

/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ }
/******/ ]);
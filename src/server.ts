// the polyfills must be the first thing imported in node.js
import "angular2-universal/polyfills";

import { join, resolve } from "path";
import * as express from "express";
import * as bodyParser from "body-parser";

const vhost = require("vhost");
const pug = require("pug");
const CONFIG = require("./config.json");

import { api } from "./route/api";
import { cdn } from "./route/cdn";

// Angular 2
import { enableProdMode } from "@angular/core";
// Angular 2 Universal
import { expressEngine } from "angular2-universal";

// enable prod for faster renders
enableProdMode();

import { ngApp } from "./main.node";

const app = express();
const ROOT = join(resolve(__dirname, 'component'));

app.use(vhost(cdn.get('host'), cdn));
app.use(vhost(api.get('host'), api));

// Express View
app.engine('pug', pug.__express);
app.set('views', join(ROOT, '..', '..', 'view'));

// use indexFile over ngApp only when there is too much load on the server
function indexFile(req, res) {
  // when there is too much load on the server just send
  // the index.html without prerendering for client-only
  res.render('index.pug', { root: __dirname, CONFIG  });
}

// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', ngApp);
app.get('/cursos', ngApp);
app.get('/cursos/*', ngApp);
app.get('/contacto', ngApp);
app.get('/aliados', ngApp);
app.get('/evidencia', ngApp);
app.get('/evidencia/*', ngApp);

// Server
app.listen(
	process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || CONFIG.port,
	process.env.OPENSHIFT_NODEJS_IP || CONFIG.host, () => {
	console.log('Listening on: http://localhost:3000');
});



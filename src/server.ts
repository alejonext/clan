// the polyfills must be the first thing imported in node.js
import "angular2-universal/polyfills";

import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";

const vhost = require("vhost");
const pug = require("pug");

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
const ROOT = path.join(path.resolve(__dirname, 'component'));

[
	api,
	cdn
].map(e => app.use(vhost(e.get('host'), e)));

// Express View
app.engine('pug', pug.__express);
app.set('views', path.join(ROOT, '..', '..', 'view'));

// use indexFile over ngApp only when there is too much load on the server
function indexFile(req, res) {
  // when there is too much load on the server just send
  // the index.html without prerendering for client-only
  res.render('index.pug', { root: __dirname });
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
	process.env.OPENSHIFT_NODEJS_PORT || 3000,
	process.env.OPENSHIFT_NODEJS_IP || 'localhost', () => {
	console.log('Listening on: http://localhost:3000');
});



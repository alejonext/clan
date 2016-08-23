import * as express from "express";
import * as render from './render';

const isImg = ':img(jpg|gif|png|ico)';

export var cdn = express();

cdn.set('host', 'cdn.*.org');

cdn.set('x-powered-by', false);
//cdn.use(render.cache);

cdn.all('/lib/:file/*',		render.component, render.send ); // Explorador de librerias
cdn.all('/css/:file.css', 	render.CSS,	render.send );  // Renderizador de CSS
cdn.all('/js/:file.js',		render.JS,	render.send ); // Rendirizador de JavaScript
cdn.all(`/${isImg}/:file.${isImg}`,render.IMG ); // Rendirazador de Imagenes simples

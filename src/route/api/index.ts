import * as express from "express";
import * as events from "./event";
import * as photo from "./photo";
const CONFIG = require("../../config.json");

export var api = express();

api.set('host', CONFIG.api);

api.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

api.get('/events',   events.all, events.future);
api.get('/evidence', events.all, events.past);
api.get('/photos/:path?', photo.all);



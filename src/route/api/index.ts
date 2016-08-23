import * as express from "express";
import * as events from "./event";

export var api = express();

api.set('host', 'api.*.org');
api.get('/events',   events.all, events.future);
api.get('/evidence', events.all, events.past);



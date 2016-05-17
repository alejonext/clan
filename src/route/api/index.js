import express from 'express';
import done from './done';
import pvd from './pvd';
import people from './people';

export default function () {
	var app = express();

	app.use('/donation', done());
	app.use('/people', people());
	app.use('/pvd', pvd());

	return app;
}
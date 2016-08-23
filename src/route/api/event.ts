import * as moment from 'moment';

const ical = require('ical');

export function all (req, res, next) {
	ical.fromURL(process.env.CAL_EVENTS, {}, (error, data) => {
		if(error){
			return next(error);
		}
		next(data);
	});
}

export function future (data, req, res) {
	let event = [];
	for(let i in data){
		var dates = data[i].end || data[i].start;
		if(moment(dates).diff(moment(), 'h') >= 0 ) {
			event.push( data[i] );
		}
	}

	res.json(event);
}

export function past (data, req, res) {
	let event = [];
	for(let i in data){
		var dates = data[i].end || data[i].start;
		if(moment(dates).diff(moment(), 'h') < 0 ) {
			event.push( data[i] );
		}
	};

	res.json(event);
}

import mongo from 'mongoose';
import * as done from './done';
import * as municipio from './municipio';
import * as pvd from './pvd';
import * as people from './people';
import {format} from 'url';

/**
 * @param  {String} 	Direcion del MongoDB
 * @return {Object}		Objecto que se conetruye Mongo
 */
export default function (uris) {
	let urs = null;
	if(typeof uris != 'string'){
		uris.auth = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
		urs = format(uris);
	}

	mongo.connect(urs || uris);
	mongo.model(done.name, done.schema);
	mongo.model(pvd.name, pvd.schema);
	mongo.model(people.name, people.schema);
	mongo.model(municipio.name, municipio.schema);

	return mongo;
}
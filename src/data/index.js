
import mongo from 'mongoose';
import * as done from './done';
import * as municipio from './municipio';
import * as pvd from './pvd';
import * as people from './people';

/**
 * @param  {String} 	Direcion del MongoDB
 * @return {Object}		Objecto que se conetruye Mongo
 */
export default function (url) {
	mongo.connect(url);
	mongo.model(done.name, done.schema);
	mongo.model(pvd.name, pvd.schema);
	mongo.model(people.name, people.schema);
	mongo.model(municipio.name, municipio.schema);

	return mongo;
}
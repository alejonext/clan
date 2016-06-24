import _ from 'underscore';
import konfig from 'konfig';
import route from './route';
import connect from './data';
import packe from '../package.json';

let path = './config';
process.env.npm_package_version = process.env.npm_package_version || packe.version;
process.env.OPENSHIFT_NODEJS_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
process.env.OPENSHIFT_NODEJS_PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
GLOBAL._ = _;
GLOBAL.CONFIG = konfig({ path });
GLOBAL.db = connect(GLOBAL.CONFIG.server.mongo);

route().listen(GLOBAL.CONFIG.server.port, GLOBAL.CONFIG.server.ip, error => {
	if(error){
		console.error(error);
	}
});
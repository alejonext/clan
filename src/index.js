import _ from 'underscore';
import konfig from 'konfig';
import route from './route';
import connect from './data';

let path = './config';

process.env.IP = process.env.IP || 'localhost';
process.env.PORT = process.env.PORT || 3000;
GLOBAL._ = _;
GLOBAL.CONFIG = konfig({ path });
GLOBAL.db = connect(GLOBAL.CONFIG.server.mongo);

route().listen(GLOBAL.CONFIG.server.port, GLOBAL.CONFIG.server.ip, error => {
	if(error){
		console.error(error);
	}
});
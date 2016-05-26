export default class land {
	static $inject = ['$rootScope', 'api', '$routeParams'];
	static n = 'land';
	
	name = '';
	email = '';
	movil = '';
	municipio = '';
	class = '';
	
	constructor( doc, api, params) {
		doc.maxBar = true;
		this.peo = api.create;
		this.types = params.name;
	}

	reset(){
		this.name = '';
		this.email = '';
		this.movil = '';
		this.municipio = '';
		this.class = '';
	}

	send(){
		this.error = null;
		this.peo({ name : 'people' }, {
			name     : this.name,
			email    : this.email,
			number   : this.movil,
			municipio: this.municipio,
			curso    : this.class.replace('-e', ''),
			types    : this.types
		}, data => {
			if(data.error){
				this.error = data.error;
			} else {
				this.reset();		
			}
		});
		
	}

}
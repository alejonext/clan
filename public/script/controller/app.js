const VEL = 5;
export default class app {
	static n = 'app';
	static $inject = ['$document', '$timeout'];
	
	num = 0;
	back = [];
	image = ';'
	
	constructor (doc, interval) {
		this.out = interval;

		var elem = doc.find('meta');

		for (let i = elem.length - 1; i >= 0; i--) {
			let attr = elem[i].attributes;
			if( attr.name && attr.name.value && attr.name.value === 'carrusel' ){
				this.back.push(attr.content.value);
			}
		}

		this.isClick(this.random(this.back.length - 1));
	}

	isClick (num) {
		if(this.ins){
			this.out.cancel(this.ins);
			this.ins = null;
		}
		this.num += num;
		var select = this.num % this.back.length;
		var item = this.back[ select * Math.sign(select) ];
		this.image =  item;
		this.ins = this.out( () => this.isClick(1), VEL * 1000);
	}

	random (max){
		return Math.floor( Math.random() * max );
	}

}
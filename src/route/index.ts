import { RouterConfig } from '@angular/router';

/*import { Notfound } from '../component/error';*/
/*import { Aliados } from '../component/aliados';*/
import { Cursos } from '../component/cursos';
import { Contact } from '../component/contact';
import { Home } from '../component/home';


export const routes: RouterConfig = [
	{ path: '', component: Home },
	{ path: 'cursos', component: Cursos },
	{ path: 'contacto', component: Contact },
	/*{ path: '**', component: Notfound },*/
];
# Servidor de Clan

Este servidor, es una metodologia para el usdo del proyecto Clan.

## Prerequisitos

Debe tener instalado esto

* [NodeJs](http://NodeJs.org)
* [MongoDB](http://mongodb.org)
* [Git](http://gitscrm.org) Si descarga el paquete de esta web, no tiene necesita de instalar

Haga

	$ git clone git@github.com/alejonext/clan.git clan

## Instalacion

La instalacion, se hace apartir de [npm](http://npmjs.org), por ende se hace

	$ cd clan
	$ npm install

## Configuracion

En la carpeta ` config` , dos archivos de configuracion estos archivos son un formato, facil de entender. Lo importante es modificar la ApiKeys y ApiSecert, de Paypal. que sencuentra en el archivo ` server.yml` , se dara cuenta que dice ` paypal`  y coloca tanto la ` key`  como el ` secret` . Esto se obtienen en la pagina de [paypal](https://developer.paypal.com/), se puede contruir cualquier metodo de donacion solo haciendo unos pequeños cambios al software.

## Iniciar
	
> Debe tener inciado mongodb.


	$ npm run dev


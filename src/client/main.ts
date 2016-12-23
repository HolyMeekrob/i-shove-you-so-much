import {Aurelia} from 'aurelia-framework';

export const configure = (aurelia: Aurelia) => {
	aurelia.use
		.standardConfiguration()
		.developmentLogging();
	aurelia.start().then((a) => a.setRoot());
};

import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
	public router: Router;

	public configureRouter(config: RouterConfiguration, router: Router): void {
		this.router = router;
		config.title = 'I Shove You So Much';
		config.map([{
				route:		['', 'new-game'],
				name:			'newGame',
				moduleId:	'src/pages/new-game/new-game'
			}, {
				route:		['game/:id'],
				name:			'game',
				moduleId: 'src/pages/game/game'
			}
		]);
	}
}

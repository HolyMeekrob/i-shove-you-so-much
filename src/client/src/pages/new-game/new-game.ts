import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';


@autoinject
export class NewGame {
	public message: string;
	public playerOneColor: string;
	public playerTwoColor: string;

	public playerOneName: string;
	public playerTwoName: string;

	constructor(private router: Router) {
		this.message = 'New game';
		this.playerOneColor = '#000000';
		this.playerTwoColor = '#0000ff';
		this.playerOneName = 'Player One';
		this.playerTwoName = 'Player Two';
	}

	public createNewGame = () => {
		const http = new HttpClient();
		const options = {
			method: 'post',
			body: json(this.getPostData())
		};

		http.fetch('game/create', options);

		this.router.navigateToRoute('game', this.getPostData());
	}

	private getPostData = () => {
		return {
			playerOneColor: this.playerOneColor,
			playerTwoColor: this.playerTwoColor,
			playerOneName: this.playerOneName,
			playerTwoName: this.playerTwoName
		};
	}
}

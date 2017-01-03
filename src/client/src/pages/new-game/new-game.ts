import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
// import { Board } from '../../../../game/model/board';
import { Border } from '../../../../game/model/border';
import { Color } from '../../../../game/model/color';
import { Floor } from '../../../../game/model/floor';
import { Square } from '../../../../game/model/square';
import { Start } from '../../../../game/model/start';

@autoinject
export class NewGame {
	public message: string;
	public playerOneColor: Color;
	public playerTwoColor: Color;

	public playerOneName: string;
	public playerTwoName: string;

	// public board: Board;
	public testSquare: Square;

	constructor(private router: Router) {
		this.message = 'New game';
		this.playerOneColor = 0x000000;
		this.playerTwoColor = 0x0000ff;
		this.playerOneName = 'Player One';
		this.playerTwoName = 'Player Two';
		// this.board = new Board();
		this.testSquare = new Square(Floor.Pit, Start.PlayerOne,
			Border.Open, Border.Open, Border.Open, Border.Open);
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

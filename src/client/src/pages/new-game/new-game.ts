import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Board } from '../../../../game/model/board';
import { Border } from '../../../../game/model/border';
import { Color } from '../../../../game/model/color';
import { Floor } from '../../../../game/model/floor';
import { Position } from '../../../../game/model/position';
import { Start } from '../../../../game/model/start';
import { TokenPosition } from '../../../../game/model/tokenPosition';
import { TokenType } from '../../../../game/model/tokenType';
import { IPlayerSetup } from '../../custom-elements/setup/player-setup';

@autoinject
export class NewGame {
	public message: string;

	public board: Board;

	public playerOne: IPlayerSetup;
	public playerTwo: IPlayerSetup;

	constructor(private router: Router) {
		this.message = 'New game';

		this.playerOne = {
			name: 'Player One',
			color: 0x000000,
			selectedTokenType: TokenType.Bully,
			tokenPositions: []
		};

		this.playerTwo = {
			name: 'Player Two',
			color: 0x0000ff,
			selectedTokenType: TokenType.Bully,
			tokenPositions: []
		};

		this.board = new Board();
	}

	public readonly createNewGame = () => {
		const http = new HttpClient();
		const options = {
			method: 'post',
			body: json(this.getPostData())
		};

		http.fetch('game/create', options);

		this.router.navigateToRoute('game', this.getPostData());
	}

	private readonly getPostData = () => {
		return {
			playerOneColor: this.playerOne.color,
			playerTwoColor: this.playerTwo.color,
			playerOneName: this.playerOne.name,
			playerTwoName: this.playerTwo.name
		};
	}
}

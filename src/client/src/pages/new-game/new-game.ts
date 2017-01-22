import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject, BindingEngine, observable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Board } from '../../../../game/model/board';
import { Color } from '../../../../game/model/color';
import { Start } from '../../../../game/model/start';
import { TokenType } from '../../../../game/model/tokenType';
import { IBoardDisplay } from '../../custom-elements/board/board-display';
import { IPlayerSetup, toPlayer } from '../../custom-elements/setup/player-setup';
import { playerColorsUpdated } from '../../events';

@autoinject
export class NewGame {
	public message: string;

	public board: IBoardDisplay;

	public playerOne: IPlayerSetup;
	public playerTwo: IPlayerSetup;

	constructor(private router: Router, private messageBus: EventAggregator,
			private bindingEngine: BindingEngine) {
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

		this.board = {
			board: new Board().squares
				.map((row) => row.map((square) => {
					return {
						square,
						color: this.getColorForStartType(square.startType)
					};
				}))
		};

		this.bindingEngine
			.propertyObserver(this.playerOne, 'color')
			.subscribe(this.updateColors.bind(this));

		this.bindingEngine
			.propertyObserver(this.playerTwo, 'color')
			.subscribe(this.updateColors.bind(this));
	}

	private readonly updateColors = (newValue: Color, oldValue: Color): void => {
		if (this.board === undefined) {
			return;
		}
		this.board.board.forEach((row) => row.forEach((square) =>
			square.color = this.getColorForStartType(square.square.startType)
		));
		this.messageBus.publish(playerColorsUpdated, newValue);
	}

	private readonly getColorForStartType = (startType: Start): Color => {
		switch (startType) {
			case Start.PlayerOne:
				return this.playerOne.color;

			case Start.PlayerTwo:
				return this.playerTwo.color;

			default:
				return 0x0;
		}
	}

	public readonly createNewGame = () => {
		const http = new HttpClient();
		const options = {
			method: 'post',
			body: json(this.getPostData())
		};

		http.fetch('game/create', options)
			.then((response) => response.json())
			.then((data: any) => {
				this.router.navigateToRoute('game/', { id: data.id });
			});
		}

	private readonly getPostData = () => {
		return {
			playerOne: toPlayer(this.playerOne),
			playerTwo: toPlayer(this.playerTwo),
			tokenPositions: this.playerOne.tokenPositions
				.concat(this.playerTwo.tokenPositions)
		};
	}
}

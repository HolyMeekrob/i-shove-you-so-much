import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject, bindable, bindingMode, computedFrom } from 'aurelia-framework';
import { any, append, both, complement, curry, find, prop } from 'ramda';
import { Board } from '../../../../game/model/board';
import { PlayerType } from '../../../../game/model/playerType';
import { Position } from '../../../../game/model/position';
import { Start } from '../../../../game/model/start';
import { Token } from '../../../../game/model/token';
import { TokenPosition } from '../../../../game/model/tokenPosition';
import { TokenType } from '../../../../game/model/tokenType';
import { tokenPositionsUpdated } from '../../events';
import { IPlayerSetup } from './player-setup';

@autoinject
export class SetupBoardCustomElement {
	private static readonly BULLY_TOKEN_COUNT: number = 3;
	private static readonly VICTIM_TOKEN_COUNT: number = 2;

	@bindable
	public board: Board;

	@bindable ({ defaultBindingMode: bindingMode.twoWay })
	public playerOne: IPlayerSetup;

	@bindable ({ defaultBindingMode: bindingMode.twoWay })
	public playerTwo: IPlayerSetup;

	constructor(private messageBus: EventAggregator) {}

	@computedFrom('playerOne.tokenPositions')
	public get remainingBulliesPlayerOne(): number {
		return this.getRemainingTokens(TokenType.Bully, this.playerOne);
	}

	@computedFrom('playerTwo.tokenPositions')
	public get remainingBulliesPlayerTwo(): number {
		return this.getRemainingTokens(TokenType.Bully, this.playerTwo);
	}

	@computedFrom('playerOne.tokenPositions')
	public get remainingVictimsPlayerOne(): number {
		return this.getRemainingTokens(TokenType.Victim, this.playerOne);
	}

	@computedFrom('playerTwo.tokenPositions')
	public get remainingVictimsPlayerTwo(): number {
		return this.getRemainingTokens(TokenType.Victim, this.playerTwo);
	}

	private static readonly tokenHasType =
		curry((tokenType: TokenType, tp: TokenPosition): boolean =>
			tp.token.tokenType === tokenType);

	private static readonly getMaxTokensForType = (tokenType: TokenType) => {
		switch (tokenType) {
			case TokenType.Bully:
				return SetupBoardCustomElement.BULLY_TOKEN_COUNT;
			case TokenType.Victim:
				return SetupBoardCustomElement.VICTIM_TOKEN_COUNT;
			default:
				throw new Error('Unsupported token type');
		}
	}

	public readonly getRemainingTokens = (tokenType: TokenType, player: IPlayerSetup): number => {
		const filterFunction = SetupBoardCustomElement.tokenHasType(tokenType);
		return SetupBoardCustomElement.getMaxTokensForType(tokenType) -
			player.tokenPositions.filter(filterFunction).length;
	}

	public readonly squareClicked = (event: MouseEvent, row: number, cell: number): boolean => {
		// Only fire on left click
		if (event.button !== 0) {
			return true;
		}

		const position = new Position(row, cell);
		const playerType = SetupBoardCustomElement.
			getPlayerTypeForStartType(this.board.getSquareAt(position).startType);

		if (playerType === undefined) {
			return true;
		}

		const player: IPlayerSetup = playerType === PlayerType.PlayerOne
			? this.playerOne
			: this.playerTwo;

		const tokenType = player.selectedTokenType;

		const hasPosition = SetupBoardCustomElement.tokenPositionHasPosition(position);

		const positionIsTakenByType = any(both(
			SetupBoardCustomElement.tokenPositionHasPosition(position),
			SetupBoardCustomElement.tokenPositionHasType(tokenType)), player.tokenPositions);

		const hasTokenRemaining = this.getRemainingTokens(tokenType, player) > 0;
		const tokenPositions = player.tokenPositions.filter(complement(hasPosition));

		player.tokenPositions =
			positionIsTakenByType
				? tokenPositions
				: hasTokenRemaining
					? append(new TokenPosition(new Token(playerType, tokenType), position), tokenPositions)
					: player.tokenPositions;

		this.messageBus.publish(tokenPositionsUpdated, this.allTokenPositions);
		return true;
	}

	public readonly getTokenTypeAt = (row: number, cell: number): TokenType | undefined => {
		const token = this.getTokenAt(new Position(row, cell));
		return token === undefined ? undefined : token.tokenType;
	}

	private readonly getTokenAt = (position: Position): Token | undefined => {
		const tokenPosition = find(SetupBoardCustomElement.tokenPositionHasPosition(position),
			this.allTokenPositions);
		return tokenPosition === undefined ? undefined : tokenPosition.token;
	}

	private get allTokenPositions(): TokenPosition[] {
		return this.playerOne.tokenPositions.concat(this.playerTwo.tokenPositions);
	}

	private static readonly tokenPositionHasType =
		curry((tokenType: TokenType, tokenPosition: TokenPosition) =>
			tokenPosition.token.tokenType === tokenType);

	private static readonly tokenPositionHasPosition =
		curry((position: Position, tokenPosition: TokenPosition) =>
			tokenPosition.position.equals(position));

	private static readonly getPlayerTypeForStartType =
		(startType: Start): PlayerType | undefined => {
		switch (startType) {
			case Start.PlayerOne:
				return PlayerType.PlayerOne;

			case Start.PlayerTwo:
				return PlayerType.PlayerTwo;

			default:
				return undefined;
		}
	}
}

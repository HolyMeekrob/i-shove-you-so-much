import { PlayerType } from './playerType';
import { TokenType } from './tokenType';

export class Token {
	constructor(private playerType: PlayerType, private tokenType: TokenType) {}

	public getPlayerType = (): PlayerType => this.playerType;
	public getTokenType = (): TokenType => this.tokenType;
}

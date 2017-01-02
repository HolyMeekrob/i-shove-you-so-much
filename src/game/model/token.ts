import { PlayerType } from './playerType';
import { TokenType } from './tokenType';

export class Token {
	constructor(public readonly playerType: PlayerType, public readonly tokenType: TokenType) {}
}

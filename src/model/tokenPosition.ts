import { Position } from './position';
import { Token } from './token';

export class TokenPosition {
	private _token: Token;
	private _position: Position;

	constructor(token: Token, position: Position) {
		this._token = token;
		this._position = position;
	}

	public get token(): Token { return this._token; }
	public get position(): Position { return this._position; }
}

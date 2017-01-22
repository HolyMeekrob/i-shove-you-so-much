import { Color } from '../game/model/color';
import { IPlayer } from '../game/model/player';
import { TokenPosition } from '../game/model/tokenPosition';

export interface INewGameInput {
	playerOne: IPlayer;
	playerTwo: IPlayer;

	tokenPositions: TokenPosition[];
}

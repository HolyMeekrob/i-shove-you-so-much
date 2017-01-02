import { Color } from '../game/model/color';
import { TokenPosition } from '../game/model/tokenPosition';

export interface INewGameInput {
	playerOneName: string;
	playerOneColor: Color;

	playerTwoName: string;
	playerTwoColor: Color;

	tokenPositions: TokenPosition[];
}

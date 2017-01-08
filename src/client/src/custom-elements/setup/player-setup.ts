import { Color } from '../../../../game/model/color';
import { TokenPosition } from '../../../../game/model/tokenPosition';
import { TokenType } from '../../../../game/model/tokenType';

export interface IPlayerSetup {
	name: string;
	selectedTokenType: TokenType;
	tokenPositions: TokenPosition[];
	color: Color;
}

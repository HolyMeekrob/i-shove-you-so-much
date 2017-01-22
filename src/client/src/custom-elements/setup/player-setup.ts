import { Color } from '../../../../game/model/color';
import { Player } from '../../../../game/model/player';
import { TokenPosition } from '../../../../game/model/tokenPosition';
import { TokenType } from '../../../../game/model/tokenType';

export interface IPlayerSetup {
	name: string;
	selectedTokenType: TokenType;
	tokenPositions: TokenPosition[];
	color: Color;
}

export const toPlayer = (playerSetup: IPlayerSetup): Player =>
	new Player(playerSetup.name, playerSetup.color);

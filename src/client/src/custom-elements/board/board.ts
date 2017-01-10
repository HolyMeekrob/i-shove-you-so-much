import { bindable } from 'aurelia-framework';
import { Color } from '../../../../game/model/color';
import { TokenType } from '../../../../game/model/tokenType';
import { IBoardDisplay } from './board-display';

export class BoardCustomElement {
	@bindable
	public board: IBoardDisplay;

	@bindable
	public squareClicked: (event: MouseEvent, row: number, cell: number) => boolean;

	@bindable
	public getTokenTypeAt: (row: number, cell: number) => TokenType | undefined;
}

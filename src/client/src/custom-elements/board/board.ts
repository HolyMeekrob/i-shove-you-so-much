import { bindable } from 'aurelia-framework';
import { Board } from '../../../../game/model/board';
import { Color } from '../../../../game/model/color';
import { TokenType } from '../../../../game/model/tokenType';

export class BoardCustomElement {
	@bindable
	public board: Board;

	@bindable
	public playerOneColor: Color;

	@bindable
	public playerTwoColor: Color;

	@bindable
	public squareClicked: (event: MouseEvent, row: number, cell: number) => boolean;

	@bindable
	public getTokenTypeAt: (row: number, cell: number) => TokenType | undefined;
}

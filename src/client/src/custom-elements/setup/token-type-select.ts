import { bindable, bindingMode } from 'aurelia-framework';
import { TokenType } from '../../../../game/model/tokenType';

export class TokenTypeSelectCustomElement {
	@bindable
	public name: string;

	@bindable
	public bullyCount: number;

	@bindable
	public victimCount: number;

	@bindable({ defaultBindingMode: bindingMode.twoWay })
	public selectedTokenType: TokenType;

	public bully: TokenType = TokenType.Bully;
	public victim: TokenType = TokenType.Victim;
}

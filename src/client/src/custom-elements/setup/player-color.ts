import { autoinject, bindable, bindingMode, computedFrom } from 'aurelia-framework';
import { Color, hexFormat } from '../../../../game/model/color';

@autoinject
export class PlayerColorCustomElement {
	@bindable({ defaultBindingMode: bindingMode.twoWay })
	public color: Color;

	private get borderColor(): Color {
		return this.color === 0xffffff ? 0x0 : 0xffffff;
	}

	@computedFrom('color')
	get sampleStyle(): string {
		return `background-color: ${hexFormat(this.color)};`
			+ ` border-color: ${hexFormat(this.borderColor)};`;
	}

	public readonly colors = [
		{ name: 'Black', rgb: 0x000000 },
		{ name: 'White', rgb: 0xffffff },
		{ name: 'Red', rgb: 0xff0000 },
		{ name: 'Green', rgb: 0x008000 },
		{ name: 'Blue', rgb: 0x0000ff },
		{ name: 'Purple', rgb: 0x800080 },
		{ name: 'Yellow', rgb: 0xffff00 },
		{ name: 'Brown', rgb: 0xa52a2a },
		{ name: 'Orange', rgb: 0xff4500 }
	];
}

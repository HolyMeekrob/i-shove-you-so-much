import { bindable, bindingMode, computedFrom } from 'aurelia-framework';

interface IColor {
	name: string;
	hex: string;
};

export class PlayerColorCustomElement {
	@bindable({ defaultBindingMode: bindingMode.twoWay })
	public color: string | undefined;

	@computedFrom('color')
	get sampleStyle(): string {
		const bgColor = this.color === undefined ? '#ffffff' : this.color;
		const borderColor: string =
			this.color !== undefined && this.color === '#ffffff'
				? '#000000'
				: '#ffffff';

		return `background-color: ${bgColor}; border-color: ${borderColor};`;
	}

	public readonly colors = [
		{ name: 'Black', hex: '#000000' },
		{ hex: '#ffffff', name: 'White' },
		{ hex: '#ff0000', name: 'Red' },
		{ hex: '#008000', name: 'Green' },
		{ hex: '#0000ff', name: 'Blue' },
		{ hex: '#800080', name: 'Purple' },
		{ hex: '#ffff00', name: 'Yellow' },
		{ hex: '#a52a2a', name: 'Brown' },
		{ hex: '#ff4500', name: 'Orange' }
	];
}

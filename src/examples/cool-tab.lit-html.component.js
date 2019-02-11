import { render, html } from 'lit-html';

const componentStyles = `
:host {
	--tab-button-border-radius: 5px;
	--tab-button-border-width: 3px;
	--tab-button-color: #6f7dbc;

	border: var(--tab-button-border-width) solid var(--tab-button-color);
	display: block;
	flex-grow: 1;
	overflow: none;

	background-color: #fff;
	color: var(--tab-button-color);
	cursor: pointer;
	font-size: 18px;
	padding: 10px;
	text-align: center;
	user-select: none
	transition: all 200ms ease-in-out;
}

:host([selected]) {
	background-color: var(--tab-button-color);
	color: #fff;
	transition: all 200ms ease-in-out;
}

:host(:not(:first-of-type)) {
	border-left-width: 0;
}

:host(:first-of-type) {
	border-top-left-radius: var(--tab-button-border-radius);
	border-bottom-left-radius: var(--tab-button-border-radius);
}

:host(:last-of-type) {
	border-top-right-radius: var(--tab-button-border-radius);
	border-bottom-right-radius: var(--tab-button-border-radius);
}
`;

class CoolTab extends HTMLElement {
	constructor() {
		super();

		this._selected = false;
		this._value = '';
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this._value = this.getAttribute('value');
		this.clickListener = this.addEventListener('click', () => this.selected = true);
		render();
	}

	get value() {
		return this._value;
	}

	get selected() {
		return this._selected;
	}

	set selected(selected) {
		if (selected === this.selected) {
			return;
		}

		this._selected = selected;
		this.render();

		if (this.selected) {
			this.dispatchTabSelect();
		}
	}

	dispatchTabSelect() {
		this.dispatchEvent(new CustomEvent('tabselect', { bubbles: true }));
	}

	render() {
		if (this.selected) {
			this.setAttribute('selected', '');
			this.set
		} else {
			this.removeAttribute('selected');
		}

		render(html`
			<style>${componentStyles}</style>
			<slot></slot>
		`, this.shadowRoot);
	}
}

// window.customElements.define('cool-tab', CoolTab);

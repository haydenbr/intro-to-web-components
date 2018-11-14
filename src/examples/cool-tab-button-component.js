const template = document.createElement('template');
const style = `
:host {
	--tab-button-border-radius: 5px;
	--tab-button-border-width: 3px;
	--tab-button-color: #6f7dbc;

	border: var(--tab-button-border-width) solid var(--tab-button-color);
	display: block;
	flex-grow: 1;
	overflow: none;
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

#tab-inner {
	background-color: #fff;
	color: var(--tab-button-color);
	cursor: pointer;
	font-size: 18px;
	padding: 10px;
	text-align: center;
	user-select: none
	transition: all 200ms ease-in-out;
}

#tab-inner[selected] {
	background-color: var(--tab-button-color);
	color: #fff;
	transition: all 200ms ease-in-out;
}
`;

template.innerHTML = `
<style>${style}</style>
<div id="tab-inner">
	<slot></slot>
</div>
`;

class CoolTabButton extends HTMLElement {
	constructor() {
		super();

		this._readonlySelected = false;
		this._readonlyValue = '';
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));

		this._readonlyValue = this.getAttribute('value');
		this.$tabInner = this.shadowRoot.querySelector('#tab-inner');
		this.clickListener = this.$tabInner.addEventListener('click', () => this.selected = true);
	}

	get value() {
		return this._readonlyValue;
	}

	get selected() {
		return this._readonlySelected;
	}

	set selected(selected) {
		if (selected === this.selected) {
			return;
		}

		this._readonlySelected = selected;
		this.render();

		if (this.selected) {
			this.dispatchTabChange();
		}
	}

	dispatchTabChange() {
		this.dispatchEvent(new CustomEvent('tabselect', { bubbles: true }));
	}

	render() {
		if (!this.$tabInner) {
			return;
		}

		if (this.selected) {
			this.$tabInner.setAttribute('selected', '');
		} else {
			this.$tabInner.removeAttribute('selected');
		}
	}
}

window.customElements.define('cool-tab-button', CoolTabButton);

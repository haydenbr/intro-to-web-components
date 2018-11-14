const template = document.createElement('template');
const style = `
:host {
	--border-radius: 5px;
	--border-width: 3px;
	--color: #6f7dbc;

	align-items: center;
	display: flex;
	justify-content: center;
}

::slotted(cool-tab-button) {
	--tab-button-border-radius: var(--border-radius);
	--tab-button-border-width: var(--border-width);
	--tab-button-color: var(--color);
}
`;

template.innerHTML = `
<style>${style}</style>
<slot></slot>
`;

class CoolTab extends HTMLElement {
	constructor() {
		super();

		this._value = undefined;
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));

		this.tabSelectListener = this.addEventListener('tabselect', (event) => this.value = event.target.value);
		this.value = this.defaultValue;
		setTimeout(() => this.render());
	}

	disconnectedCallback() {
		this.removeEventListener('tabselect', this.tabSelectListener);
	}

	get defaultValue() {
		return this.getAttribute('value') || '';
	}

	get value() {
		return this._value;
	}

	set value(newValue) {
		if (newValue === this.value) {
			return;
		}

		this._value = newValue;
		this.render();
		this.dispatchTabChange();
	}

	get tabButtons() {
		return Array.from(this.querySelectorAll('cool-tab-button'));
	}

	dispatchTabChange() {
		this.dispatchEvent(new CustomEvent('tabchange', { bubbles: true }));
	}

	render() {
		this.tabButtons.forEach((tab) => tab.selected = (tab.value === this.value));
	}
}

window.customElements.define('cool-tab', CoolTab);

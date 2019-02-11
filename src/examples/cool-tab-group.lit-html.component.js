import { html, render } from 'lit-html';

const style = `
:host {
	align-items: center;
	display: flex;
	justify-content: center;
}
`;

class CoolTabGroup extends HTMLElement {
	constructor() {
		super();

		this._value = undefined;
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });

		this.addEventListener('tabselect', (event) => this.value = event.target.value);
		this.value = this.defaultValue;
		// setTimeout(() => this.render());
		this.render()
	}

	disconnectedCallback() {
		this.removeEventListener('tabselect');
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

		let oldValue = this._value;
		this._value = newValue;
		this.render();
		this.dispatchTabChange({ oldValue, newValue });
	}

	get tabButtons() {
		return Array.from(this.querySelectorAll('cool-tab'));
	}

	dispatchTabChange(payload) {
		this.dispatchEvent(new CustomEvent('tabchange', { bubbles: true, detail: payload }));
	}

	render() {
		this.tabButtons.forEach((tab) => tab.selected = (tab.value === this.value));

		render(html`
			<style>${style}</style>
			<slot></slot>
		`, this.shadowRoot);
	}
}

// window.customElements.define('cool-tab-group', CoolTabGroup);

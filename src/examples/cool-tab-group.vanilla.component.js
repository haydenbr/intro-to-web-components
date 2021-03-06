const template = document.createElement('template');
const style = `
:host {
	align-items: center;
	display: flex;
	justify-content: center;
}
`;

template.innerHTML = `
<style>${style}</style>
<slot></slot>
`;

class CoolTabGroup extends HTMLElement {
	constructor() {
		super();

		this._value = undefined;
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));

		this.addEventListener('tabselect', (event) => this.value = event.target.value);
		this.value = this.defaultValue;
		setTimeout(() => this.render());
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
	}
}

window.customElements.define('cool-tab-group', CoolTabGroup);

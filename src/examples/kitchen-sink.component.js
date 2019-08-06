const template = document.createElement('template');
const styles = `
:host {
	--color: #f8981c
}

p {
	color: var(--color, #6f7dbc);
}

slot::slotted(small) {
	color: yellow;
}

slot[name="secondary-slot"]::slotted(small) {
	color: red;
}

slot[name="secondary-slot"]::slotted(.cool) {
	color: #6f7dbc;
}
`;
const templateString = `
<style>${styles}</style>
<p><span id="name"></span> is cool!!!</p>
<slot></slot>
<hr />
<slot name="secondary-slot"></slot>
`;
template.innerHTML = templateString;

class KitchenSink extends HTMLElement {
	constructor() {
		super();

		this._$name = undefined;
		this._name = '';
	}

	handleNameChange(oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		this.name = newValue;
	}

	connectedCallback() {
		// this.appendChild(template.content.cloneNode(true))
		// this._$name = this.querySelector('#name');
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this._$name = this.shadowRoot.querySelector('#name');

		this.name = this.getAttribute('name') || 'Bob';
	}

	get name() {
		return this._name;
	}

	set name(newName) {
		if (newName === this.name) {
			return;
		}

		this.setAttribute('name', newName);
		this._name = newName;
		this.render();
	}

	static get observedAttributes() {
		return ['name'];
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = newValue;
		}
	}

	disconnectedCallback() {
		// or do something useful like clean up event listeners
		alert(`I'll get you Eh Steve, if it's that last thing I DOOOOOOOOOOO!`);
	}

	render() {
		this._$name.textContent = this.name;
	}
}

window.customElements.define('kitchen-sink', KitchenSink);

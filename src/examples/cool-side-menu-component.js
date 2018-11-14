const template = document.createElement('template');
const styles = `
:host {
	--menu-primary-color: #f8981c;
	--menu-primary-contrast-color: #fff;
	--menu-width: 400px;
	--title-font-size: 1.5em;
	--menu-item-font-size: 1.2em;
}
.frame {
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	overflow: hidden;
	pointer-events: none;
	z-index: 1000;
	transition: background-color 300ms ease-in;
}
.frame[open] {
	pointer-events: auto;
	background-color: rgba(0,0,0,0.25);
}
.frame[open] .container {
	transform: translate3d(0, 0, 0);
}
.container {
	width: var(--menu-width);
	background: #FFF;
	height: 100%;
	transform: translate3D(-100%, 0, 0);
	will-change: transform;
	transition: transform 300ms ease-in;
	box-shadow: 1px 0 3px rgba(51,51,51,0.25);
}
.title {
	display: flex;
	flex-direction: row;
	min-height: 3.2em;
	font-size: var(--title-font-size);
	background-color: var(--menu-primary-color);
	color: var(--menu-primary-contrast-color);
}
.title .title-content {
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding-left: 1em;
}
.close {
	align-items: center;
	flex-basis: 100px;
	flex-grow: 0;
	flex-shrink: 0;
	cursor: pointer;
	display: flex;
	justify-content: center;
	user-select: none;
}
.menu-items::slotted(a) {
	display: block;
	font-size: var(--menu-item-font-size);
	text-decoration: none;
	line-height: 2.5em;
	padding: 0.5em;
	border-bottom: solid 1px #F1F1F1;
	color: #665;
}
.menu-items::slotted(a:hover) {
	color: var(--menu-primary-color);
}
:host([backdrop="false"]) .frame[open] {
	pointer-events: none;
	background-color: inherit;
}
:host([backdrop="false"]) .frame[open] .container {
	pointer-events: auto;
}
`;
// #6f7dbc
template.innerHTML = `
<style>${styles}</style>
<div class="frame" data-close="true">
	<nav class="container">
		<div class="title">
			<div class="title-content">
				<slot name="menu-title">Menu</slot>
			</div>
			<a class="close" data-close="true">&#10006;</a>
		</div>
		<div class="content">
			<slot class="menu-items"></slot>
		</div>
	</nav>
</div>
`;

class CoolSideMenuComponent extends HTMLElement {
	constructor() {
		super();

		this._$frame = null;
		this._isOpen = false;
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));

		this._$frame = shadowRoot.querySelector('.frame');
		this._$frame.addEventListener('click', (event) => this.onCloseClick(event));
	}

	set isOpen(value) {
		const result = !!value;
		if (this._isOpen === result) {
			return;
		}
		this._isOpen = result;
		this.render();
	}

	get isOpen() {
		return this._isOpen;
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

	onCloseClick(event) {
		if (event.target.dataset.close === 'true') {
			this.close();
		}
	}

	render() {
		if (this._$frame) {
			if (this.isOpen) {
				this._$frame.setAttribute('open', '');
				this.dispatchEvent(new CustomEvent('menuopen'));
			} else {
				this._$frame.removeAttribute('open');
				this.dispatchEvent(new CustomEvent('menuclose'));
			}
		}
	}
}

window.customElements.define('cool-side-menu', CoolSideMenuComponent);

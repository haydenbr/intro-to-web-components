import { LitElement, html, customElement, property, css, query } from 'lit-element';

const styles = css`
	:host {
		block;
	}

	button {
		background-color: cyan;
		border: 1px solid black;
		border-radius: 5px;
		padding: 10px 20px;
	}
`;

@customElement('foo-bar')
export class FooBar extends LitElement {
	static styles = styles;
	@property() name: string = 'Bob';
	switch: boolean = false;

	@query('#my-input') input: HTMLInputElement;

	resetInput() {
		let event = new Event('bob');
		this.dispatchEvent(event);
	}

	render() {
		return html`
			<input
				type="checkbox"
				.checked=${this.switch}
				@change=${(e: any) => console.log(e.target.checked)}
			>
				${this.name}
			</input>
			<input
				id="my-input"
				.value=${this.name}
				@input=${(e: any) => console.log(e.target.value)}
			></input>
			<button @click=${() => this.resetInput()}>button</button>
		`;
	}
}

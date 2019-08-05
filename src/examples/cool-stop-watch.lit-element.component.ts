import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('cool-stop-watch-lit-element')
export class CoolStopWatch extends LitElement {
	static get styles() {
		return css`
			:host {
				border: 1px solid black;
				background-color: white;
				color: black;
				display: inline-block;
				padding: 10px;
			}
		
			button {
				border-radius: 5px;
				font-size: 16px;
				padding: 5px 10px;
			}
		
			#stop-watch-controls {
				text-align: center;
			}
		`
	}

	@property() private currentTime = 0;
	@property() private stopWatchInterval: any;
	private millisecondsInterval = 5;

	disconnectedCallback() {
		clearInterval(this.stopWatchInterval);
	}

	start = () => {
		if (this.stopWatchIsRunning) {
			return;
		}

		this.stopWatchInterval = setInterval(() => {
			this.currentTime = this.currentTime + this.millisecondsInterval;
		}, this.millisecondsInterval);
	}

	stop = () => {
		clearInterval(this.stopWatchInterval);
		this.stopWatchInterval = undefined;
	}

	reset = () => this.currentTime = 0;

	get formattedTime() {
		let minutesRaw = this.currentTime / 60000;
		let secondsRaw = (minutesRaw % 1) * 60;
		let millisecondsRaw = (secondsRaw % 1) * 1000;

		let minutes = Math.floor(minutesRaw);
		let seconds = Math.floor(secondsRaw).toString().padStart(2, '0');
		let milliseconds = Math.floor(millisecondsRaw).toString().padStart(3, '0');

		return `${minutes}:${seconds}.${milliseconds}`;
	}

	get stopWatchIsRunning() {
		return !!this.stopWatchInterval;
	}

	render = () => html`
		<div id="time">${this.formattedTime}</div>
		<div id="stop-watch-controls">
			${!this.stopWatchIsRunning
				? html`<button @click=${() => this.start()}>start</button>`
				: null
			}
			${this.stopWatchIsRunning
				? html`<button @click=${() => this.stop()}>stop</button>`
				: null
			}
			<button @click=${() => this.reset()}>reset</button>
		</div>
	`;
}

import { html, render } from 'lit-html';

const componentStyles = `
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

	#timer-controls {
		text-align: center;
	}
`;

class CoolTimer extends HTMLElement {
	connectedCallback() {
		this._currentTime = 0;
		this._timerInterval;
		this._millisecondsInterval = 5;

		this.attachShadow({ mode: 'open' });

		this.render();
	}

	disconnectedCallback() {
		clearInterval(this._timerInterval);
	}

	start() {
		if (this.timerIsRunning) {
			return;
		}

		this._timerInterval = setInterval(() => {
			this.currentTime = this.currentTime + this._millisecondsInterval;
		}, this._millisecondsInterval);
	}

	stop() {
		clearInterval(this._timerInterval);
		this._timerInterval = undefined;
		this.render();
	}

	reset() {
		this.currentTime = 0;
	}

	get currentTime() {
		return this._currentTime;
	}

	set currentTime(value) {
		this._currentTime = value;
		this.render();
	}

	get formattedTime() {
		let minutes = this.currentTime / 60000;
		let seconds = (minutes % 1) * 60;
		let milliseconds = (seconds % 1) * 1000;

		minutes = Math.floor(minutes);
		seconds = Math.floor(seconds).toString().padStart(2, '0');
		milliseconds = Math.floor(milliseconds).toString().padStart(3, '0');

		return `${minutes}:${seconds}.${milliseconds}`;
	}

	get timerIsRunning() {
		return !!this._timerInterval;
	}

	render() {
		render(html`
			<style>${componentStyles}</style>

			<div id="time">${this.formattedTime}</div>
			<div id="timer-controls">
				${!this.timerIsRunning
					? html`<button @click=${() => this.start()}>start</button>`
					: null
				}
				${this.timerIsRunning
					? html`<button @click=${() => this.stop()}>stop</button>`
					: null
				}
				<button @click=${() => this.reset()}>reset</button>
			</div>
		`, this.shadowRoot);
	}
}

window.customElements.define('cool-timer', CoolTimer);

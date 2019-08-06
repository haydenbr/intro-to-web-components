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

	#stop-watch-controls {
		text-align: center;
	}
`;

class CoolStopWatch extends HTMLElement {
	connectedCallback() {
		this._currentTime = 0;
		this._stopWatchInterval;
		this._millisecondsInterval = 5;

		let initialTime = Number(this.getAttribute('current-time'));
		if (initialTime && !isNaN(initialTime)) {
			this._currentTime = initialTime;
		}

		this.attachShadow({ mode: 'open' });
		this.render();
	}

	disconnectedCallback() {
		clearInterval(this._stopWatchInterval);
	}

	start() {
		if (this.stopWatchIsRunning) {
			return;
		}

		this._stopWatchInterval = setInterval(() => {
			this.currentTime = this.currentTime + this._millisecondsInterval;
		}, this._millisecondsInterval);
	}

	stop() {
		clearInterval(this._stopWatchInterval);
		this._stopWatchInterval = undefined;
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

	get stopWatchIsRunning() {
		return !!this._stopWatchInterval;
	}

	render() {
		render(html`
			<style>${componentStyles}</style>

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
		`, this.shadowRoot);
	}
}

window.customElements.define('cool-stop-watch-lit-html', CoolStopWatch);

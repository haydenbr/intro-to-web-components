const template = document.createElement('template');
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

const templateString = `
	<style>${componentStyles}</style>

	<div id="time"></div>
	<div id="stop-watch-controls">
		<button id="start">start</button>
		<button id="stop">stop</button>
		<button id="reset">reset</button>
	</div>
`;
template.innerHTML = templateString;

class CoolStopWatch extends HTMLElement {
	connectedCallback() {
		this._currentTime = 0;
		this._stopWatchInterval;
		this._millisecondsInterval = 5;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.$timeDisplay = this.shadowRoot.querySelector('#time');
		this.$startButton = this.shadowRoot.querySelector('#start');
		this.$stopButton = this.shadowRoot.querySelector('#stop');
		this.$resetButton = this.shadowRoot.querySelector('#reset');

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);

		this.$startButton.addEventListener('click', this.start);
		this.$stopButton.addEventListener('click', this.stop);
		this.$resetButton.addEventListener('click', this.reset);

		this.render();
	}

	disconnectedCallback() {
		clearInterval(this._stopWatchInterval);
		this.$startButton.removeEventListener('click', this.start);
		this.$stopButton.removeEventListener('click', this.stop);
		this.$resetButton.removeEventListener('click', this.reset);
	}

	start() {
		if (this.isStopWatchRunning) {
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

	get isStopWatchRunning() {
		return !!this._stopWatchInterval;
	}

	render() {
		this.$timeDisplay.textContent = this.formattedTime;

		if (this.isStopWatchRunning) {
			this.$startButton.style.display = 'none';
			this.$stopButton.style.display = 'inline';
		} else {
			this.$startButton.style.display = 'inline';
			this.$stopButton.style.display = 'none';
		}
	}
}

window.customElements.define('cool-stop-watch', CoolStopWatch);

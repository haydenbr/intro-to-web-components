import { customElement } from 'lit-element';
import { html, render } from 'lit-html'

@customElement('twitter-link')
export class TwitterLink extends HTMLElement {
	connectedCallback() {
		render(html`
			<style>
				twitter-link {
					position: absolute;
					bottom: 0;
					right: 0;
					font-size: 16px !important;
					z-index: 100;
				}
			</style>
			<a target="_blank" href="https://twitter.com/hayden_dev">@hayden_dev</a>
		`, this);
	}
}

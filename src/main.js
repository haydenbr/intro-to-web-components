import './main.scss';
import './index.html';
import './examples';

function init(event) {
	Reveal.initialize({
		autoSlide: 0,
		backgroundTransition: 'slide',
		controls: false,
		history: true,
		dependencies: [
			// Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
			{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
	
			// Interpret Markdown in <section> elements
			{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
			{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
	
			// Syntax highlight for <code> elements
			{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
	
			// Zoom in and out with Alt+click
			{ src: 'plugin/zoom-js/zoom.js', async: true },
	
			// Speaker notes
			{ src: 'plugin/notes/notes.js', async: true },
	
			// MathJax
			{ src: 'plugin/math/math.js', async: true }
		]
	});

	event.target.removeEventListener(event.type, init);
}

document.addEventListener('DOMContentLoaded', init);

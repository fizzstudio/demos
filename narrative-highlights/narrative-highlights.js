window.addEventListener('load', () => new HighlightChart());

class HighlightChart {
  constructor() {
    this.svgns = 'http://www.w3.org/2000/svg';
    this.root = document.documentElement;
    this.init();
  }

  init () {
    this.narratives = this.root.getElementById('narratives');
    this.highlights = this.root.querySelectorAll('[data-highlight]');
    this.colorpicker = this.root.getElementById('colorpicker');

    this.index = 0;
    this.indexMax = 0;

    this.setKeyBounds();

    // console.log('this.narratives', this.narratives);
    // console.log('this.highlights', this.highlights);

    this.narratives.addEventListener('mouseover', this.getPointer.bind(this));
    this.colorpicker?.addEventListener('mouseover', this.setColor.bind(this));
    this.root.addEventListener('keydown', this.getKey.bind(this));
  }

  setKeyBounds () {
    this.highlights.forEach((highlight) => {
      const index = +highlight.dataset.highlight;
      this.indexMax = (index > this.indexMax) ? index : this.indexMax;
    });
  }

  reset () {
    this.highlights.forEach((highlight) => {
      highlight.classList.remove('active');
    });
  }

  getPointer ( event ) {
    const target = event.target;
    this.index = +target.dataset.highlight;
    this.setNarrative();
  }

  getKey ( event ) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        this.index = (this.index >= this.indexMax) ? this.indexMax : this.index + 1;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        this.index = (0 >= this.index) ? 0 : this.index - 1;
        break;
    }
    this.setNarrative();
  }

  setNarrative () {
    this.reset();
    this.highlights.forEach((highlight) => {
      if (+highlight.dataset.highlight === this.index) {
        highlight.classList.add('active');
      }
    });
  }

  setColor ( event ) {
    const target = event.target;
    const color = target.getAttribute('fill');
    this.root.style.setProperty('--series-1', color);
  }
}
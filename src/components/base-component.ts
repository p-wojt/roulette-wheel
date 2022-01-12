export abstract class Component<T extends HTMLElement> {
  el: T;

  constructor(el: T) {
    this.el = el;
  }

  removeChildren() {
    if (this.el.childNodes.length > 0) {
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }
    }
  }
}

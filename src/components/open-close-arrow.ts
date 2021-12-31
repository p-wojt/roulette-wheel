import { Component } from "./base-component";

export class OpenCloseArrow extends Component<HTMLImageElement> {

    constructor() {
        const arrow = document.createElement('img');
        arrow.src = 'static/right-arrow.png';
        arrow.alt = 'open-close-arrow';
        arrow.className = 'open-close-arrow';
        super(arrow);
    }
}
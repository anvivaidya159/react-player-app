import {Component, ReactElement} from "react";
import * as ReactDOM from "react-dom";

let div: HTMLDivElement
/* tslint:disable:no-any */
export function render<P>(component: ReactElement<P>): Component<any, P> {
    return ReactDOM.render(component as ReactElement<P>, div) as Component<any, P>
}

export function findByName(name: string) {
    return div.querySelector(`[data-name="${name}"]`) as HTMLElement
}
export function textContent(): string {
    return div.textContent!
}
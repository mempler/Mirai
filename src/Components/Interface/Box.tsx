import React, { Component } from "react";
import "./Box.sass";

export default class Box extends Component<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    public render() {
        return (
            <div {...this.props} className={"box " + this.props.className} >
                {this.props.children}
            </div>
        );
    }
}

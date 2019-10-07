import React, { Component } from "react";

import "./Circle.sass";

export default class Circle extends Component<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    public render() {
        return (
            <div {...this.props} className={"circle " + this.props.className}>
                <div className="circle-header" />
                <div className="circle-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

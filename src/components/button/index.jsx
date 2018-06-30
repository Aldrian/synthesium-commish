import React, { Component } from 'react';
import './Button.css';
class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Button">
                {this.props.name}
            </div>
        )
    }
}

export default Button;
import React, { Component } from 'react';
import './Button.css';
class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Button" onClick={this.props.onClick}>                
                {this.props.loading ?
                    (
                        <div className="sk-wave">
                            <div className="sk-rect sk-rect1"></div>
                            <div className="sk-rect sk-rect2"></div>
                            <div className="sk-rect sk-rect3"></div>
                            <div className="sk-rect sk-rect4"></div>
                            <div className="sk-rect sk-rect5"></div>
                        </div>
                    ) :
                    (
                        <span>{this.props.name}</span>
                    )
                }
            </div>
        )
    }
}

export default Button;
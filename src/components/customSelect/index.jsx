import React, { Component } from 'react';
import './CustomSelect.css';
class CustomSelect extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            pricingSelectActive: false,
            items: this.props.elems.map(elem => ({value: elem.value, name: elem.name, selected: props.init === elem.value})),
        }
        this.markChoiceActive = this.markChoiceActive.bind(this);
    }
    markChoiceActive(value){
        const items = [...this.state.items];
        const valueIndex = items.findIndex(e => e.value === value);
        items.forEach(e => e.selected = false);
        items[valueIndex].selected = true;
        this.setState({items});
        this.props.handleOptionChange(value, this.props.commissionID);
    }
    render() {
        return (
            <div className={`CustomSelect select-${this.props.mode}`}>
                <div tabIndex="0" className={`cs-select cs-skin-slide ${this.state.pricingSelectActive ? 'cs-active' : ''} ${this.props.isError ? 'is-error' : ''}`} onClick={() => { this.setState({ pricingSelectActive: !this.state.pricingSelectActive }) }} onBlur={() => { this.setState({ pricingSelectActive: false }) }}>
                    <span className="cs-placeholder">
                    {this.props.mode !== 'manage' && (
                        <i>
                            {
                                this.state.items.find(e => e.selected) ? this.state.items.find(e => e.selected).name : 'Choose your option'
                            }
                        </i>
                    )}                    
                    </span>
                    <div className="cs-options">
                        <ul>
                            {
                                this.state.items.map(item => (
                                    <li
                                        data-option
                                        data-value={item.value}
                                        className={`${item.selected ? 'cs-selected' : ''}`}
                                        onClick={(e) => {this.markChoiceActive(item.value)}}
                                    >
                                            <span>{item.name}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomSelect;
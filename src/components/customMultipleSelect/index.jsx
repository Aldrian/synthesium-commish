import React, { Component } from 'react';
import './CustomMultipleSelect.css';
class CustomSelect extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            pricingSelectActive: false,
            items: this.props.elems.map(elem => ({value: elem.value, name: elem.name, selected: false})),
        }
        this.markChoiceActive = this.markChoiceActive.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
    }
    markChoiceActive(value, event){
        event.preventDefault();
        event.stopPropagation();
        const items = [...this.state.items];
        const valueIndex = items.findIndex(e => e.value === value);
        items[valueIndex].selected = !items[valueIndex].selected;
        this.setState({items});
        this.props.handleOptionChange(items.filter(e => e.selected).map(e => e.value));
    }
    renderSelected() {
        const items = this.state.items.filter(e => e.selected);
        if (items.length > 0) {
            return items.map(e => e.name).join(', ');
        } else return 'None';
        
    }
    render() {
        return (
            <div className="CustomMultipleSelect">
                <div tabIndex="0" className={`cs-select cs-skin-slide ${this.state.pricingSelectActive ? 'cs-active' : ''}`} onClick={() => { this.setState({ pricingSelectActive: !this.state.pricingSelectActive }) }} onBlur={() => { this.setState({ pricingSelectActive: false }) }}>
                    <span className="cs-placeholder">
                    {
                        this.renderSelected()
                    }
                    </span>
                    <div className="cs-options">
                        <ul>
                            {
                                this.state.items.map(item => (
                                    <li
                                        data-option
                                        data-value={item.value}
                                        className={`${item.selected ? 'cs-selected' : ''}`}
                                        onClick={(e) => {this.markChoiceActive(item.value, e)}}
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
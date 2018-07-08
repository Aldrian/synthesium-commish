import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createRequest } from "../../data/commissions/";
import MessageEditor from '../../components/messageEditor'
import Button from '../../components/button'
import CustomSelect from '../../components/customSelect'
import CustomMultipleSelect from '../../components/customMultipleSelect'
import './Request.css';
import 'medium-draft/lib/index.css';



class CreateRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            option: '',
            additionalOptions: [],
            emailError: false,
            optionError: false,
            rawMessage: {},
        }
        this.sendRequest = this.sendRequest.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleAdditionalOptionChange = this.handleAdditionalOptionChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }
	componentDidMount() {
		
    }
    handleOptionChange(newOption) {
        this.setState({option: newOption, optionError: false});
    }
    handleEditorChange(rawMessage) {
        this.setState({rawMessage});
    }
    handleAdditionalOptionChange(selected) {
        this.setState({additionalOptions: selected});
    }
    sendRequest() {
        if (!this.props.creatingCommission) {
            var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (this.state.email.trim() === '' || !emailRE.test(String(this.state.email).toLowerCase())) {
                this.setState({emailError: true});
                return false;
            }
            if (this.state.option === '') {
                this.setState({optionError: true});
                return false;
            }
            this.props.createRequest(this.state.email, this.state.option, this.state.additionalOptions, this.state.rawMessage);
        }
    } 
	render() {
		return (
			<div className="Request">
				<div className="container">
                    <div className="header">
                        <h2 className="font-fjalla">
                            Make a request
                        </h2>
                        <p>Please fill up this form and I will get back to you shortly!</p>
                    </div>
                    <div className="request-form">
                        <section>
                            <p className="label">
                                <span className="number font-fjalla">1.</span> My email:
                            </p>
                            <input
                                type="email"
                                value={this.state.email}
                                onChange={(e) => {this.setState({email: e.target.value, emailError: false})}}
                                className={`${this.state.emailError ? 'is-error' : ''}`}
                            />
                        </section>
                        <section>
                            <p className="label">
                                <span className="number font-fjalla">2.</span> I want:
                            </p>
                            <CustomSelect
                                elems={[
                                    {
                                        value: 'sketch',
                                        name: 'A sketch',
                                    },
                                    {
                                        value: 'chibi',
                                        name: 'A Chibi',
                                    },
                                    {
                                        value: 'character',
                                        name: 'A character',
                                    },

                                ]}
                                isError={this.state.optionError}
                                handleOptionChange={this.handleOptionChange}
                            />
                        </section>
                        <section>
                            <p className="label">
                                <span className="number font-fjalla">3.</span> Any extras:
                            </p>
                            <CustomMultipleSelect
                                elems={[
                                    {
                                        value: '+character',
                                        name: 'More character(s)',
                                    },
                                    {
                                        value: 'simple background',
                                        name: 'A simple background',
                                    },
                                    {
                                        value: 'complex background',
                                        name: 'A complex background',
                                    },

                                ]}
                                handleOptionChange={this.handleAdditionalOptionChange}
                            />
                        </section>
                        <section>
                            <p className="label">
                                <span className="number font-fjalla">4.</span> What I want:
                            </p>                        
                            <MessageEditor onChange={this.handleEditorChange}/>
                        </section>
                    </div>
                    {
                        this.props.commissionCreated ?
                        (
                            <div>
                                Thanks for making the request! I'll get back to you shortly by email. See you soon!
                            </div>
                        ) : 
                        (
                            <Button name="Send request" onClick={this.sendRequest} loading={this.props.creatingCommission}/>
                        )
                    }
                    {this.props.creatingCommissionError && (
                        <div>
                            Something happened while sending the request. Could you please retry?
                        </div>
                    )}
                </div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    creatingCommission: state.commissions.creatingCommission,
    creatingCommissionError: state.commissions.creatingCommissionError,
    commissionCreated: state.commissions.commissionCreated,
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        createRequest
      },
      dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);

import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { convertFromRaw } from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { connect } from "react-redux";
import { getCommission } from "../../data/commissions/";
import './SeeRequest.css';
class SeeRequest extends Component {
    constructor(props) {
        super(props);
        const requestId = props.match.params.id;
        props.getCommission(requestId);
    }
    createMarkup(html) {
        return {
            __html: html, 
        }
    }
    render() {
        console.log(this.props.messages)
        return (
            <div className="SeeRequest">
                <div className="container">
                    <div className="header">
                        <h2 className="font-fjalla">
                            My request
                        </h2>
                    </div>
                    <div className="messages">
                        {
                            this.props.messages.map(message => {
                                return (
                                    <div class="message">
                                        <p>From {message.sender}</p>
                                        <div dangerouslySetInnerHTML={this.createMarkup(mediumDraftExporter(convertFromRaw(message.rawData)))}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    messages: state.commissions.messages,
});
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getCommission
      },
      dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SeeRequest);

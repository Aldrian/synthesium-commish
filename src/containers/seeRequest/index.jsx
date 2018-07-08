import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { convertFromRaw } from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { connect } from "react-redux";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fr';
import { getCommission, sendMessage } from "../../data/commissions/";
import MessageEditor from '../../components/messageEditor'
import Button from '../../components/button'
import userAvatar from './user.svg';
import adminAvatar from './synthesium.gif';
import './SeeRequest.css';
class SeeRequest extends Component {
    constructor(props) {
        super(props);
        const requestId = props.match.params.id;
        props.getCommission(requestId);
        this.state = {
            rawMessage: {},
            commissionId: requestId,
            shouldCleanData: false,
        }
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.commissionCreated) {
            this.setState({shouldCleanData: true});
        }
    }
    createMarkup(html) {
        return {
            __html: html, 
        }
    }
    handleEditorChange(rawMessage) {
        this.setState({rawMessage, shouldCleanData: false});
    }
    sendMessage() {
        if (!this.props.creatingCommission) {
            this.props.sendMessage(this.state.commissionId, this.state.rawMessage);
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
                                    <div class={`message ${message.sender === 'user' ? 'message-user' : 'message-admin'}`}>
                                        <span className="avatar">
                                           <img src={message.sender === 'user' ? userAvatar : adminAvatar} alt="avatar"/>
                                        </span>
                                        <span className="time">
                                            <Moment fromNow interval={30000} locale={this.props.locale}>
                                                {message.createdAt}
                                            </Moment>
                                        </span>
                                        <div dangerouslySetInnerHTML={this.createMarkup(mediumDraftExporter(convertFromRaw(message.rawData)))}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr/>
                    <MessageEditor onChange={this.handleEditorChange} shouldCleanData={this.state.shouldCleanData}/>
                    <Button name="Send message" onClick={this.sendMessage} loading={this.props.creatingCommission}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    messages: state.commissions.messages,
    locale: state.ui.locale,
    creatingCommission: state.commissions.creatingCommission,
    commissionCreated: state.commissions.commissionCreated,
});
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getCommission,
        sendMessage
      },
      dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SeeRequest);

import React, { Component } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { FormattedMessage } from 'react-intl';
import 'draft-js/dist/Draft.css';
import './Request.css';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
	componentDidMount() {
		
    }
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }
	render() {
		return (
			<div className="Request">
				<div className="container">
                    <div className="header">
                        <h2 className="font-fjalla">
                            Make a request
                        </h2>
                    </div>
                    <Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
                </div>
			</div>
		);
	}
}

export default Request;

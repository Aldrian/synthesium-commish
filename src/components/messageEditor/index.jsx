import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import {
    Editor,
    createEditorState,
  } from 'medium-draft';
 
import CustomImageSideButton from '../imageUploadButton'
import './MessageEditor.css';
import 'medium-draft/lib/index.css';



class MessageEditor extends Component {
    constructor(props) {
        super(props);
        this.sideButtons = [{
            title: 'Image',
            component: CustomImageSideButton,
          }];      
        this.state = {editorState: createEditorState()};
        this.onChange = (editorState) => {
            this.props.onChange(convertToRaw(editorState.getCurrentContent()));
            this.setState({editorState});
        };
    }
	componentDidMount() {
		
    }
    componentWillReceiveProps(newProps) {
        if (newProps.shouldCleanData) {
            this.setState({editorState: createEditorState()})
        }
    }

    focusEditor = () => {
        this.editor.focus();
      }
	render() {
		return (
            <div className="MessageEditor" onClick={this.focusEditor}>
                <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                sideButtons={this.sideButtons}
                placeholder="Write here..."
                ref={(element) => { this.editor = element; }}
                />
            </div>
		);
	}
}

export default MessageEditor;

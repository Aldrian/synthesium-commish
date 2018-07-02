import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import './Request.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];


class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: createEditorStateWithText('')};
        this.onChange = (editorState) => this.setState({editorState});
    }
	componentDidMount() {
		
    }

    focusEditor = () => {
        this.editor.focus();
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
                    <div className="editor" onClick={this.focusEditor}>
                        <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                        />
                        <InlineToolbar />
                    </div>
                </div>
			</div>
		);
	}
}

export default Request;

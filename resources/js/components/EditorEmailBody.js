import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class EditorEmailBody extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {editorState: EditorState.createEmpty()};
        
        this.onChange = (editorState) => this.setState({editorState});
        
        this.handleKeyCommand = (command) => {
            const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
            if (newState) {
              this.onChange(newState);
              return 'handled';
            }
            return 'not-handled';
        }
        this.onUnderlineClick = () => {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
            event.preventDefault();
        }
        
        this.onBoldClick = () => {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
            event.preventDefault();
        }
        
        this.onItalicClick = () => {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="editorContainer">     
                <button onClick={this.onUnderlineClick}>U</button>
                <button onClick={this.onBoldClick}><b>B</b></button>
                <button onClick={this.onItalicClick}><em>I</em></button>
                <div className="editors">
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange} 
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <EditorEmailBody />,
    document.getElementById('email-body')
);
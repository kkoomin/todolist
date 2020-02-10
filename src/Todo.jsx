import React from "react";

export default class Todo extends React.Component {
  state = {
    isEditting: false
  };

  startEditting = () => {
    this.setState({
      isEditting: true
    });
  };

  finishEditting = (id, text) => {
    this.props.edit(id, text);
    this.setState({
      isEditting: false
    });
  };

  render() {
    const { id, text } = this.props;
    return (
      <li>
        <span className="todo-icon">{this.state.isEditting ? "⏳" : "📌"}</span>
        {this.state.isEditting ? (
          <>
            <form
              onSubmit={e => {
                if (this.edit_input.value) {
                  this.finishEditting(id, this.edit_input.value);
                } else {
                  this.finishEditting(id, text);
                }
                e.preventDefault();
              }}
            >
              <input
                className="edit-input"
                ref={ref => (this.edit_input = ref)}
                autoFocus
                placeholder={text}
              />
              <button type="submit" style={{ display: "none" }} />
            </form>
          </>
        ) : (
          text
        )}
        <span className="deleteBtn" onClick={() => this.props.delete(id)}>
          ❌
        </span>
        <span className="editBtn" onClick={this.startEditting}>
          📝
        </span>
      </li>
    );
  }
}

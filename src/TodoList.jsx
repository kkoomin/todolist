import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  state = {
    items: []
  };

  addItem = e => {
    let itemArr = this.state.items;

    if (this.input.value !== "") {
      itemArr.unshift({
        text: this.input.value,
        key: Date.now()
      });

      this.setState({
        items: itemArr
      });
      this.input.value = "";
    }
    e.preventDefault();
  };

  editItem = (key, text) => {
    // console.log(this.state.items);
    const editArr = this.state.items.map(item => {
      if (item.key === key) {
        item = {
          text: text,
          key: Date.now()
        };
      }
      return item;
    });
    // console.log(editArr);
    this.setState({
      items: editArr
    });
  };

  deleteItem = key => {
    let newItemsArr = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: newItemsArr
    });
  };

  render() {
    return (
      <div className="todoList">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              placeholder="Enter task"
              ref={ref => (this.input = ref)}
              className="todo-input"
              autoFocus
            />
            <button type="submit" className="button">
              ADD
            </button>
          </form>
        </div>
        <div className="todo-items">
          <ul>
            {this.state.items.map(item => (
              <Todo
                key={item.key}
                id={item.key}
                text={item.text}
                edit={this.editItem}
                delete={this.deleteItem}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

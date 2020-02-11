import React from "react";
import $ from "jquery";
import Todo from "./Todo";

const url = "http://localhost:8080";
export default class TodoList extends React.Component {
  state = {
    items: []
  };

  componentWillMount() {
    $.get(url, data => {
      if (data.message) {
        this.setState({
          items: data.result.reverse()
        });
        // console.log(data.result);
      } else {
        alert("Couldn't get the data from server");
      }
    });
  }

  addItem = e => {
    let itemArr = this.state.items;

    if (this.input.value !== "") {
      const send_param = {
        text: this.input.value,
        key: Date.now()
      };

      $.post(`${url}/item/add`, send_param, data => {
        if (data.message) console.log(data.message);

        itemArr.unshift(send_param);

        this.setState(
          {
            items: itemArr
          },
          () => console.log("done")
        );
      });
    }
    this.input.value = "";
    e.preventDefault();
  };

  editItem = (key, text) => {
    $.post(`${url}/item/edit`, { key, text }, data => {
      console.log(data.message);
    });
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
    $.post(`${url}/item/delete`, { key }, data => {
      if (data.message) {
        let filterdItems = this.state.items.filter(item => item.key !== key);

        this.setState({
          items: filterdItems
        });
      } else {
        alert("Couldn't delete your todo 😢");
      }
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

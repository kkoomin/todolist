# Todo List

### Structure

```
--public
    favicon.ico
    index.html
--src
    --css
        index.css
    index.jsx
    Todo.jsx
    TodoList.jsx
package.json
```

### Features

- Able to create `<Todo />` component, edit todo text and delete todo component
- Rendering `<Todo />` components in the `<TodoList />` component

### Code Snippets

- Putting the lastest todo on top

  ```js
  /* TodoList.jsx / line 13-16 */
  itemArr.unshift({
    text: this.input.value,
    key: Date.now()
  });
  // '.unshift()' doesn't return a new array. Just modify the original one.
  ```

- Use `.map()` to edit particular todo text and reset the state(rerender)
- Use `.filter()` to sort out particular todo to delete and reset the state(rerender)

- Use `onSubmit` and `<button type="submit">` to submit data with pressing enter key.
- Set the style attribute `{display: "none"}` to the button to hide it but still able to submit with enter key even though user can't see it.
- Make `if~else` statement to change the todo text if there's a new input or keep the original text if user didn't put any.

  ```js
  /* Todo.jsx / line 28-45 */
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

  // e.preventDefault() - to delete default action of submitting the form
  ```

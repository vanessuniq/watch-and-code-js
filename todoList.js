// representing the data and methods to change the data
var myTodos = {
  todos: [], // this is an array of objects
  uniqueTodos: function() {
      const unique = (value, index, self) => {
          return self.indexOf(value) === index;
      };
      return this.todos.filter(unique);
  },

  addTodo: function(newTodo) {// pushing a todo object
      this.todos.push({
          description: newTodo,
          completed: false
      });
      view.displayTodos();
  },
  changeTodo: function(position, newValue) {  
      this.todos[position].description = newValue;
      view.displayTodos();
  },
  deleteTodo: function(position) {
      this.todos.splice(position, 1);
      view.displayTodos();
  },
  toggleCompletedOne: function(position) {
      let todo = this.todos[position];
      todo.completed = !todo.completed;
      view.displayTodos();
  },
  toggleAll: function() {
      function check(value) {
          return value.completed === true
      };
      let complete = this.todos.every(check);

      this.todos.forEach(element => {
          if (complete) {// uncomplete everything if they are all completed
              element.completed = false;
          } else {// otherwise mark them all as completed
              element.completed = true;
          };
      });

      view.displayTodos();
  }
};
// handle user interactions
let handler = {
  addTodo: function() {
      const todo = document.getElementById('todo');
      if (todo.value.trim()) {
          myTodos.addTodo(todo.value);
      } else {
          alert('your input should not be empty')
          
      };
      todo.value = '' ;
  },
  changeTodo: function(position) {
      newValue = document.getElementById('new_description');
      if (newValue.value.trim()) {
          myTodos.changeTodo(position, newValue.value);
          alert('todo successfully updated');
      
      } else {
       view.displayTodos();   
      };
      
      newValue.value = '';
  },
  toggleAll: function() {
      myTodos.toggleAll();
      
  }
};

// display the data on the page
const ol = document.querySelector('ol');

let view = {
  displayTodos: function() {
     const uniqueTodos = myTodos.uniqueTodos();
     ol.innerHTML = '';

      if (uniqueTodos.length === 0) {
          const h1 = document.createElement('h1');
          ol.appendChild(h1);
          h1.innerHTML = "Your list is empty.";
      } else {
          // iterate over each todo and display its properties value on the page
          uniqueTodos.forEach(function(todo, index) {
              const li = document.createElement('li');
              const br = document.createElement('br');
              li.id = index;
              ol.appendChild(li);
              ol.appendChild(br);

              const deleteButton = this.addButtons('delete');
              const markButton = this.addButtons('toggle');
              const editButton = this.addButtons('edit');

              if (todo.completed) {
                  li.innerHTML = `(x) ${todo.description}  `;
                  markButton.textContent = 'uncomplete todo'
                  li.style.backgroundColor = '#ADFF2F';
              } else {
                  li.innerHTML = `( ) ${todo.description}  `;
                  markButton.textContent = 'complete todo';
              };
              
              this.appendButtons(li);
          }, this);
      };
      
  },

  childrenButtons: [],

  addButtons: function(classname) {
      const button = document.createElement('button');
      button.className = classname;
      button.textContent = classname;
      this.childrenButtons.push(button);
      return button;
  },
  appendButtons: function(element) {
      this.childrenButtons.forEach(button => {
          element.appendChild(button);
      });
      this.childrenButtons = [];
  },
  setUpEventListeners: function() {
      ol.addEventListener('click', function(event) {
          let elementClicked = event.target,
              position = parseInt(elementClicked.parentNode.id);
      
          if (elementClicked.className === 'delete') {
              if (confirm('would you like to delete that todo?')) {
                  myTodos.deleteTodo(position);
              };
          } else if (elementClicked.className === 'toggle') {
              myTodos.toggleCompletedOne(position);
          } else if (elementClicked.className === 'edit') {
              let input = document.getElementById('new_description');
              if (input) {
                  input.value = '';
              } else {
                  input = document.createElement('input');
                  let linebreak = document.createElement('hr'),
                      submitButton = view.addButtons('submit');
                  input.type = 'text';
                  input.id = 'new_description';
                  input.placeholder = 'enter new todo description';
                  elementClicked.parentNode.appendChild(linebreak);
                  elementClicked.parentNode.appendChild(input);
                  view.appendButtons(elementClicked.parentNode);
              }
              
              
          } else if (elementClicked.className === 'submit') {
              handler.changeTodo(position);
          }
  
      });
  }
};

view.setUpEventListeners()
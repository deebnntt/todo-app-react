import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
  updateTodos: React.PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos }) => {
  /**
   * Base CSS class
   */
const baseCls = 'todos';


  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const putTodo = json => {
    const index = todos.findIndex(todo => {
      return todo.id === json.id;
    });

    updateTodos(
      [
        ...todos.slice(0, index),
        json,
        ...todos.slice(index + 1),
      ]
    );
  }

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    api('DELETE', todo, updateTodos);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
   const onClickTodo = todo => {
     const newTodo = Object.assign({}, todo);
     newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
     newTodo.archive = false;

     api('PUT', newTodo, putTodo);
   }

  /**
   * Click handler for clicking on the archive button
   * Adds item to the archive
   *
   * @param {object} todo - Todo object
   */
  const onClickArchive = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.archive = true;

    api('PUT', newTodo, putTodo);
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
   const renderTodos = () => {
     return todos.map(todo => {
       let filtered;
       switch (filterBy) {
         case 'active':
           filtered = todo.status !== 'active';
           break;
         case 'completed':
           filtered = todo.archive || todo.status !== 'complete';
           break;
         case 'archived':
           filtered = !todo.archive
         break;
         default:
           filtered = todo.archive;
       }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickTodo={onClickTodo.bind(this, todo)}
          onClickArchive={onClickArchive.bind(this, todo)}
          status={todo.status}
          archive={todo.archive}
          text={todo.text}
        />
      );
    })
  }

  return (
    <ul className={baseCls}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;

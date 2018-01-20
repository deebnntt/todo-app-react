import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  onClickArchive: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickArchive, onClickTodo, status, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const checkboxCls = 'checkbox'
    + (status === 'complete' ? ' checkbox--status-complete' : '')

  return (
    <li className={todoCls}>
      <input
        type="checkbox"
        checked={status === 'complete'}
        className={baseCls + '__checkbox'}
        onChange={onClickTodo}
      />
      <TodoLink text={text} checkboxCls={checkboxCls}/>
      {status === "complete" ? <Button onClick={onClickArchive} uttonClass="button--archive" text="Archive"/> : '' }
      <Button text="X" buttonClass="button--delete"
 onClick={onClickDelete} />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;

import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  activeTodos: React.PropTypes.number
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  completeAll: noop,
  activeTodos: 0
};

const SummaryBar = ({ todos, completeAll }) => {

  const baseCls = 'summary-bar';

  const activeTodosCount = todos.filter(todo => todo.status === 'active').length;

  return (
  	<div className={baseCls}>
  	{ activeTodosCount } task{ activeTodosCount === 1 ? "" : "s" } remaining
  	<span className={baseCls + '__link'} onClick={() => completeAll()}>Complete All</span>
  	</div>
  );
}

SummaryBar.propTypes = propTypes;
SummaryBar.defaultProps = defaultProps;

export default SummaryBar;

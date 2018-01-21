import React from 'react';
import { Link } from 'react-router';
import Button from './button.js'

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  onClickFilter: React.PropTypes.func,
  archiveAll: React.PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
  archiveAll: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter, archiveAll }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let allCls = `${baseCls}__item`;
  allCls += filterBy === 'all' || filterBy === '' ? ` ${baseCls}__item--active` : '';

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <Link
        to="/"
        className={allCls}
        onClick={() => onClickFilter('all')}
      >
        All
      </Link>
      <Link
        to="/active"
        className={activeLinkCls}
        onClick={() => onClickFilter('active')}
      >
        Active
      </Link>
      <Link
        to="/completed"
        className={completedLinkCls}
        onClick={() => onClickFilter('completed')}
      >
        Completed
      </Link>
      <Link
        to="/archived"
        className={archivedLinkCls}
        onClick={() => onClickFilter('archived')}
      >
        Archived
      </Link>

      <Button
        buttonClass="button--navbar"
        onClick={() => archiveAll()}
        text="Archive all completed"
      />
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;

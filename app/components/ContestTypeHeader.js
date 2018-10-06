const React = require('react');

const ContestTypeHeader = ({ type }) => (
  <div className="title">
    <h3>
      {type}
      {' '}
Contests
    </h3>
  </div>
);

module.exports = ContestTypeHeader;

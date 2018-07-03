const React = require('react');

const ContestTypeHeader = function ContestTypeHeader(props) {
  return (
    <div className="title">
      <h3>
        {props.type}
        {' '}
Contests
      </h3>
    </div>
  );
};

module.exports = ContestTypeHeader;

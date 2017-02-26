import React, { Component } from 'react';
import format from 'date-fns/format';

export default class Violation extends Component {
  render() {
    const { data } = this.props;

    let contents;

    if (data.error) {
      contents = <p>{ data.message }</p>;
    } else if (data.loading) {
      contents = <h3>Loading...</h3>;
    } else {
      contents = (
        <div>
          <h1>{ data.businessname }</h1>
          <h3>{ data.address }, { data.city }</h3>
          <p>
            <span>Violated MA { data.violation } ({ data.violdesc })</span>
            <span> on { format(data.violdttm, 'dddd, MMMM Do YYYY, h:mm:ss a') }</span>
          </p>
          <h4>Comments:</h4>
          <p>{ data.comments }</p>
          <h4>Full data for this violation record:</h4>
          <pre>
            { JSON.stringify(data, null, '  ') }
          </pre>
        </div>
      );
    }

    return (
      <div className="violation">
        { contents }
      </div>
    );
  }
}

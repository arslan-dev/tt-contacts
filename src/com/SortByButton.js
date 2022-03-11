import React from 'react';

class SortByButton extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  render() {
    let arrow = '';
    if (this.props.direction === 'asc') {
      arrow = '▲';
    }
    else if (this.props.direction === 'desc') {
      arrow = '▼';
    }

    return (
      <button className="sort">
        { this.props.column + ' ' + arrow }
      </button>
    )
  }

}

export default SortByButton;
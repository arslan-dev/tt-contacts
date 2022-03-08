import React from 'react';

class SortByButton extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  render() {
    return (
      <button>{ this.props.column }</button>
    )
  }

}

export default SortByButton;
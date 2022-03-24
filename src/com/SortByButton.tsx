import React from 'react';

type Props = {
  column: string
  sort: boolean,
  direction: string,
  onClick: () => void
}

type State = {}

class SortByButton extends React.Component<Props, State> {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  render() {
    let arrow = '';
    if (this.props.direction === 'asc') {
      arrow = '▼';
    }
    else if (this.props.direction === 'desc') {
      arrow = '▲';
    }

    return (
      <button
        className="sort"
        onClick={this.props.onClick}
      >
        { this.props.column + ' ' + arrow }
      </button>
    )
  }

}

export default SortByButton;
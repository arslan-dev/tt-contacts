import React from 'react';

export enum ESortDirection { asc, desc }
export type TColumn = 'id' | 'firstName' | 'lastName' | 'email' | 'phone' ;

interface Props {
  column: TColumn;
  sort: boolean;
  direction: ESortDirection;
  onClick: () => void;
}

interface State {}

class SortByButton extends React.Component<Props, State> {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  render() {
    let arrow = '';
    if (this.props.direction === ESortDirection.asc) {
      arrow = '▼';
    }
    else if (this.props.direction === ESortDirection.desc) {
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
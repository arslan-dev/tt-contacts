import React from 'react';

interface Props {
  pageCount: number;
  currentPage: number;

  gotoPage: (page: number) => void;
}

interface State {}

class Paginator extends React.Component<Props, State> {

  render() {

    let buttons = [];
    for (let page=0; page<this.props.pageCount; page++) {
      buttons.push((
        <li className="page-item" key={ page }>
          <button className="page-button" onClick={ () => this.props.gotoPage(page) }>
            { page+1 }
          </button>
        </li>
      ));
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className="page-button">Previous</button></li>
          { buttons }
          <li className="page-item"><button className="page-button">Next</button></li>
        </ul>
      </nav>
    );
  }

}

export default Paginator;
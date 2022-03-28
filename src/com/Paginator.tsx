import React from 'react';
import classnames from 'classnames';

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
          <button
            className={ classnames ({
              'page-button': true,
              'active': this.props.currentPage === page
            }) }
            onClick={ () => this.props.gotoPage(page) }
          >
            { page+1 }
          </button>
        </li>
      ));
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">

          <li className="page-item">
            <button
              className={ classnames ({
                'page-button': true,
                'active': this.props.currentPage === 0
              }) }
              onClick={ () => this.props.gotoPage(this.props.currentPage-1) }
            >
              &lt; Previous
            </button>
          </li>

          { buttons }

          <li className="page-item">
            <button
              className={ classnames ({
                'page-button': true,
                'active': this.props.currentPage === this.props.pageCount-1
              }) }
              onClick={ () => this.props.gotoPage(this.props.currentPage+1)}
            >
              Next &gt;
            </button>
          </li>

        </ul>
      </nav>
    );
  }

}

export default Paginator;
import React from 'react';

interface Props {
  pageCount: number;
  currentPage: number;
}

interface State {}

class Paginator extends React.Component<Props, State> {

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className="page-button">Previous</button></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><button className="page-button">Next</button></li>
        </ul>
      </nav>
    );
  }

}

export default Paginator;
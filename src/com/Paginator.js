import React from 'react';

class Paginator extends React.Component {

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
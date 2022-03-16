import React from 'react';

import SortByButton from './SortByButton';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactsList: [],
      sortColumn: '',
      sortDirection: ''
    };

    // сортировщик для английского языка
    this.enCollator = new Intl.Collator('en');
  }

  componentDidMount() {
    fetch("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D")
      .then(res => res.json())
      .then(
        (contactsList) => {
          if (contactsList.length) {
            this.setState({
              contactsList: contactsList
            });
          }
        }
      );
  }

  /*
    if 'asc' -> return 'desc'
    if anything else, including 'desc' and nothing -> return 'asc'
  */
  toggleDirection(direction) {
    if (direction === 'asc') {
      return 'desc'
    }
    return 'asc';
  }

  handleSortButtonClick(column) {
    if (column !== this.state.sortColumn) {
      this.setState({
        sortColumn: column,
        sortDirection: 'asc'
      })
    } else {
      const newDirection = this.toggleDirection(this.state.sortDirection);
      this.setState({
        sortDirection: newDirection
      })
    }
  }

  // Сортируем только, если изменены параметры сортировки
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.sortColumn !== prevState.sortColumn ||
      this.state.sortDirection !== prevState.sortDirection
    ) {
      this.sort(this.state.sortColumn, this.state.sortDirection);
    }
  }

  sort(column, direction) {
    const sortedContacts = this.state.contactsList.sort((a, b) => {
      let compareRes;
      const valA = a[column];
      const valB = b[column];

      // разные для принципы сравнения для разных колонок
      if (column === 'id') {
        compareRes = valA - valB;
      } else {
        compareRes = this.enCollator.compare(valA, valB);
      }

      // инвертируем, если в сортируем в обратном порядке
      if (direction === 'desc') {
        compareRes *= -1;
      }
      return compareRes;
    });

    this.setState({
      contactsList: sortedContacts.slice()
    });
  }

  columnHeader(column) {
    const isSorted = column === this.state.sortColumn;
    return (
      <th scope="col">
        <SortByButton
          column={ column }
          sort={ isSorted }
          direction={ isSorted && this.state.sortDirection }
          onClick={() => this.handleSortButtonClick(column)}
        />
      </th>
    );
  }

  render() {
    const rows = this.state.contactsList.map( contact => (
      <tr key={ contact.id + contact.phone }>
        <th scope="row">{ contact.id }</th>
        <td>{ contact.firstName }</td>
        <td>{ contact.lastName }</td>
        <td>{ contact.email }</td>
        <td>{ contact.phone }</td>
      </tr>
    ));

    return (
      <table className="table">
        <thead>
          <tr>
            { this.columnHeader('id') }
            { this.columnHeader('firstName') }
            { this.columnHeader('lastName') }
            { this.columnHeader('email') }
            { this.columnHeader('phone') }
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

}

export default Contacts;
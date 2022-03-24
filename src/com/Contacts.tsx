import React from 'react';

import SortByButton, { ESortDirection } from './SortByButton';
import Paginator from './Paginator';

interface Props {}

interface State {
  contactsList: Array<{}>,
  sortColumn: string,
  sortDirection: ESortDirection,

  pageSize: number,
  currentPage: number
}

type TContact = {
  [key: string]: string | number,
}

class Contacts extends React.Component<Props, State> {
  enCollator: Intl.Collator;

  constructor(props: Props) {
    super(props);
    this.state = {
      contactsList: [],
      sortColumn: '',
      sortDirection: ESortDirection.asc,

      pageSize: 30,
      currentPage: 0,
    };

    // сортировщик для английского языка
    this.enCollator = new Intl.Collator('en');
  }

  componentDidMount() {
    fetch("http://www.filltext.com/?rows=200&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D")
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
  toggleDirection(direction: ESortDirection): ESortDirection {
    if (direction === ESortDirection.asc) {
      return ESortDirection.desc
    }
    return ESortDirection.asc;
  }

  handleSortButtonClick(column: string): void {
    if (column !== this.state.sortColumn) {
      this.setState({
        sortColumn: column,
        sortDirection: ESortDirection.asc
      })
    } else {
      const newDirection = this.toggleDirection(this.state.sortDirection);
      this.setState({
        sortDirection: newDirection
      })
    }
  }

  // Сортируем только, если изменены параметры сортировки
  componentDidUpdate(prevProps: State, prevState: State) {
    if (
      this.state.sortColumn !== prevState.sortColumn ||
      this.state.sortDirection !== prevState.sortDirection
    ) {
      this.sort(this.state.sortColumn, this.state.sortDirection);
    }
  }

  sort(column: string, direction: ESortDirection) {
    const sortedContacts = this.state.contactsList.sort((a:TContact, b:TContact) => {
      let compareRes;
      const valA = a[column];
      const valB = b[column];

      // разные для принципы сравнения для разных колонок и соответствующих им типов
      if (column === 'id' && typeof valA === 'number' && typeof valB === 'number') {
        compareRes = valA - valB;
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        compareRes = this.enCollator.compare(valA, valB);
      } else {
        // если по какой-то причине появились типы, которые невозможно сравнить, значит сравнени невозможно
        compareRes = 0
      }

      // инвертируем, если в сортируем в обратном порядке
      if (direction === ESortDirection.desc) {
        compareRes *= -1;
      }
      return compareRes;
    });

    this.setState({
      contactsList: sortedContacts.slice()
    });
  }

  columnHeader(column: string) {
    const isSorted = column === this.state.sortColumn;
    return (
      <th scope="col">
        <SortByButton
          column={ column }
          sort={ isSorted }
          direction={ isSorted ? this.state.sortDirection : ESortDirection.asc }
          onClick={() => this.handleSortButtonClick(column)}
        />
      </th>
    );
  }

  render() {
    // извлекаем данные для текущей страницы
    const a = this.state.currentPage * this.state.pageSize;
    const b = (this.state.currentPage + 1) * this.state.pageSize;
    const page = this.state.contactsList.slice(a, b);

    // отрисоывываем страницу данных
    const rows = page.map( (contact: TContact) => (
      <tr key={ contact.id.toString() + contact.phone }>
        <th scope="row">{ contact.id }</th>
        <td>{ contact.firstName }</td>
        <td>{ contact.lastName }</td>
        <td>{ contact.email }</td>
        <td>{ contact.phone }</td>
      </tr>
    ));

    const pageCount = this.state.contactsList.length / this.state.pageSize;
    console.log(pageCount);

    return (
      <>
        <Paginator
          pageCount={ pageCount }
          currentPage={ this.state.currentPage}
        />

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
      </>
    )
  }

}

export default Contacts;
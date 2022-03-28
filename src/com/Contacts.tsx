import React from 'react';

import SortByButton, { ESortDirection, TColumn } from './SortByButton';
import Paginator from './Paginator';
import SearchBar from './SearchBar';

interface Props {}

type TContact = {
  id: number,
  firstName: string,  
  lastName: string,
  email: string,
  phone: string
}

type TContactsList = Array<TContact>

interface State {
  contactsList: TContactsList,

  sortColumn: TColumn,
  sortDirection: ESortDirection,

  pageSize: number,
  currentPage: number,

  searchPhrase: string
}

class Contacts extends React.Component<Props, State> {
  enCollator: Intl.Collator;

  constructor(props: Props) {
    super(props);
    this.state = {
      contactsList: [],

      sortColumn: 'id',
      sortDirection: ESortDirection.nosort,

      pageSize: 30,
      currentPage: 0,

      searchPhrase: ''
    };

    this.setSearchPhrase = this.setSearchPhrase.bind(this)
    this.search = this.search.bind(this)

    // сортировщик для английского языка
    this.enCollator = new Intl.Collator('en');
  }

  get isSorted() {
    return this.state.sortDirection !== ESortDirection.nosort;
  }

  async componentDidMount() {
    const res = await fetch("http://www.filltext.com/?rows=200&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D");
    const contactsList = await res.json();

    if (contactsList.length) {
      this.setState({
        contactsList: [...contactsList]
      });
    }
  }

  search(contactsList: TContactsList, phrase: string): TContactsList {
    phrase = phrase.trim();
    const filteredContactsList = contactsList.filter((contact) => {
      const re = new RegExp(phrase, 'i')
        return contact.id.toString().match(re) ||
               contact.firstName.match(re) ||
               contact.lastName.match(re) ||
               contact.email.match(re) ||
               contact.phone.match(re);
    });

    return filteredContactsList
  }

  sort(contactsList: TContactsList, column: TColumn, direction: ESortDirection): TContactsList {
    const sortedContacts = contactsList.sort((a:TContact, b:TContact) => {
      let compareRes;

      // разные для принципы сравнения для разных колонок
      if (column === 'id') {
        compareRes = a.id - b.id;
      } else {
        compareRes = this.enCollator.compare(a[column], b[column]);
      }

      // инвертируем, если в сортируем в обратном порядке
      if (direction === ESortDirection.desc) {
        compareRes *= -1;
      }
      return compareRes;
    });

    return sortedContacts
  }

  extractPage(contactsList: TContactsList, currentPage: number, pageSize: number): TContactsList {
    const a = this.state.currentPage * this.state.pageSize;
    const b = (this.state.currentPage + 1) * this.state.pageSize;
    return contactsList.slice(a, b);
  }

  get processedList(): TContactsList {
    let list = this.state.contactsList;
    list = this.search(list, this.state.searchPhrase);
    list = this.sort(list, this.state.sortColumn, this.state.sortDirection);
    return list;
  }

  setSearchPhrase(phrase: string): void {
    if (phrase !== this.state.searchPhrase) {
      this.setState({
        searchPhrase: phrase,
        currentPage: 0
      });
    }
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

  handleSortButtonClick(column: TColumn): void {
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

  columnHeader(column: TColumn) {
    const isSorted = this.isSorted && column === this.state.sortColumn;
    return (
      <th scope="col">
        <SortByButton
          column={ column }
          direction={ isSorted ? this.state.sortDirection : ESortDirection.nosort }
          onClick={() => this.handleSortButtonClick(column)}
        />
      </th>
    );
  }

  render() {
    // извлекаем данные для текущей страницы
    const processedList = this.processedList;
    const page = this.extractPage(processedList, this.state.currentPage, this.state.pageSize);

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

    const listLength = processedList.length;
    let pageCount = Math.floor( listLength / this.state.pageSize );
    if (pageCount * this.state.pageSize < listLength) {
      pageCount += 1;
    }

    const gotoPage = (page: number): void => {
      // запрашиваемая страница должна быть в рамках
      const lastPage = pageCount-1;
       if (page < 0) {
         page = 0;
       } else if (page > lastPage) {
        page = lastPage;
       }

       this.setState({ currentPage: page })
    }

    return (
      <>
        <h3>Contacts 📝</h3>
        <SearchBar
          onSearch={ this.setSearchPhrase }
        />

        <Paginator
          pageCount={ pageCount }
          currentPage={ this.state.currentPage}
          gotoPage={ gotoPage }
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
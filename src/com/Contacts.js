import React from 'react';

import SortByButton from './SortByButton';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactsList: []
    };
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
            <th scope="col">
              <SortByButton column="id" />
            </th>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
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
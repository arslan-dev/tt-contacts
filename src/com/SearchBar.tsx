import React from 'react';

interface Props {
  onSearch: (phrase: string) => void;
}

interface State {
  value: string
}

class SearchBar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e: any) {
    this.props.onSearch(this.state.value)
    e.preventDefault();
  }

  render() {
    return(
      <form
        className="form-inline"
        onSubmit={ this.handleSubmit }
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"

          value={ this.state.value }
          onChange = { (e: any) => this.setState({ value: e.target.value })}
        />

        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>

      </form>
    )
  }

}

export default SearchBar;
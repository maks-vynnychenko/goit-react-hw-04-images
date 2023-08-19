import React, { Component } from 'react';

import searchbarStyle from './Searchbar.module.css'

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  hendleChange = evt => {
    this.setState({
      searchValue: evt.target.value,
    });

  };

  formSubmit = evt => {
    evt.preventDefault();
this.props.onSubmit(this.state.searchValue)
this.reset()
  };
  reset = () => {
    this.setState({
      searchValue: '',
    });
  };

  render() {
    return (
      <header className={searchbarStyle.Searchbar}>
        <form className={searchbarStyle.SearchForm} onSubmit={this.formSubmit}>
          <button type="submit" className={searchbarStyle.SearchFormButton}>
           Search
          </button>

          <input
            className={searchbarStyle.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.hendleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
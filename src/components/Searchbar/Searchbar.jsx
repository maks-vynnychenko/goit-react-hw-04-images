import PropTypes from 'prop-types';

import React, { useState } from 'react';

import searchbarStyle from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const hendleChange = evt => {
    setSearchValue(evt.target.value);
  };

  const formSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchValue);
    reset();
  };
  const reset = () => {
    setSearchValue('');
  };

  return (
    <header className={searchbarStyle.Searchbar}>
      <form className={searchbarStyle.SearchForm} onSubmit={formSubmit}>
        <button type="submit" className={searchbarStyle.SearchFormButton}>
          Search
        </button>

        <input
          className={searchbarStyle.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={hendleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
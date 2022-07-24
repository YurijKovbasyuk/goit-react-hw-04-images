import { Component } from 'react';
import css from './index.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <div>
        <header className={css.searchbar}>
          <form onSubmit={this.handleSubmit} className={css.searchForm}>
            <button type="submit" className={css.button}>
              <span className={css.buttonLabel}>Search</span>
            </button>

            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;

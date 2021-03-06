import React, { Component } from "react";
import axios from "axios";
import NoMatch from "./NoMatch";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PokeCard from "./PokeCard";

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pokemon: [],
      offset: 0,
      limit: 12,
      pageCount: 0,
      next: "",
      previous: "",
      totalPage: null,
      id: this.props.match.params.id
    };

    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleLessClick = this.handleLessClick.bind(this);
  }

  handleMoreClick(event) {
    if (this.state.next !== null) {
      this.setState({ pageCount: this.state.pageCount + 1 }, () => {
        this.setState({ id: Number(this.state.id) + 1 }, () => {
          console.log("Id: " + this.state.id);
          this.getShows();
          console.log("pagecount: ", this.state.pageCount);
        });
      });
    }
  }
  handleLessClick(event) {
    if (this.state.previous !== null) {
      this.setState({ pageCount: this.state.pageCount - 1 }, () => {
        this.setState({ id: Number(this.state.id) - 1 }, () => {
          console.log("Id: " + this.state.id);
          this.getShows();
          console.log("pagecount: ", this.state.pageCount);
        });
      });
    }
  }

  componentDidMount() {
    this.getShows();
  }
  componentWillReceiveProps(nextProps) {
    var nextProductId = nextProps.match.params.id;
    this.setState({ id: nextProductId }, () => {
      this.getShows();
    });
  }

  async getShows() {
    this.state.data = [];

    try {
      const { data } = await axios.get(
        "http://localhost:3001/pokemon/page/" +
          String(this.state.id)
      );
      console.log(data);

      this.setState({ next: data.next }, () => {
        console.log("next: " + this.state.next);
      });
      this.setState(
        { totalPage: data.totalPage },
        () => {
          console.log("total Page: " + this.state.totalPage);
          if (
            this.state.id >= this.state.totalPage ||
            isNaN(this.state.id) === true ||
            typeof this.state.id === "undefined"
          ) {
            this.setState({ requestFailed: true });
          }
        }
      );
      this.setState({ previous: data.previous }, () => {
        console.log("previous: " + this.state.previous);
      });

      this.setState({ pokemon: data["results"] });
      // console.log(this.state.pokemon);

    } catch (e) {
      console.log(e);
    }
  }

  renderedPokemonList = pokemon => {
    return (
      <a key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
        <PokeCard pokemon={pokemon} />
      </a>
    );
  };

  render() {
    let body = null;
    if (this.state.requestFailed === true) {
      return <NoMatch />;
    } else {
      body = (
        <Router>
          <div className="App-body">
            {this.state.previous == null && (
              <Link to={`/pokemon/page/${Number(this.state.id) + 1}`}>
                <button
                  type="button"
                  className="showlink-body"
                  key="next-button"
                  id="next-button"
                  onClick={this.handleMoreClick}
                >
                  Next
                </button>
              </Link>
            )}

            {this.state.next == null && (
              <Link to={`/pokemon/page/${Number(this.state.id) - 1}`}>
                <button
                  type="button"
                  className="showlink-body"
                  key="previous-button"
                  id="previous-button"
                  onClick={this.handleLessClick}
                >
                  Back
                </button>
              </Link>
            )}

            {this.state.next !== null && this.state.previous !== null && (
              <div>
                <Link
                  to={`/pokemon/page/${Number(this.state.id) - 1}`}
                  style={{ marginRight: "50px" }}
                >
                  <button
                    type="button"
                    className="showlink-body"
                    key="previous-button"
                    id="previous-button"
                    onClick={this.handleLessClick}
                  >
                    Back
                  </button>
                </Link>
                <Link to={`/pokemon/page/${Number(this.state.id) + 1}`}>
                  <button
                    type="button"
                    className="showlink-body"
                    key="next-button"
                    id="next-button"
                    onClick={this.handleMoreClick}
                  >
                    {"Next"}
                  </button>
                </Link>
              </div>
            )}

            <div className="container">
              <div className="card-columns">
                {this.state.pokemon &&
                  this.state.pokemon.map(show => {
                    return this.renderedPokemonList(show);
                  })}
              </div>
            </div>
          </div>
        </Router>
      );
      return body;
    }
  }
}

export default PokemonList;

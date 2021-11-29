import React from "react";
git
import "./App.css";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";
import NoMatch from "./components/NoMatch";
import HomePage from "./components/HomePage";
import Trainers from "./components/Trainers";

import { withRouter } from "react-router";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ marginTop: "-12px", marginBottom: "5px" }}
            />
          </Link>
          <h1
            className="App-title"
            style={{ textShadow: "2px 2px #000000", paddingBottom: "5px" }}>
            Welcome to the Pokemon World
          </h1>
          <Link
            to="/trainers"
            className="showlink"
            style={{ marginRight: "10px" }}
          >
            Pokémon Trainers
          </Link>

          <Link
            to="/pokemon/page/0"
            className="showlink"
            style={{ marginRight: "10px" }}
          >
            Pokémon
          </Link>          
        </header>

        <br />
        <br />
        <div className="App-body">
          <Switch>
            <Route path="/pokemon/page/:id" component={withRouter(PokemonList)}/>
            <Route path="/pokemon/:id" component={withRouter(Pokemon)} />
            <Route path="/trainers" component={withRouter(Trainers)} />
            <Route exact path="/" component={withRouter(HomePage)} />
            <Route path="*" component={NoMatch} status={404} />
          </Switch>
        </div>
        <footer
          className="App-footer"
          style={{ color: "white", marginTop: "5px" }}
        >
          <div className="copyright">
            <p>2021 © All rights reserved | Vivian Dbritto</p>{" "}
          </div>{" "}
        </footer>
      </div>
    </Router>
  );
};

export default App;

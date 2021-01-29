import ReactDOM from "react-dom";
import FilmList from "./components/FilmList";
import FilmPage from "./components/FilmPage";
import Trailer from "./components/Trailer";
import SearchArea from "./components/SearchArea";
import MovieList from "./components/MovieList";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import mainLogo from "./logo-imdb.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import $, { contains } from "jquery";
import Watchlist from "./components/WatchList";
import Statistics from "./components/Statistics";
import GoogleAuth from "./components/GoogleAuth";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { GoogleLogin } from "react-google-login";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementWatchListNumber = this.incrementWatchListNumber.bind(this);
    this.decrementWatchListNumber = this.decrementWatchListNumber.bind(this);
    this.clearWatchList = this.clearWatchList.bind(this);
    this.change = this.change.bind(this);
    this.state = { watchlist: 0, movies: [], searchTerm: "",color:'',count:0, colors:['blue','yellow','white'],flag: false, language: "en" };
    this.apiKey = "c9ebd652172bbcdaa5b3746fa2e60207";
  }
  // flag: false,
  change(option) {
    localStorage.setItem("lang", option.target.value);
    this.setState({ language: option.target.value });
  }

  incrementWatchListNumber(filmid) {
    let arr = JSON.parse(localStorage.getItem("films"));
    if (arr) {
      if (!arr.includes(filmid)) {
        this.setState({ watchlist: this.state.watchlist + 1 });
      }
    } else {
      this.setState({ watchlist: this.state.watchlist + 1 });
    }
  }

  decrementWatchListNumber() {
    //without it nothing worked
    localStorage.setItem("films", JSON.stringify([]));
    let currentNum = JSON.parse(localStorage.getItem("films")).length / 2;
    if (currentNum > 1) {
      currentNum -= 1;
      this.setState({ watchlist: currentNum });
    }
  }

  clearWatchList(e, data) {
    e.preventDefault();
    localStorage.setItem("films", JSON.stringify([]));
    this.setState({ watchlist: 0 });
  }

  defineNumberWatchList() {
    if (localStorage.getItem("films")) {
      this.setState({
        watchlist: JSON.parse(localStorage.getItem("films")).length / 2,
      });
    }
  }

  componentDidMount() {
    this.defineNumberWatchList();
  }
  // search
  handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ movies: [...data.results] });
      });
  };
  // search
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  changeLinkState() {
    const inp = document.querySelector("input");
    const datl = document.querySelector("#datalistOptions").childNodes;
    const filmDATA = JSON.parse(sessionStorage.getItem("fullInf"));

    const currFilm = filmDATA.filter((el) => el.original_title === inp.value);

    sessionStorage.setItem("val", JSON.stringify(currFilm[0]));

    let flag = true;
    datl.forEach((el) => {
      if (el.value === inp.value) flag = false;
    });
    if (
      !flag &&
      document.querySelector("#photoVideo") &&
      document.querySelector("h2").innerHTML !== inp.value
    )
      window.location.reload();
    return flag;
  }

  secondNav() {
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container style={{display:"flex",}}>
    
      <a className="nav-link col-2 cursor" onClick={()=>this.backgroundChange()}>Change Background</a>
      <a className="nav-link col-2 cursor">Change Font</a>
      
      </Container>
    </Navbar>)
  }
  backgroundChange() {
   this.setState({color:this.state.colors[this.state.count]});
   this.setState({count:this.state.count + 1})
  }
  fontChange() {

  }
  render() {
    const lang = localStorage.getItem("lang") || "en";

    // setTimeout(() => {
    //   this.setState({ flag: true });
    // }, 7000);
    // if (this.state.flag) {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img className="navbar-mainlogo" src={mainLogo}></img>
              </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#features">
                  <Link style={{ textDecoration: "none" }} to="/WatchList">
                    <a className="nav-link">
                      <ContextMenuTrigger
                        id="add_same_id"
                        className="context-menu-item"
                      >
                        <div>
                          <ContextMenuTrigger
                            id="add_same_id"
                            className="context-menu-item"
                          >
                            <div className="wl">{i18next.t("WatchList")}</div>
                          </ContextMenuTrigger>
                          <ContextMenu className="menu" id="add_same_id">
                            <MenuItem
                              onClick={(e) => this.clearWatchList(e)}
                              data={{ item: "Home" }}
                              className="menuItem"
                            >
                              Clear WatchList
                            </MenuItem>
                            <MenuItem
                              data={{ item: "Home" }}
                              className="menuItem"
                            >
                              Go to WatchList
                            </MenuItem>
                          </ContextMenu>
                          <span class="badge rounded-pill badge-notification bg-warning text-dark">
                            {this.state.watchlist}
                          </span>

                          {/* <div className="watchlist-num">
                              {this.state.watchlist}
                            </div> */}
                        </div>
                      </ContextMenuTrigger>
                    
                    </a>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <a className="nav-link" onClick={()=>{!this.state.flag?this.setState({flag: true}):this.setState({flag:false})}}>{i18next.t("Settings")}</a>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/Statistics">
                    <a className="nav-link">{i18next.t("Statistics")}</a>
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <GoogleAuth />
                </Nav.Link>

                <Nav.Link>
                  <select
                    name=""
                    id=""
                    className="custom-select pull-right"
                    onChange={this.change}
                    value={lang}
                  >
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                  </select>
                </Nav.Link>
              </Nav>

              <SearchArea
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              />
            </Navbar.Collapse>
          </Container>
        </Navbar>
         {this.state.flag?this.secondNav():''}
        <div id="ourRoot" className="d-flex justify-content-around" style={{backgroundColor:`${this.state.color}`}}>
          <div id="fl" className="films-list">
            <Route exact path="/">
              <FilmList watchListincrement={this.incrementWatchListNumber}  lang={this.state.language} key={this.state.language}/>
            </Route>

            <Route path="/">
              <MovieList movies={this.state.movies} />
            </Route>

            <Route path="/FilmPage">
              <FilmPage />
            </Route>

            <Route path="/WatchList">
              <Watchlist watchListdecrement={this.decrementWatchListNumber} />
            </Route>

            <Route path="/Statistics">
              <Statistics />
            </Route>
            <Route path="/Trailer">
              <Trailer />
            </Route>
          </div>
        </div>
        {/* footer isert here */}
        <Footer />
      </div>
    );
  }
  // else return <Cover />;
  //}
}

export default App;

import React, { Component } from "react";
import cs385spotify from "../images/cs385spotify.png";
import { spotifyArray } from "./spotify";

// local copy of the array from spotify
const localSpotifyArray = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("In the constructor App comp");
    this.state = { searchTerm: "", globalArray: localSpotifyArray };

    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
  } // end constructor
  // method for when teh search box changes
  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
    //console.log(this.state.searchTerm);
  }

  handleClearButtonClick() {
    this.setState({ searchTerm: "" });
  }

  render() {
    return (
      <div className="App">
        <h1>CS385 Spotify Search App</h1>
        <img src={cs385spotify} alt="this is out spotify" />
        <SearchForm
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
          buttonHandler={this.handleClearButtonClick}
        />
        <SearchResults
          globalArray={this.state.globalArray}
          searchTerm={this.state.searchTerm}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

//**************************************************//
class SearchResults extends Component {
  // function to perform the search
  songFilterFunction(searchTerm) {
    return function (songObject) {
      // lower case for checks
      let title = songObject.title.toLowerCase();
      let artist = songObject.artist.toLowerCase();
      let topgenre = songObject.topgenre.toLowerCase();

      return (
        searchTerm !== "" && // check for blank
        searchTerm.length >= 3 &&
        (title.includes(searchTerm.toLowerCase()) ||
          artist.includes(searchTerm.toLowerCase()) ||
          topgenre.includes(searchTerm.toLowerCase()))
      );
    };
  }

  render() {
    const arrayPassedAsParam = this.props.globalArray;
    const searchTermFromProps = this.props.searchTerm;

    // show count of results
    let numResults = arrayPassedAsParam.filter(
      this.songFilterFunction(searchTermFromProps)
    ).length;

    return (
      <div className="SearchResultsDisplay">
        <hr />
        <h1>This is Search Results</h1>
        Number of Results found: {numResults}
        <table border="1">
          <thead>
            <tr>
              <th> TITLE </th>
              <th> ARTIST </th>
              <th> GENRE </th>
            </tr>
          </thead>
          <tbody>
            {arrayPassedAsParam
              .filter(this.songFilterFunction(searchTermFromProps))
              .map((a) => (
                //<div key={a.ID}>
                //  <b>{a.title}</b>, <i>{a.artist}</i>, {a.topgenre}
                //</div>
                <tr key={a.ID}>
                  <td>{a.title}</td>
                  <td>{a.artist}</td>
                  <td>{a.topgenre}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
} // close the ComponentB component

//**************************************************//
class SearchForm extends Component {
  // build the form for entering search

  render() {
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;
    const buttonHandler = this.props.buttonHandler;

    return (
      <div className="SearchFormForm">
        <hr />
        <h1>This is Search Form</h1>
        <form>
          <b>Search here: </b>
          <input
            type="text"
            value={searchTermFromProps}
            onChange={onChangeFromProps}
          />
          <button onClick={buttonHandler}>Clear</button>
        </form>
      </div>
    );
  }
} // close the ComponentA component

export default App;

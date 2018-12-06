import React, { Component } from "react";
import StorySnippet from "./LatestStories/StorySnippet";
import { FullTextSearch } from "../services/story.service";
import onInputChange from "../utilities/onInputChange";
import detectEnterKey from "../utilities/detectEnterKey";

class AdvancedSearch extends Component {
  state = {
    isLoading: false,
    stories: [],
    query: ""
  };

  updateInput = onInputChange.bind(this);

  SearchForStories = (query, index, pageSize) => {
    this.setState({ isLoading: true });
    FullTextSearch(query, index, pageSize).then(resp => {
      let stories = resp.data.items;
      this.setState({ stories, isLoading: false });
    });
  };

  handleSearch = () => {
    let { query } = this.state;
    if (query.length > 2) {
      this.SearchForStories(query);
    } else {
      alert("Search term is too short");
    }
  };

  handleKeypress = event => {
    if (detectEnterKey(event)) {
      this.handleSearch();
    }
  };

  render() {
    const loadingMessage = () => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <div className="font-weight-bold">Searching...</div>
            </td>
          </tr>
        </React.Fragment>
      );
    };

    return (
      <div
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto text-center"
        style={{ paddingBottom: "2em", marginTop: "-1em" }}
      >
        <h1 className="landing-page-spacer">Full Text Search</h1>

        <input
          className="form-control text-center"
          placeholder="Enter a Name, Location or Keyword"
          name="query"
          value={this.state.query}
          onChange={this.updateInput}
          onKeyPress={this.handleKeypress}
        />
        <p />
        <button
          className="btn btn-lg btn-block btn-dark pointer"
          onClick={() => this.handleSearch()}
        >
          Search
        </button>
        <p />

        <div>
          <table className="table table-light table-bordered table-striped">
            <tbody>
              {this.state.isLoading && loadingMessage()}
              {this.state.stories.map(story => (
                <StorySnippet key={story.id} story={story} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;

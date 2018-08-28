import React, { Component } from "react";
import axios from "axios";

/**
 * Fib component. Renders the form as well as the results.
 *
 * @class Fib
 * @extends React.Component
 * @property {Object} state
 */
class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    value: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  /**
   * Fetches Values
   */
  async fetchValues() {
    const { data } = await axios.get("/api/values/current");
    this.setState({ values: data });
  }

  /**
   * Gets seen indexes
   */
  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");

    this.setState({ seenIndexes: seenIndexes.data });
  }

  /**
   * @returns {String}
   */
  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  /**
   * @returns {Array}
   */
  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I caluculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }
  /**
   * @param {SyntheticEvent} event
   */
  handleSubmit = async event => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: this.state.value
    });

    this.setState({ value: "" });
  };

  /**
   * Renders component
   */
  render() {
    return (
      <div>
        <form method="post" onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.value}
            onChange={({ target }) => this.setState({ value: target.value })}
          />
          <button>Submit!</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
 
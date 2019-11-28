import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      successmess: "",
      errormess: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      successmess: "",
      errormess: ""
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => this.setState({ successmess: res.data }))
      .catch(err => this.setState({ errormess: err.response.data }));

    this.setState({
      username: ""
    });
  }

  render() {
    return (
      <div>
        <h4>Create New User</h4>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          {this.state.successmess != "" && (
            <label className="success-mess">{this.state.successmess}</label>
          )}
          {this.state.errormess != "" && (
            <label className="error-mess">{this.state.errormess}</label>
          )}
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-success"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

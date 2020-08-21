import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle } from "../helpers/auth";
import "./login.css";
class Signup extends Component {
  state = { username: "", email: "", password: "", error: null };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    try {
      await signup(this.state.email, this.state.password, this.state.username);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  googleSignIn = async (e) => {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">ChitChat</span>
        </nav>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <h1>
            Welcome to <span className="chitchat">ChitChat</span>
          </h1>
          <div className="input-area">
            <input
              className="form-control"
              placeholder="Username"
              name="username"
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
            ></input>
          </div>
          <div className="input-area">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div className="input-area">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            ></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className="btn btn-md btn-primary" type="submit">
              Sign up
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={this.googleSignIn}
              type="button"
            >
              Sign up with Google
            </button>
          </div>
          <hr></hr>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;

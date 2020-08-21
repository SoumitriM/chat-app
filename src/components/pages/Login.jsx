import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";
import "./login.css";
class Login extends Component {
  state = { email: "", password: "", error: null };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
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
        <form
          className="form-group"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Welcome to
            <span className="chitchat"> ChitChat</span>
          </h1>
          <div className="input-area">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="input-area">
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className="btn btn-primary btn-md" type="submit">
              Login
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={this.googleSignIn}
              type="button"
            >
              Sign In with Google
            </button>
          </div>

          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;

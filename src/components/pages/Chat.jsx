import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { signOut } from "../helpers/auth";
import "./chat.css";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }
  handleChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        username: this.state.user.displayName,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  handleSignOut = async (event) => {
    signOut();
  };
  scrollToBottom() {
    const scrollHeight = this.chats.scrollHeight;
    const height = this.chats.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chats.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <nav class="navbar navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1">ChitChat</span>
            <button
              onClick={this.handleSignOut}
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Logout
            </button>
          </nav>
          <div
            className="chats container"
            ref={(div) => {
              this.chats = div;
            }}
          >
            {this.state.chats.map((chat) =>
              chat.username !== this.state.user.displayName ? (
                <div className="row">
                  <div className="col-md-5 col-sm-2 col-xs-2">
                    <span style={{ fontSize: "10px" }}>{chat.username}</span>
                    <br />
                    <p className="message" key={chat.timestamp}>
                      {chat.content}
                    </p>
                  </div>
                  <div className="col-md-7 col-sm-10 col-xs-10"></div>
                </div>
              ) : (
                <div className="my-chat row">
                  <div className="col-md-7 col-sm-10 col-xs-10"></div>
                  <div className="col-md-5 col-sm-2 col-xs-2">
                    <span className="username">{chat.username}</span>
                    <br />
                    <p className="my-message" key={chat.timestamp}>
                      {chat.content}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="col-md-2"></div>

          <form onSubmit={this.handleSubmit} className="form-inline row">
            <input
              className=" for-chat col-md-11 col-sm-11"
              onChange={this.handleChange}
              placeholder="Type here..."
              value={this.state.content}
            />

            <button className="btn btn-sm btn-outline-secondary" type="submit">
              Send
            </button>
          </form>
          <div>
            Login in as: <strong>{this.state.user.email}</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;

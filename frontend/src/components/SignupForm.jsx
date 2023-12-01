import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../App";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  function signup(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/signup/`, {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        history.push("/login/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if(localStorage.getItem("token")) {
        window.location.pathname = "/"
    }
  }, [])
  return (
    <div className="w-75 d-flex justify-content-center align-items-center">
      <form onSubmit={(e) => signup(e)}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your details with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div className="form-group">
          <small
            id="emailHelp"
            className="form-text text-muted text-center mt-4"
          >
            Already a user? <Link to="/login">Login</Link>
          </small>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

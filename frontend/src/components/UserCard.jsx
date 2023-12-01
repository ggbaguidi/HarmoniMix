import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../App";

function UserCard({ user }) {
  const [followState, setFollowState] = useState(user.is_following);

  async function follow(id) {
    if (followState === false) {
      const res = await axios.post(`${BASE_URL}/api/follow-user/`, {
        id: id,
        token: localStorage.getItem("token"),
      });
      setFollowState(true);
      console.log(res.data);
    }
  }
  return (
    <div
      className="card m-2 bg-dark text-light"
      style={{ width: "12rem", height: 350 }}
      key={user.id}
    >
      <img src={user.image} className="card-img-top" alt="user" />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.mood ? user.mood : "neutral"}</p>
        <button
          className={followState ? `btn btn-success` : `btn btn-primary`}
          onClick={() => follow(user.id)}
        >
          {followState ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default UserCard;

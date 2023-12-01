import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../App";

function FriendsApp({ UserCard, getAllUsers }) {
  const [followers, setFollwers] = useState([]);
  const [allUserArr, setAllUserArr] = useState([]);

  function getfollowers() {
    axios
      .post(`${BASE_URL}/api/view-followers/`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setFollwers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getAllUsers() {
    const res = await axios.post(`${BASE_URL}/api/view-users/`, {
      token: localStorage.getItem("token"),
    });
    setAllUserArr(res.data);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.pathname = "/login";
    } else {
      getAllUsers();
      getfollowers();
    }
    // eslint-disable-next-line
  }, []);

  const followerDiv = useRef();

  function showFollowers() {
    followerDiv.current.classList.remove("d-none");
  }

  function hideFollowers() {
    followerDiv.current.classList.add("d-none");
  }

  return (
    <div className="d-flex flex-column p-5">
      <div>
        <h1>HarmoniMixers</h1>
      </div>
      <div className="d-flex flex-wrap" style={{ overflowY: "scroll" }}>
        {allUserArr.map((user) => {
          return <UserCard user={user} />;
        })}
      </div>
      <div className="mt-auto">
        <div
          ref={followerDiv}
          className="d-none bg-light"
          onMouseOver={() => showFollowers()}
          onMouseLeave={() => hideFollowers()}
        >
          {followers.map((follower) => {
            return <p className="text-dark text-center m-0">{follower.name}</p>;
          })}
        </div>
        <button
          onMouseOver={() => showFollowers()}
          onMouseLeave={() => hideFollowers()}
        >
          View my followers
        </button>
      </div>
    </div>
  );
}

export default FriendsApp;

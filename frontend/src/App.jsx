import { useEffect, useRef, useState } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import Webcam from "react-webcam";
import axios from "axios";
import Logo from "./assets/logo.png";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import UserCard from "./components/UserCard";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import MainApp from "./components/MainApp";
import FriendsApp from "./components/FriendsApp";

export const BASE_URL = "http://localhost:8000";

function App() {
  // states
  const [audioList, setAudioList] = useState([]); //pagination array

  const [apiAudioList, setApiAudioList] = useState([]); //original array from api
  const [apiAudioListCopy, setApiAudioListCopy] = useState([]); //original array from api -> copy

  const [mood, setMood] = useState("");

  const [audioInstance, setAudioInstance] = useState(null);

  const [currAudio, setCurrAudio] = useState([]);


  // refs
  var webCamera = useRef(null);

  async function fetchMusic() {
    let response = await axios.post(`${BASE_URL}/api/post-image/`, {
      image: webCamera.current.getScreenshot(),
      token: localStorage.getItem("token"),
    });
    let songs = response.data.songs;
    let resMood = response.data.mood;
    setApiAudioList([]);
    setApiAudioListCopy([]);
    setApiAudioListCopy(
      songs.map((song) => {
        return {
          name: song.name,
          musicSrc: song.musicSrc,
          cover: song.cover,
        };
      })
    );
    setApiAudioList(songs);
    setMood(resMood);
  }


  useEffect(() => {
    setAudioList(apiAudioList.slice(0, 6));
  }, [apiAudioList, apiAudioListCopy]);

  function playMusic(song) {
    audioInstance.clear();
    setTimeout(() => {
      setCurrAudio([song]);
      audioInstance.play();
    }, 300);
  }

  function reverse(arr = [], l, r) {
    while (l < r) {
      var temp = arr[l];
      arr[l] = arr[r];
      arr[r] = temp;
      l++;
      r--;
    }
  }

  function rotateDec(arr = []) {
    reverse(arr, 0, arr.length - 2);
    reverse(arr, 0, arr.length - 1);
  }

  function rotateInc(arr = []) {
    reverse(arr, 1, arr.length - 1);
    reverse(arr, 0, arr.length - 1);
  }

  function next() {
    rotateInc(apiAudioList);
    var em = [];
    apiAudioList.slice(0, 6).map((song) => {
      em.push(song);
      return "";
    });
    setAudioList(em);
  }

  function prev() {
    rotateDec(apiAudioList);
    var em = [];
    apiAudioList.slice(0, 6).map((song) => {
      em.push(song);
      return "";
    });
    setAudioList(em);
  }

  function logout() {
    localStorage.clear();
    window.location.pathname = "/login";
  }

  return (
    <div>
      {/* top */}
      <BrowserRouter>
        <div className="d-flex h-90">
          {/* menu */}
          <div className="w-50 text-center pt-5" id="menu">
            {/* logo */}
            <div>
              <img src={Logo} alt="logo" className="logo" />
            </div>

            {/* navs */}
            <nav className="d-flex flex-column justify-content-around">
              <NavLink to="/" activeClassName="active" exact>
                <div>
                  <div>
                    <span>
                      <i className="fas fa-home"></i>
                    </span>{" "}
                    Home
                  </div>
                </div>
              </NavLink>
              <NavLink to="/friends/" activeClassName="active" exact>
                <div>
                  <div>
                    <span>
                      <i className="fas fa-user-friends"></i>
                    </span>{" "}
                    Friends
                  </div>
                </div>
              </NavLink>

              <div onClick={() => logout()}>
                <div>{localStorage.getItem("token") && "Logout"}</div>
              </div>
            </nav>

            <div id="info">
              <span>
                <i className="far fa-copyright"></i>
              </span>{" "}
              HarmoniMix
            </div>
          </div>

          <Route path="/" exact>
            <MainApp
              mood={mood}
              webCamera={webCamera}
              audioList={audioList}
              apiAudioListCopy={apiAudioListCopy}
              prev={prev}
              next={next}
              playMusic={playMusic}
              Webcam={Webcam}
              fetchMusic={fetchMusic}
            />
          </Route>

          <Route path="/friends" exact>
            <FriendsApp
              UserCard={UserCard}
            />
          </Route>

          <Route path="/signup" exact>
            <SignupForm />
          </Route>

          <Route path="/login" exact>
            <LoginForm />
          </Route>
        </div>
      </BrowserRouter>

      {/* player */}
      <div>
        <ReactJkMusicPlayer
          mode="full"
          showDownload={false}
          showDestroy={false}
          showReload={false}
          showLyric={false}
          showThemeSwitch={false}
          showPlayMode={false}
          toggleMode={false}
          audioLists={currAudio}
          autoPlay={false}
          seeked={false}
          getAudioInstance={(audioObj) => {
            setAudioInstance(audioObj);
          }}
        />
      </div>
    </div>
  );
}

export default App;

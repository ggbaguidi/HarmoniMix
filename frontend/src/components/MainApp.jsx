import { useEffect, useState } from "react";

function MainApp({
  mood,
  webCamera,
  audioList,
  apiAudioListCopy,
  prev,
  next,
  playMusic,
  Webcam,
  fetchMusic,
}) {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.pathname = "/login";
    } else {
      setUsername(localStorage.getItem("username"));
    }
  }, []);
  return (
    <>
      {/* songs */}
      <div className="p-5 w-85">
        {/* Search box */}
        <div>
          <input type="search" placeholder="Search Music (in progress)" />
        </div>

        {/* song squares */}
        <h2 className="mt-5 mb-3">Hi <span className="text-primary" id="username">{username}</span>, listen to {mood} songs</h2>
        <div className="d-flex mt-3 w-100 justify-content-between align-items-center">
          <div className="circle" onClick={() => prev()}>
            <i className="fas fa-arrow-left"></i>
          </div>

          {audioList.map((song) => {
            return (
              <div
                key={song.id}
                className="nav-btn"
                onClick={() => playMusic(song)}
              >
                <div>
                  <img src={song.cover} className="mw-100" alt="song-cover" />
                </div>
                <div>
                  <p>{song.name.slice(0, 15)}</p>
                </div>
              </div>
            );
          })}

          <div className="circle" onClick={() => next()}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>

        {/* webcam and list */}
        <h2 className="mt-5">Songs based on your mood !!!</h2>
        <div className="d-flex justify-content-between mt-3 w-100">
          {/* list */}
          <div className="list">
            {apiAudioListCopy.map((song) => {
              return (
                <div
                  key={song.id}
                  className="listing text-center py-2 font-weight-bold"
                  onClick={() => playMusic(song)}
                >
                  {song.name.slice(0, 35)}
                </div>
              );
            })}
          </div>

          {/* webcam */}
          <div id="cam-div">
            <Webcam className="webcam" ref={webCamera} mirrored={true} />
            <button onClick={() => fetchMusic()}>HarmoniMix</button>
          </div>

          {/* mood indicator */}
          <div
            id="mood-div"
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <p className="mb-3">You seem to be</p>
            <p className="font-weight-bold m-0">{mood}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainApp;

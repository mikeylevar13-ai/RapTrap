import React, { useState } from "react";
import BeatPlayer from "./components/BeatPlayer";
import Recorder from "./components/Recorder";
import RhymeAssistant from "./components/RhymeAssistant";

export default function App() {
  const [currentBeat, setCurrentBeat] = useState({
    name: "Sample beat (remote)",
    src: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0f1a2c3975.mp3?filename=hip-hop-11918.mp3"
  });
  const [lyrics, setLyrics] = useState("");
  const [playing, setPlaying] = useState(false);
  const [metronome, setMetronome] = useState(false);

  return (
    <div className="app">
      <div className="header">
        <h1>Rappin' Prototype</h1>
        <div style={{marginLeft:12}} className="small">Record over beats • Rhyme suggestions</div>
      </div>

      <div className="grid">
        <div className="panel">
          <h3>Beats</h3>
          <BeatPlayer
            currentBeat={currentBeat}
            onSelectBeat={setCurrentBeat}
            playing={playing}
            setPlaying={setPlaying}
          />

          <div style={{height:12}}/>

          <h3>Lyrics</h3>
          <textarea
            placeholder="Type your verses / hooks here..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />
          <div style={{marginTop:8}}>
            <RhymeAssistant />
          </div>
        </div>

        <div className="panel">
          <h3>Recorder</h3>
          <Recorder
            beatSrc={currentBeat.src}
            playing={playing}
            onSetPlaying={setPlaying}
            metronome={metronome}
          />
        </div>

        <div className="panel full">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <h3 style={{margin:"6px 0"}}>Session</h3>
              <div className="small">Current beat: {currentBeat.name}</div>
            </div>
            <div className="controls">
              <button onClick={() => {
                navigator.clipboard.writeText(window.location.href).catch(()=>{});
                alert("Share link copied (local session).");
              }}>Share (local)</button>
              <button className="primary" onClick={() => alert("Extend me: upload to server, add overdubs, etc.")}>Next: Backend/Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

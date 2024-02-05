import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognitionComponent = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    let silenceTimer: any;
    let speakingTimer: any;

    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    };

    const stopListening = () => {
      SpeechRecognition.stopListening();
    };

    if (transcript) {
      clearTimeout(silenceTimer);
      clearTimeout(speakingTimer);

      speakingTimer = setTimeout(async () => {
        stopListening(); // Stop listening when the user stops speaking
        //resetTranscript();
      }, 3000); // Adjust this duration as needed (3 seconds in this example)

      // silenceTimer = setTimeout(() => {
      //   stopListening(); // Restart listening after the user doesn't speak for 3 seconds
      //   resetTranscript();
      // }, 3000); // Adjust this duration as needed (3 seconds in this example)
    } else {
      // If there's no transcript (user not speaking), clear timers
      silenceTimer = setTimeout(() => {
        stopListening(); // Restart listening after the user doesn't speak for 3 seconds
        //resetTranscript();
      }, 3000);
    }

    return () => {
      clearTimeout(silenceTimer);
      clearTimeout(speakingTimer);
    };
  });

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      {/* <div className="container">
         <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div> */}

      <div className="btn-style">
        <button onClick={startListening}>Start Listening</button>
      </div>
    </>
  );
};

export default SpeechRecognitionComponent;

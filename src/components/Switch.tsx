import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraSwitcher = () => {
  const [devices, setDevices] = useState<any>([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const webcamRef:any = React.useRef(null);

  useEffect(() => {
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices(devices);
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    }

    getDevices();
  }, []);

  const switchCamera = async (deviceId:any) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });

      webcamRef.current.srcObject = stream;
      setSelectedDevice(deviceId);
    } catch (error) {
      console.error("Error switching camera:", error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={{
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        }}
      />
      <div>
        {devices.map((device:any) => (
          <button key={device.deviceId} onClick={() => switchCamera(device.deviceId)}>
            {device.label || `Camera ${devices.indexOf(device) + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CameraSwitcher;

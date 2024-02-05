import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import styles from "./searchEngine.module.scss";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getSearchImageResults } from "../hooks/useFetch";

const MySwal = withReactContent(Swal);

const CameraComponent = ({ setproductResult }: any) => {
  const webcamRef: any = useRef(null);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [key, setKey] = useState(0);

  const captureImage = () => {
    const canvas = webcamRef.current.getCanvas();

    canvas.toBlob((blob: any) => {
      //console.log(blob);

      // Create a new File object from the Blob data
      const imageFile: File = new File([blob], "captured_image.jpeg", {
        type: "image/jpeg",
      });

      // Now you have the image file in 'imageFile'
      //console.log(imageFile);

      // You can use 'imageFile' for further processing or storage
      setCapturedImage(imageFile);
      setCameraOpen(false);
    }, "image/jpeg");
  };

  const toast = useRef<Toast>(null);

  const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
    // convert file to base64 encoded
    let file: any = event.files[0];
    //setFile(file);
    //console.log(file);

    //let blob: any = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    setCapturedImage(file);
    setCameraOpen(false);
    setKey(key + 1);
    //console.log(file, capturedImage, blob);
  };

  const openCamera = () => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true })
    //   .then((stream) => {
    //     webcamRef.current.srcObject = stream;

    //   })
    //   .catch((error) => {
    //     console.error("Error accessing webcam:", error);
    //   });
    setCameraOpen(true);
  };

  const CloseCam = (event: any) => {
    setCameraOpen(false);
  };

  const searchByImage = async () => {
    //console.log(capturedImage);
    MySwal.fire({
      title: "loading...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    const productResult = await getSearchImageResults(capturedImage);
    console.log(productResult);
    setproductResult(productResult.data);
    MySwal.close();
  };

  return (
    <div>
      <div className={styles.srchGroup}>
        <Toast ref={toast}></Toast>
        <FileUpload
          key={key}
          mode="basic"
          name="demo[]"
          url="/api/upload"
          multiple
          accept="image/*"
          customUpload
          auto
          chooseLabel="Choose Image"
          uploadHandler={customBase64Uploader}
        />
        <Button
          className={styles.cameraBtn}
          icon="pi pi-camera"
          onClick={openCamera}
          label="Open Camera"
          aria-label="Open Camera"
        />

        <Button
          className={styles.searchbtn}
          icon="pi pi-search"
          label="Search"
          aria-label="Search"
          onClick={searchByImage}
        />
      </div>
      {cameraOpen ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={styles.webCam}
          />

          <br></br>
          <div className={styles.srchGroup}>
            <Button className={styles.cameraBtn} onClick={captureImage}>
              Capture Image
            </Button>
            <Button className={styles.cameraBtn} onClick={CloseCam}>
              Close Camera
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {capturedImage && (
            <div>
              <img
                style={{ maxHeight: "200px", maxWidth: "150px" }}
                className={styles.webCam}
                src={URL.createObjectURL(capturedImage)}
                alt="Captured"
              />
              <div className="flex align-items-center flex-wrap">
                <Button
                  type="button"
                  icon="pi pi-times"
                  className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                  onClick={() => {
                    setCapturedImage(null);
                    setKey(key + 1);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraComponent;

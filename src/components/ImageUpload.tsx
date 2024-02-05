import React, { useRef, useState } from "react";
import { FileUpload, FileUploadHandlerEvent, FileUploadHeaderTemplateOptions } from "primereact/fileupload";
import styles from "./searchEngine.module.scss";
import { Button } from "primereact/button";
import { getSearchImageResults } from "../hooks/useFetch";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Webcam from "react-webcam";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

const ImageUpload = ({ toggleInput, setproductResult }: any) => {
  const fileUploadRef = useRef<FileUpload>(null);
  const [key, setKey] = useState(0);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const webcamRef: any = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);

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

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        webcamRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
    setCameraOpen(true);
  };

  const CloseCam = (event: any) => {
    setCameraOpen(false);
  };

  const MySwal = withReactContent(Swal);
  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton } = options;

    return (
      <div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div className={styles.imgOptions}>
            {chooseButton}
            <Button
              onClick={() => {
                openCamera();
              }}
              style={{ padding: "0", height: "47px", width: "47px" }}
              icon="pi pi-camera"
              rounded
              outlined
            />
          </div>
          <div className={styles.imgOptions}>
            <Button
              onClick={() => {
                searchByImage();
              }}
              style={{ padding: "0", height: "47px", width: "47px" }}
              icon="pi pi-search"
              rounded
              outlined
            />
            <Button
              onClick={() => {
                toggleInput();
              }}
              style={{ padding: "0", height: "47px", width: "47px" }}
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
            />
          </div>
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    if (cameraOpen) {
      return (
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className={styles.webCam} />

          <br></br>
          <div className={styles.camOptions}>
            <Button className={styles.cameraBtn} onClick={captureImage}>
              <CameraOutlinedIcon></CameraOutlinedIcon>
            </Button>
            <Button className={styles.cameraBtn} onClick={CloseCam}>
              <NoPhotographyIcon></NoPhotographyIcon>
            </Button>
          </div>
        </div>
      );
    } else {
      if (!capturedImage) {
        return (
          <div className="flex align-items-center flex-column">
            <i
              className="pi pi-image mt-3 p-5"
              style={{ fontSize: "5em", borderRadius: "50%", backgroundColor: "var(--surface-b)", color: "var(--surface-d)" }}
            ></i>
            <div style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }} className="my-5">
              Drag and Drop Image Here
            </div>
          </div>
        );
      } else {
        return (
          <>
            <div className="flex align-items-center ">
              <div>
                <img
                  style={{ maxHeight: "100px", maxWidth: "100px" }}
                  className={styles.webCam}
                  src={URL.createObjectURL(capturedImage)}
                  alt="Captured"
                />
              </div>
              <div>
                <Button
                  size="small"
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
          </>
        );
      }
    }
  };

  const chooseOptions = { icon: "pi pi-fw pi-images", iconOnly: true, className: "custom-choose-btn p-button-rounded p-button-outlined" };

  const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
    // convert file to base64 encoded
    let file: any = event.files[0];
    console.log(file);
    setCameraOpen(false);
    setCapturedImage(file);
    setKey(key + 1);
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
    toggleInput();
    setCapturedImage(null);
    MySwal.close();
  };

  return (
    <div style={{ maxWidth: "90%", minWidth: "60%" }}>
      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        auto
        key={key}
        customUpload
        uploadHandler={customBase64Uploader}
        accept="image/*"
        headerTemplate={headerTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
      />
    </div>
  );
};

export default ImageUpload;

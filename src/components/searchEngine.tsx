import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import styles from "./searchEngine.module.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getPdfSearchResults, getProductAnswerResults, getProductDataResults, getHtmlSearchResults } from "../hooks/useFetch";
import ShowProducts from "./ShowProducts";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ImageUpload from "./ImageUpload";
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const MySwal = withReactContent(Swal);

const SearchEngine = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showText, setShowText] = useState<boolean>(true);
  const [pdfSearchResult, setPdfSearchResult] = useState<any>(null);
  const [htmlSearchResult, setHtmlSearchResult] = useState<any>(null);
  const [productResult, setproductResult] = useState<any>(null);
  const [productAnswerResult, setproductAnswerResult] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRecognize, setShowRecognize] = useState<boolean>(false);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  // const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    //setSearchTerm(transcript);
    let silenceTimer: any;
    let speakingTimer: any;

    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    };

    const stopListening = () => {
      SpeechRecognition.stopListening();
    };

    if (transcript) {
      setSearchTerm(transcript);
      clearTimeout(silenceTimer);
      clearTimeout(speakingTimer);

      speakingTimer = setTimeout(() => {
        console.log("after speaking something");
        productDataFetchVoice();
        productAnswerFetchVoice();
        stopListening(); // Stop listening when the user stops speaking
        setShowRecognize(false);
        resetTranscript();
      }, 1000); // Adjust this duration as needed (3 seconds in this example)

      // silenceTimer = setTimeout(() => {
      //   stopListening(); // Restart listening after the user doesn't speak for 3 seconds
      //   resetTranscript();
      // }, 3000); // Adjust this duration as needed (3 seconds in this example)
    } else {
      // If there's no transcript (user not speaking), clear timers
      silenceTimer = setTimeout(() => {
        console.log("without speaking something");
        stopListening(); // Restart listening after the user doesn't speak for 3 seconds
        setShowRecognize(false);
        //resetTranscript();
      }, 3000);
    }

    return () => {
      clearTimeout(silenceTimer);
      clearTimeout(speakingTimer);
    };
  });

  const startListening = () => {
    //resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const productDataFetchVoice = async () => {
    MySwal.fire({
      title: "loading...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const [productResult] = await Promise.all([getProductDataResults(transcript)]);

      setproductResult(productResult.data.matching_result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActiveIndex(0);
      setPdfSearchResult(null);
      setHtmlSearchResult(null);
      MySwal.close();
    }
  };

  const productAnswerFetchVoice = async () => {
    // MySwal.fire({
    //   title: "loading...",
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     MySwal.showLoading();
    //   },
    // });

    try {
      const [productAnswer] = await Promise.all([getProductAnswerResults(transcript)]);

      setproductAnswerResult(productAnswer.data.ans_result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      //setActiveIndex(1);
      setPdfSearchResult(null);
      setHtmlSearchResult(null);
      // MySwal.close();
    }
  };

  const toggleInput = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  const productDataFetch = async () => {
    MySwal.fire({
      title: "loading...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const [productResult] = await Promise.all([getProductDataResults(searchTerm)]);

      setproductResult(productResult.data.matching_result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActiveIndex(0);
      setPdfSearchResult(null);
      setHtmlSearchResult(null);
      MySwal.close();
    }
  };

  const productAnswerFetch = async () => {
    MySwal.fire({
      title: "loading...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const [productAnswer] = await Promise.all([getProductAnswerResults(searchTerm)]);

      setproductAnswerResult(productAnswer.data.ans_result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      //setActiveIndex(1);
      setPdfSearchResult(null);
      setHtmlSearchResult(null);
      MySwal.close();
    }
  };

  // const onTemplateRemove = (file: File, callback: Function) => {
  //   setTotalSize(totalSize - file.size);
  //   callback();
  // };

  const pdfContentFetch = async () => {
    if (pdfSearchResult === null) {
      // MySwal.fire({
      //   title: "loading...",
      //   allowOutsideClick: false,
      //   didOpen: () => {
      //     MySwal.showLoading();
      //   },
      // });
      console.log("content fetch");
      const result = await getPdfSearchResults(searchTerm);
      setPdfSearchResult(result);
      //MySwal.close();
    }
  };

  const htmlContentFetch = async () => {
    if (htmlSearchResult === null) {
      console.log("html content fetch");
      const result = await getHtmlSearchResults(searchTerm);
      setHtmlSearchResult(result.data.ans_result);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Card style={productResult ? {} : { padding: "70px 0 100px 0" }} className={styles.btnGroup}>
          {!productResult ? (
            <>
              <h2>i-Search</h2>
              <div className={styles.inputGroup}>
                {showText ? (
                  <>
                    <div className={styles.srchGroup}>
                      <InputText
                        onKeyDownCapture={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            productDataFetch();
                            productAnswerFetch();
                          }
                        }}
                        id="productFolderPath"
                        style={{ height: "46px" }}
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      />

                      <div style={{ display: "flex" }}>
                        <Button
                          className={styles.searchbtn}
                          icon="pi pi-microphone"
                          aria-label="Search"
                          onClick={() => {
                            setShowRecognize(true);
                            startListening();
                          }}
                        />
                        <Button className={styles.searchbtn} aria-label="Search" onClick={toggleInput}>
                          <AddAPhotoOutlinedIcon style={{ width: "30px" }}></AddAPhotoOutlinedIcon>
                        </Button>

                        <Button
                          className={styles.searchbtn}
                          icon="pi pi-search"
                          aria-label="Search"
                          onClick={async () => {
                            productDataFetch();
                            productAnswerFetch();
                          }}
                        />
                      </div>
                    </div>
                    {showRecognize && <h3>Speak Now...</h3>}

                    {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "9px",
                  }}
                >
                  <div className={styles.link} onClick={toggleInput}>
                    Search by Image
                  </div>
                </div> */}
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {/* <CameraComponent setproductResult={setproductResult}></CameraComponent> */}
                      <ImageUpload toggleInput={toggleInput} setproductResult={setproductResult}></ImageUpload>
                    </div>

                    {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "9px",
                  }}
                >
                  <div className={styles.link} onClick={toggleInput}>
                    Search by Text
                  </div>
                </div> */}
                  </>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "100px", fontWeight: "700", fontSize: "20px" }}>i-Search</div>
              <div className={styles.inputGroupAS}>
                {showText ? (
                  <>
                    <div className={styles.srchGroupAS}>
                      <InputText
                        onKeyDownCapture={async (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            productDataFetch();
                            productAnswerFetch();
                          }
                        }}
                        id="productFolderPath"
                        style={{ height: "46px" }}
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      />
                      <div style={{ display: "flex" }}>
                        <Button
                          className={styles.searchbtn}
                          icon="pi pi-microphone"
                          aria-label="Search"
                          onClick={() => {
                            setShowRecognize(true);
                            startListening();
                          }}
                        />
                        <Button className={styles.searchbtnAS} aria-label="Search" onClick={toggleInput}>
                          <AddAPhotoOutlinedIcon style={{ width: "30px" }}></AddAPhotoOutlinedIcon>
                        </Button>

                        <Button
                          className={styles.searchbtnAS}
                          icon="pi pi-search"
                          aria-label="Search"
                          onClick={async () => {
                            productDataFetch();
                            productAnswerFetch();
                          }}
                        />
                      </div>
                    </div>
                    {showRecognize && <h3>Speak Now...</h3>}

                    {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "9px",
                  }}
                >
                  <div className={styles.link} onClick={toggleInput}>
                    Search by Image
                  </div>
                </div> */}
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {/* <CameraComponent setproductResult={setproductResult}></CameraComponent> */}
                      <ImageUpload toggleInput={toggleInput} setproductResult={setproductResult}></ImageUpload>
                    </div>

                    {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "9px",
                  }}
                >
                  <div className={styles.link} onClick={toggleInput}>
                    Search by Text
                  </div>
                </div> */}
                  </>
                )}
              </div>
            </div>
          )}

          <ShowProducts
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            pdfContentFetch={pdfContentFetch}
            htmlContentFetch={htmlContentFetch}
            productResult={productResult}
            pdfSearchResult={pdfSearchResult}
            htmlSearchResult={htmlSearchResult}
            productAnswerResult={productAnswerResult}
            showText={showText}
          ></ShowProducts>
        </Card>
      </div>
    </>
  );
};

export default SearchEngine;

import { Card } from "primereact/card";
import { TabPanel, TabView } from "primereact/tabview";
import styles from "./searchEngine.module.scss";
import ProductCard from "./ProductCard";
import { ProgressSpinner } from "primereact/progressspinner";

const showProducts = ({
  activeIndex,
  setActiveIndex,
  pdfContentFetch,
  htmlContentFetch,
  productResult,
  pdfSearchResult,
  htmlSearchResult,
  productAnswerResult,
  showText,
}: any) => {
  // function appBs() {
  //   MySwal.fire({
  //     title: "loading...",
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       MySwal.showLoading();
  //     },
  //   });
  //   return <></>;
  // }

  return (
    <div>
      {productResult && (
        <div className="card">
          <TabView
            activeIndex={activeIndex}
            onBeforeTabChange={() => {
              pdfContentFetch();
              htmlContentFetch();
            }}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel className={styles.tabView} header="Product">
              <div className={styles.productCard}>
                {productResult &&
                  productResult.map((elem: any) => {
                    return <ProductCard elem={elem}></ProductCard>;
                  })}
              </div>
            </TabPanel>
            {showText && (
              <TabPanel header="Content">
                <div
                  style={{
                    paddingTop: "10px",
                    //textAlign: "initial",
                    width: "100%",
                    paddingBottom: "10px",
                    padding: "0",
                  }}
                >
                  {activeIndex === 1 ? (
                    productAnswerResult ? (
                      <div className="card" style={{ width: "100%", paddingBottom: "30px" }}>
                        <Card>
                          <div style={{ position: "relative", paddingBottom: "20px" }}>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/2784/2784530.png"
                              alt="Qna"
                              style={{ color: "#708090", position: "absolute", right: "0", height: "30px", width: "30px" }}
                            ></img>
                          </div>
                          <div style={{ textAlign: "initial" }} className="m-0">
                            {productAnswerResult}
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <div
                        style={{
                          paddingTop: "10px",
                          //textAlign: "initial",
                          width: "100%",
                          paddingBottom: "10px",
                          padding: "0",
                        }}
                      >
                        <div className="card flex justify-content-center">
                          <ProgressSpinner style={{ width: "50px", height: "50px" }} animationDuration=".5s" />
                        </div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </div>
                {pdfSearchResult ? (
                  <div style={{ width: "100%", paddingBottom: "30px" }} className="card">
                    <Card style={{ padding: "0 !important" }}>
                      {pdfSearchResult && pdfSearchResult.answer ? (
                        <>
                          <div style={{ position: "relative", paddingBottom: "20px" }}>
                            <img
                              src="https://th.bing.com/th/id/OIP.WitaqVpJxHSvjR5XwsmFpQHaHa?w=195&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                              alt="Qna"
                              style={{ color: "#708090", position: "absolute", right: "0", height: "30px", width: "30px" }}
                            ></img>
                          </div>
                          <div style={{ textAlign: "initial" }}>
                            <p className="m-0">{pdfSearchResult.answer}</p>
                            {pdfSearchResult.sources !== "" && pdfSearchResult.sources !== null && pdfSearchResult.sources !== "None" ? (
                              <p className="m-0">
                                <span style={{ marginRight: "3px" }}>source:</span>
                                <a href={pdfSearchResult.sources} target="_blank" rel="noopener noreferrer">
                                  {pdfSearchResult.sources}
                                </a>
                              </p>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              paddingTop: "10px",
                              //textAlign: "initial",
                              width: "100%",
                              paddingBottom: "10px",
                              padding: "0",
                            }}
                          >
                            <div className="card flex justify-content-center">
                              <ProgressSpinner style={{ width: "50px", height: "50px" }} animationDuration=".5s" />
                            </div>
                          </div>
                        </>
                      )}
                    </Card>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        paddingTop: "10px",
                        //textAlign: "initial",
                        width: "100%",
                        paddingBottom: "10px",
                        padding: "0",
                      }}
                    >
                      <div className="card flex justify-content-center">
                        <ProgressSpinner style={{ width: "50px", height: "50px" }} animationDuration=".5s" />
                      </div>
                    </div>
                  </>
                )}
                <div style={{ width: "100%" }} className="card">
                  <Card>
                    {htmlSearchResult && htmlSearchResult.answer ? (
                      <>
                        <div style={{ position: "relative", paddingBottom: "20px" }}>
                          <img
                            src="https://cdn0.iconfinder.com/data/icons/social-network-7/50/22-512.png"
                            alt="Qna"
                            style={{ color: "#708090", position: "absolute", right: "0", height: "27px", width: "27px" }}
                          ></img>
                        </div>
                        <div style={{ textAlign: "initial" }}>
                          <p className="m-0">{htmlSearchResult.answer}</p>
                          {htmlSearchResult.sources !== "" && htmlSearchResult.sources !== null && htmlSearchResult.sources !== "None" ? (
                            <p className="m-0">
                              <span style={{ marginRight: "3px" }}>source:</span>
                              <a href={htmlSearchResult.sources} target="_blank" rel="noopener noreferrer">
                                {htmlSearchResult.sources}
                              </a>
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            paddingTop: "10px",
                            //textAlign: "initial",
                            width: "100%",
                            paddingBottom: "10px",
                            padding: "0",
                          }}
                        >
                          <div className="card flex justify-content-center">
                            <ProgressSpinner style={{ width: "50px", height: "50px" }} animationDuration=".5s" />
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                </div>
              </TabPanel>
            )}
          </TabView>
        </div>
      )}
    </div>
  );
};

export default showProducts;

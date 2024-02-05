import React from "react";
import { Card } from "primereact/card";
import styles from "./searchEngine.module.scss";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cart/cartSlice";

const ProductCard = ({ elem }: any) => {
  const ID = elem.payload.product_code;
  const cart = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div className={styles.allCards}>
      <Card
        style={{
          border: "1px solid black",
          boxShadow: "none",
          height: "350px",
          width: "250px",
          overflow: "hidden",
          paddingBottom: "20px",
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        <div
          style={{
            height: "100px",
          }}
        >
          <a key={elem.Id} style={{ textDecoration: "none" }} href={elem.payload.link} target="_blank" rel="noopener noreferrer">
            <img
              style={{
                maxHeight: "100px",
                maxWidth: "200px",
              }}
              src={elem.payload.image_link}
              alt={elem.payload.name}
              onError={(e: any) => {
                e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoUecboZHCSHX1oPAsHWkNRVY9V8t2I82XBA&usqp=CAU"; // Replace with your dummy image source
              }}
            />
          </a>
        </div>
        <div>
          <h5 style={{ marginBottom: "15px" }}>
            {elem.payload.name.substring(0, 80)}
            {elem.payload.name.length > 80 && "..."}
          </h5>

          <div className={styles.ratings}>
            <Stack
              style={{
                display: "flex",
                flexDirection: "inherit",
              }}
              spacing={1}
            >
              <Rating name="half-rating-read" defaultValue={0} precision={0.5} readOnly />
            </Stack>
          </div>

          {elem.payload.actual_price !== "Unknown" || null ? (
            <>
              {/* <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={{
                  __html: elem.NormalizedDocAttr.discount_price,
                }}
              /> */}

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={{
                  __html: `$${elem.payload.actual_price}`,
                }}
              />
            </>
          ) : (
            <>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>Out of Stock</p>
            </>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {elem.payload.actual_price !== "Unknown" || null ? (
            <>
              {cart[ID] && cart[ID].quantity !== 0 ? (
                <button
                  onClick={() => {
                    if (cart[ID] && cart[ID].quantity > 0) dispatch(removeFromCart(elem));
                  }}
                  className={styles.CartBtn}
                >
                  <i className="pi pi-minus"></i>
                </button>
              ) : (
                <button className={styles.CartBtnDisabled} disabled>
                  <i className="pi pi-minus"></i>
                </button>
              )}
              {cart[ID] ? (
                <span>{cart[ID].quantity}</span>
              ) : (
                <>
                  <span>0</span>
                </>
              )}
              <button
                onClick={() => {
                  dispatch(addToCart(elem));
                }}
                className={styles.CartBtn}
              >
                <i className="pi pi-plus"></i>
              </button>
            </>
          ) : (
            <>
              {/* <button
                disabled
                onClick={() => {
                  dispatch(addToCart(elem));
                }}
                className={styles.CartBtnDisabled}
              >
                <i className="pi pi-plus"></i>
              </button> */}
            </>
          )}

          {elem.payload.actual_price !== "Unknown" || null ? (
            <></>
          ) : (
            <>
              {/* <button
                disabled
                onClick={() => {
                  if (cart[ID] && cart[ID].quantity > 0) dispatch(removeFromCart(elem));
                }}
                className={styles.CartBtnDisabled}
              >
                <i className="pi pi-minus"></i>
              </button> */}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;

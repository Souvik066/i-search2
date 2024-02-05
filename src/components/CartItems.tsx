import { Dialog } from "primereact/dialog";
import React from "react";
import styles from "./searchEngine.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cart/cartSlice";

const CartItems = ({ visible, setVisible }: any) => {
  const cart = useSelector((state: any) => state.cart.items);
  let total = 0;

  const cartIds = Object.keys(cart);
  console.log(cart);
  const dispatch = useDispatch();


  return (
    <div>
      <Dialog
        header="Cart"
        visible={visible}
        position="top-right"
        className={styles.cartDialog}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        dismissableMask={true}
      >
        <div>
          {cartIds.map((id: any) => {
            let item: any = {
              payload: cart[id],
            };
            total = total + cart[id].quantity * cart[id].actual_price;

            return (
              <div className={styles.cartItem}>
                <div style={{ display: "flex", alignItems: "center",width:"80%" }}>
                  <img
                    style={{
                      maxWidth: "100px",
                      maxHeight:"150px"
                    }}
                    src={cart[id].image_link}
                    alt={cart[id].image_link}
                    onError={(e: any) => {
                      e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoUecboZHCSHX1oPAsHWkNRVY9V8t2I82XBA&usqp=CAU"; // Replace with your dummy image source
                    }}
                  />
                  <h5 style={{ padding: "0 15px",width:"80%" }}>{cart[id].name}</h5>
                </div>
                {/* <div style={{ width: "45%" }}>
                  
                </div> */}

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div>
                    {" "}
                    <h3>${(cart[id].quantity * cart[id].actual_price).toFixed(2)}</h3>
                  </div>
                  <button
                    onClick={() => {
                      if (cart[id] && cart[id].quantity > 0) dispatch(removeFromCart(item));
                    }}
                    className={styles.CartBtn}
                  >
                    <i className="pi pi-minus"></i>
                  </button>
                  {cart[id] ? (
                    <span>{cart[id].quantity}</span>
                  ) : (
                    <>
                      <span>0</span>
                    </>
                  )}

                  <button
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                    className={styles.CartBtn}
                  >
                    <i className="pi pi-plus"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.cartTotal}>Total Price: ${total.toFixed(2)}</div>
      </Dialog>
    </div>
  );
};

export default CartItems;

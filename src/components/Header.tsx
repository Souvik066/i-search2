import * as React from "react";
import styles from "./searchEngine.module.scss";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import { useState } from "react";

const Header = () => {
  const cart = useSelector((state: any) => state.cart.items);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div style={{ height: "36px", backgroundColor: "#005537", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span style={{ textAlign: "center", color: "white", fontWeight: "500", fontSize: "13px" }}>Shop Smart, Save Big on Every Purchase</span>
      </div>

      <div className={styles.header}>
        <Image src="https://companieslogo.com/img/orig/NA9.DE-ebeff140.png?t=1664248024" alt="Image" width="40" />
        <div className={styles.nav} >
          <span className={styles.spann}>Offers Catalog</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.spann}>Our Stores</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.spann}>Recipes</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.spann}>Subscriptions</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.spann}>Delivery-PostalCode</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.spann}>Brands</span>
        </div>
        <div className={styles.cartIcon}>
          <Button
            onClick={() => {
              setVisible(true);
            }}
            style={{ padding: "0", height: "40px", width: "40px" }}
            icon="pi pi-shopping-cart"
            rounded
            outlined
            severity="secondary"
          />
          <div className={styles.cartNumber}>{Object.keys(cart).length}</div>
        </div>
      </div>
      <CartItems visible={visible} setVisible={setVisible}></CartItems>
    </>
  );
};

export default Header;

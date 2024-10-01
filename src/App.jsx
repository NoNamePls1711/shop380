import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
  { id: 1, name: 'เถ้าแก่น้อย รสคลาสสิค', price: 700, image: 'https://down-th.img.susercontent.com/file/62aaf99b2377c4a0fa195ce44b1188ac' },
  { id: 2, name: 'เถ้าแก่น้อย รสเผ็ด', price: 500, image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/48/88/8858702400848/8858702400848_1-20221222181523-.jpg' },
  { id: 3, name: 'เถ้าแก่น้อย รสซีฟู๊ด', price: 550, image: 'https://res.cloudinary.com/freshketimage001/image/upload/v1629354108/jxhaq57pgzpt0bldndwd.jpg' },
  { id: 4, name: 'เถ้าแก่น้อย รสต้มยำกุ้ง', price: 800, image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/07/88/8858702413107/8858702413107_1-20231204081227-.jpg' },
  { id: 5, name: 'เถ้าแก่น้อย รสสโม้คแซลม่อนซอสลิ้นจี่', price: 650, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrXXIg5ndqs5hjxDsMZ9w9rlnXcZCwRGQpZw&s' },
  { id: 6, name: 'เถ้าแก่น้อย รสซอสญี่ปุ่น', price: 450, image: 'https://wtksupermarket.com/upload-img/013/0134/01341/8858702407779.jpg' },
  { id: 7, name: 'เถ้าแก่น้อย รสซุปข้าวโพด', price: 400, image: 'https://cdn.imweb.me/thumbnail/20211023/9d22e8a6ba51c.jpg' },
  { id: 8, name: 'เถ้าแก่น้อย รสซาวครีมและหัวหอม', price: 850, image: 'https://down-th.img.susercontent.com/file/th-11134207-7qul6-lgoriittluycb0' },
  { id: 9, name: 'เถ้าแก่น้อย รสชีส', price: 1000, image: 'https://down-th.img.susercontent.com/file/70f53e9ade7b57a78a3b026144abe53f' },
  { id: 10, name: 'เถ้าแก่น้อย รสล็อบสเตอร์บาร์บีคิวย่างสับปะรด', price: 900, image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/58/88/8858702433358/thumbnail/8858702433358_3-20240613182143-.jpg' },
];


const ProductList = ({ products, addToCart }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 mb-"> {/* เปลี่ยน col-md-2 เป็น col-md-2 */}
          <div className="card h-200">
            <div className="card-img-top-container">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '250px', objectFit: 'contain' }} /> {/* ปรับขนาดภาพที่นี่ */}
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">ราคา: {product.price} บาท</p>
              <button className="btn btn-primary" onClick={() => addToCart(product)}>เพิ่มลงตระกร้า</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ShoppingCart = ({ cart, removeFromCart, updateQuantity, discount, shippingCost, canCheckout, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total - discount;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>ราคา:{item.price} บาท</p>
          <p>จำนวน: {item.quantity} ชิ้น</p>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
          <button onClick={() => removeFromCart(item.id)}>ลบสิ้นค้า</button>
        </div>
      ))}
      <p>ยอดรวม:{total} บาท</p>
      <p>ส่วนลด:{discount} บาท</p>
      <p>ค่าจัดส่ง:{shippingCost} บาท</p>
      <p>ยอดรวมทั้งหมด:{discountedTotal + shippingCost} บาท</p>
      <button className="btn btn-success" disabled={!canCheckout} onClick={onCheckout}>สั่งซื้อ</button>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(100);
  const [canCheckout, setCanCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false); // เพิ่ม state สำหรับสั่งซื้อสำเร็จ

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const applyCoupon = (coupon) => {
    if (coupon === 'DISCOUNT20') {
      setDiscount(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.2);
      setShippingCost(100); // คิดค่าจัดส่งปกติ
      setCanCheckout(true); // เปิดใช้งานปุ่มสั่งซื้อ
    } else if (coupon === 'FREESHIPPING') {
      setDiscount(0);
      setShippingCost(0); // ส่งฟรี
      setCanCheckout(true); // เปิดใช้งานปุ่มสั่งซื้อ
    } else {
      setDiscount(0);
      setShippingCost(100); // คิดค่าจัดส่งปกติ
      setCanCheckout(false); // ปิดปุ่มสั่งซื้อหากไม่มีคูปองถูกต้อง
    }
  };

  const handleCheckout = () => {
    setOrderSuccess(true); // ตั้งค่าสถานะสั่งซื้อสำเร็จ
  };

  return (
    <div>
      <h1><center>seaweed shop</center></h1>
      <ProductList products={products} addToCart={addToCart} />
      <ShoppingCart
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        discount={discount}
        shippingCost={shippingCost}
        canCheckout={canCheckout}
        onCheckout={handleCheckout}
      />
      <div>
        <h3>Apply Coupon</h3>
        <select className="form-select" onChange={(e) => applyCoupon(e.target.value)} defaultValue="">
          <option value="" disabled>เลือกคูปอง</option>
          <option value="DISCOUNT20">ส่วนลด 20%</option>
          <option value="FREESHIPPING">ส่งฟรี</option>
        </select>
      </div>
      {orderSuccess && (
        <div className="alert alert-success mt-3">สั่งซื้อสำเร็จ!</div>
      )}
    </div>
  );
};

export default App;

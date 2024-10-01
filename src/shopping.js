const ShoppingCartIcon = ({ cartItems, toggleCart }) => {
    return (
      <div className="fixed top-5 right-5 cursor-pointer flex items-center" onClick={toggleCart}>
        <FaShoppingCart size={30} />
        <span className="ml-2 bg-red-500 text-white rounded-full px-3 py-1">
          {cartItems.length}
        </span>
      </div>
    );
  };
  
  const ShoppingCart = ({ cartItems, removeFromCart, isOpen }) => {
    if (!isOpen) return null; // ซ่อนไว้ถ้าไม่กดเปิด
  
    return (
      <div className="fixed right-0 top-16 w-80 bg-white shadow-lg border border-gray-200 p-5 z-50">
        <h2 className="text-lg font-semibold mb-3">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <span className="block font-medium">{item.name}</span>
                <span className="text-sm">Price: ${item.price}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Quantity: {item.quantity}</span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  
  const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);
  
    const toggleCart = () => setCartOpen(!isCartOpen);
  
    const removeFromCart = (id) => {
      setCartItems(cartItems.filter((item) => item.id !== id));
    };
  
    return (
      <div className="p-5">
        <ShoppingCartIcon cartItems={cartItems} toggleCart={toggleCart} />
        <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} isOpen={isCartOpen} />
        {/* โค้ดแสดงรายการสินค้า */}
      </div>
    );
  };
  
  export default App;
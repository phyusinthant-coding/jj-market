import { useState } from 'react'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function App() {
  //const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const products: Product[] = [
    { id: 1, name: "Wireless Headphones", price: 95, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "Electronics" },
    { id: 2, name: "Smart Watch", price: 120, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", category: "Wearables" },
    { id: 3, name: "Premium Backpack", price: 45, image: "https://images.unsplash.com/photo-1596273501899-336404ed1701?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlbWl1bSUyMGJhY2twYWNrfGVufDB8fDB8fHww", category: "Fashion" },
    { id: 4, name: "Mechanical Keyboard", price: 80, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500", category: "Accessories" },
  ];

  // ပစ္စည်းထည့်တဲ့ Function
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
  // ရွေးချယ်ထားတဲ့ index ကလွဲပြီး ကျန်တဲ့ ပစ္စည်းတွေကိုပဲ filter လုပ်ပြီး ပြန်သိမ်းတာပါ
  const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // daisyUI Drawer Structure
    <div className="drawer drawer-end">
      <input id="cart-sidebar" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col min-h-screen bg-base-200" data-theme="light">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-md px-4 md:px-10 sticky top-0 z-50">
          <div className="flex-1 text-2xl font-bold text-primary">JJ MARKET</div>
          
          <div className="flex-none gap-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="input input-bordered w-24 md:w-auto"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Cart Icon ကို Label နဲ့ ပတ်ထားလို့ နှိပ်ရင် Sidebar ပွင့်မယ် */}
            <label htmlFor="cart-sidebar" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm badge-primary indicator-item">{cart.length}</span>
              </div>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map(product => (
            <div key={product.id} className="card bg-base-100 shadow-xl overflow-hidden hover:scale-105 transition-all">
              <figure><img src={product.image} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{product.name}</h2>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div> 

      {/* Sidebar Content (ခြင်းတောင်းစာရင်း) */}
      <div className="drawer-side z-[60]">
        <label htmlFor="cart-sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-white text-base-content shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">My Cart ({cart.length})</h2>
          
          {/* ၅။ ခြင်းတောင်းထဲက ပစ္စည်းတွေကို စာရင်းပြမယ် */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 items-center bg-base-100 p-2 rounded-lg border group">
                <img src={item.image} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-primary text-xs">${item.price}</p>
                </div>
                
                {/* ဖျက်မယ့်ခလုတ် */}
                <button 
                  className="btn btn-ghost btn-xs text-error group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            {cart.length === 0 && <p className="text-center text-slate-400 mt-10">ခြင်းတောင်းထဲမှာ ဘာမှမရှိသေးပါ</p>}
          </div>

          <div className="mt-auto pt-6 border-t">
            {/* ၆။ စုစုပေါင်းဈေးနှုန်း တွက်မယ် */}
            <div className="flex justify-between font-bold mb-4">
               <span>Total:</span>
               <span>${cart.reduce((total, item) => total + item.price, 0)}</span>
            </div>
            <button className="btn btn-primary w-full shadow-lg">Checkout Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
const products = [
 {id:1,cat:"Celulares",name:"Smartphone Nova X5 5G",price:1299,old:1499,img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85",badge:"-13%"},
 {id:2,cat:"Audio",name:"Parlante Bluetooth Bass Pro",price:249,old:299,img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85",badge:"OFERTA"},
 {id:3,cat:"Monitores",name:"Monitor UltraView 27” FHD",price:799,old:899,img:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=85",badge:"-11%"},
 {id:4,cat:"Laptops",name:"Laptop ProBook 15”, 16GB",price:2299,old:2499,img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",badge:"NUEVO"},
 {id:5,cat:"Gaming",name:"Teclado Mecánico RGB X",price:189,old:229,img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=85",badge:"-17%"},
 {id:6,cat:"Audio",name:"Audífonos Wireless Pro",price:299,old:359,img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",badge:"TOP"},
 {id:7,cat:"Gaming",name:"Mouse Gamer Precision 8000",price:139,old:169,img:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=85",badge:"-18%"},
 {id:8,cat:"Accesorios",name:"Power Bank Fast Charge 20K",price:179,old:219,img:"https://images.unsplash.com/photo-1609592424856-3f4f1a2f5f1f?auto=format&fit=crop&w=700&q=85",badge:"OFERTA"}
];

let currency="PEN", rate=0.27, cart=[];
const money = n => currency==="PEN" ? `S/ ${n.toLocaleString("es-PE",{minimumFractionDigits:2})}` : `$ ${(n*rate).toLocaleString("en-US",{minimumFractionDigits:2})}`;

function renderProducts(list=products){
  document.getElementById("productGrid").innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-img"><span class="badge">${p.badge}</span><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="product-info"><small>${p.cat}</small><h3>${p.name}</h3>
      <div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div>
      <button class="add" onclick="addToCart(${p.id})">Agregar al carrito</button></div>
    </article>`).join("");
}
function filterProducts(cat){
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.textContent.trim()===cat || (cat==="Todos"&&b.textContent.trim()==="Todos")));
  renderProducts(cat==="Todos"?products:products.filter(p=>p.cat===cat));
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);renderCart();document.getElementById("cartCount").textContent=cart.length}
function renderCart(){
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><img src="${p.img}"><div><b>${p.name}</b><span>${money(p.price)}</span></div><button onclick="removeCart(${i})" style="margin-left:auto;border:0;background:none;cursor:pointer">×</button></div>`).join(""):`<div class="empty">Tu carrito está vacío.<br>¡Agrega algo de tecnología! 🚀</div>`;
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function removeCart(i){cart.splice(i,1);renderCart();document.getElementById("cartCount").textContent=cart.length}
function openCart(){document.getElementById("cartOverlay").classList.add("open")}
function closeCart(e){if(!e||e.target.id==="cartOverlay")document.getElementById("cartOverlay").classList.remove("open")}
function checkout(){alert(cart.length?"Gracias por tu compra en BYTE HOUSE. Demo lista para conectar con un sistema de pago.":"Agrega productos antes de finalizar.")}
document.getElementById("currencyBtn").onclick=()=>{
 currency=currency==="PEN"?"USD":"PEN";rate=currency==="PEN"?0.27:3.70;
 document.getElementById("currencyBtn").textContent=currency==="PEN"?"S/ PEN ▾":"$ USD ▾";renderProducts();renderCart();
};
renderProducts();renderCart();
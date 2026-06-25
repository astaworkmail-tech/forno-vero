var cart={};
function fmt(n){return '$'+n.toFixed(2);}
function toast(m){var t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},1700);}
function save(){try{localStorage.setItem('fv_cart',JSON.stringify(cart));}catch(e){}}
function load(){try{var c=localStorage.getItem('fv_cart');if(c)cart=JSON.parse(c);}catch(e){}}
load();
function renderCart(){
  var items=document.getElementById('cart-items');if(!items)return;
  var ids=Object.keys(cart),count=0,total=0,html='';
  if(ids.length===0){items.innerHTML='<p class="empty">Your box is empty — add a pie.</p>';}
  else{ids.forEach(function(id){var it=cart[id];count+=it.q;total+=it.q*it.price;html+='<div class="ci"><span class="q" data-sub="'+id+'">−</span><span class="q" data-add2="'+id+'">+</span><span class="nm">'+it.name+'</span><span class="amt">'+fmt(it.q*it.price)+'</span></div>';});items.innerHTML=html;}
  var cc=document.getElementById('cart-count');if(cc)cc.textContent=count+(count===1?' item':' items');
  document.getElementById('sub').textContent=fmt(total);
  document.getElementById('grand').textContent=fmt(total);
  var pay=document.getElementById('pay');pay.disabled=count===0;pay.textContent=count===0?'Pay & Place Order':'Pay '+fmt(total)+' & Place Order';
  window._total=total;
}
document.addEventListener('click',function(e){
  var a=e.target.closest('.add');
  if(a){var id=a.dataset.id;if(!cart[id])cart[id]={name:a.dataset.name,price:parseFloat(a.dataset.price),q:0};cart[id].q++;save();toast(a.dataset.name+' added \ud83c\udf55');renderCart();return;}
  if(e.target.dataset.sub){var s=e.target.dataset.sub;if(cart[s]){cart[s].q--;if(cart[s].q<=0)delete cart[s];save();renderCart();}}
  if(e.target.dataset.add2){var d=e.target.dataset.add2;if(cart[d]){cart[d].q++;save();renderCart();}}
});
document.getElementById('pay').addEventListener('click',function(){
  var total=window._total||0;
  var email=document.getElementById('email').value.trim();
  var name=document.getElementById('name').value.trim();
  if(total<=0){toast('Add a pizza first');return;}
  if(!email||email.indexOf('@')<0){toast('Enter your email for the receipt');document.getElementById('email').focus();return;}
  var lines=Object.keys(cart).map(function(id){return cart[id].q+'× '+cart[id].name;}).join(', ');
  if(typeof window.__processDonation==='function'){window.__processDonation({amount:total,email:email,name:name,label:'Forno Vero — '+lines});}
  else{toast('Checkout activates once published live');}
});
renderCart();
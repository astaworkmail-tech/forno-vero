var cart={};
function toast(m){var t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},1700);}
function save(){try{localStorage.setItem('fv_cart',JSON.stringify(cart));}catch(e){}}
function load(){try{var c=localStorage.getItem('fv_cart');if(c)cart=JSON.parse(c);}catch(e){}}
load();
document.addEventListener('click',function(e){var a=e.target.closest('.add');if(a){var id=a.dataset.id;if(!cart[id])cart[id]={name:a.dataset.name,price:parseFloat(a.dataset.price),q:0};cart[id].q++;save();toast(a.dataset.name+' added \ud83c\udf55');}});
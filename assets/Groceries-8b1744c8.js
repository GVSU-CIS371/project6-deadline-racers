import{d as i,u as p,r as m,w as f,o as v,c,a as t,b as o,e as a,f as l,g as w,h as g,F as h,_ as k}from"./index-fa887d3d.js";const x=i({__name:"Groceries",setup(y){const e=p(),n=m(e.products);return f(()=>e.products,r=>{n.value=r}),v(async()=>{await e.init(),await e.filterByCategory("Groceries")}),(r,B)=>{const u=o("v-col"),_=o("v-row"),d=o("v-container");return a(),c(d,null,{default:t(()=>[l(_,null,{default:t(()=>[(a(!0),w(h,null,g(n.value,s=>(a(),c(u,{cols:"12",sm:"6",md:"4",lg:"3",key:s.id},{default:t(()=>[l(k,{product:s},null,8,["product"])]),_:2},1024))),128))]),_:1})]),_:1})}}});export{x as default};

import{S as D,i as C,s as b,D as y,e as h,c as v,a as w,d as f,b as P,f as j,H as x,E as A,F as L,G as M,x as S,u as O,L as V,M as E,N as q,P as F,O as m,C as I,Q as G,R as d,T as l}from"./vendor-02a83c89.js";function H(e){let t,a,r;const n=e[1].default,o=y(n,e,e[0],null);return{c(){t=h("div"),a=h("div"),o&&o.c(),this.h()},l(s){t=v(s,"DIV",{class:!0});var i=w(t);a=v(i,"DIV",{class:!0});var g=w(a);o&&o.l(g),g.forEach(f),i.forEach(f),this.h()},h(){P(a,"class","row-auto"),P(t,"class","mx-auto max-w-screen-sm px-4")},m(s,i){j(s,t,i),x(t,a),o&&o.m(a,null),r=!0},p(s,[i]){o&&o.p&&(!r||i&1)&&A(o,n,s,s[0],r?M(n,s[0],i,null):L(s[0]),null)},i(s){r||(S(o,s),r=!0)},o(s){O(o,s),r=!1},d(s){s&&f(t),o&&o.d(s)}}}function K(e,t,a){let{$$slots:r={},$$scope:n}=t;return e.$$set=o=>{"$$scope"in o&&a(0,n=o.$$scope)},[n,r]}class Y extends D{constructor(t){super();C(this,t,K,H,b,{})}}const N="wordgames-github-io-",$="peer_id",p=I(null),c=I(null),_=new V.EventEmitter;function Q(){const e=m(p);return e?Promise.resolve(e):new Promise(t=>_.once("peer",t))}function k(){var e;return(e=m(p))==null?void 0:e.getId()}function R(e){return`${N}${e}`}function z(e=6){return G(0,e).iter().map(()=>d()<.25?Math.floor(d()*10):String.fromCharCode(97+Math.floor(d()*26))).join("")}function u(){c.set(this)}async function B(e){const t=m(c),a=R(e);if(t)if(t.getRoomId()!==a)t.off(l.Connection,u),t.off(l.Disconnection,u),t.close(),c.set(null);else return t;const r=await Q(),n=r.getRoom(a);return n.on(l.Connection,u),n.on(l.Disconnection,u),c.set(n),_.emit("room",n),n.connect()}E.exports.getItem($).then(async e=>{e||(e=q(),await E.exports.setItem($,e));const t=await F.create(new window.Peer(R(e),{host:"0.peerjs.com",port:parseInt("443")}));p.set(t),_.emit("peer",t)});export{Y as L,k as a,B as b,z as g,_ as p};

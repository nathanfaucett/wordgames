import{S as v,i as w,s as $,D as E,e as I,c as R,a as C,d as _,b as D,f as b,E as x,F as y,G as j,x as A,u as L,L as M,M as d,N as S,P as O,O as f,C as g,Q as q,R as u,T as i}from"./vendor-7858be98.js";function F(e){let t,s;const r=e[1].default,o=E(r,e,e[0],null);return{c(){t=I("div"),o&&o.c(),this.h()},l(n){t=R(n,"DIV",{class:!0});var a=C(t);o&&o.l(a),a.forEach(_),this.h()},h(){D(t,"class","mx-auto h-screen flex flex-col max-w-md px-4")},m(n,a){b(n,t,a),o&&o.m(t,null),s=!0},p(n,[a]){o&&o.p&&(!s||a&1)&&x(o,r,n,n[0],s?j(r,n[0],a,null):y(n[0]),null)},i(n){s||(A(o,n),s=!0)},o(n){L(o,n),s=!1},d(n){n&&_(t),o&&o.d(n)}}}function G(e,t,s){let{$$slots:r={},$$scope:o}=t;return e.$$set=n=>{"$$scope"in n&&s(0,o=n.$$scope)},[o,r]}class T extends v{constructor(t){super();w(this,t,G,F,$,{})}}const K="wordgames-github-io-",h="peer_id",m=g(null),l=g(null),p=new M.EventEmitter;function N(){const e=f(m);return e?Promise.resolve(e):new Promise(t=>p.once("peer",t))}function V(){var e;return(e=f(m))==null?void 0:e.getId()}function P(e){return`${K}${e}`}function Y(e=6){return q(0,e).iter().map(()=>u()<.25?Math.floor(u()*10):String.fromCharCode(97+Math.floor(u()*26))).join("")}function c(){l.set(this)}async function k(e){const t=f(l),s=P(e);if(t)if(t.getRoomId()!==s)t.off(i.Connection,c),t.off(i.Disconnection,c),t.close(),l.set(null);else return t;const r=await N(),o=r.getRoom(s);return o.on(i.Connection,c),o.on(i.Disconnection,c),l.set(o),p.emit("room",o),o.connect()}d.exports.getItem(h).then(async e=>{e||(e=S(),await d.exports.setItem(h,e));const t=await O.create(new window.Peer(P(e),{host:"0.peerjs.com",port:parseInt("443")}));m.set(t),p.emit("peer",t)});export{T as L,V as a,k as b,Y as g,p};

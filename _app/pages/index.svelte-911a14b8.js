import{S,i as V,s as W,j as q,m as C,o as K,x as N,u as P,v as T,e as d,t as E,k as j,c as _,a as h,g as H,d as u,n as w,b as r,f as $,H as p,J as L,K as U}from"../chunks/vendor-7858be98.js";import{b as J}from"../chunks/paths-45dac81d.js";import{L as z,g as B}from"../chunks/p2p-130d0134.js";function F(m){let s,l,t,a,n,x,v,c,i,I,f,g,b,k,R;return{c(){s=d("h1"),l=E("WordGames!"),t=j(),a=d("div"),n=d("a"),x=E("Host"),v=j(),c=d("div"),i=d("input"),I=j(),f=d("a"),g=E("Join"),this.h()},l(e){s=_(e,"H1",{class:!0});var o=h(s);l=H(o,"WordGames!"),o.forEach(u),t=w(e),a=_(e,"DIV",{class:!0});var A=h(a);n=_(A,"A",{class:!0,href:!0});var D=h(n);x=H(D,"Host"),D.forEach(u),A.forEach(u),v=w(e),c=_(e,"DIV",{class:!0});var y=h(c);i=_(y,"INPUT",{class:!0,type:!0,placeholder:!0}),I=w(y),f=_(y,"A",{class:!0,href:!0});var G=h(f);g=H(G,"Join"),G.forEach(u),y.forEach(u),this.h()},h(){r(s,"class","text-6xl bold mt-2 mb-8 text-center"),r(n,"class","btn lg primary block"),r(n,"href",`${J}/lobby?room=${B()}`),r(a,"class","text-center"),r(i,"class","input flex-grow"),r(i,"type","text"),r(i,"placeholder","Room Id"),r(f,"class","btn lg primary flex-grow-0"),r(f,"href",b=`${J}/lobby?room=${m[0]}`),r(c,"class","flex mt-8")},m(e,o){$(e,s,o),p(s,l),$(e,t,o),$(e,a,o),p(a,n),p(n,x),$(e,v,o),$(e,c,o),p(c,i),L(i,m[0]),p(c,I),p(c,f),p(f,g),k||(R=U(i,"input",m[1]),k=!0)},p(e,o){o&1&&i.value!==e[0]&&L(i,e[0]),o&1&&b!==(b=`${J}/lobby?room=${e[0]}`)&&r(f,"href",b)},d(e){e&&u(s),e&&u(t),e&&u(a),e&&u(v),e&&u(c),k=!1,R()}}}function M(m){let s,l;return s=new z({props:{$$slots:{default:[F]},$$scope:{ctx:m}}}),{c(){q(s.$$.fragment)},l(t){C(s.$$.fragment,t)},m(t,a){K(s,t,a),l=!0},p(t,[a]){const n={};a&5&&(n.$$scope={dirty:a,ctx:t}),s.$set(n)},i(t){l||(N(s.$$.fragment,t),l=!0)},o(t){P(s.$$.fragment,t),l=!1},d(t){T(s,t)}}}function O(m,s,l){let t;function a(){t=this.value,l(0,t)}return[t,a]}class Z extends S{constructor(s){super();V(this,s,O,M,W,{})}}export{Z as default};

import{S as R,i as T,s as U,a as v,w as W,P as A,h as n,c as y,x as B,b as _,y as N,f as P,t as S,B as j,l as d,r as E,m as h,n as w,u as I,p as c,M as $,_ as q,U as L,G as D}from"../chunks/index-275a10fd.js";import{L as H,g as M,a as O}from"../chunks/util-dfedccda.js";import{b as G}from"../chunks/singletons-80e721ca.js";function J(i){let t,r,o;return{c(){t=d("a"),r=E("Join"),this.h()},l(e){t=h(e,"A",{class:!0,href:!0});var s=w(t);r=I(s,"Join"),s.forEach(n),this.h()},h(){c(t,"class","btn lg primary flex-grow-0"),c(t,"href",o=`${G}/lobby?room=${i[0].toLowerCase()}`)},m(e,s){_(e,t,s),$(t,r)},p(e,s){s&1&&o!==(o=`${G}/lobby?room=${e[0].toLowerCase()}`)&&c(t,"href",o)},d(e){e&&n(t)}}}function V(i){let t,r,o,e,s,p,f,m,x,C,g,l=i[0]&&J(i);return{c(){t=d("a"),r=E("WordGames!"),o=v(),e=d("button"),s=E("Create a Game"),p=v(),f=d("div"),m=d("input"),x=v(),l&&l.c(),this.h()},l(a){t=h(a,"A",{class:!0,href:!0});var u=w(t);r=I(u,"WordGames!"),u.forEach(n),o=y(a),e=h(a,"BUTTON",{class:!0});var k=w(e);s=I(k,"Create a Game"),k.forEach(n),p=y(a),f=h(a,"DIV",{class:!0});var b=w(f);m=h(b,"INPUT",{class:!0,type:!0,placeholder:!0}),x=y(b),l&&l.l(b),b.forEach(n),this.h()},h(){c(t,"class","text-6xl bold mt-2 mb-8 text-center"),c(t,"href",`${G}/`),c(e,"class","btn lg primary block"),c(m,"class","input flex-grow"),c(m,"type","text"),c(m,"placeholder","Join a Game with a Room Id"),c(f,"class","flex mt-8")},m(a,u){_(a,t,u),$(t,r),_(a,o,u),_(a,e,u),$(e,s),_(a,p,u),_(a,f,u),$(f,m),q(m,i[0]),$(f,x),l&&l.m(f,null),C||(g=[L(e,"click",i[1]),L(m,"input",i[3])],C=!0)},p(a,u){u&1&&m.value!==a[0]&&q(m,a[0]),a[0]?l?l.p(a,u):(l=J(a),l.c(),l.m(f,null)):l&&(l.d(1),l=null)},d(a){a&&n(t),a&&n(o),a&&n(e),a&&n(p),a&&n(f),l&&l.d(),C=!1,D(g)}}}function z(i){let t,r,o;return r=new H({props:{$$slots:{default:[V]},$$scope:{ctx:i}}}),{c(){t=v(),W(r.$$.fragment),this.h()},l(e){A('[data-svelte="svelte-1syqj7q"]',document.head).forEach(n),t=y(e),B(r.$$.fragment,e),this.h()},h(){document.title="Word Games!"},m(e,s){_(e,t,s),N(r,e,s),o=!0},p(e,[s]){const p={};s&17&&(p.$$scope={dirty:s,ctx:e}),r.$set(p)},i(e){o||(P(r.$$.fragment,e),o=!0)},o(e){S(r.$$.fragment,e),o=!1},d(e){e&&n(t),j(r,e)}}}function F(i,t,r){let e;function s(){M(`${G}/lobby?room=${O()}`)}function p(){e=this.value,r(0,e)}return[e,s,!0,p]}class Y extends R{constructor(t){super(),T(this,t,F,z,U,{prerender:2})}get prerender(){return this.$$.ctx[2]}}export{Y as default};

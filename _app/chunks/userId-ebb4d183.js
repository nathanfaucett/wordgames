import{r as oe,_ as x}from"./singletons-e82519e2.js";import{S as B,i as F,s as J,D as K,e as h,k as T,t as re,c as b,a as E,d as _,n as U,g as ue,b as m,X as P,f as A,F as g,L as fe,G as W,H as X,I as Y,x as Z,u as $,J as ee,U as ce,a3 as de,a4 as _e,a5 as te,a6 as me,C as ve,a7 as he}from"./vendor-230de008.js";const be=oe,Pe=ge;async function ge(e,t){return be.goto(e,t,[])}const we=e=>({}),se=e=>({});function Ee(e){let t,s,l,i,n,r,u,o,z,v,I,D,V,p,w,O,C;const R=e[4].title,c=K(R,e,e[3],se),S=e[4].default,d=K(S,e,e[3],null);return{c(){t=h("div"),s=h("div"),l=h("div"),i=h("div"),n=h("div"),c&&c.c(),r=T(),u=h("button"),o=h("span"),z=re("\xD7"),v=T(),I=h("div"),d&&d.c(),V=T(),p=h("div"),this.h()},l(a){t=b(a,"DIV",{class:!0});var f=E(t);s=b(f,"DIV",{class:!0});var G=E(s);l=b(G,"DIV",{class:!0});var k=E(l);i=b(k,"DIV",{class:!0});var j=E(i);n=b(j,"DIV",{});var H=E(n);c&&c.l(H),H.forEach(_),r=U(j),u=b(j,"BUTTON",{class:!0});var Q=E(u);o=b(Q,"SPAN",{class:!0});var q=E(o);z=ue(q,"\xD7"),q.forEach(_),Q.forEach(_),j.forEach(_),v=U(k),I=b(k,"DIV",{class:!0});var N=E(I);d&&d.l(N),N.forEach(_),k.forEach(_),G.forEach(_),f.forEach(_),V=U(a),p=b(a,"DIV",{class:!0}),E(p).forEach(_),this.h()},h(){m(o,"class","bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none"),m(u,"class","p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"),m(i,"class","flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"),m(I,"class","relative p-6 flex-auto"),m(l,"class","border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"),m(s,"class",D="relative w-auto my-6 mx-auto max-w-"+e[1]),m(t,"class","overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"),P(t,"hidden",!e[0]),m(p,"class","opacity-25 fixed inset-0 z-40 bg-black"),P(p,"hidden",!e[0])},m(a,f){A(a,t,f),g(t,s),g(s,l),g(l,i),g(i,n),c&&c.m(n,null),g(i,r),g(i,u),g(u,o),g(o,z),g(l,v),g(l,I),d&&d.m(I,null),A(a,V,f),A(a,p,f),w=!0,O||(C=fe(u,"click",e[2]),O=!0)},p(a,[f]){c&&c.p&&(!w||f&8)&&W(c,R,a,a[3],w?Y(R,a[3],f,we):X(a[3]),se),d&&d.p&&(!w||f&8)&&W(d,S,a,a[3],w?Y(S,a[3],f,null):X(a[3]),null),(!w||f&2&&D!==(D="relative w-auto my-6 mx-auto max-w-"+a[1]))&&m(s,"class",D),f&1&&P(t,"hidden",!a[0]),f&1&&P(p,"hidden",!a[0])},i(a){w||(Z(c,a),Z(d,a),w=!0)},o(a){$(c,a),$(d,a),w=!1},d(a){a&&_(t),c&&c.d(a),d&&d.d(a),a&&_(V),a&&_(p),O=!1,C()}}}function pe(e,t,s){let{$$slots:l={},$$scope:i}=t,{size:n="md"}=t,{show:r=!1}=t;function u(){s(0,r=!r)}return e.$$set=o=>{"size"in o&&s(1,n=o.size),"show"in o&&s(0,r=o.show),"$$scope"in o&&s(3,i=o.$$scope)},[r,n,u,i,l]}class Ae extends B{constructor(t){super();F(this,t,pe,Ee,J,{size:1,show:0})}}function ye(e){let t;return{c(){t=h("img"),this.h()},l(s){t=b(s,"IMG",{class:!0,alt:!0}),this.h()},h(){m(t,"class","inline-block w-100"),m(t,"alt",e[0])},m(s,l){A(s,t,l),e[6](t)},p(s,[l]){l&1&&m(t,"alt",s[0])},i:ee,o:ee,d(s){s&&_(t),e[6](null)}}}function Ie(e,t,s){let{value:l}=t,{size:i=512}=t,n,r,u,o;function z(v){ce[v?"unshift":"push"](()=>{r=v,s(1,r)})}return e.$$set=v=>{"value"in v&&s(0,l=v.value),"size"in v&&s(2,i=v.size)},e.$$.update=()=>{e.$$.dirty&15&&r&&!n&&(s(4,u=l),s(5,o=i),s(3,n=new window.QRious({element:r,size:i,value:l}))),e.$$.dirty&25&&n&&u!==l&&(s(4,u=l),s(3,n.value=l,n)),e.$$.dirty&44&&n&&o!==i&&(s(5,o=i),s(3,n.size=i,n))},[l,r,i,n,u,o,z]}class Me extends B{constructor(t){super();F(this,t,Ie,ye,J,{value:0,size:2})}}const Oe=new de({localStorage:!1});var y;(function(e){e.Easy="easy",e.Medium="medium",e.Hard="hard",e.All="all"})(y||(y={}));const ae={[y.Easy]:x(()=>import("./easy-d1c5d374.js"),[]),[y.Medium]:x(()=>import("./medium-73eb433f.js"),[]),[y.Hard]:x(()=>import("./hard-1ca555bc.js"),[])},L={},M={};async function le(e=y.Medium){if(!M[e]&&!L[e]){L[e]=!0;try{e===y.All?M[e]=(await Promise.all(Object.keys(ae).map(le))).flat():M[e]=await ae[e].then(t=>t.default)}finally{L[e]=!1}}return M[e]}async function Re(e,t){return e.fromArray(await le(t)).unwrapOr("unknown")}const ie="user_id",{set:ze,subscribe:De}=ve(),ne=new _e.EventEmitter,Ve={subscribe:De};function Se(){const e=he(Ve);return e?Promise.resolve(e):new Promise(t=>ne.once("userId",t))}te.getItem(ie).then(e=>{e||(e=me(),te.setItem(ie,e)),ze(e),ne.emit("userId",e)});export{Ae as M,Me as Q,y as W,Pe as a,Re as b,Oe as d,Se as g,Ve as u};

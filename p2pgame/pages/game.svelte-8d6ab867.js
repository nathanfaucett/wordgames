import{S as s,i as a,s as t,j as e,m as o,o as r,x as n,u as l,v as m,U as c,A as d,e as i,t as u,k as $,c as h,a as f,g as p,d as v,n as x,b as g,f as b,H as I,h as y}from"../chunks/vendor-55b6b459.js";import{d as j,g as k,a as H}from"../chunks/navigation-a63f8856.js";import{L as E,r as P,b as R}from"../chunks/p2p-e438590d.js";import"../chunks/singletons-12a22614.js";function N(s){var a,t,e,o;let r,n,l,m,c,d,j,k,H,E,P,R,N,T,q,w=(null==(a=s[0])?void 0:a.getRoomId())+"",A=(null==(t=s[1])?void 0:t.name)+"",L=(null==(e=s[1])?void 0:e.team)+"",S=((null==(o=s[0])?void 0:o.getPeers().length)||0)+"";return{c(){r=i("h1"),n=u("Room "),l=u(w),m=$(),c=i("h1"),d=u("Name: "),j=u(A),k=$(),H=i("h1"),E=u("Team: "),P=u(L),R=$(),N=i("h1"),T=u("Players: "),q=u(S),this.h()},l(s){r=h(s,"H1",{class:!0});var a=f(r);n=p(a,"Room "),l=p(a,w),a.forEach(v),m=x(s),c=h(s,"H1",{class:!0});var t=f(c);d=p(t,"Name: "),j=p(t,A),t.forEach(v),k=x(s),H=h(s,"H1",{class:!0});var e=f(H);E=p(e,"Team: "),P=p(e,L),e.forEach(v),R=x(s),N=h(s,"H1",{class:!0});var o=f(N);T=p(o,"Players: "),q=p(o,S),o.forEach(v),this.h()},h(){g(r,"class","text-2xl text-center mb-2"),g(c,"class","text-2xl text-center mb-2"),g(H,"class","text-2xl text-center mb-2"),g(N,"class","text-2xl text-center mb-2")},m(s,a){b(s,r,a),I(r,n),I(r,l),b(s,m,a),b(s,c,a),I(c,d),I(c,j),b(s,k,a),b(s,H,a),I(H,E),I(H,P),b(s,R,a),b(s,N,a),I(N,T),I(N,q)},p(s,a){var t,e,o,r;1&a&&w!==(w=(null==(t=s[0])?void 0:t.getRoomId())+"")&&y(l,w),2&a&&A!==(A=(null==(e=s[1])?void 0:e.name)+"")&&y(j,A),2&a&&L!==(L=(null==(o=s[1])?void 0:o.team)+"")&&y(P,L),1&a&&S!==(S=((null==(r=s[0])?void 0:r.getPeers().length)||0)+"")&&y(q,S)},d(s){s&&v(r),s&&v(m),s&&v(c),s&&v(k),s&&v(H),s&&v(R),s&&v(N)}}}function T(s){let a,t;return a=new E({props:{$$slots:{default:[N]},$$scope:{ctx:s}}}),{c(){e(a.$$.fragment)},l(s){o(a.$$.fragment,s)},m(s,e){r(a,s,e),t=!0},p(s,[t]){const e={};19&t&&(e.$$scope={dirty:t,ctx:s}),a.$set(e)},i(s){t||(n(a.$$.fragment,s),t=!0)},o(s){l(a.$$.fragment,s),t=!1},d(s){m(a,s)}}}function q(s){return{props:{roomId:s.page.query.get("room")}}}function w(s,a,t){let e,o,r;c(s,k,(s=>t(3,e=s))),c(s,P,(s=>t(0,o=s))),c(s,H,(s=>t(1,r=s)));let{roomId:n}=a;return d((()=>{R(n)})),s.$$set=s=>{"roomId"in s&&t(2,n=s.roomId)},s.$$.update=()=>{12&s.$$.dirty&&(e.started||j(`/lobby?room=${n}`))},[o,r,n,e]}class A extends s{constructor(s){super(),a(this,s,w,T,t,{roomId:2})}}export{A as default,q as load};
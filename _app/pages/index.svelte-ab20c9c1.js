import{S as s,i as a,s as t,j as e,m as r,o,x as c,u as l,v as n,e as f,t as h,k as i,c as p,a as u,g as m,d as x,n as b,b as $,f as d,H as g,J as v,K as y}from"../chunks/vendor-55b6b459.js";import{b as w}from"../chunks/paths-45dac81d.js";import{L as j,g as k}from"../chunks/p2p-7a3dba18.js";function E(s){let a,t,e,r,o,c,l,n,j,E,H,I,J,A,D;return{c(){a=f("h1"),t=h("WordGames!"),e=i(),r=f("div"),o=f("a"),c=h("Host"),l=i(),n=f("div"),j=f("input"),E=i(),H=f("a"),I=h("Join"),this.h()},l(s){a=p(s,"H1",{class:!0});var f=u(a);t=m(f,"WordGames!"),f.forEach(x),e=b(s),r=p(s,"DIV",{class:!0});var h=u(r);o=p(h,"A",{class:!0,href:!0});var i=u(o);c=m(i,"Host"),i.forEach(x),h.forEach(x),l=b(s),n=p(s,"DIV",{class:!0});var $=u(n);j=p($,"INPUT",{class:!0,type:!0,placeholder:!0}),E=b($),H=p($,"A",{class:!0,href:!0});var d=u(H);I=m(d,"Join"),d.forEach(x),$.forEach(x),this.h()},h(){$(a,"class","text-5xl text-center mb-4"),$(o,"class","bg-blue-600 inline-block text-white text-2xl py-2 px-8"),$(o,"href",`${w}/lobby?room=${k()}`),$(r,"class","text-center"),$(j,"class","bg-gray-200 focus:bg-white flex-grow py-2 px-4"),$(j,"type","text"),$(j,"placeholder","Room Id"),$(H,"class","bg-blue-600 hover:bg-blue-500 text-white flex-grow-0 text-lg py-2 px-4"),$(H,"href",J=`${w}/lobby?room=${s[0]}`),$(n,"class","flex flex-1 mx-auto justify-self-center mt-4 max-w-sm")},m(f,h){d(f,a,h),g(a,t),d(f,e,h),d(f,r,h),g(r,o),g(o,c),d(f,l,h),d(f,n,h),g(n,j),v(j,s[0]),g(n,E),g(n,H),g(H,I),A||(D=y(j,"input",s[1]),A=!0)},p(s,a){1&a&&j.value!==s[0]&&v(j,s[0]),1&a&&J!==(J=`${w}/lobby?room=${s[0]}`)&&$(H,"href",J)},d(s){s&&x(a),s&&x(e),s&&x(r),s&&x(l),s&&x(n),A=!1,D()}}}function H(s){let a,t;return a=new j({props:{$$slots:{default:[E]},$$scope:{ctx:s}}}),{c(){e(a.$$.fragment)},l(s){r(a.$$.fragment,s)},m(s,e){o(a,s,e),t=!0},p(s,[t]){const e={};5&t&&(e.$$scope={dirty:t,ctx:s}),a.$set(e)},i(s){t||(c(a.$$.fragment,s),t=!0)},o(s){l(a.$$.fragment,s),t=!1},d(s){n(a,s)}}}function I(s,a,t){let e;return[e,function(){e=this.value,t(0,e)}]}class J extends s{constructor(s){super(),a(this,s,I,H,t,{})}}export{J as default};
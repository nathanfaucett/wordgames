var et=Object.defineProperty,st=Object.defineProperties;var rt=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var G=(o,t,e)=>t in o?et(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,E=(o,t)=>{for(var e in t||(t={}))J.call(t,e)&&G(o,e,t[e]);if(N)for(var e of N(t))W.call(t,e)&&G(o,e,t[e]);return o},X=(o,t)=>st(o,rt(t));var Y=(o,t)=>{var e={};for(var s in o)J.call(o,s)&&t.indexOf(s)<0&&(e[s]=o[s]);if(o!=null&&N)for(var s of N(o))t.indexOf(s)<0&&W.call(o,s)&&(e[s]=o[s]);return e};import{S as it,i as nt,s as at,e as ot,c as lt,a as ct,d as v,b as O,f as k,t as ut,g as ft,h as ht,j as q,k as dt,l as b,m as C,n as _t,o as L,p as D,q as B,r as T,u as y,v as S,w as I,x as g,y as pt,z as mt,A as gt,B as K,C as M}from"./chunks/vendor-f52da261.js";import{_ as U}from"./chunks/preload-helper-ac1c8acd.js";import{i as wt}from"./chunks/singletons-12a22614.js";import{s as bt}from"./chunks/paths-45dac81d.js";function F(o){let t,e,s;const r=[o[2]||{}];var i=o[0][1];function a(n){let c={$$slots:{default:[yt]},$$scope:{ctx:n}};for(let l=0;l<r.length;l+=1)c=K(c,r[l]);return{props:c}}return i&&(t=new i(a(o))),{c(){t&&q(t.$$.fragment),e=b()},l(n){t&&C(t.$$.fragment,n),e=b()},m(n,c){t&&L(t,n,c),k(n,e,c),s=!0},p(n,c){const l=c&4?D(r,[B(n[2]||{})]):{};if(c&521&&(l.$$scope={dirty:c,ctx:n}),i!==(i=n[0][1])){if(t){T();const u=t;y(u.$$.fragment,1,0,()=>{S(u,1)}),I()}i?(t=new i(a(n)),q(t.$$.fragment),g(t.$$.fragment,1),L(t,e.parentNode,e)):t=null}else i&&t.$set(l)},i(n){s||(t&&g(t.$$.fragment,n),s=!0)},o(n){t&&y(t.$$.fragment,n),s=!1},d(n){n&&v(e),t&&S(t,n)}}}function H(o){let t,e,s;const r=[o[3]||{}];var i=o[0][2];function a(n){let c={};for(let l=0;l<r.length;l+=1)c=K(c,r[l]);return{props:c}}return i&&(t=new i(a())),{c(){t&&q(t.$$.fragment),e=b()},l(n){t&&C(t.$$.fragment,n),e=b()},m(n,c){t&&L(t,n,c),k(n,e,c),s=!0},p(n,c){const l=c&8?D(r,[B(n[3]||{})]):{};if(i!==(i=n[0][2])){if(t){T();const u=t;y(u.$$.fragment,1,0,()=>{S(u,1)}),I()}i?(t=new i(a()),q(t.$$.fragment),g(t.$$.fragment,1),L(t,e.parentNode,e)):t=null}else i&&t.$set(l)},i(n){s||(t&&g(t.$$.fragment,n),s=!0)},o(n){t&&y(t.$$.fragment,n),s=!1},d(n){n&&v(e),t&&S(t,n)}}}function yt(o){let t,e,s=o[0][2]&&H(o);return{c(){s&&s.c(),t=b()},l(r){s&&s.l(r),t=b()},m(r,i){s&&s.m(r,i),k(r,t,i),e=!0},p(r,i){r[0][2]?s?(s.p(r,i),i&1&&g(s,1)):(s=H(r),s.c(),g(s,1),s.m(t.parentNode,t)):s&&(T(),y(s,1,1,()=>{s=null}),I())},i(r){e||(g(s),e=!0)},o(r){y(s),e=!1},d(r){s&&s.d(r),r&&v(t)}}}function vt(o){let t,e,s=o[0][1]&&F(o);return{c(){s&&s.c(),t=b()},l(r){s&&s.l(r),t=b()},m(r,i){s&&s.m(r,i),k(r,t,i),e=!0},p(r,i){r[0][1]?s?(s.p(r,i),i&1&&g(s,1)):(s=F(r),s.c(),g(s,1),s.m(t.parentNode,t)):s&&(T(),y(s,1,1,()=>{s=null}),I())},i(r){e||(g(s),e=!0)},o(r){y(s),e=!1},d(r){s&&s.d(r),r&&v(t)}}}function Q(o){let t,e=o[5]&&Z(o);return{c(){t=ot("div"),e&&e.c(),this.h()},l(s){t=lt(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,class:!0});var r=ct(t);e&&e.l(r),r.forEach(v),this.h()},h(){O(t,"id","svelte-announcer"),O(t,"aria-live","assertive"),O(t,"aria-atomic","true"),O(t,"class","svelte-1pdgbjn")},m(s,r){k(s,t,r),e&&e.m(t,null)},p(s,r){s[5]?e?e.p(s,r):(e=Z(s),e.c(),e.m(t,null)):e&&(e.d(1),e=null)},d(s){s&&v(t),e&&e.d()}}}function Z(o){let t;return{c(){t=ut(o[6])},l(e){t=ft(e,o[6])},m(e,s){k(e,t,s)},p(e,s){s&64&&ht(t,e[6])},d(e){e&&v(t)}}}function Et(o){let t,e,s,r;const i=[o[1]||{}];var a=o[0][0];function n(l){let u={$$slots:{default:[vt]},$$scope:{ctx:l}};for(let f=0;f<i.length;f+=1)u=K(u,i[f]);return{props:u}}a&&(t=new a(n(o)));let c=o[4]&&Q(o);return{c(){t&&q(t.$$.fragment),e=dt(),c&&c.c(),s=b()},l(l){t&&C(t.$$.fragment,l),e=_t(l),c&&c.l(l),s=b()},m(l,u){t&&L(t,l,u),k(l,e,u),c&&c.m(l,u),k(l,s,u),r=!0},p(l,[u]){const f=u&2?D(i,[B(l[1]||{})]):{};if(u&525&&(f.$$scope={dirty:u,ctx:l}),a!==(a=l[0][0])){if(t){T();const h=t;y(h.$$.fragment,1,0,()=>{S(h,1)}),I()}a?(t=new a(n(l)),q(t.$$.fragment),g(t.$$.fragment,1),L(t,e.parentNode,e)):t=null}else a&&t.$set(f);l[4]?c?c.p(l,u):(c=Q(l),c.c(),c.m(s.parentNode,s)):c&&(c.d(1),c=null)},i(l){r||(t&&g(t.$$.fragment,l),r=!0)},o(l){t&&y(t.$$.fragment,l),r=!1},d(l){t&&S(t,l),l&&v(e),c&&c.d(l),l&&v(s)}}}function kt(o,t,e){let{stores:s}=t,{page:r}=t,{components:i}=t,{props_0:a=null}=t,{props_1:n=null}=t,{props_2:c=null}=t;pt("__svelte__",s),mt(s.page.notify);let l=!1,u=!1,f=null;return gt(()=>{const h=s.page.subscribe(()=>{l&&(e(5,u=!0),e(6,f=document.title||"untitled page"))});return e(4,l=!0),h}),o.$$set=h=>{"stores"in h&&e(7,s=h.stores),"page"in h&&e(8,r=h.page),"components"in h&&e(0,i=h.components),"props_0"in h&&e(1,a=h.props_0),"props_1"in h&&e(2,n=h.props_1),"props_2"in h&&e(3,c=h.props_2)},o.$$.update=()=>{o.$$.dirty&384&&s.page.set(r)},[i,a,n,c,l,u,f,s,r]}class Rt extends it{constructor(t){super();nt(this,t,kt,Et,at,{stores:7,page:8,components:0,props_0:1,props_1:2,props_2:3})}}const p=[()=>U(()=>import("./pages/__layout.svelte-56840de1.js"),["pages/__layout.svelte-56840de1.js","assets/pages/__layout.svelte-2c423948.css","chunks/vendor-f52da261.js"]),()=>U(()=>import("./error.svelte-7334d6cc.js"),["error.svelte-7334d6cc.js","chunks/vendor-f52da261.js"]),()=>U(()=>import("./pages/index.svelte-75690ed1.js"),["pages/index.svelte-75690ed1.js","chunks/vendor-f52da261.js","chunks/paths-45dac81d.js","chunks/user-a6e6886b.js","chunks/util-ef0af0fd.js","chunks/singletons-12a22614.js"]),()=>U(()=>import("./pages/lobby.svelte-b3da2399.js"),["pages/lobby.svelte-b3da2399.js","chunks/vendor-f52da261.js","chunks/util-ef0af0fd.js","chunks/singletons-12a22614.js","chunks/user-a6e6886b.js","chunks/paths-45dac81d.js","chunks/words-08d5bb08.js","chunks/preload-helper-ac1c8acd.js"]),()=>U(()=>import("./pages/auth.svelte-8f20955a.js"),["pages/auth.svelte-8f20955a.js","chunks/vendor-f52da261.js","chunks/user-a6e6886b.js","chunks/paths-45dac81d.js"]),()=>U(()=>import("./pages/game.svelte-779fcfb4.js"),["pages/game.svelte-779fcfb4.js","chunks/vendor-f52da261.js","chunks/paths-45dac81d.js","chunks/util-ef0af0fd.js","chunks/singletons-12a22614.js","chunks/user-a6e6886b.js","chunks/words-08d5bb08.js","chunks/preload-helper-ac1c8acd.js"])],$t=[[/^\/$/,[p[0],p[2]],[p[1]]],[/^\/lobby\/?$/,[p[0],p[3]],[p[1]]],[/^\/auth\/?$/,[p[0],p[4]],[p[1]]],[/^\/game\/?$/,[p[0],p[5]],[p[1]]]],qt=[p[0](),p[1]()];function Lt(o){let t=o.baseURI;if(!t){const e=o.getElementsByTagName("base");t=e.length?e[0].href:o.URL}return t}function z(){return{x:pageXOffset,y:pageYOffset}}function tt(o){for(;o&&o.nodeName.toUpperCase()!=="A";)o=o.parentNode;return o}class St{constructor({base:t,routes:e,trailing_slash:s,renderer:r}){this.base=t,this.routes=e,this.trailing_slash=s,this.renderer=r,r.router=this,this.enabled=!0,document.body.setAttribute("tabindex","-1"),history.replaceState(history.state||{},"",location.href)}init_listeners(){"scrollRestoration"in history&&(history.scrollRestoration="manual"),addEventListener("beforeunload",()=>{history.scrollRestoration="auto"}),addEventListener("load",()=>{history.scrollRestoration="manual"});let t;addEventListener("scroll",()=>{clearTimeout(t),t=setTimeout(()=>{const i=X(E({},history.state||{}),{"sveltekit:scroll":z()});history.replaceState(i,document.title,window.location.href)},50)});const e=i=>{const a=tt(i.target);a&&a.href&&a.hasAttribute("sveltekit:prefetch")&&this.prefetch(new URL(a.href))};let s;const r=i=>{clearTimeout(s),s=setTimeout(()=>{e(i)},20)};addEventListener("touchstart",e),addEventListener("mousemove",r),addEventListener("click",i=>{if(!this.enabled||i.button||i.which!==1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey||i.defaultPrevented)return;const a=tt(i.target);if(!a||!a.href)return;const n=typeof a.href=="object"&&a.href.constructor.name==="SVGAnimatedString",c=String(n?a.href.baseVal:a.href);if(c===location.href){location.hash||i.preventDefault();return}const l=(a.getAttribute("rel")||"").split(/\s+/);if(a.hasAttribute("download")||l&&l.includes("external")||(n?a.target.baseVal:a.target))return;const u=new URL(c);if(!this.owns(u))return;const f=a.hasAttribute("sveltekit:noscroll");history.pushState({},"",u.href),this._navigate(u,f?z():null,!1,[],u.hash),i.preventDefault()}),addEventListener("popstate",i=>{if(i.state&&this.enabled){const a=new URL(location.href);this._navigate(a,i.state["sveltekit:scroll"],!1,[])}})}owns(t){return t.origin===location.origin&&t.pathname.startsWith(this.base)}parse(t){if(this.owns(t)){const e=t.pathname.slice(this.base.length)||"/",s=decodeURI(e),r=this.routes.filter(([n])=>n.test(s)),i=new URLSearchParams(t.search);return{id:`${e}?${i}`,routes:r,path:e,query:i}}}async goto(t,{noscroll:e=!1,replaceState:s=!1,keepfocus:r=!1,state:i={}}={},a){const n=new URL(t,Lt(document));return this.enabled&&this.owns(n)?(history[s?"replaceState":"pushState"](i,"",t),this._navigate(n,e?z():null,r,a,n.hash)):(location.href=n.href,new Promise(()=>{}))}enable(){this.enabled=!0}disable(){this.enabled=!1}async prefetch(t){const e=this.parse(t);if(!e)throw new Error("Attempted to prefetch a URL that does not belong to this app");return this.renderer.load(e)}async _navigate(t,e,s,r,i){const a=this.parse(t);if(!a)throw new Error("Attempted to navigate to a URL that does not belong to this app");if(a.path!=="/"){const c=a.path.endsWith("/");(c&&this.trailing_slash==="never"||!c&&this.trailing_slash==="always"&&!(a.path.split("/").pop()||"").includes("."))&&(a.path=c?a.path.slice(0,-1):a.path+"/",history.replaceState({},"",`${this.base}${a.path}${location.search}`))}this.renderer.notify({path:a.path,query:a.query}),await this.renderer.update(a,r,!1),s||document.body.focus();const n=i&&document.getElementById(i.slice(1));e?scrollTo(e.x,e.y):n?n.scrollIntoView():scrollTo(0,0)}}function Ut(o){let t=5381,e=o.length;if(typeof o=="string")for(;e;)t=t*33^o.charCodeAt(--e);else for(;e;)t=t*33^o[--e];return(t>>>0).toString(36)}function jt(o){const t=o.status&&o.status>=400&&o.status<=599&&!o.redirect;if(o.error||t){const e=o.status;if(!o.error&&t)return{status:e||500,error:new Error};const s=typeof o.error=="string"?new Error(o.error):o.error;return s instanceof Error?!e||e<400||e>599?(console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500'),{status:500,error:s}):{status:e,error:s}:{status:500,error:new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof s}"`)}}if(o.redirect){if(!o.status||Math.floor(o.status/100)!==3)return{status:500,error:new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')};if(typeof o.redirect!="string")return{status:500,error:new Error('"redirect" property returned from load() must be a string')}}return o}function At(o){return o instanceof Error?o:new Error(JSON.stringify(o))}function Tt(o){const t=M(o);let e=!0;function s(){e=!0,t.update(a=>a)}function r(a){e=!1,t.set(a)}function i(a){let n;return t.subscribe(c=>{(n===void 0||e&&c!==n)&&a(n=c)})}return{notify:s,set:r,subscribe:i}}function It(o,t){let s=`script[data-type="svelte-data"][data-url="${typeof o=="string"?o:o.url}"]`;t&&typeof t.body=="string"&&(s+=`[data-body="${Ut(t.body)}"]`);const r=document.querySelector(s);if(r&&r.textContent){const i=JSON.parse(r.textContent),{body:a}=i,n=Y(i,["body"]);return Promise.resolve(new Response(a,n))}return fetch(o,t)}class Pt{constructor({Root:t,fallback:e,target:s,session:r,host:i}){this.Root=t,this.fallback=e,this.host=i,this.router,this.target=s,this.started=!1,this.session_id=1,this.invalid=new Set,this.invalidating=null,this.current={page:null,session_id:null,branch:[]},this.cache=new Map,this.loading={id:null,promise:null},this.stores={page:Tt({}),navigating:M(null),session:M(r)},this.$session=null,this.root=null;let a=!1;this.stores.session.subscribe(async n=>{if(this.$session=n,!a||!this.router)return;this.session_id+=1;const c=this.router.parse(new URL(location.href));c&&this.update(c,[],!0)}),a=!0}async start({status:t,error:e,nodes:s,page:r}){const i=[];let a={},n,c;try{for(let l=0;l<s.length;l+=1){const u=l===s.length-1,f=await this._load_node({module:await s[l],page:r,context:a,status:u?t:void 0,error:u?e:void 0});if(i.push(f),f&&f.loaded)if(f.loaded.error){if(e)throw f.loaded.error;c={status:f.loaded.status,error:f.loaded.error,path:r.path,query:r.query}}else f.loaded.context&&(a=E(E({},a),f.loaded.context))}n=c?await this._load_error(c):await this._get_navigation_result_from_branch({page:r,branch:i})}catch(l){if(e)throw l;n=await this._load_error({status:500,error:At(l),path:r.path,query:r.query})}if(n.redirect){location.href=new URL(n.redirect,location.href).href;return}this._init(n)}notify({path:t,query:e}){dispatchEvent(new CustomEvent("sveltekit:navigation-start")),this.started&&this.stores.navigating.set({from:{path:this.current.page.path,query:this.current.page.query},to:{path:t,query:e}})}async update(t,e,s){const r=this.token={};let i=await this._get_navigation_result(t,s);if(r!==this.token)return;if(this.invalid.clear(),i.redirect)if(e.length>10||e.includes(t.path))i=await this._load_error({status:500,error:new Error("Redirect loop"),path:t.path,query:t.query});else{this.router?this.router.goto(i.redirect,{replaceState:!0},[...e,t.path]):location.href=new URL(i.redirect,location.href).href;return}if(i.reload?location.reload():this.started?(this.current=i.state,this.root.$set(i.props),this.stores.navigating.set(null),await 0):this._init(i),dispatchEvent(new CustomEvent("sveltekit:navigation-end")),this.loading.promise=null,this.loading.id=null,!this.router)return;const a=i.state.branch[i.state.branch.length-1];a&&a.module.router===!1?this.router.disable():this.router.enable()}load(t){return this.loading.promise=this._get_navigation_result(t,!1),this.loading.id=t.id,this.loading.promise}invalidate(t){return this.invalid.add(t),this.invalidating||(this.invalidating=Promise.resolve().then(async()=>{const e=this.router&&this.router.parse(new URL(location.href));e&&await this.update(e,[],!0),this.invalidating=null})),this.invalidating}_init(t){this.current=t.state;const e=document.querySelector("style[data-svelte]");e&&e.remove(),this.root=new this.Root({target:this.target,props:E({stores:this.stores},t.props),hydrate:!0}),this.started=!0}async _get_navigation_result(t,e){if(this.loading.id===t.id)return this.loading.promise;for(let s=0;s<t.routes.length;s+=1){const r=t.routes[s];if(r.length===1)return{reload:!0,props:{},state:this.current};let i=s+1;for(;i<t.routes.length;){const n=t.routes[i];if(n[0].toString()===r[0].toString())n.length!==1&&n[1].forEach(c=>c()),i+=1;else break}const a=await this._load({route:r,path:t.path,query:t.query},e);if(a)return a}return await this._load_error({status:404,error:new Error(`Not found: ${t.path}`),path:t.path,query:t.query})}async _get_navigation_result_from_branch({page:t,branch:e}){const s=e.filter(Boolean),r={state:{page:t,branch:e,session_id:this.session_id},props:{components:s.map(n=>n.module.default)}};for(let n=0;n<s.length;n+=1){const c=s[n].loaded;c&&(r.props[`props_${n}`]=await c.props)}(!this.current.page||t.path!==this.current.page.path||t.query.toString()!==this.current.page.query.toString())&&(r.props.page=t);const i=s[s.length-1],a=i.loaded&&i.loaded.maxage;if(a){const n=`${t.path}?${t.query}`;let c=!1;const l=()=>{this.cache.get(n)===r&&this.cache.delete(n),f(),clearTimeout(u)},u=setTimeout(l,a*1e3),f=this.stores.session.subscribe(()=>{c&&l()});c=!0,this.cache.set(n,r)}return r}async _load_node({status:t,error:e,module:s,page:r,context:i}){const a={module:s,uses:{params:new Set,path:!1,query:!1,session:!1,context:!1,dependencies:[]},loaded:null,context:i},n={};for(const l in r.params)Object.defineProperty(n,l,{get(){return a.uses.params.add(l),r.params[l]},enumerable:!0});const c=this.$session;if(s.load){const{started:l}=this,u={page:{host:r.host,params:n,get path(){return a.uses.path=!0,r.path},get query(){return a.uses.query=!0,r.query}},get session(){return a.uses.session=!0,c},get context(){return a.uses.context=!0,E({},i)},fetch(h,R){const j=typeof h=="string"?h:h.url,{href:P}=new URL(j,new URL(r.path,document.baseURI));return a.uses.dependencies.push(P),l?fetch(h,R):It(h,R)}};e&&(u.status=t,u.error=e);const f=await s.load.call(null,u);if(!f)return;a.loaded=jt(f),a.loaded.context&&(a.context=a.loaded.context)}return a}async _load({route:t,path:e,query:s},r){const i=`${e}?${s}`;if(!r){const d=this.cache.get(i);if(d)return d}const[a,n,c,l]=t,u=l?l(a.exec(e)):{},f=this.current.page&&{path:e!==this.current.page.path,params:Object.keys(u).filter(d=>this.current.page.params[d]!==u[d]),query:s.toString()!==this.current.page.query.toString(),session:this.session_id!==this.current.session_id},h={host:this.host,path:e,query:s,params:u},R=[];let j={},P=!1,x=200,A;n.forEach(d=>d());t:for(let d=0;d<n.length;d+=1){let _;try{if(!n[d])continue;const w=await n[d](),m=this.current.branch[d];if(!m||w!==m.module||f.path&&m.uses.path||f.params.some($=>m.uses.params.has($))||f.query&&m.uses.query||f.session&&m.uses.session||m.uses.dependencies.some($=>this.invalid.has($))||P&&m.uses.context){_=await this._load_node({module:w,page:h,context:j});const $=d===n.length-1;if(_&&_.loaded){if(_.loaded.error&&(x=_.loaded.status,A=_.loaded.error),_.loaded.redirect)return{redirect:_.loaded.redirect,props:{},state:this.current};_.loaded.context&&(P=!0)}else if($&&w.load)return}else _=m}catch(w){x=500,A=w}if(A){for(;d--;)if(c[d]){let w,m,V=d;for(;!(m=R[V]);)V-=1;try{if(w=await this._load_node({status:x,error:A,module:await c[d](),page:h,context:m.context}),w&&w.loaded&&w.loaded.error)continue;R.push(w);break t}catch($){continue}}return await this._load_error({status:x,error:A,path:e,query:s})}else _&&_.loaded&&_.loaded.context&&(j=E(E({},j),_.loaded.context)),R.push(_)}return await this._get_navigation_result_from_branch({page:h,branch:R})}async _load_error({status:t,error:e,path:s,query:r}){const i={host:this.host,path:s,query:r,params:{}},a=await this._load_node({module:await this.fallback[0],page:i,context:{}}),n=[a,await this._load_node({status:t,error:e,module:await this.fallback[1],page:i,context:a&&a.loaded&&a.loaded.context||{}})];return await this._get_navigation_result_from_branch({page:i,branch:n})}}async function Dt({paths:o,target:t,session:e,host:s,route:r,spa:i,trailing_slash:a,hydrate:n}){const c=new Pt({Root:Rt,fallback:qt,target:t,session:e,host:s}),l=r?new St({base:o.base,routes:$t,trailing_slash:a,renderer:c}):null;wt(l),bt(o),n&&await c.start(n),l&&(i&&l.goto(location.href,{replaceState:!0},[]),l.init_listeners()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Dt as start};
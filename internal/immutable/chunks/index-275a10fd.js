function P(){}function Z(t,e){for(const n in e)t[n]=e[n];return t}function G(t){return t()}function H(){return Object.create(null)}function $(t){t.forEach(G)}function tt(t){return typeof t=="function"}function yt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function et(t){return Object.keys(t).length===0}function J(t,...e){if(t==null)return P;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function gt(t){let e;return J(t,n=>e=n)(),e}function bt(t,e,n){t.$$.on_destroy.push(J(e,n))}function xt(t,e,n,i){if(t){const s=K(t,e,n,i);return t[0](s)}}function K(t,e,n,i){return t[1]&&i?Z(n.ctx.slice(),t[1](i(e))):n.ctx}function wt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const u=[],c=Math.max(e.dirty.length,s.length);for(let l=0;l<c;l+=1)u[l]=e.dirty[l]|s[l];return u}return e.dirty|s}return e.dirty}function $t(t,e,n,i,s,u){if(s){const c=K(e,n,i,u);t.p(c,s)}}function vt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let N=!1;function nt(){N=!0}function it(){N=!1}function rt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function ct(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&r.push(f)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let r=0;r<e.length;r++){const o=e[r].claim_order,f=(s>0&&e[n[s]].claim_order<=o?s+1:rt(1,s,d=>e[n[d]].claim_order,o))-1;i[r]=n[f]+1;const _=f+1;n[_]=r,s=Math.max(_,s)}const u=[],c=[];let l=e.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(u.push(e[r-1]);l>=r;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);u.reverse(),c.sort((r,o)=>r.claim_order-o.claim_order);for(let r=0,o=0;r<c.length;r++){for(;o<u.length&&c[r].claim_order>=u[o].claim_order;)o++;const f=o<u.length?u[o]:null;t.insertBefore(c[r],f)}}function st(t,e){if(N){for(ct(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function kt(t,e,n){N&&!n?st(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function lt(t){t.parentNode.removeChild(t)}function Et(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ot(t){return document.createElement(t)}function ut(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function D(t){return document.createTextNode(t)}function St(){return D(" ")}function At(){return D("")}function Nt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function jt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Mt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function at(t){return Array.from(t.childNodes)}function ft(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Q(t,e,n,i,s=!1){ft(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const r=n(l);return r===void 0?t.splice(c,1):t[c]=r,s||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const r=n(l);return r===void 0?t.splice(c,1):t[c]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function R(t,e,n,i){return Q(t,s=>s.nodeName===e,s=>{const u=[];for(let c=0;c<s.attributes.length;c++){const l=s.attributes[c];n[l.name]||u.push(l.name)}u.forEach(c=>s.removeAttribute(c))},()=>i(e))}function Ct(t,e,n){return R(t,e,n,ot)}function Tt(t,e,n){return R(t,e,n,ut)}function dt(t,e){return Q(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>D(e),!0)}function Lt(t){return dt(t," ")}function qt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Bt(t,e){t.value=e==null?"":e}function Ot(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Pt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function Dt(t,e,n){t.classList[n?"add":"remove"](e)}function It(t,e=document.body){return Array.from(e.querySelectorAll(t))}let w;function x(t){w=t}function I(){if(!w)throw new Error("Function called outside component initialization");return w}function zt(t){I().$$.on_mount.push(t)}function Ft(t){I().$$.after_update.push(t)}function Ht(t,e){return I().$$.context.set(t,e),e}function Wt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const b=[],W=[],S=[],q=[],U=Promise.resolve();let B=!1;function V(){B||(B=!0,U.then(X))}function Gt(){return V(),U}function O(t){S.push(t)}function Jt(t){q.push(t)}const L=new Set;let E=0;function X(){const t=w;do{for(;E<b.length;){const e=b[E];E++,x(e),_t(e.$$)}for(x(null),b.length=0,E=0;W.length;)W.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];L.has(n)||(L.add(n),n())}S.length=0}while(b.length);for(;q.length;)q.pop()();B=!1,L.clear(),x(t)}function _t(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}const A=new Set;let g;function Kt(){g={r:0,c:[],p:g}}function Qt(){g.r||$(g.c),g=g.p}function Y(t,e){t&&t.i&&(A.delete(t),t.i(e))}function Rt(t,e,n,i){if(t&&t.o){if(A.has(t))return;A.add(t),g.c.push(()=>{A.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ut=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Vt(t,e){t.d(1),e.delete(t.key)}function Xt(t,e,n,i,s,u,c,l,r,o,f,_){let d=t.length,m=u.length,h=d;const j={};for(;h--;)j[t[h].key]=h;const v=[],M=new Map,C=new Map;for(h=m;h--;){const a=_(s,u,h),p=n(a);let y=c.get(p);y?i&&y.p(a,e):(y=o(p,a),y.c()),M.set(p,v[h]=y),p in j&&C.set(p,Math.abs(h-j[p]))}const z=new Set,F=new Set;function T(a){Y(a,1),a.m(l,f),c.set(a.key,a),f=a.first,m--}for(;d&&m;){const a=v[m-1],p=t[d-1],y=a.key,k=p.key;a===p?(f=a.first,d--,m--):M.has(k)?!c.has(y)||z.has(y)?T(a):F.has(k)?d--:C.get(y)>C.get(k)?(F.add(y),T(a)):(z.add(k),d--):(r(p,c),d--)}for(;d--;){const a=t[d];M.has(a.key)||r(a,c)}for(;m;)T(v[m-1]);return v}function Yt(t,e){const n={},i={},s={$$scope:1};let u=t.length;for(;u--;){const c=t[u],l=e[u];if(l){for(const r in c)r in l||(i[r]=1);for(const r in l)s[r]||(n[r]=l[r],s[r]=1);t[u]=l}else for(const r in c)s[r]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Zt(t){return typeof t=="object"&&t!==null?t:{}}function te(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ee(t){t&&t.c()}function ne(t,e){t&&t.l(e)}function ht(t,e,n,i){const{fragment:s,on_mount:u,on_destroy:c,after_update:l}=t.$$;s&&s.m(e,n),i||O(()=>{const r=u.map(G).filter(tt);c?c.push(...r):$(r),t.$$.on_mount=[]}),l.forEach(O)}function mt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function pt(t,e){t.$$.dirty[0]===-1&&(b.push(t),V(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ie(t,e,n,i,s,u,c,l=[-1]){const r=w;x(t);const o=t.$$={fragment:null,ctx:null,props:u,update:P,not_equal:s,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:H(),dirty:l,skip_bound:!1,root:e.target||r.$$.root};c&&c(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return o.ctx&&s(o.ctx[_],o.ctx[_]=h)&&(!o.skip_bound&&o.bound[_]&&o.bound[_](h),f&&pt(t,_)),d}):[],o.update(),f=!0,$(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){nt();const _=at(e.target);o.fragment&&o.fragment.l(_),_.forEach(lt)}else o.fragment&&o.fragment.c();e.intro&&Y(t.$$.fragment),ht(t,e.target,e.anchor,e.customElement),it(),X()}x(r)}class re{$destroy(){mt(this,1),this.$destroy=P}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ut as $,Zt as A,mt as B,Z as C,Gt as D,P as E,J as F,$ as G,tt as H,xt as I,$t as J,vt as K,wt as L,st as M,W as N,te as O,It as P,Jt as Q,bt as R,re as S,Dt as T,Nt as U,Xt as V,Vt as W,ut as X,Tt as Y,gt as Z,Bt as _,St as a,Pt as a0,Et as a1,Wt as a2,jt as a3,kt as b,Lt as c,Qt as d,At as e,Y as f,Kt as g,lt as h,ie as i,Ht as j,Ft as k,ot as l,Ct as m,at as n,zt as o,Mt as p,Ot as q,D as r,yt as s,Rt as t,dt as u,qt as v,ee as w,ne as x,ht as y,Yt as z};
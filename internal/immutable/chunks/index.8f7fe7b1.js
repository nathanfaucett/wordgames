function A(){}function et(t,e){for(const n in e)t[n]=e[n];return t}function W(t){return t()}function I(){return Object.create(null)}function $(t){t.forEach(W)}function G(t){return typeof t=="function"}function bt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function nt(t){return Object.keys(t).length===0}function J(t,...e){if(t==null)return A;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function xt(t){let e;return J(t,n=>e=n)(),e}function wt(t,e,n){t.$$.on_destroy.push(J(e,n))}function $t(t,e,n,i){if(t){const r=K(t,e,n,i);return t[0](r)}}function K(t,e,n,i){return t[1]&&i?et(n.ctx.slice(),t[1](i(e))):n.ctx}function vt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)u[o]=e.dirty[o]|r[o];return u}return e.dirty|r}return e.dirty}function Et(t,e,n,i,r,u){if(r){const s=K(e,n,i,u);t.p(s,r)}}function Nt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let T=!1;function it(){T=!0}function rt(){T=!1}function st(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function ct(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const l=e[c].claim_order,f=(r>0&&e[n[r]].claim_order<=l?r+1:st(1,r,d=>e[n[d]].claim_order,l))-1;i[c]=n[f]+1;const _=f+1;n[_]=c,r=Math.max(_,r)}const u=[],s=[];let o=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(u.push(e[c-1]);o>=c;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);u.reverse(),s.sort((c,l)=>c.claim_order-l.claim_order);for(let c=0,l=0;c<s.length;c++){for(;l<u.length&&s[c].claim_order>=u[l].claim_order;)l++;const f=l<u.length?u[l]:null;t.insertBefore(s[c],f)}}function lt(t,e){if(T){for(ct(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function St(t,e,n){T&&!n?lt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ot(t){t.parentNode&&t.parentNode.removeChild(t)}function kt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ut(t){return document.createElement(t)}function at(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function P(t){return document.createTextNode(t)}function At(){return P(" ")}function Tt(){return P("")}function Mt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function jt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Ct(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ft(t){return Array.from(t.childNodes)}function dt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Q(t,e,n,i,r=!1){dt(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function U(t,e,n,i){return Q(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||u.push(o.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Dt(t,e,n){return U(t,e,n,ut)}function Lt(t,e,n){return U(t,e,n,at)}function _t(t,e){return Q(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>P(e),!0)}function Ot(t){return _t(t," ")}function Bt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ht(t,e){t.value=e??""}function Pt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function qt(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function zt(t,e,n){t.classList[n?"add":"remove"](e)}function Ft(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const u=r.textContent.trim();u===`HEAD_${t}_END`?(i-=1,n.push(r)):u===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function It(t,e){return new t(e)}let E;function v(t){E=t}function V(){if(!E)throw new Error("Function called outside component initialization");return E}function Rt(t){V().$$.on_mount.push(t)}function Wt(t){V().$$.after_update.push(t)}function Gt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const x=[],R=[];let w=[];const O=[],X=Promise.resolve();let B=!1;function Y(){B||(B=!0,X.then(Z))}function Jt(){return Y(),X}function H(t){w.push(t)}function Kt(t){O.push(t)}const L=new Set;let b=0;function Z(){if(b!==0)return;const t=E;do{try{for(;b<x.length;){const e=x[b];b++,v(e),ht(e.$$)}}catch(e){throw x.length=0,b=0,e}for(v(null),x.length=0,b=0;R.length;)R.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];L.has(n)||(L.add(n),n())}w.length=0}while(x.length);for(;O.length;)O.pop()();B=!1,L.clear(),v(t)}function ht(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}function mt(t){const e=[],n=[];w.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),w=e}const k=new Set;let g;function Qt(){g={r:0,c:[],p:g}}function Ut(){g.r||$(g.c),g=g.p}function tt(t,e){t&&t.i&&(k.delete(t),t.i(e))}function Vt(t,e,n,i){if(t&&t.o){if(k.has(t))return;k.add(t),g.c.push(()=>{k.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Xt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Yt(t,e){t.d(1),e.delete(t.key)}function Zt(t,e,n,i,r,u,s,o,c,l,f,_){let d=t.length,m=u.length,h=d;const M={};for(;h--;)M[t[h].key]=h;const N=[],j=new Map,C=new Map,q=[];for(h=m;h--;){const a=_(r,u,h),p=n(a);let y=s.get(p);y?i&&q.push(()=>y.p(a,e)):(y=l(p,a),y.c()),j.set(p,N[h]=y),p in M&&C.set(p,Math.abs(h-M[p]))}const z=new Set,F=new Set;function D(a){tt(a,1),a.m(o,f),s.set(a.key,a),f=a.first,m--}for(;d&&m;){const a=N[m-1],p=t[d-1],y=a.key,S=p.key;a===p?(f=a.first,d--,m--):j.has(S)?!s.has(y)||z.has(y)?D(a):F.has(S)?d--:C.get(y)>C.get(S)?(F.add(y),D(a)):(z.add(S),d--):(c(p,s),d--)}for(;d--;){const a=t[d];j.has(a.key)||c(a,s)}for(;m;)D(N[m-1]);return $(q),N}function te(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ee(t){t&&t.c()}function ne(t,e){t&&t.l(e)}function pt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||H(()=>{const s=t.$$.on_mount.map(W).filter(G);t.$$.on_destroy?t.$$.on_destroy.push(...s):$(s),t.$$.on_mount=[]}),u.forEach(H)}function yt(t,e){const n=t.$$;n.fragment!==null&&(mt(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function gt(t,e){t.$$.dirty[0]===-1&&(x.push(t),Y(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ie(t,e,n,i,r,u,s,o=[-1]){const c=E;v(t);const l=t.$$={fragment:null,ctx:[],props:u,update:A,not_equal:r,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:I(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};s&&s(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return l.ctx&&r(l.ctx[_],l.ctx[_]=h)&&(!l.skip_bound&&l.bound[_]&&l.bound[_](h),f&&gt(t,_)),d}):[],l.update(),f=!0,$(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){it();const _=ft(e.target);l.fragment&&l.fragment.l(_),_.forEach(ot)}else l.fragment&&l.fragment.c();e.intro&&tt(t.$$.fragment),pt(t,e.target,e.anchor,e.customElement),rt(),Z()}v(c)}class re{$destroy(){yt(this,1),this.$destroy=A}$on(e,n){if(!G(n))return A;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!nt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Lt as $,pt as A,yt as B,$t as C,Et as D,Nt as E,vt as F,lt as G,A as H,wt as I,Ft as J,Ht as K,Mt as L,$ as M,te as N,Kt as O,zt as P,G as Q,Xt as R,re as S,qt as T,Zt as U,kt as V,Gt as W,jt as X,Yt as Y,xt as Z,at as _,At as a,J as a0,St as b,Ot as c,Vt as d,Tt as e,Ut as f,tt as g,ot as h,ie as i,Wt as j,ut as k,Dt as l,ft as m,Ct as n,Rt as o,Pt as p,P as q,_t as r,bt as s,Jt as t,Bt as u,Qt as v,R as w,It as x,ee as y,ne as z};

(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();var R=Object.defineProperty,b=(e,t)=>{for(var i in t)R(e,i,{get:t[i],enumerable:!0})},F={};b(F,{convertFileSrc:()=>U,invoke:()=>c,transformCallback:()=>u});function N(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function u(e,t=!1){let i=N(),s=`_${i}`;return Object.defineProperty(window,s,{value:n=>(t&&Reflect.deleteProperty(window,s),e==null?void 0:e(n)),writable:!1,configurable:!0}),i}async function c(e,t={}){return new Promise((i,s)=>{let n=u(l=>{i(l),Reflect.deleteProperty(window,`_${r}`)},!0),r=u(l=>{s(l),Reflect.deleteProperty(window,`_${n}`)},!0);window.__TAURI_IPC__({cmd:e,callback:n,error:r,...t})})}function U(e,t="asset"){return window.__TAURI__.convertFileSrc(e,t)}async function a(e){return c("tauri",e)}var k={};b(k,{TauriEvent:()=>A,emit:()=>V,listen:()=>q,once:()=>$});async function E(e,t){return a({__tauriModule:"Event",message:{cmd:"unlisten",event:e,eventId:t}})}async function P(e,t,i){await a({__tauriModule:"Event",message:{cmd:"emit",event:e,windowLabel:t,payload:i}})}async function w(e,t,i){return a({__tauriModule:"Event",message:{cmd:"listen",event:e,windowLabel:t,handler:u(i)}}).then(s=>async()=>E(e,s))}async function z(e,t,i){return w(e,t,s=>{i(s),E(e,s.id).catch(()=>{})})}var A=(e=>(e.WINDOW_RESIZED="tauri://resize",e.WINDOW_MOVED="tauri://move",e.WINDOW_CLOSE_REQUESTED="tauri://close-requested",e.WINDOW_CREATED="tauri://window-created",e.WINDOW_DESTROYED="tauri://destroyed",e.WINDOW_FOCUS="tauri://focus",e.WINDOW_BLUR="tauri://blur",e.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",e.WINDOW_THEME_CHANGED="tauri://theme-changed",e.WINDOW_FILE_DROP="tauri://file-drop",e.WINDOW_FILE_DROP_HOVER="tauri://file-drop-hover",e.WINDOW_FILE_DROP_CANCELLED="tauri://file-drop-cancelled",e.MENU="tauri://menu",e.CHECK_UPDATE="tauri://update",e.UPDATE_AVAILABLE="tauri://update-available",e.INSTALL_UPDATE="tauri://update-install",e.STATUS_UPDATE="tauri://update-status",e.DOWNLOAD_PROGRESS="tauri://update-download-progress",e))(A||{});async function q(e,t){return w(e,null,t)}async function $(e,t){return z(e,null,t)}async function V(e,t){return P(e,void 0,t)}var G={};b(G,{CloseRequestedEvent:()=>I,LogicalPosition:()=>L,LogicalSize:()=>D,PhysicalPosition:()=>y,PhysicalSize:()=>m,UserAttentionType:()=>C,WebviewWindow:()=>d,WebviewWindowHandle:()=>T,WindowManager:()=>S,appWindow:()=>h,availableMonitors:()=>K,currentMonitor:()=>B,getAll:()=>g,getCurrent:()=>H,primaryMonitor:()=>j});var D=class{constructor(e,t){this.type="Logical",this.width=e,this.height=t}},m=class{constructor(e,t){this.type="Physical",this.width=e,this.height=t}toLogical(e){return new D(this.width/e,this.height/e)}},L=class{constructor(e,t){this.type="Logical",this.x=e,this.y=t}},y=class{constructor(e,t){this.type="Physical",this.x=e,this.y=t}toLogical(e){return new L(this.x/e,this.y/e)}},C=(e=>(e[e.Critical=1]="Critical",e[e.Informational=2]="Informational",e))(C||{});function H(){return new d(window.__TAURI_METADATA__.__currentWindow.label,{skip:!0})}function g(){return window.__TAURI_METADATA__.__windows.map(e=>new d(e.label,{skip:!0}))}var v=["tauri://created","tauri://error"],T=class{constructor(e){this.label=e,this.listeners=Object.create(null)}async listen(e,t){return this._handleTauriEvent(e,t)?Promise.resolve(()=>{let i=this.listeners[e];i.splice(i.indexOf(t),1)}):w(e,this.label,t)}async once(e,t){return this._handleTauriEvent(e,t)?Promise.resolve(()=>{let i=this.listeners[e];i.splice(i.indexOf(t),1)}):z(e,this.label,t)}async emit(e,t){if(v.includes(e)){for(let i of this.listeners[e]||[])i({event:e,id:-1,windowLabel:this.label,payload:t});return Promise.resolve()}return P(e,this.label,t)}_handleTauriEvent(e,t){return v.includes(e)?(e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t],!0):!1}},S=class extends T{async scaleFactor(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"scaleFactor"}}}})}async innerPosition(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"innerPosition"}}}}).then(({x:e,y:t})=>new y(e,t))}async outerPosition(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"outerPosition"}}}}).then(({x:e,y:t})=>new y(e,t))}async innerSize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"innerSize"}}}}).then(({width:e,height:t})=>new m(e,t))}async outerSize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"outerSize"}}}}).then(({width:e,height:t})=>new m(e,t))}async isFullscreen(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isFullscreen"}}}})}async isMinimized(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMinimized"}}}})}async isMaximized(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMaximized"}}}})}async isFocused(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isFocused"}}}})}async isDecorated(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isDecorated"}}}})}async isResizable(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isResizable"}}}})}async isMaximizable(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMaximizable"}}}})}async isMinimizable(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isMinimizable"}}}})}async isClosable(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isClosable"}}}})}async isVisible(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"isVisible"}}}})}async title(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"title"}}}})}async theme(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"theme"}}}})}async center(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"center"}}}})}async requestUserAttention(e){let t=null;return e&&(e===1?t={type:"Critical"}:t={type:"Informational"}),a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"requestUserAttention",payload:t}}}})}async setResizable(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setResizable",payload:e}}}})}async setMaximizable(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMaximizable",payload:e}}}})}async setMinimizable(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMinimizable",payload:e}}}})}async setClosable(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setClosable",payload:e}}}})}async setTitle(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setTitle",payload:e}}}})}async maximize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"maximize"}}}})}async unmaximize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"unmaximize"}}}})}async toggleMaximize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"toggleMaximize"}}}})}async minimize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"minimize"}}}})}async unminimize(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"unminimize"}}}})}async show(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"show"}}}})}async hide(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"hide"}}}})}async close(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"close"}}}})}async setDecorations(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setDecorations",payload:e}}}})}async setAlwaysOnTop(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setAlwaysOnTop",payload:e}}}})}async setContentProtected(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setContentProtected",payload:e}}}})}async setSize(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setSize",payload:{type:e.type,data:{width:e.width,height:e.height}}}}}})}async setMinSize(e){if(e&&e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMinSize",payload:e?{type:e.type,data:{width:e.width,height:e.height}}:null}}}})}async setMaxSize(e){if(e&&e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setMaxSize",payload:e?{type:e.type,data:{width:e.width,height:e.height}}:null}}}})}async setPosition(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setPosition",payload:{type:e.type,data:{x:e.x,y:e.y}}}}}})}async setFullscreen(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setFullscreen",payload:e}}}})}async setFocus(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setFocus"}}}})}async setIcon(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setIcon",payload:{icon:typeof e=="string"?e:Array.from(e)}}}}})}async setSkipTaskbar(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setSkipTaskbar",payload:e}}}})}async setCursorGrab(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorGrab",payload:e}}}})}async setCursorVisible(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorVisible",payload:e}}}})}async setCursorIcon(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorIcon",payload:e}}}})}async setCursorPosition(e){if(!e||e.type!=="Logical"&&e.type!=="Physical")throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setCursorPosition",payload:{type:e.type,data:{x:e.x,y:e.y}}}}}})}async setIgnoreCursorEvents(e){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"setIgnoreCursorEvents",payload:e}}}})}async startDragging(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{label:this.label,cmd:{type:"startDragging"}}}})}async onResized(e){return this.listen("tauri://resize",t=>{t.payload=x(t.payload),e(t)})}async onMoved(e){return this.listen("tauri://move",t=>{t.payload=O(t.payload),e(t)})}async onCloseRequested(e){return this.listen("tauri://close-requested",t=>{let i=new I(t);Promise.resolve(e(i)).then(()=>{if(!i.isPreventDefault())return this.close()})})}async onFocusChanged(e){let t=await this.listen("tauri://focus",s=>{e({...s,payload:!0})}),i=await this.listen("tauri://blur",s=>{e({...s,payload:!1})});return()=>{t(),i()}}async onScaleChanged(e){return this.listen("tauri://scale-change",e)}async onMenuClicked(e){return this.listen("tauri://menu",e)}async onFileDropEvent(e){let t=await this.listen("tauri://file-drop",n=>{e({...n,payload:{type:"drop",paths:n.payload}})}),i=await this.listen("tauri://file-drop-hover",n=>{e({...n,payload:{type:"hover",paths:n.payload}})}),s=await this.listen("tauri://file-drop-cancelled",n=>{e({...n,payload:{type:"cancel"}})});return()=>{t(),i(),s()}}async onThemeChanged(e){return this.listen("tauri://theme-changed",e)}},I=class{constructor(e){this._preventDefault=!1,this.event=e.event,this.windowLabel=e.windowLabel,this.id=e.id}preventDefault(){this._preventDefault=!0}isPreventDefault(){return this._preventDefault}},d=class extends S{constructor(e,t={}){super(e),t!=null&&t.skip||a({__tauriModule:"Window",message:{cmd:"createWebview",data:{options:{label:e,...t}}}}).then(async()=>this.emit("tauri://created")).catch(async i=>this.emit("tauri://error",i))}static getByLabel(e){return g().some(t=>t.label===e)?new d(e,{skip:!0}):null}static async getFocusedWindow(){for(let e of g())if(await e.isFocused())return e;return null}},h;"__TAURI_METADATA__"in window?h=new d(window.__TAURI_METADATA__.__currentWindow.label,{skip:!0}):(console.warn(`Could not find "window.__TAURI_METADATA__". The "appWindow" value will reference the "main" window label.
Note that this is not an issue if running this frontend on a browser instead of a Tauri window.`),h=new d("main",{skip:!0}));function f(e){return e===null?null:{name:e.name,scaleFactor:e.scaleFactor,position:O(e.position),size:x(e.size)}}function O(e){return new y(e.x,e.y)}function x(e){return new m(e.width,e.height)}async function B(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"currentMonitor"}}}}).then(f)}async function j(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"primaryMonitor"}}}}).then(f)}async function K(){return a({__tauriModule:"Window",message:{cmd:"manage",data:{cmd:{type:"availableMonitors"}}}}).then(e=>e.map(f))}let M,o,W;function p(){M.textContent="Loading...",o.classList.add("loading"),o.src="https://media.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif",W.textContent=""}function _(e){M.textContent=e.title,h.setTitle(e.title),o.src="",o.src=e.img,o.classList.remove("loading"),W.textContent="#"+e.num}async function Q(){p();let e=await c("latest_comic",{});_(e)}async function X(){p();let e=await c("step_comic",{stepBy:1});_(e)}async function Y(){p();let e=await c("step_comic",{stepBy:-1});_(e)}async function Z(){p();let e=await c("random_comic",{});_(e)}window.addEventListener("DOMContentLoaded",()=>{M=document.querySelector("#title"),o=document.querySelector("#comic"),W=document.querySelector("#number"),console.log("Getting latest comic..."),Q()});document.querySelector("#prev").addEventListener("click",()=>{Y()});document.querySelector("#next").addEventListener("click",()=>{X()});document.querySelector("#random").addEventListener("click",()=>{Z()});
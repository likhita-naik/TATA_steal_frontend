"use strict";(self.webpackChunktatasteel=self.webpackChunktatasteel||[]).push([[585],{2585:(Y,d,l)=>{l.r(d),l.d(d,{SteamSuitDetailsModule:()=>U});var _=l(9174),r=l(9569),t=l(4650),p=l(6669),u=l(1305),c=l(6895);function g(n,a){1&n&&(t.\u0275\u0275elementStart(0,"span",10)(1,"span",11),t.\u0275\u0275text(2,"Live Violation Details"),t.\u0275\u0275elementEnd()())}function S(n,a){if(1&n){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",12),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);const s=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(s.GetDetails())}),t.\u0275\u0275text(1,"All Violation Details"),t.\u0275\u0275elementEnd()}}function h(n,a){if(1&n){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",12),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);const s=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(s.BackToLive())}),t.\u0275\u0275text(1,"Back to Live"),t.\u0275\u0275elementEnd()}}function x(n,a){1&n&&(t.\u0275\u0275elementStart(0,"span",14)(1,"span",15),t.\u0275\u0275text(2,"ANALYTICS :"),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(3,"span",16),t.\u0275\u0275text(4,"Running"),t.\u0275\u0275elementEnd())}function I(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"span"),t.\u0275\u0275template(1,x,5,0,"span",13),t.\u0275\u0275elementEnd()),2&n){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","ON"==e.violationDetails.analytics_details.analytics_status.status)}}const y=function(n){return{running:n}};function C(n,a){if(1&n){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div")(1,"div",21)(2,"div",22)(3,"div")(4,"img",23),t.\u0275\u0275listener("click",function(){const o=t.\u0275\u0275restoreView(e).$implicit,m=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(m.onImageClick(o))}),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(5,"div",24)(6,"div",11)(7,"div",25),t.\u0275\u0275text(8),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(9,"div",24)(10,"span",15),t.\u0275\u0275text(11,"Time :"),t.\u0275\u0275elementEnd(),t.\u0275\u0275text(12),t.\u0275\u0275elementEnd()()()()()()}if(2&n){const e=a.$implicit,i=t.\u0275\u0275nextContext(3);t.\u0275\u0275advance(1),t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction1(4,y,"ON"==i.violationDetails.analytics_details.analytics_status.status)),t.\u0275\u0275advance(3),t.\u0275\u0275property("src",i.IP+"/STEAMVIOLATIONIMAGE/"+e.image_name,t.\u0275\u0275sanitizeUrl),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate(e.message),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate(i.violationDetails.analytics_details.timestamp.$date)}}function D(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",1),t.\u0275\u0275template(1,C,13,6,"div",20),t.\u0275\u0275elementEnd()),2&n){const e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",e.violationDetails.analytics_details.analytics_details.reverse())}}function E(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",28)(1,"h4"),t.\u0275\u0275text(2," No violation details found."),t.\u0275\u0275elementEnd()())}function b(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",28)(1,"h4",29),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&n){const e=t.\u0275\u0275nextContext(3);t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate1(" ",e.responseMessage,"")}}function T(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",28),t.\u0275\u0275element(1,"span",30),t.\u0275\u0275text(2," Loading... "),t.\u0275\u0275elementEnd())}function A(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",28),t.\u0275\u0275text(1,"Error while fetching data"),t.\u0275\u0275elementEnd())}function F(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",26),t.\u0275\u0275template(1,E,3,0,"div",27),t.\u0275\u0275template(2,b,3,1,"div",27),t.\u0275\u0275template(3,T,3,0,"div",27),t.\u0275\u0275template(4,A,2,0,"div",27),t.\u0275\u0275elementEnd()),2&n){const e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","success"==e.dataFetchStatus),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","fail"==e.dataFetchStatus),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","init"==e.dataFetchStatus),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","Error"==e.dataFetchStatus)}}function V(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",17),t.\u0275\u0275template(1,D,2,1,"div",18),t.\u0275\u0275template(2,F,5,4,"ng-template",null,19,t.\u0275\u0275templateRefExtractor),t.\u0275\u0275elementEnd()),2&n){const e=t.\u0275\u0275reference(3),i=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",null!=i.violationDetails)("ngIfElse",e)}}function w(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div"),t.\u0275\u0275element(1,"router-outlet"),t.\u0275\u0275elementEnd())}function O(n,a){}let M=(()=>{class n{constructor(e,i,s){this.Server=e,this.lightbox=i,this.Router=s,this.Details=[],this.violationDetails=null,this.showHistory=!1,this.isLoading=!1,this.appIsOn=!1,this.dataFetchStatus="",this.responseMessage="",this.IP=this.Server.IP,this.delay=this.Server.steamDataDelay,this.Server.CheckApplicationStatus().subscribe(o=>{if(o.success){var m=o.message.find(f=>"tg_steamsuit"==f.process_name?f:"");this.appIsOn=m?.process_status}})}ngOnInit(){console.log("details component"),this.showHistory=!1,this.dataFetchStatus="init",0==this.showHistory&&(this.Server.GetCurrentViolations().subscribe(e=>{console.log(e),e.success?(this.dataFetchStatus="success",0==this.showHistory&&(this.violationDetails=e.message)):(this.dataFetchStatus="fail",this.responseMessage=e.message)},e=>{this.dataFetchStatus="error"}),this.intervalVar=setInterval(()=>{0==this.showHistory&&this.GetCurrentViolation()},this.delay))}ngAfterViewInit(){this.GetCurrentViolation()}BackToLive(){this.showHistory=!1,this.intervalVar=setInterval(()=>{this.GetCurrentViolation()},this.delay)}GetDetails(){clearInterval(this.intervalVar),this.showHistory=!0,this.Router.navigate(["app/violations/Steam-SuitDetection"]),this.Server.GetAnalyticsData().subscribe(e=>{e.success&&(this.allViolations=e.message)})}GetCurrentViolation(){let e=document.getElementById("container");e&&e.classList.add("loading"),0==this.showHistory&&this.Server.GetCurrentViolations().subscribe(i=>{console.log(i),i.success?(e&&e.classList.remove("loading"),0==this.showHistory&&(this.violationDetails=i.message)):e&&e.classList.remove("loading")},i=>{e&&e.classList.remove("loading")})}ngOnDestroy(){clearInterval(this.intervalVar)}onImageClick(e,i){var s=[{src:this.Server.IP+"/STEAMVIOLATIONIMAGE/"+e.image_name,thumb:this.Server.IP+"/STEAMVIOLATIONIMAGE/"+e.image_name,caption:` ${e.message}`}];console.log(s),this.lightbox.open(s,0)}}return n.\u0275fac=function(e){return new(e||n)(t.\u0275\u0275directiveInject(p.c),t.\u0275\u0275directiveInject(u.ey),t.\u0275\u0275directiveInject(r.F0))},n.\u0275cmp=t.\u0275\u0275defineComponent({type:n,selectors:[["app-steam-suit-details"]],decls:14,vars:6,consts:[[1,"container-fluid","dashboard-content"],[1,""],["id","data-card",1,"card"],["class","float-start border-bottom pb-1 mb-1",4,"ngIf"],[1,"float-end"],[1,"float-end","me-3"],["class","btn default-outline float-end",3,"click",4,"ngIf"],[4,"ngIf"],["class","card-body","id","container","style","min-height: 20px !important;",4,"ngIf"],["elsep",""],[1,"float-start","border-bottom","pb-1","mb-1"],[1,"h4"],[1,"btn","default-outline","float-end",3,"click"],["class","float-end m-2",4,"ngIf"],[1,"float-end","m-2"],[1,"text-muted","m-1"],["role","status","aria-hidden","true",1,"spinner-grow","spinner-grow-sm","me-2",2,"background-color","#3FCA56"],["id","container",1,"card-body",2,"min-height","20px !important"],["class","",4,"ngIf","ngIfElse"],["noData",""],[4,"ngFor","ngForOf"],[1,"card-body","mb-3",3,"ngClass"],[1,"container","alert","alert-danger"],["alt","image",1,"violation-img",3,"src","click"],[1,"d-flex","justify-centent-center","align-items-center"],[1,"alert","alert-danger"],["id","data-card",1,"row","card","card-body"],["class","d-flex justify-content-center align-items-center",4,"ngIf"],[1,"d-flex","justify-content-center","align-items-center"],[1,"text-muted"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm","me-2"]],template:function(e,i){1&e&&(t.\u0275\u0275elementStart(0,"div",0)(1,"h4",1),t.\u0275\u0275text(2," Steam Suit Violation Details "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(3,"div",2),t.\u0275\u0275template(4,g,3,0,"span",3),t.\u0275\u0275elementStart(5,"span",4)(6,"div",5),t.\u0275\u0275template(7,S,2,0,"button",6),t.\u0275\u0275template(8,h,2,0,"button",6),t.\u0275\u0275template(9,I,2,1,"span",7),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(10,V,4,2,"div",8),t.\u0275\u0275template(11,w,2,0,"div",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(12,O,0,0,"ng-template",null,9,t.\u0275\u0275templateRefExtractor),t.\u0275\u0275elementEnd()),2&e&&(t.\u0275\u0275advance(4),t.\u0275\u0275property("ngIf",!i.showHistory),t.\u0275\u0275advance(3),t.\u0275\u0275property("ngIf",!i.showHistory),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.showHistory),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",null!=i.violationDetails),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!i.showHistory),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.showHistory))},dependencies:[c.NgClass,c.NgForOf,c.NgIf,r.lC],styles:[".container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr}.violation-img[_ngcontent-%COMP%]{width:90%;object-fit:cover;border-radius:7px!important}.fade-in[_ngcontent-%COMP%]{animation:fadeIn 1s ease-in-out}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}"]}),n})();var v=l(2953);function L(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",13)(1,"div",14)(2,"div"),t.\u0275\u0275element(3,"img",15),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(4,"div",16)(5,"span",17),t.\u0275\u0275text(6),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(7,"span",18),t.\u0275\u0275element(8,"span",19),t.\u0275\u0275text(9),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(10,"br"),t.\u0275\u0275elementEnd()()()),2&n){const e=t.\u0275\u0275nextContext(),i=e.$implicit,s=e.index,o=t.\u0275\u0275nextContext(4);t.\u0275\u0275advance(3),t.\u0275\u0275property("src",o.IP+"/STEAMVIOLATIONIMAGE/"+i.image_name,t.\u0275\u0275sanitizeUrl),t.\u0275\u0275advance(3),t.\u0275\u0275textInterpolate(s+1+"."),t.\u0275\u0275advance(3),t.\u0275\u0275textInterpolate(i.message)}}function j(n,a){1&n&&(t.\u0275\u0275elementContainerStart(0,11),t.\u0275\u0275template(1,L,11,3,"ng-template",12),t.\u0275\u0275elementContainerEnd())}function k(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",9)(1,"ngb-carousel"),t.\u0275\u0275template(2,j,2,0,"ng-container",10),t.\u0275\u0275elementEnd()()),2&n){const e=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275property("ngForOf",e.analytics_details)}}function G(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",7),t.\u0275\u0275template(1,k,3,1,"div",8),t.\u0275\u0275elementEnd()),2&n){const e=a.$implicit;t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",e.analytics_details.length>0)}}function N(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div"),t.\u0275\u0275template(1,G,2,1,"div",6),t.\u0275\u0275elementEnd()),2&n){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",e.allViolations)}}function P(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",21)(1,"h4"),t.\u0275\u0275text(2," No violation details found."),t.\u0275\u0275elementEnd()())}function H(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",21)(1,"h4",19),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&n){const e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate1(" ",e.responseMessage,"")}}function B(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",21),t.\u0275\u0275element(1,"span",22),t.\u0275\u0275text(2," Loading... "),t.\u0275\u0275elementEnd())}function R(n,a){1&n&&(t.\u0275\u0275elementStart(0,"div",21),t.\u0275\u0275text(1,"Error while fetching data"),t.\u0275\u0275elementEnd())}function $(n,a){if(1&n&&(t.\u0275\u0275elementStart(0,"div",0),t.\u0275\u0275template(1,P,3,0,"div",20),t.\u0275\u0275template(2,H,3,1,"div",20),t.\u0275\u0275template(3,B,3,0,"div",20),t.\u0275\u0275template(4,R,2,0,"div",20),t.\u0275\u0275elementEnd()),2&n){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","success"==e.dataFetchStatus),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","fail"==e.dataFetchStatus),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","init"==e.dataFetchStatus),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","Error"==e.dataFetchStatus)}}const z=[{path:"",component:M,children:[{path:"AllDetails",component:(()=>{class n{constructor(e,i,s){this.Server=e,this.lightbox=i,this.Router=s,this.allViolations=[],this.dataFetchStatus="",this.responseMessage="",this.BackToLiveStatus=new t.EventEmitter,this.IP=this.Server.IP,this.GetDetails()}ngOnInit(){}GetDetails(){this.dataFetchStatus="init",this.Server.GetAnalyticsData().subscribe(e=>{e.success?(this.dataFetchStatus="success",this.allViolations=e.message):(this.dataFetchStatus="fail",this.responseMessage=e.message)},e=>{this.dataFetchStatus="error",this.Server.notification("Error while fetching the data","Retry")})}onImageClick(e,i){var s=[{src:this.Server.IP+"/STEAMVIOLATIONIMAGE/"+e.image_name,thumb:this.Server.IP+"/STEAMVIOLATIONIMAGE/"+e.image_name,caption:` ${e.message}`}];console.log(s),this.lightbox.open(s,0)}BackToLive(){this.Router.navigate(["app/SteamSuitDetection/Details"])}}return n.\u0275fac=function(e){return new(e||n)(t.\u0275\u0275directiveInject(p.c),t.\u0275\u0275directiveInject(u.ey),t.\u0275\u0275directiveInject(r.F0))},n.\u0275cmp=t.\u0275\u0275defineComponent({type:n,selectors:[["app-steam-suit-all-details"]],outputs:{BackToLiveStatus:"BackToLiveStatus"},decls:9,vars:2,consts:[["id","data-card",1,"row","card","card-body"],[1,"card-header"],[1,"float-start"],[1,"text-xl"],[4,"ngIf","ngIfElse"],["noData",""],["class","",4,"ngFor","ngForOf"],[1,""],["class","card",4,"ngIf"],[1,"card"],["class","m-4 d-flex justify-centent-center align-items-center",4,"ngFor","ngForOf"],[1,"m-4","d-flex","justify-centent-center","align-items-center"],["ngbSlide","","class","w-100"],[1,"d-flex","justify-centent-center","align-items-center"],[1,"container","alert","alert-danger","m-3","p-3"],["alt","Image",1,"violation-img",3,"src"],[1,"me-3","d-flex","column-flex"],[1,"me-2"],[1,"m-2","alert","alert-danger"],[1,"text-muted"],["class","d-flex justify-content-center align-items-center",4,"ngIf"],[1,"d-flex","justify-content-center","align-items-center"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm","me-2"]],template:function(e,i){if(1&e&&(t.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div")(3,"span",2)(4,"h4",3),t.\u0275\u0275text(5," All Violation Details "),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275template(6,N,2,1,"div",4),t.\u0275\u0275template(7,$,5,4,"ng-template",null,5,t.\u0275\u0275templateRefExtractor),t.\u0275\u0275elementEnd()),2&e){const s=t.\u0275\u0275reference(8);t.\u0275\u0275advance(6),t.\u0275\u0275property("ngIf",i.allViolations.length>0)("ngIfElse",s)}},dependencies:[c.NgForOf,c.NgIf,v.uo,v.xl],styles:[".container[_ngcontent-%COMP%]{display:grid;grid-template-columns:50% 50%}.violation-img[_ngcontent-%COMP%]{width:90%;object-fit:cover;border-radius:7px!important}"]}),n})()}]}];let U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=t.\u0275\u0275defineInjector({imports:[_.A,r.Bz.forChild(z),r.Bz]}),n})()}}]);
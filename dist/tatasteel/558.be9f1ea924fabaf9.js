"use strict";(self.webpackChunktatasteel=self.webpackChunktatasteel||[]).push([[558],{1558:(Z,m,o)=>{o.r(m),o.d(m,{LogHistoryModule:()=>Q});var s=o(9569),p=o(2953),v=o(3056),C=o(1954),y=o(1305),g=o(7185),x=o(4612),b=o(9174),u=o(9646),t=o(4650),I=o(7445),O=o(2216),S=o(6895),d=o(8783),P=o(1968);const M=["dangerAlert"];function L(e,a){1&e&&t.\u0275\u0275element(0,"fa-icon",26)}function T(e,a){1&e&&t.\u0275\u0275element(0,"fa-icon",27)}function V(e,a){1&e&&t.\u0275\u0275element(0,"fa-icon",28)}function H(e,a){1&e&&t.\u0275\u0275element(0,"fa-icon",29)}function E(e,a){1&e&&t.\u0275\u0275element(0,"router-outlet")}function D(e,a){1&e&&t.\u0275\u0275element(0,"router-outlet")}function w(e,a){1&e&&t.\u0275\u0275element(0,"router-outlet")}function A(e,a){1&e&&t.\u0275\u0275element(0,"router-outlet")}function j(e,a){if(1&e&&(t.\u0275\u0275elementStart(0,"div",30)(1,"div",4)(2,"div",5),t.\u0275\u0275element(3,"img",31),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(4,"div",32)(5,"h5")(6,"span",33),t.\u0275\u0275text(7," Camera Name :"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(8,"b")(9,"span",33),t.\u0275\u0275text(10),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(11,"h5")(12,"span",33),t.\u0275\u0275text(13," Detected Time : "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(14,"b")(15,"span",33),t.\u0275\u0275text(16),t.\u0275\u0275pipe(17,"dateFormater"),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(18,"h5")(19,"span",33),t.\u0275\u0275text(20," Violation Type :"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(21,"b")(22,"span",33),t.\u0275\u0275text(23),t.\u0275\u0275elementEnd()()()()()()),2&e){const n=t.\u0275\u0275nextContext();t.\u0275\u0275advance(3),t.\u0275\u0275property("src",n.API+"/image/"+n.currentViol.imagename,t.\u0275\u0275sanitizeUrl),t.\u0275\u0275advance(7),t.\u0275\u0275textInterpolate(n.currentViol.camera_name?n.currentViol.camera_name:"null"),t.\u0275\u0275advance(6),t.\u0275\u0275textInterpolate(n.currentViol.timestamp?t.\u0275\u0275pipeBind1(17,4,n.currentViol.timestamp):"--"),t.\u0275\u0275advance(7),t.\u0275\u0275textInterpolate(n.currentViol.analyticstype?n.aiSolutionsList[n.currentViol.analyticstype]:"null")}}let N=(()=>{class e{constructor(n,i,r,l){this.webServer=n,this.toasterService=i,this.router=r,this.activatedRoute=l,this.aiSolutionsList={CRDCNT:"Crowd Count",RA:"Danger Zone",PPE:"PPE"},this.data=[],this.delay=3e3,this.isalert=!1,this.tempdata=[],this.audioOff=!1,this.alertmessage="",this.total=(0,u.of)(0),this.violData=(0,u.of)([]),this.loading=!1,this.prevLiveCount=0,this.images=[],this.violLength=0,this.updatedLen=0,this.violdata=[],this.currentViol=null,this.activeIndex=0,this.alert=!0,this.Images=[],this.isActive=!1,this.isActive2=!1,this.violationsList=[],this.router.navigate(["app/violations/DangerZone"]),this.audioOff="true"==localStorage.getItem("audioOff"),this.alert="true"==localStorage.getItem("alert"),console.log(localStorage.getItem("audioOff"),localStorage.getItem("alert")),this.delay=this.webServer.logInterval,this.API=n.IP,this.webServer.CheckApplicationStatus().subscribe(c=>{if(console.log(c),c.success){localStorage.setItem("appStatus",c.message[0].process_status);var f=c.message.find(h=>"docketrun-app"==h.process_name?h:"");this.isActive=f?f.process_status:""}}),this.GetMockdrillStatus()}ngOnInit(){this.violLength=Number(localStorage.getItem("updatedLen"))}ngAfterViewInit(){this.webServer.LiveViolationData().subscribe(n=>{n.success&&(this.prevLiveCount=n.now_live_count)},n=>{}),this.dataread()}dataread(){this.webServer.liveViolInterval=setInterval(()=>{this.Subsciption=this.webServer.LiveViolationData().subscribe(n=>{const i={...n};if(i.success&&i.now_live_count-this.prevLiveCount>0){if(this.alert)for(let l=i.now_live_count-this.prevLiveCount-1;l>=0;l--)this.alert&&(setTimeout(()=>{this.currentViol=i.message[l],this.alert&&this.showViol()},100),this.audioOff||this.alertSound());this.prevLiveCount=n.now_live_count}})},this.delay)}showViol(){this.toasterService.error(this.Violation.nativeElement.innerHTML," ",{enableHtml:!0,positionClass:"toast-top-right"})}alertSound(){let n=new Audio;n.src="../../../assets/audio/alert.mp3",n.load(),n.play()}volumeToggle(){this.alert?(this.audioOff=!this.audioOff,localStorage.setItem("audioOff",this.audioOff?"true":"false")):(this.audioOff=!0,localStorage.setItem("audioOff","true")),this.webServer.UpdateVoiceAlert(this.audioOff)}alertToggle(){this.alert=!this.alert,localStorage.setItem("alert",this.alert?"true":"false"),this.alert||(this.audioOff=!0,localStorage.setItem("alert","false"),localStorage.setItem("audioOff","true"),this.toasterService.clear()),this.webServer.UpdateNotificationSettings(this.alert)}OnTabChange(n){switch(n.index){case 0:this.activeIndex=0,this.router.navigate(["app","violations","DangerZone"]);break;case 1:this.activeIndex=1,this.router.navigate(["app","violations","ppe"]);break;case 2:this.activeIndex=2,this.router.navigate(["app","violations","CrowdCount"]);break;case 3:this.activeIndex=3,this.router.navigate(["app","violations","Steam-SuitDetection"])}}GetMockdrillStatus(){this.webServer.GetMockDrillStatus().subscribe(n=>{this.isActive2=n.success})}ngOnDestroy(){this.webServer.GetNotificationSettings(),clearInterval(this.webServer.liveViolInterval),this.isalert=!1,this.toasterService.clear()}}return e.\u0275fac=function(n){return new(n||e)(t.\u0275\u0275directiveInject(I.N),t.\u0275\u0275directiveInject(g._W),t.\u0275\u0275directiveInject(s.F0),t.\u0275\u0275directiveInject(s.gz))},e.\u0275cmp=t.\u0275\u0275defineComponent({type:e,selectors:[["app-log-history"]],viewQuery:function(n,i){if(1&n&&t.\u0275\u0275viewQuery(M,5),2&n){let r;t.\u0275\u0275queryRefresh(r=t.\u0275\u0275loadQuery())&&(i.Violation=r.first)}},decls:35,vars:12,consts:[["id","content",1,"container-fluid","dashboard-content"],["datatable",""],[1,""],[1,"page-header"],[1,"row"],[1,"col-12"],[1,"card-header"],["placement","bottom",1,"btn","default-outline","me-2","float-start",2,"width","7%",3,"ngbTooltip","click"],["icon","bell","class","me-1",4,"ngIf"],["icon","bell-slash","class","me-1",4,"ngIf"],["placement","bottom",1,"btn","default-outline","float-start","me-2",2,"width","7%",3,"ngbTooltip","click"],["icon","volume-up","class","me-1",4,"ngIf"],["icon","volume-off","class","me-1",4,"ngIf"],["id","data-card",1,"card","card-body","mt-3"],[3,"activeIndex","onChange","activeIndexChange"],["header","Danger Zone"],[4,"ngIf"],["header","Personal Protective Equipment"],["header","Crowd Count"],["header","Steam-Suit Detection"],[2,"display","none"],["dangerAlert",""],[1,"mb-0",2,"border","2px solid rgba(121, 20, 20, 0.699)","background-color","rgba(214, 148, 148, 0.459)"],[1,"modal-header",2,"text-align","center","color","rgba(121, 20, 20, 0.699)"],[1,"",2,"color","rgb(196, 54, 54) !important"],["class","modal-body",4,"ngIf"],["icon","bell",1,"me-1"],["icon","bell-slash",1,"me-1"],["icon","volume-up",1,"me-1"],["icon","volume-off",1,"me-1"],[1,"modal-body"],["alt","","width","100%",1,"violImage",2,"width","30%","height","30%","object-fit","fill","border-radius","5px 5px 5px 5px",3,"src"],[1,"col-xl-12","col-md-12","col-lg-12","col-xs-12","text-white","mt-2"],[1,"text-white"]],template:function(n,i){1&n&&(t.\u0275\u0275elementStart(0,"div",0,1)(2,"div",2)(3,"h3",3),t.\u0275\u0275text(4,"Violations Details"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(5,"div",4)(6,"div",5)(7,"div",6)(8,"button",7),t.\u0275\u0275listener("click",function(){return i.alertToggle()}),t.\u0275\u0275template(9,L,1,0,"fa-icon",8),t.\u0275\u0275template(10,T,1,0,"fa-icon",9),t.\u0275\u0275elementEnd(),t.\u0275\u0275text(11,"\xa0 "),t.\u0275\u0275elementStart(12,"button",10),t.\u0275\u0275listener("click",function(){return i.volumeToggle()}),t.\u0275\u0275template(13,V,1,0,"fa-icon",11),t.\u0275\u0275template(14,H,1,0,"fa-icon",12),t.\u0275\u0275elementEnd(),t.\u0275\u0275text(15,"\xa0 "),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(16,"div",13)(17,"p-tabView",14),t.\u0275\u0275listener("onChange",function(l){return i.OnTabChange(l)})("activeIndexChange",function(l){return i.activeIndex=l}),t.\u0275\u0275elementStart(18,"p-tabPanel",15),t.\u0275\u0275template(19,E,1,0,"router-outlet",16),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(20,"p-tabPanel",17),t.\u0275\u0275template(21,D,1,0,"router-outlet",16),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(22,"p-tabPanel",18),t.\u0275\u0275template(23,w,1,0,"router-outlet",16),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(24,"p-tabPanel",19),t.\u0275\u0275template(25,A,1,0,"router-outlet",16),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(26,"div",20)(27,"div",5)(28,"div",null,21)(30,"div",22)(31,"div",23)(32,"h3",24),t.\u0275\u0275text(33," Violation "),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(34,j,24,6,"div",25),t.\u0275\u0275elementEnd()()()()()),2&n&&(t.\u0275\u0275advance(8),t.\u0275\u0275property("ngbTooltip",i.alert?"notification on":"notification off"),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.alert),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!i.alert),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngbTooltip",i.audioOff?"mute":"unmute"),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!i.audioOff),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.audioOff),t.\u0275\u0275advance(3),t.\u0275\u0275property("activeIndex",i.activeIndex),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",0==i.activeIndex),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",1==i.activeIndex),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",2==i.activeIndex),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",3==i.activeIndex),t.\u0275\u0275advance(9),t.\u0275\u0275property("ngIf",i.currentViol))},dependencies:[O.BN,S.NgIf,p._L,s.lC,d.xf,d.x4,P.J],styles:['.image[_ngcontent-%COMP%]{margin-left:0;margin-right:0;height:174px;width:330px;object-fit:cover;border-radius:5px!important}.task-input[_ngcontent-%COMP%]{padding:0 25px;position:relative}.task-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:5px 35px 5px 5px;height:40px}.datePickerContainer[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.datePickerContainer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border-top-right-radius:0!important;border-bottom-right-radius:0!important}input[_ngcontent-%COMP%]{width:100%}.img[_ngcontent-%COMP%]{height:20px;width:20px}.task-input[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{top:50%;position:absolute;transform:translate(170px,-50%)}input[type=checkbox][_ngcontent-%COMP%]{display:block;height:30px;margin:0 0 -53px -9999px;order:4;top:5px;outline:none;counter-increment:undone-items}input[_ngcontent-%COMP%]:checked{pointer-events:none;order:2;counter-increment:done-items}label[_ngcontent-%COMP%]{pointer-events:none;display:block;position:relative;padding:15px 10px 15px 0;border-top:1px dashed #fff;order:4;cursor:pointer;animation:undone .5s}label[_ngcontent-%COMP%]:before{content:"\\f10c";display:block;position:absolute;margin-right:10px;margin-left:10px}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]{order:2;animation:done .5s}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:before{margin-left:3px;margin-right:2rem!important;color:#cc1d1d;content:"\\2713"}input[_ngcontent-%COMP%] + label[_ngcontent-%COMP%]:before{margin-left:3px;margin-right:2rem!important;color:#cc1d1d;content:"\\2716"}#editViol[_ngcontent-%COMP%]{text-align:center;align-content:center}td[_ngcontent-%COMP%]{text-align:center!important;align-content:center!important}input[type=radio][_ngcontent-%COMP%]{display:block;height:30px;margin:0 0 -53px -9999px;order:4;outline:none;position:relative;counter-increment:undone-items}#verify[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{pointer-events:all;display:block;position:relative;border-top:1px dashed #fff;order:4;cursor:pointer;animation:undone .5s;margin-left:10px!important}#verify[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:before{content:"\\25ef";display:block;position:absolute;margin-right:10px!important;right:2rem;font-weight:500;color:#c9c9c9}#verify[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]{order:2;animation:done .5s}#verify[_ngcontent-%COMP%]   #wrong[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:before{font-size:larger;font-family:500;color:#cc1d1d;content:"\\2713"}#verify[_ngcontent-%COMP%]   #right[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:before{font-size:larger;font-family:700;color:#1dc41d;content:"\\2713"}.w-full[_ngcontent-%COMP%]{width:inherit!important;color:#000!important}']}),e})();var R=o(64);const z=[{path:"",component:N,children:[{path:"ppe",loadChildren:()=>Promise.all([o.e(177),o.e(592),o.e(146)]).then(o.bind(o,4146)).then(e=>e.PpeviolationModule)},{path:"CrowdCount",loadChildren:()=>Promise.all([o.e(592),o.e(484)]).then(o.bind(o,2484)).then(e=>e.CrowdCountViolationsModule)},{path:"DangerZone",loadChildren:()=>Promise.all([o.e(700),o.e(592),o.e(382)]).then(o.bind(o,7382)).then(e=>e.RaViolationsModule)},{path:"Steam-SuitDetection",loadChildren:()=>Promise.all([o.e(592),o.e(585)]).then(o.bind(o,2585)).then(e=>e.SteamSuitDetailsModule)}]}];let Q=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.\u0275\u0275defineNgModule({type:e}),e.\u0275inj=t.\u0275\u0275defineInjector({imports:[b.A,s.Bz.forChild(z),y.QM,R.o6,v.ZQ.forRoot(),g.Rh.forRoot({timeOut:5e3,toastComponent:x.n,progressBar:!0,tapToDismiss:!0,newestOnTop:!0}),d.LU,C.n1.forRoot({}),p.IJ,s.Bz]}),e})()}}]);
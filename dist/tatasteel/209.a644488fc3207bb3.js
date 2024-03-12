"use strict";(self.webpackChunktatasteel=self.webpackChunktatasteel||[]).push([[209],{8054:(T,y,r)=>{r.d(y,{G:()=>u});var e=r(4650),m=r(433),s=r(6895),v=r(2216);function _(f,a){1&f&&(e.\u0275\u0275elementStart(0,"span",10),e.\u0275\u0275text(1,"Select a jobsheet"),e.\u0275\u0275elementEnd())}let u=(()=>{class f{constructor(){this.fileUploadStatus=!1,this.OnFileUploaded=new e.EventEmitter}ngOnInit(){this.ekUpload()}ngAfterViewInit(){}onFileChange(h){h.target.files[0]&&(this.excelFile=h.target.files[0],console.log(this.excelFile))}ekUpload(){var n,i,t=n=>{var i=document.getElementById("file-drag");n.stopPropagation(),n.preventDefault(),i.className="dragover"===n.type?"hover":"modal-body file-upload"},p=n=>{var i=n.target.files||n.dataTransfer.files;t(n);for(var l,o=0;l=i[o];o++)O(l),d(l)},c=n=>{document.getElementById("messages").innerHTML=n},O=n=>{var i=n.name.replace(/ /g,"_");console.log(n.name),c("<strong>"+encodeURI(i)+"</strong>");var l=document.getElementById("file-upload-form");this.excelFile=n,document.getElementById("start").classList.add("hidden"),document.getElementById("response").classList.remove("hidden"),this.OnFileUploaded.emit(this.excelFile),l.classList.remove("loading")},E=n=>{var i=document.getElementById("file-progress");n.lengthComputable&&(i.max=n.total)},b=n=>{console.log(n);var i=document.getElementById("file-progress");n.lengthComputable&&(i.value=n.loaded),n.loaded&&document.getElementById("file-upload-form").classList.remove("loading")},d=n=>{console.log(n);var i=new XMLHttpRequest,l=(document.getElementById("class-roster-file"),document.getElementById("file-progress"));if(i.upload)if(n.size<=1073741824){l.style.display="inline",i.upload.addEventListener("loadstart",E,!1),i.upload.addEventListener("progress",b,!1),i.onreadystatechange=function(C){};var L=document.getElementById("file-upload-form");i.open("POST",L.action,!0),i.setRequestHeader("X-File-Name",n.name),i.setRequestHeader("X-File-Size",n.size),i.setRequestHeader("Content-Type","multipart/form-data"),i.send(n)}else c("Please upload a smaller file (< 1024 MB).")};window.File&&window.FileList&&window.FileReader?(n=document.getElementById("file-upload"),i=document.getElementById("file-drag"),document.getElementById("submit-button"),n.addEventListener("change",p,!1),(new XMLHttpRequest).upload&&(i.addEventListener("dragover",t,!1),i.addEventListener("dragleave",t,!1),i.addEventListener("drop",p,!1))):document.getElementById("file-drag").style.display="none"}OnFileSubmit(){this.OnFileUploaded.emit(this.excelFile)}}return f.\u0275fac=function(h){return new(h||f)},f.\u0275cmp=e.\u0275\u0275defineComponent({type:f,selectors:[["app-file-uploader"]],inputs:{fileUploadStatus:"fileUploadStatus"},outputs:{OnFileUploaded:"OnFileUploaded"},decls:16,vars:1,consts:[["id","file-upload-form",1,"col-12","uploader"],["id","file-upload","type","file","name","fileUpload","accept",".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"],["for","file-upload","id","file-drag"],["id","file-image","src","#","alt","Preview",1,"hidden"],["id","start"],["icon","file-arrow-up"],["id","file-upload-btn","class","btn btn-primary",4,"ngIf"],["id","response",1,"hidden"],["id","messages"],["id","file-progress","value","0",1,"progress"],["id","file-upload-btn",1,"btn","btn-primary"]],template:function(h,t){1&h&&(e.\u0275\u0275elementStart(0,"form",0),e.\u0275\u0275element(1,"input",1),e.\u0275\u0275elementStart(2,"label",2),e.\u0275\u0275element(3,"img",3),e.\u0275\u0275elementStart(4,"div",4),e.\u0275\u0275element(5,"fa-icon",5),e.\u0275\u0275elementStart(6,"div"),e.\u0275\u0275text(7,"Select a jobsheet or drag here"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(8,_,2,0,"span",6),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(9,"div",7),e.\u0275\u0275element(10,"div",8),e.\u0275\u0275elementStart(11,"progress",9)(12,"span"),e.\u0275\u0275text(13,"0"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(14,"% "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(15,"br"),e.\u0275\u0275elementEnd()()),2&h&&(e.\u0275\u0275advance(8),e.\u0275\u0275property("ngIf",!t.excelFile))},dependencies:[m._Y,m.JL,s.NgIf,m.F,v.BN]}),f})()},8639:(T,y,r)=>{r.d(y,{TX:()=>f});var e=r(6895),m=r(4650),s=r(805);let f=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=m.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=m.\u0275\u0275defineInjector({imports:[e.CommonModule,s.m8]}),a})()},2435:(T,y,r)=>{r.d(y,{T:()=>E,y:()=>b});var e=r(4650),m=r(6895),s=r(9592),v=r(805),_=r(1795),u=r(7340),f=r(982);function a(d,n){1&d&&e.\u0275\u0275elementContainer(0)}function h(d,n){if(1&d){const i=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"button",5),e.\u0275\u0275listener("click",function(l){e.\u0275\u0275restoreView(i);const g=e.\u0275\u0275nextContext(2);return e.\u0275\u0275resetView(g.onCloseClick(l))})("keydown.enter",function(){e.\u0275\u0275restoreView(i);const l=e.\u0275\u0275nextContext(2);return e.\u0275\u0275resetView(l.hide())}),e.\u0275\u0275element(1,"span",6),e.\u0275\u0275elementEnd()}if(2&d){const i=e.\u0275\u0275nextContext(2);e.\u0275\u0275attribute("aria-label",i.ariaCloseLabel)}}const t=function(d,n){return{showTransitionParams:d,hideTransitionParams:n}},p=function(d,n){return{value:d,params:n}};function c(d,n){if(1&d){const i=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",1),e.\u0275\u0275listener("click",function(l){e.\u0275\u0275restoreView(i);const g=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(g.onOverlayClick(l))})("@animation.start",function(l){e.\u0275\u0275restoreView(i);const g=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(g.onAnimationStart(l))})("@animation.done",function(l){e.\u0275\u0275restoreView(i);const g=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(g.onAnimationEnd(l))}),e.\u0275\u0275elementStart(1,"div",2),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(i);const l=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(l.onContentClick())})("mousedown",function(){e.\u0275\u0275restoreView(i);const l=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(l.onContentClick())}),e.\u0275\u0275projection(2),e.\u0275\u0275template(3,a,1,0,"ng-container",3),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(4,h,2,1,"button",4),e.\u0275\u0275elementEnd()}if(2&d){const i=e.\u0275\u0275nextContext();e.\u0275\u0275classMap(i.styleClass),e.\u0275\u0275property("ngClass","p-overlaypanel p-component")("ngStyle",i.style)("@animation",e.\u0275\u0275pureFunction2(10,p,i.overlayVisible?"open":"close",e.\u0275\u0275pureFunction2(7,t,i.showTransitionOptions,i.hideTransitionOptions))),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngTemplateOutlet",i.contentTemplate),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",i.showCloseIcon)}}const O=["*"];let E=(()=>{class d{constructor(i,o,l,g,L,C){this.el=i,this.renderer=o,this.cd=l,this.zone=g,this.config=L,this.overlayService=C,this.dismissable=!0,this.appendTo="body",this.autoZIndex=!0,this.baseZIndex=0,this.focusOnShow=!0,this.showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)",this.hideTransitionOptions=".1s linear",this.onShow=new e.EventEmitter,this.onHide=new e.EventEmitter,this.overlayVisible=!1,this.render=!1,this.isOverlayAnimationInProgress=!1,this.selfClick=!1}ngAfterContentInit(){this.templates.forEach(i=>{i.getType(),this.contentTemplate=i.template,this.cd.markForCheck()})}bindDocumentClickListener(){!this.documentClickListener&&this.dismissable&&this.zone.runOutsideAngular(()=>{let i=s.p.isIOS()?"touchstart":"click";this.documentClickListener=this.renderer.listen(this.el?this.el.nativeElement.ownerDocument:"document",i,l=>{!this.container.contains(l.target)&&this.target!==l.target&&!this.target.contains(l.target)&&!this.selfClick&&this.zone.run(()=>{this.hide()}),this.selfClick=!1,this.cd.markForCheck()})})}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null,this.selfClick=!1)}toggle(i,o){this.isOverlayAnimationInProgress||(this.overlayVisible?(this.hasTargetChanged(i,o)&&(this.destroyCallback=()=>{this.show(null,o||i.currentTarget||i.target)}),this.hide()):this.show(i,o))}show(i,o){this.isOverlayAnimationInProgress||(this.target=o||i.currentTarget||i.target,this.overlayVisible=!0,this.render=!0,this.cd.markForCheck())}onOverlayClick(i){this.overlayService.add({originalEvent:i,target:this.el.nativeElement}),this.selfClick=!0}onContentClick(){this.selfClick=!0}hasTargetChanged(i,o){return null!=this.target&&this.target!==(o||i.currentTarget||i.target)}appendContainer(){this.appendTo&&("body"===this.appendTo?document.body.appendChild(this.container):s.p.appendChild(this.container,this.appendTo))}restoreAppend(){this.container&&this.appendTo&&this.el.nativeElement.appendChild(this.container)}align(){this.autoZIndex&&f.P9.set("overlay",this.container,this.baseZIndex+this.config.zIndex.overlay),s.p.absolutePosition(this.container,this.target);const i=s.p.getOffset(this.container),o=s.p.getOffset(this.target);let l=0;i.left<o.left&&(l=o.left-i.left),this.container.style.setProperty("--overlayArrowLeft",`${l}px`),i.top<o.top&&(s.p.addClass(this.container,"p-overlaypanel-flipped"),this.showCloseIcon&&(this.container.style.marginTop="30px"))}onAnimationStart(i){"open"===i.toState&&(this.container=i.element,this.onShow.emit(null),this.appendContainer(),this.align(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener(),this.focusOnShow&&this.focus(),this.overlayEventListener=o=>{this.container&&this.container.contains(o.target)&&(this.selfClick=!0)},this.overlaySubscription=this.overlayService.clickObservable.subscribe(this.overlayEventListener)),this.isOverlayAnimationInProgress=!0}onAnimationEnd(i){switch(i.toState){case"void":this.destroyCallback&&(this.destroyCallback(),this.destroyCallback=null),this.overlaySubscription&&this.overlaySubscription.unsubscribe();break;case"close":this.autoZIndex&&f.P9.clear(this.container),this.overlaySubscription&&this.overlaySubscription.unsubscribe(),this.onContainerDestroy(),this.onHide.emit({}),this.render=!1}this.isOverlayAnimationInProgress=!1}focus(){let i=s.p.findSingle(this.container,"[autofocus]");i&&this.zone.runOutsideAngular(()=>{setTimeout(()=>i.focus(),5)})}hide(){this.isOverlayAnimationInProgress||(this.overlayVisible=!1,this.cd.markForCheck())}onCloseClick(i){this.hide(),i.preventDefault()}onWindowResize(i){this.overlayVisible&&!s.p.isTouchDevice()&&this.hide()}bindDocumentResizeListener(){this.documentResizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.documentResizeListener)}unbindDocumentResizeListener(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new s.V(this.target,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}onContainerDestroy(){this.cd.destroyed||(this.target=null),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener()}ngOnDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&f.P9.clear(this.container),this.cd.destroyed||(this.target=null),this.destroyCallback=null,this.container&&(this.restoreAppend(),this.onContainerDestroy()),this.overlaySubscription&&this.overlaySubscription.unsubscribe()}}return d.\u0275fac=function(i){return new(i||d)(e.\u0275\u0275directiveInject(e.ElementRef),e.\u0275\u0275directiveInject(e.Renderer2),e.\u0275\u0275directiveInject(e.ChangeDetectorRef),e.\u0275\u0275directiveInject(e.NgZone),e.\u0275\u0275directiveInject(v.b4),e.\u0275\u0275directiveInject(v.F0))},d.\u0275cmp=e.\u0275\u0275defineComponent({type:d,selectors:[["p-overlayPanel"]],contentQueries:function(i,o,l){if(1&i&&e.\u0275\u0275contentQuery(l,v.jx,4),2&i){let g;e.\u0275\u0275queryRefresh(g=e.\u0275\u0275loadQuery())&&(o.templates=g)}},hostAttrs:[1,"p-element"],inputs:{dismissable:"dismissable",showCloseIcon:"showCloseIcon",style:"style",styleClass:"styleClass",appendTo:"appendTo",autoZIndex:"autoZIndex",ariaCloseLabel:"ariaCloseLabel",baseZIndex:"baseZIndex",focusOnShow:"focusOnShow",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onShow:"onShow",onHide:"onHide"},ngContentSelectors:O,decls:1,vars:1,consts:[[3,"ngClass","ngStyle","class","click",4,"ngIf"],[3,"ngClass","ngStyle","click"],[1,"p-overlaypanel-content",3,"click","mousedown"],[4,"ngTemplateOutlet"],["type","button","class","p-overlaypanel-close p-link","pRipple","",3,"click","keydown.enter",4,"ngIf"],["type","button","pRipple","",1,"p-overlaypanel-close","p-link",3,"click","keydown.enter"],[1,"p-overlaypanel-close-icon","pi","pi-times"]],template:function(i,o){1&i&&(e.\u0275\u0275projectionDef(),e.\u0275\u0275template(0,c,5,13,"div",0)),2&i&&e.\u0275\u0275property("ngIf",o.render)},dependencies:[m.NgClass,m.NgIf,m.NgTemplateOutlet,m.NgStyle,_.H],styles:['.p-overlaypanel{position:absolute;margin-top:10px;top:0;left:0}.p-overlaypanel-flipped{margin-top:0;margin-bottom:10px}.p-overlaypanel-close{display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-overlaypanel:after,.p-overlaypanel:before{bottom:100%;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:" ";height:0;width:0;position:absolute;pointer-events:none}.p-overlaypanel:after{border-width:8px;margin-left:-8px}.p-overlaypanel:before{border-width:10px;margin-left:-10px}.p-overlaypanel-shifted:after,.p-overlaypanel-shifted:before{left:auto;right:1.25em;margin-left:auto}.p-overlaypanel-flipped:after,.p-overlaypanel-flipped:before{bottom:auto;top:100%}.p-overlaypanel.p-overlaypanel-flipped:after{border-bottom-color:transparent}.p-overlaypanel.p-overlaypanel-flipped:before{border-bottom-color:transparent}\n'],encapsulation:2,data:{animation:[(0,u.X$)("animation",[(0,u.SB)("void",(0,u.oB)({transform:"scaleY(0.8)",opacity:0})),(0,u.SB)("close",(0,u.oB)({opacity:0})),(0,u.SB)("open",(0,u.oB)({transform:"translateY(0)",opacity:1})),(0,u.eR)("void => open",(0,u.jt)("{{showTransitionParams}}")),(0,u.eR)("open => close",(0,u.jt)("{{hideTransitionParams}}"))])]},changeDetection:0}),d})(),b=(()=>{class d{}return d.\u0275fac=function(i){return new(i||d)},d.\u0275mod=e.\u0275\u0275defineNgModule({type:d}),d.\u0275inj=e.\u0275\u0275defineInjector({imports:[m.CommonModule,_.T,v.m8,v.m8]}),d})()},3608:(T,y,r)=>{r.d(y,{u:()=>u,z:()=>f});var e=r(4650),m=r(6895),s=r(9592),v=r(982),_=r(805);let u=(()=>{class a{constructor(t,p,c){this.el=t,this.zone=p,this.config=c,this.escape=!0,this.fitContent=!0,this._tooltipOptions={tooltipPosition:"right",tooltipEvent:"hover",appendTo:"body",tooltipZIndex:"auto",escape:!0,positionTop:0,positionLeft:0}}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this.deactivate()}ngAfterViewInit(){this.zone.runOutsideAngular(()=>{if("hover"===this.getOption("tooltipEvent"))this.mouseEnterListener=this.onMouseEnter.bind(this),this.mouseLeaveListener=this.onMouseLeave.bind(this),this.clickListener=this.onClick.bind(this),this.el.nativeElement.addEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.addEventListener("mouseleave",this.mouseLeaveListener),this.el.nativeElement.addEventListener("click",this.clickListener);else if("focus"===this.getOption("tooltipEvent")){this.focusListener=this.onFocus.bind(this),this.blurListener=this.onBlur.bind(this);let t=this.getTarget(this.el.nativeElement);t.addEventListener("focus",this.focusListener),t.addEventListener("blur",this.blurListener)}})}ngOnChanges(t){t.tooltipPosition&&this.setOption({tooltipPosition:t.tooltipPosition.currentValue}),t.tooltipEvent&&this.setOption({tooltipEvent:t.tooltipEvent.currentValue}),t.appendTo&&this.setOption({appendTo:t.appendTo.currentValue}),t.positionStyle&&this.setOption({positionStyle:t.positionStyle.currentValue}),t.tooltipStyleClass&&this.setOption({tooltipStyleClass:t.tooltipStyleClass.currentValue}),t.tooltipZIndex&&this.setOption({tooltipZIndex:t.tooltipZIndex.currentValue}),t.escape&&this.setOption({escape:t.escape.currentValue}),t.showDelay&&this.setOption({showDelay:t.showDelay.currentValue}),t.hideDelay&&this.setOption({hideDelay:t.hideDelay.currentValue}),t.life&&this.setOption({life:t.life.currentValue}),t.positionTop&&this.setOption({positionTop:t.positionTop.currentValue}),t.positionLeft&&this.setOption({positionLeft:t.positionLeft.currentValue}),t.disabled&&this.setOption({disabled:t.disabled.currentValue}),t.text&&(this.setOption({tooltipLabel:t.text.currentValue}),this.active&&(t.text.currentValue?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide())),t.tooltipOptions&&(this._tooltipOptions={...this._tooltipOptions,...t.tooltipOptions.currentValue},this.deactivate(),this.active&&(this.getOption("tooltipLabel")?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide()))}onMouseEnter(t){!this.container&&!this.showTimeout&&this.activate()}onMouseLeave(t){this.deactivate()}onFocus(t){this.activate()}onBlur(t){this.deactivate()}onClick(t){this.deactivate()}activate(){if(this.active=!0,this.clearHideTimeout(),this.getOption("showDelay")?this.showTimeout=setTimeout(()=>{this.show()},this.getOption("showDelay")):this.show(),this.getOption("life")){let t=this.getOption("showDelay")?this.getOption("life")+this.getOption("showDelay"):this.getOption("life");this.hideTimeout=setTimeout(()=>{this.hide()},t)}}deactivate(){this.active=!1,this.clearShowTimeout(),this.getOption("hideDelay")?(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{this.hide()},this.getOption("hideDelay"))):this.hide()}create(){this.container&&(this.clearHideTimeout(),this.remove()),this.container=document.createElement("div");let t=document.createElement("div");t.className="p-tooltip-arrow",this.container.appendChild(t),this.tooltipText=document.createElement("div"),this.tooltipText.className="p-tooltip-text",this.updateText(),this.getOption("positionStyle")&&(this.container.style.position=this.getOption("positionStyle")),this.container.appendChild(this.tooltipText),"body"===this.getOption("appendTo")?document.body.appendChild(this.container):"target"===this.getOption("appendTo")?s.p.appendChild(this.container,this.el.nativeElement):s.p.appendChild(this.container,this.getOption("appendTo")),this.container.style.display="inline-block",this.fitContent&&(this.container.style.width="fit-content")}show(){!this.getOption("tooltipLabel")||this.getOption("disabled")||(this.create(),this.align(),s.p.fadeIn(this.container,250),"auto"===this.getOption("tooltipZIndex")?v.P9.set("tooltip",this.container,this.config.zIndex.tooltip):this.container.style.zIndex=this.getOption("tooltipZIndex"),this.bindDocumentResizeListener(),this.bindScrollListener())}hide(){"auto"===this.getOption("tooltipZIndex")&&v.P9.clear(this.container),this.remove()}updateText(){this.getOption("escape")?(this.tooltipText.innerHTML="",this.tooltipText.appendChild(document.createTextNode(this.getOption("tooltipLabel")))):this.tooltipText.innerHTML=this.getOption("tooltipLabel")}align(){switch(this.getOption("tooltipPosition")){case"top":this.alignTop(),this.isOutOfBounds()&&(this.alignBottom(),this.isOutOfBounds()&&(this.alignRight(),this.isOutOfBounds()&&this.alignLeft()));break;case"bottom":this.alignBottom(),this.isOutOfBounds()&&(this.alignTop(),this.isOutOfBounds()&&(this.alignRight(),this.isOutOfBounds()&&this.alignLeft()));break;case"left":this.alignLeft(),this.isOutOfBounds()&&(this.alignRight(),this.isOutOfBounds()&&(this.alignTop(),this.isOutOfBounds()&&this.alignBottom()));break;case"right":this.alignRight(),this.isOutOfBounds()&&(this.alignLeft(),this.isOutOfBounds()&&(this.alignTop(),this.isOutOfBounds()&&this.alignBottom()))}}getHostOffset(){if("body"===this.getOption("appendTo")||"target"===this.getOption("appendTo")){let t=this.el.nativeElement.getBoundingClientRect();return{left:t.left+s.p.getWindowScrollLeft(),top:t.top+s.p.getWindowScrollTop()}}return{left:0,top:0}}alignRight(){this.preAlign("right");let t=this.getHostOffset(),p=t.left+s.p.getOuterWidth(this.el.nativeElement),c=t.top+(s.p.getOuterHeight(this.el.nativeElement)-s.p.getOuterHeight(this.container))/2;this.container.style.left=p+this.getOption("positionLeft")+"px",this.container.style.top=c+this.getOption("positionTop")+"px"}alignLeft(){this.preAlign("left");let t=this.getHostOffset(),p=t.left-s.p.getOuterWidth(this.container),c=t.top+(s.p.getOuterHeight(this.el.nativeElement)-s.p.getOuterHeight(this.container))/2;this.container.style.left=p+this.getOption("positionLeft")+"px",this.container.style.top=c+this.getOption("positionTop")+"px"}alignTop(){this.preAlign("top");let t=this.getHostOffset(),p=t.left+(s.p.getOuterWidth(this.el.nativeElement)-s.p.getOuterWidth(this.container))/2,c=t.top-s.p.getOuterHeight(this.container);this.container.style.left=p+this.getOption("positionLeft")+"px",this.container.style.top=c+this.getOption("positionTop")+"px"}alignBottom(){this.preAlign("bottom");let t=this.getHostOffset(),p=t.left+(s.p.getOuterWidth(this.el.nativeElement)-s.p.getOuterWidth(this.container))/2,c=t.top+s.p.getOuterHeight(this.el.nativeElement);this.container.style.left=p+this.getOption("positionLeft")+"px",this.container.style.top=c+this.getOption("positionTop")+"px"}setOption(t){this._tooltipOptions={...this._tooltipOptions,...t}}getOption(t){return this._tooltipOptions[t]}getTarget(t){return s.p.hasClass(t,"p-inputwrapper")?s.p.findSingle(t,"input"):t}preAlign(t){this.container.style.left="-999px",this.container.style.top="-999px";let p="p-tooltip p-component p-tooltip-"+t;this.container.className=this.getOption("tooltipStyleClass")?p+" "+this.getOption("tooltipStyleClass"):p}isOutOfBounds(){let t=this.container.getBoundingClientRect(),p=t.top,c=t.left,O=s.p.getOuterWidth(this.container),E=s.p.getOuterHeight(this.container),b=s.p.getViewport();return c+O>b.width||c<0||p<0||p+E>b.height}onWindowResize(t){this.hide()}bindDocumentResizeListener(){this.zone.runOutsideAngular(()=>{this.resizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.resizeListener)})}unbindDocumentResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new s.V(this.el.nativeElement,()=>{this.container&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unbindEvents(){if("hover"===this.getOption("tooltipEvent"))this.el.nativeElement.removeEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.removeEventListener("mouseleave",this.mouseLeaveListener),this.el.nativeElement.removeEventListener("click",this.clickListener);else if("focus"===this.getOption("tooltipEvent")){let t=this.getTarget(this.el.nativeElement);t.removeEventListener("focus",this.focusListener),t.removeEventListener("blur",this.blurListener)}this.unbindDocumentResizeListener()}remove(){this.container&&this.container.parentElement&&("body"===this.getOption("appendTo")?document.body.removeChild(this.container):"target"===this.getOption("appendTo")?this.el.nativeElement.removeChild(this.container):s.p.removeChild(this.container,this.getOption("appendTo"))),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.clearTimeouts(),this.container=null,this.scrollHandler=null}clearShowTimeout(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=null)}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}clearTimeouts(){this.clearShowTimeout(),this.clearHideTimeout()}ngOnDestroy(){this.unbindEvents(),this.container&&v.P9.clear(this.container),this.remove(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null)}}return a.\u0275fac=function(t){return new(t||a)(e.\u0275\u0275directiveInject(e.ElementRef),e.\u0275\u0275directiveInject(e.NgZone),e.\u0275\u0275directiveInject(_.b4))},a.\u0275dir=e.\u0275\u0275defineDirective({type:a,selectors:[["","pTooltip",""]],hostAttrs:[1,"p-element"],inputs:{tooltipPosition:"tooltipPosition",tooltipEvent:"tooltipEvent",appendTo:"appendTo",positionStyle:"positionStyle",tooltipStyleClass:"tooltipStyleClass",tooltipZIndex:"tooltipZIndex",escape:"escape",showDelay:"showDelay",hideDelay:"hideDelay",life:"life",positionTop:"positionTop",positionLeft:"positionLeft",fitContent:"fitContent",text:["pTooltip","text"],disabled:["tooltipDisabled","disabled"],tooltipOptions:"tooltipOptions"},features:[e.\u0275\u0275NgOnChangesFeature]}),a})(),f=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[m.CommonModule]}),a})()}}]);
"use strict";(self.webpackChunktatasteel=self.webpackChunktatasteel||[]).push([[700],{5700:(H,f,c)=>{c.d(f,{b:()=>z,l:()=>Q});var t=c(4650),h=c(805),m=c(1795),r=c(6895),_=c(982);const g=["itemsContainer"];function v(s,l){1&s&&t.\u0275\u0275elementContainer(0)}function C(s,l){if(1&s&&(t.\u0275\u0275elementStart(0,"div",11),t.\u0275\u0275projection(1),t.\u0275\u0275template(2,v,1,0,"ng-container",12),t.\u0275\u0275elementEnd()),2&s){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(2),t.\u0275\u0275property("ngTemplateOutlet",e.headerTemplate)}}const y=function(s){return{"p-carousel-prev p-link":!0,"p-disabled":s}},S=function(s,l){return{"p-carousel-prev-icon pi":!0,"pi-chevron-left":s,"pi-chevron-up":l}};function b(s,l){if(1&s){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",13),t.\u0275\u0275listener("click",function(n){t.\u0275\u0275restoreView(e);const a=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(a.navBackward(n))}),t.\u0275\u0275element(1,"span",2),t.\u0275\u0275elementEnd()}if(2&s){const e=t.\u0275\u0275nextContext();t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction1(3,y,e.isBackwardNavDisabled()))("disabled",e.isBackwardNavDisabled()),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction2(5,S,!e.isVertical(),e.isVertical()))}}function I(s,l){1&s&&t.\u0275\u0275elementContainer(0)}const d=function(s,l,e){return{"p-carousel-item p-carousel-item-cloned":!0,"p-carousel-item-active":s,"p-carousel-item-start":l,"p-carousel-item-end":e}},p=function(s){return{$implicit:s}};function w(s,l){if(1&s&&(t.\u0275\u0275elementStart(0,"div",2),t.\u0275\u0275template(1,I,1,0,"ng-container",14),t.\u0275\u0275elementEnd()),2&s){const e=l.$implicit,i=l.index,n=t.\u0275\u0275nextContext();t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction3(3,d,-1*n.totalShiftedItems===n.value.length,0===i,n.clonedItemsForStarting.length-1===i)),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngTemplateOutlet",n.itemTemplate)("ngTemplateOutletContext",t.\u0275\u0275pureFunction1(7,p,e))}}function V(s,l){1&s&&t.\u0275\u0275elementContainer(0)}const T=function(s,l,e){return{"p-carousel-item":!0,"p-carousel-item-active":s,"p-carousel-item-start":l,"p-carousel-item-end":e}};function x(s,l){if(1&s&&(t.\u0275\u0275elementStart(0,"div",2),t.\u0275\u0275template(1,V,1,0,"ng-container",14),t.\u0275\u0275elementEnd()),2&s){const e=l.$implicit,i=l.index,n=t.\u0275\u0275nextContext();t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction3(3,T,n.firstIndex()<=i&&n.lastIndex()>=i,n.firstIndex()===i,n.lastIndex()===i)),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngTemplateOutlet",n.itemTemplate)("ngTemplateOutletContext",t.\u0275\u0275pureFunction1(7,p,e))}}function D(s,l){1&s&&t.\u0275\u0275elementContainer(0)}function E(s,l){if(1&s&&(t.\u0275\u0275elementStart(0,"div",2),t.\u0275\u0275template(1,D,1,0,"ng-container",14),t.\u0275\u0275elementEnd()),2&s){const e=l.$implicit,i=l.index,n=t.\u0275\u0275nextContext();t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction3(3,d,-1*n.totalShiftedItems===n.numVisible,0===i,n.clonedItemsForFinishing.length-1===i)),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngTemplateOutlet",n.itemTemplate)("ngTemplateOutletContext",t.\u0275\u0275pureFunction1(7,p,e))}}const O=function(s){return{"p-carousel-next p-link":!0,"p-disabled":s}},F=function(s,l){return{"p-carousel-prev-icon pi":!0,"pi-chevron-right":s,"pi-chevron-down":l}};function A(s,l){if(1&s){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",13),t.\u0275\u0275listener("click",function(n){t.\u0275\u0275restoreView(e);const a=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(a.navForward(n))}),t.\u0275\u0275element(1,"span",2),t.\u0275\u0275elementEnd()}if(2&s){const e=t.\u0275\u0275nextContext();t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction1(3,O,e.isForwardNavDisabled()))("disabled",e.isForwardNavDisabled()),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction2(5,F,!e.isVertical(),e.isVertical()))}}const k=function(s){return{"p-carousel-indicator":!0,"p-highlight":s}};function M(s,l){if(1&s){const e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"li",2)(1,"button",15),t.\u0275\u0275listener("click",function(n){const o=t.\u0275\u0275restoreView(e).index,u=t.\u0275\u0275nextContext(2);return t.\u0275\u0275resetView(u.onDotClick(n,o))}),t.\u0275\u0275elementEnd()()}if(2&s){const e=l.index,i=t.\u0275\u0275nextContext(2);t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction1(5,k,i._page===e)),t.\u0275\u0275advance(1),t.\u0275\u0275classMap(i.indicatorStyleClass),t.\u0275\u0275property("ngClass","p-link")("ngStyle",i.indicatorStyle)}}function N(s,l){if(1&s&&(t.\u0275\u0275elementStart(0,"ul",0),t.\u0275\u0275template(1,M,2,7,"li",8),t.\u0275\u0275elementEnd()),2&s){const e=t.\u0275\u0275nextContext();t.\u0275\u0275classMap(e.indicatorsContentClass),t.\u0275\u0275property("ngClass","p-carousel-indicators p-reset")("ngStyle",e.indicatorsContentStyle),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",e.totalDotsArray())}}function P(s,l){1&s&&t.\u0275\u0275elementContainer(0)}function R(s,l){if(1&s&&(t.\u0275\u0275elementStart(0,"div",16),t.\u0275\u0275projection(1,1),t.\u0275\u0275template(2,P,1,0,"ng-container",12),t.\u0275\u0275elementEnd()),2&s){const e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(2),t.\u0275\u0275property("ngTemplateOutlet",e.footerTemplate)}}const L=[[["p-header"]],[["p-footer"]]],j=function(s,l){return{"p-carousel p-component":!0,"p-carousel-vertical":s,"p-carousel-horizontal":l}},$=function(s){return{height:s}},B=["p-header","p-footer"];let Q=(()=>{class s{constructor(e,i,n,a,o){this.el=e,this.zone=i,this.cd=n,this.renderer=a,this.document=o,this.orientation="horizontal",this.verticalViewPortHeight="300px",this.contentClass="",this.indicatorsContentClass="",this.indicatorStyleClass="",this.circular=!1,this.showIndicators=!0,this.showNavigators=!0,this.autoplayInterval=0,this.onPage=new t.EventEmitter,this._numVisible=1,this._numScroll=1,this._oldNumScroll=0,this.prevState={numScroll:0,numVisible:0,value:[]},this.defaultNumScroll=1,this.defaultNumVisible=1,this._page=0,this.isRemainingItemsAdded=!1,this.remainingItems=0,this.swipeThreshold=20,this.totalShiftedItems=this.page*this.numScroll*-1}get page(){return this._page}set page(e){this.isCreated&&e!==this._page&&(this.autoplayInterval&&(this.stopAutoplay(),this.allowAutoplay=!1),e>this._page&&e<=this.totalDots()-1?this.step(-1,e):e<this._page&&this.step(1,e)),this._page=e}get numVisible(){return this._numVisible}set numVisible(e){this._numVisible=e}get numScroll(){return this._numVisible}set numScroll(e){this._numScroll=e}get value(){return this._value}set value(e){this._value=e}ngOnChanges(e){e.value&&this.circular&&this._value&&this.setCloneItems(),this.isCreated&&(e.numVisible&&(this.responsiveOptions&&(this.defaultNumVisible=this.numVisible),this.isCircular()&&this.setCloneItems(),this.createStyle(),this.calculatePosition()),e.numScroll&&this.responsiveOptions&&(this.defaultNumScroll=this.numScroll))}ngAfterContentInit(){this.id=(0,_.Th)(),this.allowAutoplay=!!this.autoplayInterval,this.circular&&this.setCloneItems(),this.responsiveOptions&&(this.defaultNumScroll=this._numScroll,this.defaultNumVisible=this._numVisible),this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners(),this.templates.forEach(e=>{switch(e.getType()){case"item":default:this.itemTemplate=e.template;break;case"header":this.headerTemplate=e.template;break;case"footer":this.footerTemplate=e.template}})}ngAfterContentChecked(){const e=this.isCircular();let i=this.totalShiftedItems;if(this.value&&this.itemsContainer&&(this.prevState.numScroll!==this._numScroll||this.prevState.numVisible!==this._numVisible||this.prevState.value.length!==this.value.length)){this.autoplayInterval&&this.stopAutoplay(),this.remainingItems=(this.value.length-this._numVisible)%this._numScroll;let n=this._page;0!==this.totalDots()&&n>=this.totalDots()&&(n=this.totalDots()-1,this._page=n,this.onPage.emit({page:this.page})),i=n*this._numScroll*-1,e&&(i-=this._numVisible),n===this.totalDots()-1&&this.remainingItems>0?(i+=-1*this.remainingItems+this._numScroll,this.isRemainingItemsAdded=!0):this.isRemainingItemsAdded=!1,i!==this.totalShiftedItems&&(this.totalShiftedItems=i),this._oldNumScroll=this._numScroll,this.prevState.numScroll=this._numScroll,this.prevState.numVisible=this._numVisible,this.prevState.value=[...this._value],this.totalDots()>0&&this.itemsContainer.nativeElement&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${i*(100/this._numVisible)}%, 0)`:`translate3d(${i*(100/this._numVisible)}%, 0, 0)`),this.isCreated=!0,this.autoplayInterval&&this.isAutoplay()&&this.startAutoplay()}e&&(0===this.page?i=-1*this._numVisible:0===i&&(i=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),i!==this.totalShiftedItems&&(this.totalShiftedItems=i))}createStyle(){this.carouselStyle||(this.carouselStyle=this.renderer.createElement("style"),this.carouselStyle.type="text/css",this.renderer.appendChild(this.document.head,this.carouselStyle));let e=`\n            #${this.id} .p-carousel-item {\n\t\t\t\tflex: 1 0 ${100/this.numVisible}%\n\t\t\t}\n        `;if(this.responsiveOptions){this.responsiveOptions.sort((i,n)=>{const a=i.breakpoint,o=n.breakpoint;let u=null;return u=null==a&&null!=o?-1:null!=a&&null==o?1:null==a&&null==o?0:"string"==typeof a&&"string"==typeof o?a.localeCompare(o,void 0,{numeric:!0}):a<o?-1:a>o?1:0,-1*u});for(let i=0;i<this.responsiveOptions.length;i++){let n=this.responsiveOptions[i];e+=`\n                    @media screen and (max-width: ${n.breakpoint}) {\n                        #${this.id} .p-carousel-item {\n                            flex: 1 0 ${100/n.numVisible}%\n                        }\n                    }\n                `}}this.carouselStyle.innerHTML=e}calculatePosition(){if(this.responsiveOptions){let e={numVisible:this.defaultNumVisible,numScroll:this.defaultNumScroll};if(typeof window<"u"){let i=window.innerWidth;for(let n=0;n<this.responsiveOptions.length;n++){let a=this.responsiveOptions[n];parseInt(a.breakpoint,10)>=i&&(e=a)}}if(this._numScroll!==e.numScroll){let i=this._page;i=Math.floor(i*this._numScroll/e.numScroll);let n=e.numScroll*this.page*-1;this.isCircular()&&(n-=e.numVisible),this.totalShiftedItems=n,this._numScroll=e.numScroll,this._page=i,this.onPage.emit({page:this.page})}this._numVisible!==e.numVisible&&(this._numVisible=e.numVisible,this.setCloneItems()),this.cd.markForCheck()}}setCloneItems(){this.clonedItemsForStarting=[],this.clonedItemsForFinishing=[],this.isCircular()&&(this.clonedItemsForStarting.push(...this.value.slice(-1*this._numVisible)),this.clonedItemsForFinishing.push(...this.value.slice(0,this._numVisible)))}firstIndex(){return this.isCircular()?-1*(this.totalShiftedItems+this.numVisible):-1*this.totalShiftedItems}lastIndex(){return this.firstIndex()+this.numVisible-1}totalDots(){return this.value?Math.ceil((this.value.length-this._numVisible)/this._numScroll)+1:0}totalDotsArray(){const e=this.totalDots();return e<=0?[]:Array(e).fill(0)}isVertical(){return"vertical"===this.orientation}isCircular(){return this.circular&&this.value&&this.value.length>=this.numVisible}isAutoplay(){return this.autoplayInterval&&this.allowAutoplay}isForwardNavDisabled(){return this.isEmpty()||this._page>=this.totalDots()-1&&!this.isCircular()}isBackwardNavDisabled(){return this.isEmpty()||this._page<=0&&!this.isCircular()}isEmpty(){return!this.value||0===this.value.length}navForward(e,i){(this.isCircular()||this._page<this.totalDots()-1)&&this.step(-1,i),this.autoplayInterval&&(this.stopAutoplay(),this.allowAutoplay=!1),e&&e.cancelable&&e.preventDefault()}navBackward(e,i){(this.isCircular()||0!==this._page)&&this.step(1,i),this.autoplayInterval&&(this.stopAutoplay(),this.allowAutoplay=!1),e&&e.cancelable&&e.preventDefault()}onDotClick(e,i){let n=this._page;this.autoplayInterval&&(this.stopAutoplay(),this.allowAutoplay=!1),i>n?this.navForward(e,i):i<n&&this.navBackward(e,i)}step(e,i){let n=this.totalShiftedItems;const a=this.isCircular();null!=i?(n=this._numScroll*i*-1,a&&(n-=this._numVisible),this.isRemainingItemsAdded=!1):(n+=this._numScroll*e,this.isRemainingItemsAdded&&(n+=this.remainingItems-this._numScroll*e,this.isRemainingItemsAdded=!1),i=Math.abs(Math.floor((a?n+this._numVisible:n)/this._numScroll))),a&&this.page===this.totalDots()-1&&-1===e?(n=-1*(this.value.length+this._numVisible),i=0):a&&0===this.page&&1===e?(n=0,i=this.totalDots()-1):i===this.totalDots()-1&&this.remainingItems>0&&(n+=-1*this.remainingItems-this._numScroll*e,this.isRemainingItemsAdded=!0),this.itemsContainer&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${n*(100/this._numVisible)}%, 0)`:`translate3d(${n*(100/this._numVisible)}%, 0, 0)`,this.itemsContainer.nativeElement.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=n,this._page=i,this.onPage.emit({page:this.page})}startAutoplay(){this.interval=setInterval(()=>{this.totalDots()>0&&(this.page===this.totalDots()-1?this.step(-1,0):this.step(-1,this.page+1))},this.autoplayInterval)}stopAutoplay(){this.interval&&clearInterval(this.interval)}onTransitionEnd(){this.itemsContainer&&(this.itemsContainer.nativeElement.style.transition="",(0===this.page||this.page===this.totalDots()-1)&&this.isCircular()&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${this.totalShiftedItems*(100/this._numVisible)}%, 0)`:`translate3d(${this.totalShiftedItems*(100/this._numVisible)}%, 0, 0)`))}onTouchStart(e){let i=e.changedTouches[0];this.startPos={x:i.pageX,y:i.pageY}}onTouchMove(e){e.cancelable&&e.preventDefault()}onTouchEnd(e){let i=e.changedTouches[0];this.isVertical()?this.changePageOnTouch(e,i.pageY-this.startPos.y):this.changePageOnTouch(e,i.pageX-this.startPos.x)}changePageOnTouch(e,i){Math.abs(i)>this.swipeThreshold&&(i<0?this.navForward(e):this.navBackward(e))}bindDocumentListeners(){!this.documentResizeListener&&typeof window<"u"&&(this.documentResizeListener=e=>{this.calculatePosition()},window.addEventListener("resize",this.documentResizeListener))}unbindDocumentListeners(){this.documentResizeListener&&typeof window<"u"&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)}ngOnDestroy(){this.responsiveOptions&&this.unbindDocumentListeners(),this.autoplayInterval&&this.stopAutoplay()}}return s.\u0275fac=function(e){return new(e||s)(t.\u0275\u0275directiveInject(t.ElementRef),t.\u0275\u0275directiveInject(t.NgZone),t.\u0275\u0275directiveInject(t.ChangeDetectorRef),t.\u0275\u0275directiveInject(t.Renderer2),t.\u0275\u0275directiveInject(r.DOCUMENT))},s.\u0275cmp=t.\u0275\u0275defineComponent({type:s,selectors:[["p-carousel"]],contentQueries:function(e,i,n){if(1&e&&(t.\u0275\u0275contentQuery(n,h.h4,5),t.\u0275\u0275contentQuery(n,h.$_,5),t.\u0275\u0275contentQuery(n,h.jx,4)),2&e){let a;t.\u0275\u0275queryRefresh(a=t.\u0275\u0275loadQuery())&&(i.headerFacet=a.first),t.\u0275\u0275queryRefresh(a=t.\u0275\u0275loadQuery())&&(i.footerFacet=a.first),t.\u0275\u0275queryRefresh(a=t.\u0275\u0275loadQuery())&&(i.templates=a)}},viewQuery:function(e,i){if(1&e&&t.\u0275\u0275viewQuery(g,5),2&e){let n;t.\u0275\u0275queryRefresh(n=t.\u0275\u0275loadQuery())&&(i.itemsContainer=n.first)}},hostAttrs:[1,"p-element"],inputs:{page:"page",numVisible:"numVisible",numScroll:"numScroll",responsiveOptions:"responsiveOptions",orientation:"orientation",verticalViewPortHeight:"verticalViewPortHeight",contentClass:"contentClass",indicatorsContentClass:"indicatorsContentClass",indicatorsContentStyle:"indicatorsContentStyle",indicatorStyleClass:"indicatorStyleClass",indicatorStyle:"indicatorStyle",value:"value",circular:"circular",showIndicators:"showIndicators",showNavigators:"showNavigators",autoplayInterval:"autoplayInterval",style:"style",styleClass:"styleClass"},outputs:{onPage:"onPage"},features:[t.\u0275\u0275NgOnChangesFeature],ngContentSelectors:B,decls:14,vars:22,consts:[[3,"ngClass","ngStyle"],["class","p-carousel-header",4,"ngIf"],[3,"ngClass"],[1,"p-carousel-container"],["type","button","pRipple","",3,"ngClass","disabled","click",4,"ngIf"],[1,"p-carousel-items-content",3,"ngStyle"],[1,"p-carousel-items-container",3,"transitionend","touchend","touchstart","touchmove"],["itemsContainer",""],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass","class","ngStyle",4,"ngIf"],["class","p-carousel-footer",4,"ngIf"],[1,"p-carousel-header"],[4,"ngTemplateOutlet"],["type","button","pRipple","",3,"ngClass","disabled","click"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["type","button",3,"ngClass","ngStyle","click"],[1,"p-carousel-footer"]],template:function(e,i){1&e&&(t.\u0275\u0275projectionDef(L),t.\u0275\u0275elementStart(0,"div",0),t.\u0275\u0275template(1,C,3,1,"div",1),t.\u0275\u0275elementStart(2,"div",2)(3,"div",3),t.\u0275\u0275template(4,b,2,8,"button",4),t.\u0275\u0275elementStart(5,"div",5)(6,"div",6,7),t.\u0275\u0275listener("transitionend",function(){return i.onTransitionEnd()})("touchend",function(a){return i.onTouchEnd(a)})("touchstart",function(a){return i.onTouchStart(a)})("touchmove",function(a){return i.onTouchMove(a)}),t.\u0275\u0275template(8,w,2,9,"div",8),t.\u0275\u0275template(9,x,2,9,"div",8),t.\u0275\u0275template(10,E,2,9,"div",8),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(11,A,2,8,"button",4),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(12,N,2,5,"ul",9),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(13,R,3,1,"div",10),t.\u0275\u0275elementEnd()),2&e&&(t.\u0275\u0275classMap(i.styleClass),t.\u0275\u0275property("ngClass",t.\u0275\u0275pureFunction2(17,j,i.isVertical(),!i.isVertical()))("ngStyle",i.style),t.\u0275\u0275attribute("id",i.id),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.headerFacet||i.headerTemplate),t.\u0275\u0275advance(1),t.\u0275\u0275classMap(i.contentClass),t.\u0275\u0275property("ngClass","p-carousel-content"),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",i.showNavigators),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngStyle",t.\u0275\u0275pureFunction1(20,$,i.isVertical()?i.verticalViewPortHeight:"auto")),t.\u0275\u0275advance(3),t.\u0275\u0275property("ngForOf",i.clonedItemsForStarting),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",i.value),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngForOf",i.clonedItemsForFinishing),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.showNavigators),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.showIndicators),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.footerFacet||i.footerTemplate))},dependencies:[r.NgClass,r.NgForOf,r.NgIf,r.NgTemplateOutlet,r.NgStyle,m.H],styles:[".p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}\n"],encapsulation:2,changeDetection:0}),s})(),z=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.\u0275\u0275defineNgModule({type:s}),s.\u0275inj=t.\u0275\u0275defineInjector({imports:[r.CommonModule,h.m8,m.T,r.CommonModule,h.m8]}),s})()}}]);
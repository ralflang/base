(function(){var j=1,i=2,p=4,o={id:[{type:j,name:"id"}],classid:[{type:j,name:"classid"}],codebase:[{type:j,name:"codebase"}],pluginspage:[{type:p,name:"pluginspage"}],src:[{type:i,name:"movie"},{type:p,name:"src"}],name:[{type:p,name:"name"}],align:[{type:j,name:"align"}],title:[{type:j,name:"title"},{type:p,name:"title"}],"class":[{type:j,name:"class"},{type:p,name:"class"}],width:[{type:j,name:"width"},{type:p,name:"width"}],height:[{type:j,name:"height"},{type:p,name:"height"}],hSpace:[{type:j,name:"hSpace"},{type:p,name:"hSpace"}],vSpace:[{type:j,name:"vSpace"},{type:p,name:"vSpace"}],style:[{type:j,name:"style"},{type:p,name:"style"}],type:[{type:p,name:"type"}]},n=["play","loop","menu","quality","scale","salign","wmode","bgcolor","base","flashvars","allowScriptAccess","allowFullScreen"];for(var m=0;m<n.length;m++){o[n[m]]=[{type:p,name:n[m]},{type:i,name:n[m]}]}n=["allowFullScreen","play","loop","menu"];for(m=0;m<n.length;m++){o[n[m]][0]["default"]=o[n[m]][1]["default"]=true}function l(r,h,g){var a=this;var f=o[a.id];if(!f){return}var e=a instanceof CKEDITOR.ui.dialog.checkbox;for(var d=0;d<f.length;d++){var c=f[d];switch(c.type){case j:if(!r){continue}if(r.getAttribute(c.name)!==null){var b=r.getAttribute(c.name);if(e){a.setValue(b.toLowerCase()=="true")}else{a.setValue(b)}return}else{if(e){a.setValue(!!c["default"])}}break;case i:if(!r){continue}if(c.name in g){b=g[c.name];if(e){a.setValue(b.toLowerCase()=="true")}else{a.setValue(b)}return}else{if(e){a.setValue(!!c["default"])}}break;case p:if(!h){continue}if(h.getAttribute(c.name)){b=h.getAttribute(c.name);if(e){a.setValue(b.toLowerCase()=="true")}else{a.setValue(b)}return}else{if(e){a.setValue(!!c["default"])}}}}}function k(u,t,h){var v=this;var g=o[v.id];if(!g){return}var f=v.getValue()==="",e=v instanceof CKEDITOR.ui.dialog.checkbox;for(var d=0;d<g.length;d++){var c=g[d];switch(c.type){case j:if(!u){continue}var b=v.getValue();if(f||e&&b===c["default"]){u.removeAttribute(c.name)}else{u.setAttribute(c.name,b)}break;case i:if(!u){continue}b=v.getValue();if(f||e&&b===c["default"]){if(c.name in h){h[c.name].remove()}}else{if(c.name in h){h[c.name].setAttribute("value",b)}else{var a=CKEDITOR.dom.element.createFromHtml("<cke:param></cke:param>",u.getDocument());a.setAttributes({name:c.name,value:b});if(u.getChildCount()<1){a.appendTo(u)}else{a.insertBefore(u.getFirst())}}}break;case p:if(!t){continue}b=v.getValue();if(f||e&&b===c["default"]){t.removeAttribute(c.name)}else{t.setAttribute(c.name,b)}}}}CKEDITOR.dialog.add("flash",function(e){var d=!e.config.flashEmbedTagOnly,c=e.config.flashAddEmbedTag||e.config.flashEmbedTagOnly,b,a="<div>"+CKEDITOR.tools.htmlEncode(e.lang.common.preview)+'<br><div id="FlashPreviewLoader'+CKEDITOR.tools.getNextNumber()+'" style="display:none"><div class="loading">&nbsp;</div></div><div id="FlashPreviewBox'+CKEDITOR.tools.getNextNumber()+'" class="FlashPreviewBox"></div></div>';return{title:e.lang.flash.title,minWidth:420,minHeight:310,onShow:function(){var C=this;C.fakeImage=C.objectNode=C.embedNode=null;b=new CKEDITOR.dom.element("embeded",e.document);var B=C.getSelectedElement();if(B&&B.getAttribute("_cke_real_element_type")&&B.getAttribute("_cke_real_element_type")=="flash"){C.fakeImage=B;var A=e.restoreRealElement(B),h=null,g=null,f={};if(A.getName()=="cke:object"){h=A;var J=h.getElementsByTag("embed","cke");if(J.count()>0){g=J.getItem(0)}var I=h.getElementsByTag("param","cke");for(var H=0,G=I.count();H<G;H++){var F=I.getItem(H),E=F.getAttribute("name"),D=F.getAttribute("value");f[E]=D}}else{if(A.getName()=="cke:embed"){g=A}}C.objectNode=h;C.embedNode=g;C.setupContent(h,g,f,B)}},onOk:function(){var A=this;var z=null,y=null,h=null;if(!A.fakeImage){if(d){z=CKEDITOR.dom.element.createFromHtml("<cke:object></cke:object>",e.document);var g={classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"};z.setAttributes(g)}if(c){y=CKEDITOR.dom.element.createFromHtml("<cke:embed></cke:embed>",e.document);y.setAttributes({type:"application/x-shockwave-flash",pluginspage:"http://www.macromedia.com/go/getflashplayer"});if(z){y.appendTo(z)}}}else{z=A.objectNode;y=A.embedNode}if(z){h={};var f=z.getElementsByTag("param","cke");for(var F=0,E=f.count();F<E;F++){h[f.getItem(F).getAttribute("name")]=f.getItem(F)}}var D={},C={};A.commitContent(z,y,h,D,C);var B=e.createFakeElement(z||y,"cke_flash","flash",true);B.setAttributes(C);B.setStyles(D);if(A.fakeImage){B.replace(A.fakeImage);e.getSelection().selectElement(B)}else{e.insertElement(B)}},onHide:function(){if(this.preview){this.preview.setHtml("")}},contents:[{id:"info",label:e.lang.common.generalTab,accessKey:"I",elements:[{type:"vbox",padding:0,children:[{type:"hbox",widths:["280px","110px"],align:"right",children:[{id:"src",type:"text",label:e.lang.common.url,required:true,validate:CKEDITOR.dialog.validate.notEmpty(e.lang.flash.validateSrc),setup:l,commit:k,onLoad:function(){var g=this.getDialog(),f=function(h){b.setAttribute("src",h);g.preview.setHtml('<embed height="100%" width="100%" src="'+CKEDITOR.tools.htmlEncode(b.getAttribute("src"))+'" type="application/x-shockwave-flash"></embed>')};g.preview=g.getContentElement("info","preview").getElement().getChild(3);this.on("change",function(h){if(h.data&&h.data.value){f(h.data.value)}});this.getInputElement().on("change",function(h){f(this.getValue())},this)}},{type:"button",id:"browse",filebrowser:"info:src",hidden:true,style:"display:inline-block;margin-top:10px;",label:e.lang.common.browseServer}]}]},{type:"hbox",widths:["25%","25%","25%","25%","25%"],children:[{type:"text",id:"width",style:"width:95px",label:e.lang.flash.width,validate:CKEDITOR.dialog.validate.integer(e.lang.flash.validateWidth),setup:function(t,s,h,g){l.apply(this,arguments);if(g){var f=parseInt(g.$.style.width,10);if(!isNaN(f)){this.setValue(f)}}},commit:function(r,h,g,f){k.apply(this,arguments);if(this.getValue()){f.width=this.getValue()+"px"}}},{type:"text",id:"height",style:"width:95px",label:e.lang.flash.height,validate:CKEDITOR.dialog.validate.integer(e.lang.flash.validateHeight),setup:function(t,s,h,g){l.apply(this,arguments);if(g){var f=parseInt(g.$.style.height,10);if(!isNaN(f)){this.setValue(f)}}},commit:function(r,h,g,f){k.apply(this,arguments);if(this.getValue()){f.height=this.getValue()+"px"}}},{type:"text",id:"hSpace",style:"width:95px",label:e.lang.flash.hSpace,validate:CKEDITOR.dialog.validate.integer(e.lang.flash.validateHSpace),setup:l,commit:k},{type:"text",id:"vSpace",style:"width:95px",label:e.lang.flash.vSpace,validate:CKEDITOR.dialog.validate.integer(e.lang.flash.validateVSpace),setup:l,commit:k}]},{type:"vbox",children:[{type:"html",id:"preview",style:"width:95%;",html:a}]}]},{id:"Upload",hidden:true,filebrowser:"uploadButton",label:e.lang.common.upload,elements:[{type:"file",id:"upload",label:e.lang.common.upload,size:38},{type:"fileButton",id:"uploadButton",label:e.lang.common.uploadSubmit,filebrowser:"info:src","for":["Upload","upload"]}]},{id:"properties",label:e.lang.flash.propertiesTab,elements:[{type:"hbox",widths:["50%","50%"],children:[{id:"scale",type:"select",label:e.lang.flash.scale,"default":"",style:"width : 100%;",items:[[e.lang.common.notSet,""],[e.lang.flash.scaleAll,"showall"],[e.lang.flash.scaleNoBorder,"noborder"],[e.lang.flash.scaleFit,"exactfit"]],setup:l,commit:k},{id:"allowScriptAccess",type:"select",label:e.lang.flash.access,"default":"",style:"width : 100%;",items:[[e.lang.common.notSet,""],[e.lang.flash.accessAlways,"always"],[e.lang.flash.accessSameDomain,"samedomain"],[e.lang.flash.accessNever,"never"]],setup:l,commit:k}]},{type:"hbox",widths:["50%","50%"],children:[{id:"wmode",type:"select",label:e.lang.flash.windowMode,"default":"",style:"width : 100%;",items:[[e.lang.common.notSet,""],[e.lang.flash.windowModeWindow,"window"],[e.lang.flash.windowModeOpaque,"opaque"],[e.lang.flash.windowModeTransparent,"transparent"]],setup:l,commit:k},{id:"quality",type:"select",label:e.lang.flash.quality,"default":"high",style:"width : 100%;",items:[[e.lang.common.notSet,""],[e.lang.flash.qualityBest,"best"],[e.lang.flash.qualityHigh,"high"],[e.lang.flash.qualityAutoHigh,"autohigh"],[e.lang.flash.qualityMedium,"medium"],[e.lang.flash.qualityAutoLow,"autolow"],[e.lang.flash.qualityLow,"low"]],setup:l,commit:k}]},{type:"hbox",widths:["50%","50%"],children:[{id:"align",type:"select",label:e.lang.flash.align,"default":"",style:"width : 100%;",items:[[e.lang.common.notSet,""],[e.lang.flash.alignLeft,"left"],[e.lang.flash.alignAbsBottom,"absBottom"],[e.lang.flash.alignAbsMiddle,"absMiddle"],[e.lang.flash.alignBaseline,"baseline"],[e.lang.flash.alignBottom,"bottom"],[e.lang.flash.alignMiddle,"middle"],[e.lang.flash.alignRight,"right"],[e.lang.flash.alignTextTop,"textTop"],[e.lang.flash.alignTop,"top"]],setup:l,commit:function(v,u,t,h,g){var f=this.getValue();k.apply(this,arguments);f&&(g.align=f)}},{type:"html",html:"<div></div>"}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(e.lang.flash.flashvars),children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"menu",label:e.lang.flash.chkMenu,"default":true,setup:l,commit:k},{type:"checkbox",id:"play",label:e.lang.flash.chkPlay,"default":true,setup:l,commit:k},{type:"checkbox",id:"loop",label:e.lang.flash.chkLoop,"default":true,setup:l,commit:k},{type:"checkbox",id:"allowFullScreen",label:e.lang.flash.chkFull,"default":true,setup:l,commit:k}]}]}]},{id:"advanced",label:e.lang.common.advancedTab,elements:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",id:"id",label:e.lang.common.id,setup:l,commit:k},{type:"text",id:"title",label:e.lang.common.advisoryTitle,setup:l,commit:k}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",id:"bgcolor",label:e.lang.flash.bgcolor,setup:l,commit:k},{type:"text",id:"class",label:e.lang.common.cssClass,setup:l,commit:k}]},{type:"text",id:"style",label:e.lang.common.cssStyle,setup:l,commit:k}]}]}})})();
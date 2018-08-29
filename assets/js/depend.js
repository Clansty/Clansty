/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */
 (function(h){function l(H,I,J){var K=this;return this.on("click.pjax",H,function(M){var L=h.extend({},u(I,J));if(!L.container){L.container=h(this).attr("data-pjax")||K}m(M,L)})}function m(M,I,J){J=u(I,J);var L=M.currentTarget;if(L.tagName.toUpperCase()!=="A"){throw"$.fn.pjax or $.pjax.click requires an anchor element"}if(M.which>1||M.metaKey||M.ctrlKey||M.shiftKey||M.altKey){return}if(location.protocol!==L.protocol||location.hostname!==L.hostname){return}if(L.href.indexOf("#")>-1&&z(L)==z(location)){return}if(M.isDefaultPrevented()){return}var N={url:L.href,container:h(L).attr("data-pjax"),target:L};var K=h.extend({},N,J);var H=h.Event("pjax:click");h(L).trigger(H,[K]);if(!H.isDefaultPrevented()){C(K);M.preventDefault();h(L).trigger("pjax:clicked",[K])}}function s(K,H,I){I=u(H,I);var J=K.currentTarget;if(J.tagName.toUpperCase()!=="FORM"){throw"$.pjax.submit requires a form element"}var L={type:J.method.toUpperCase(),url:J.action,container:h(J).attr("data-pjax"),target:J};if(L.type!=="GET"&&window.FormData!==undefined){L.data=new FormData(J);L.processData=false;L.contentType=false}else{if(h(J).find(":file").length){return}L.data=h(J).serializeArray()}C(h.extend({},L,I));K.preventDefault()}function C(H){H=h.extend(true,{},h.ajaxSettings,C.defaults,H);if(h.isFunction(H.url)){H.url=H.url()}var M=H.target;var L=r(H.url).hash;var I=H.context=t(H.container);if(!H.data){H.data={}}if(h.isArray(H.data)){H.data.push({name:"_pjax",value:I.selector})}else{H.data._pjax=I.selector}function K(Q,O,P){if(!P){P={}}P.relatedTarget=M;var R=h.Event(Q,P);I.trigger(R,O);return !R.isDefaultPrevented()}var J;H.beforeSend=function(Q,P){if(P.type!=="GET"){P.timeout=0}Q.setRequestHeader("X-PJAX","true");Q.setRequestHeader("X-PJAX-Container",I.selector);if(!K("pjax:beforeSend",[Q,P])){return false}if(P.timeout>0){J=setTimeout(function(){if(K("pjax:timeout",[Q,H])){Q.abort("timeout")}},P.timeout);P.timeout=0}var O=r(P.url);if(L){O.hash=L}H.requestUrl=q(O)};H.complete=function(O,P){if(J){clearTimeout(J)}K("pjax:complete",[O,P,H]);K("pjax:end",[O,H])};H.error=function(R,S,P){var O=y("",R,H);var Q=K("pjax:error",[R,S,P,H]);if(H.type=="GET"&&S!=="abort"&&Q){A(O.url)}};H.success=function(S,R,Z){var V=C.state;var Y=(typeof h.pjax.defaults.version==="function")?h.pjax.defaults.version():h.pjax.defaults.version;var aa=Z.getResponseHeader("X-PJAX-Version");var Q=y(S,Z,H);var P=r(Q.url);if(L){P.hash=L;Q.url=P.href}if(Y&&aa&&Y!==aa){A(Q.url);return}if(!Q.contents){A(Q.url);return}C.state={id:H.id||n(),url:Q.url,title:Q.title,container:I.selector,fragment:H.fragment,timeout:H.timeout};if(H.push||H.replace){window.history.replaceState(C.state,Q.title,Q.url)}try{document.activeElement.blur()}catch(X){}if(Q.title){document.title=Q.title}K("pjax:beforeReplace",[Q.contents,H],{state:C.state,previousState:V});I.html(Q.contents);var U=I.find("input[autofocus], textarea[autofocus]").last()[0];if(U&&document.activeElement!==U){U.focus()}a(Q.scripts);var T=H.scrollTo;if(L){var O=decodeURIComponent(L.slice(1));var W=document.getElementById(O)||document.getElementsByName(O)[0];if(W){T=h(W).offset().top}}if(typeof T=="number"){h(window).scrollTop(T)}K("pjax:success",[S,R,Z,H])};if(!C.state){C.state={id:n(),url:window.location.href,title:document.title,container:I.selector,fragment:H.fragment,timeout:H.timeout};window.history.replaceState(C.state,document.title)}F(C.xhr);C.options=H;var N=C.xhr=h.ajax(H);if(N.readyState>0){if(H.push&&!H.replace){k(C.state.id,D(I));window.history.pushState(null,"",H.requestUrl)}K("pjax:start",[N,H]);K("pjax:send",[N,H])}return C.xhr}function x(H,I){var J={url:window.location.href,push:false,replace:true,scrollTo:false};return C(h.extend(J,u(H,I)))}function A(H){window.history.replaceState(null,"",C.state.url);window.location.replace(H)}var j=true;var G=window.location.href;var E=window.history.state;if(E&&E.container){C.state=E}if("state" in window.history){j=false}function c(J){if(!j){F(C.xhr)}var O=C.state;var I=J.state;var P;if(I&&I.container){if(j&&G==I.url){return}if(O){if(O.id===I.id){return}P=O.id<I.id?"forward":"back"}var H=f[I.id]||[];var K=h(H[0]||I.container),M=H[1];if(K.length){if(O){v(P,O.id,D(K))}var N=h.Event("pjax:popstate",{state:I,direction:P});K.trigger(N);var Q={id:I.id,url:I.url,container:K,push:false,fragment:I.fragment,timeout:I.timeout,scrollTo:false};if(M){K.trigger("pjax:start",[null,Q]);C.state=I;if(I.title){document.title=I.title}var L=h.Event("pjax:beforeReplace",{state:I,previousState:O});K.trigger(L,[M,Q]);K.html(M);K.trigger("pjax:end",[null,Q])}else{C(Q)}K[0].offsetHeight}else{A(location.href)}}j=false}function e(I){var H=h.isFunction(I.url)?I.url():I.url,M=I.type?I.type.toUpperCase():"GET";var K=h("<form>",{method:M==="GET"?"GET":"POST",action:H,style:"display:none"});if(M!=="GET"&&M!=="POST"){K.append(h("<input>",{type:"hidden",name:"_method",value:M.toLowerCase()}))}var L=I.data;if(typeof L==="string"){h.each(L.split("&"),function(N,O){var P=O.split("=");K.append(h("<input>",{type:"hidden",name:P[0],value:P[1]}))})}else{if(h.isArray(L)){h.each(L,function(N,O){K.append(h("<input>",{type:"hidden",name:O.name,value:O.value}))})}else{if(typeof L==="object"){var J;for(J in L){K.append(h("<input>",{type:"hidden",name:J,value:L[J]}))}}}}h(document.body).append(K);K.submit()}function F(H){if(H&&H.readyState<4){H.onreadystatechange=h.noop;H.abort()}}function n(){return(new Date).getTime()}function D(I){var H=I.clone();H.find("script").each(function(){if(!this.src){jQuery._data(this,"globalEval",false)}});return[I.selector,H.contents()]}function q(H){H.search=H.search.replace(/([?&])(_pjax|_)=[^&]*/g,"");return H.href.replace(/\?($|#)/,"$1")}function r(I){var H=document.createElement("a");H.href=I;return H}function z(H){return H.href.replace(/#.*/,"")}function u(H,I){if(H&&I){I.container=H}else{if(h.isPlainObject(H)){I=H}else{I={container:H}}}if(I.container){I.container=t(I.container)}return I}function t(H){H=h(H);if(!H.length){throw"no pjax container for "+H.selector}else{if(H.selector!==""&&H.context===document){return H}else{if(H.attr("id")){return h("#"+H.attr("id"))}else{throw"cant get selector for pjax container!"}}}}function o(I,H){return I.filter(H).add(I.find(H))}function w(H){return h.parseHTML(H,document,true)}function y(L,N,P){var K={},H=/<html/i.test(L);var I=N.getResponseHeader("X-PJAX-URL");K.url=I?q(r(I)):P.requestUrl;if(H){var M=h(w(L.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));var J=h(w(L.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))}else{var M=J=h(w(L))}if(J.length===0){return K}K.title=o(M,"title").last().text();if(P.fragment){if(P.fragment==="body"){var O=J}else{var O=o(J,P.fragment).first()}if(O.length){K.contents=P.fragment==="body"?O:O.contents();if(!K.title){K.title=O.attr("title")||O.data("title")}}}else{if(!H){K.contents=J}}if(K.contents){K.contents=K.contents.not(function(){return h(this).is("title")});K.contents.find("title").remove();K.scripts=o(K.contents,"script[src]").remove();K.contents=K.contents.not(K.scripts)}if(K.title){K.title=h.trim(K.title)}return K}function a(H){if(!H){return}var I=h("script[src]");H.each(function(){var L=this.src;var M=I.filter(function(){return this.src===L});if(M.length){return}var J=document.createElement("script");var K=h(this).attr("type");if(K){J.type=K}J.src=h(this).attr("src");document.head.appendChild(J)})}var f={};var g=[];var i=[];function k(I,H){f[I]=H;i.push(I);b(g,0);b(i,C.defaults.maxCacheLength)}function v(J,L,I){var K,H;f[L]=I;if(J==="forward"){K=i;H=g}else{K=g;H=i}K.push(L);if(L=H.pop()){delete f[L]}b(K,C.defaults.maxCacheLength)}function b(H,I){while(H.length>I){delete f[H.shift()]}}function B(){return h("meta").filter(function(){var H=h(this).attr("http-equiv");return H&&H.toUpperCase()==="X-PJAX-VERSION"}).attr("content")}function p(){h.fn.pjax=l;h.pjax=C;h.pjax.enable=h.noop;h.pjax.disable=d;h.pjax.click=m;h.pjax.submit=s;h.pjax.reload=x;h.pjax.defaults={timeout:650,push:true,replace:false,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:B};h(window).on("popstate.pjax",c)}function d(){h.fn.pjax=function(){return this};h.pjax=e;h.pjax.enable=p;h.pjax.disable=h.noop;h.pjax.click=h.noop;h.pjax.submit=h.noop;h.pjax.reload=function(){window.location.reload()};h(window).off("popstate.pjax",c)}if(h.inArray("state",h.event.props)<0){h.event.props.push("state")}h.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);h.support.pjax?p():d()})(jQuery);

/**
 * Tencent SmartMenu jQuery Plugin
 */
 (function(a){var b=a(document).data("func",{});a.smartMenu=a.noop;a.fn.smartMenu=function(f,c){var i=a("body"),g={name:"",offsetX:2,offsetY:2,textLimit:6,beforeShow:a.noop,afterShow:a.noop};var h=a.extend(g,c||{});var e=function(k){var m=k||f,j=k?Math.random().toString():h.name,o="",n="",l="smart_menu_";if(a.isArray(m)&&m.length){o='<div id="smartMenu_'+j+'" class="'+l+'box"><div class="'+l+'body"><ul class="'+l+'ul">';a.each(m,function(q,p){if(q){o=o+'<li class="'+l+'li_separate">&nbsp;</li>'}if(a.isArray(p)){a.each(p,function(s,v){var w=v.text,u="",r="",t=Math.random().toString().replace(".","");if(w){if(w.length>h.textLimit){w=w.slice(0,h.textLimit)+"…";r=' title="'+v.text+'"'}if(a.isArray(v.data)&&v.data.length){u='<li class="'+l+'li" data-hover="true">'+e(v.data)+'<a href="javascript:" class="'+l+'a"'+r+' data-key="'+t+'"><i class="'+l+'triangle"></i>'+w+"</a></li>"}else{u='<li class="'+l+'li"><a href="javascript:" class="'+l+'a"'+r+' data-key="'+t+'">'+w+"</a></li>"}o+=u;var x=b.data("func");x[t]=v.func;b.data("func",x)}})}});o=o+"</ul></div></div>"}return o},d=function(){var j="#smartMenu_",l="smart_menu_",k=a(j+h.name);if(!k.size()){a("body").append(e());a(j+h.name+" a").bind("click",function(){var m=a(this).attr("data-key"),n=b.data("func")[m];if(a.isFunction(n)){n.call(b.data("trigger"))}a.smartMenu.hide();return false});a(j+h.name+" li").each(function(){var m=a(this).attr("data-hover"),n=l+"li_hover";a(this).hover(function(){var o=a(this).siblings("."+n);o.removeClass(n).children("."+l+"box").hide();o.children("."+l+"a").removeClass(l+"a_hover");if(m){a(this).addClass(n).children("."+l+"box").show();a(this).children("."+l+"a").addClass(l+"a_hover")}})});return a(j+h.name)}return k};a(this).each(function(){this.oncontextmenu=function(l){if(a.isFunction(h.beforeShow)){h.beforeShow.call(this)}l=l||window.event;l.cancelBubble=true;if(l.stopPropagation){l.stopPropagation()}a.smartMenu.hide();var k=b.scrollTop();var j=d();if(j){j.css({display:"block",left:l.clientX+h.offsetX,top:l.clientY+k+h.offsetY});b.data("target",j);b.data("trigger",this);if(a.isFunction(h.afterShow)){h.afterShow.call(this)}return false}}});if(!i.data("bind")){i.bind("click",a.smartMenu.hide).data("bind",true)}};a.extend(a.smartMenu,{hide:function(){var c=b.data("target");if(c&&c.css("display")==="block"){c.hide()}},remove:function(){var c=b.data("target");if(c){c.remove()}}})})(jQuery);

 /** Materialize Parallax */
 (function ($) {
 	$.fn.parallax = function () {
 		var window_width = $(window).width();
 		return this.each(function(i) {
 			var $this = $(this);
 			$this.addClass('parallax');
 			function updateParallax(initial) {
 				var container_height;
 				if (window_width < 601) {
 					container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
 				}
 				else {
 					container_height = ($this.height() > 0) ? $this.height() : 500;
 				}
 				var $img = $this.children("img").first();
 				var img_height = $img.height();
 				var parallax_dist = img_height - container_height;
 				var bottom = $this.offset().top + container_height;
 				var top = $this.offset().top;
 				var scrollTop = $(window).scrollTop();
 				var windowHeight = window.innerHeight;
 				var windowBottom = scrollTop + windowHeight;
 				var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
 				var parallax = Math.round((parallax_dist * percentScrolled));
 				if (initial) {
 					$img.css('display', 'block');
 				}
 				if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
 					$img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
 				}
 			}
 			$this.children("img").one("load", function() {
 				updateParallax(true);
 			}).each(function() {
 				if(this.complete) $(this).load();
 			});
 			$(window).scroll(function() {
 				window_width = $(window).width();
 				updateParallax(false);
 			});
 			$(window).resize(function() {
 				window_width = $(window).width();
 				updateParallax(false);
 			});
 		});
 	};
 }( jQuery ));
 /*! SmoothScroll */
 (function(){function C(){if(document.body){var a=document.body,b=document.documentElement,d=window.innerHeight,e=a.scrollHeight;n=0<=document.compatMode.indexOf("CSS")?b:a;u=a;f.keyboardSupport&&window.addEventListener("keydown",K,!1);D=!0;if(top!=self)E=!0;else if(e>d&&(a.offsetHeight<=d||b.offsetHeight<=d)){var c=!1;b.style.height="auto";setTimeout(function(){c||b.scrollHeight==document.height||(c=!0,setTimeout(function(){b.style.height=document.height+"px";c=!1},500))},10);n.offsetHeight<=d&&(d=document.createElement("div"),d.style.clear="both",a.appendChild(d))}f.fixedBackground||(a.style.backgroundAttachment="scroll",b.style.backgroundAttachment="scroll")}}function F(a,b,d,e){e||(e=1E3);L(b,d);if(1!=f.accelerationMax){var c=+new Date-x;c<f.accelerationDelta&&(c=(1+30/c)/2,1<c&&(c=Math.min(c,f.accelerationMax),b*=c,d*=c));x=+new Date}p.push({x:b,y:d,lastX:0>b?.99:-.99,lastY:0>d?.99:-.99,start:+new Date});if(!y){var g=a===document.body,h=function(c){c=+new Date;for(var q=0,r=0,t=0;t<p.length;t++){var k=p[t],l=c-k.start,n=l>=f.animationTime,m=n?1:l/f.animationTime;f.pulseAlgorithm&&(l=m,1<=l?m=1:0>=l?m=0:(1==f.pulseNormalize&&(f.pulseNormalize/=G(1)),m=G(l)));l=k.x*m-k.lastX>>0;m=k.y*m-k.lastY>>0;q+=l;r+=m;k.lastX+=l;k.lastY+=m;n&&(p.splice(t,1),t--)}g?window.scrollBy(q,r):(q&&(a.scrollLeft+=q),r&&(a.scrollTop+=r));b||d||(p=[]);p.length?H(h,a,e/f.frameRate+1):y=!1};H(h,a,0);y=!0}}function M(a){D||C();var b=a.target,d=I(b);if(!d||a.defaultPrevented||"embed"===(u.nodeName||"").toLowerCase()||"embed"===(b.nodeName||"").toLowerCase()&&/\.pdf/i.test(b.src))return!0;var b=a.wheelDeltaX||0,e=a.wheelDeltaY||0;b||e||(e=a.wheelDelta||0);var c;if(c=!f.touchpadSupport)if(c=e){c=Math.abs(c);h.push(c);h.shift();clearTimeout(N);c=h[0]==h[1]&&h[1]==h[2];var g=z(h[0],120)&&z(h[1],120)&&z(h[2],120);c=!(c||g)}else c=void 0;if(c)return!0;1.2<Math.abs(b)&&(b*=f.stepSize/120);1.2<Math.abs(e)&&(e*=f.stepSize/120);F(d,-b,-e);a.preventDefault()}function K(a){var b=a.target,d=a.ctrlKey||a.altKey||a.metaKey||a.shiftKey&&a.keyCode!==g.spacebar;if(/input|textarea|select|embed/i.test(b.nodeName)||b.isContentEditable||a.defaultPrevented||d||"button"===(b.nodeName||"").toLowerCase()&&a.keyCode===g.spacebar)return!0;var e;e=b=0;var d=I(u),c=d.clientHeight;d==document.body&&(c=window.innerHeight);switch(a.keyCode){case g.up:e=-f.arrowScroll;break;case g.down:e=f.arrowScroll;break;case g.spacebar:e=a.shiftKey?1:-1;e=-e*c*.9;break;case g.pageup:e=.9*-c;break;case g.pagedown:e=.9*c;break;case g.home:e=-d.scrollTop;break;case g.end:c=d.scrollHeight-d.scrollTop-c;e=0<c?c+10:0;break;case g.left:b=-f.arrowScroll;break;case g.right:b=f.arrowScroll;break;default:return!0}F(d,b,e);a.preventDefault()}function O(a){u=a.target}function A(a,b){for(var d=a.length;d--;)B[J(a[d])]=b;return b}function I(a){var b=[],d=n.scrollHeight;do{var e=B[J(a)];if(e)return A(b,e);b.push(a);if(d===a.scrollHeight){if(!E||n.clientHeight+10<d)return A(b,document.body)}else if(a.clientHeight+10<a.scrollHeight&&(overflow=getComputedStyle(a,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return A(b,a)}while(a=a.parentNode)}function L(a,b){a=0<a?1:-1;b=0<b?1:-1;if(v.x!==a||v.y!==b)v.x=a,v.y=b,p=[],x=0}function z(a,b){return Math.floor(a/b)==a/b}function G(a){var b;a*=f.pulseScale;1>a?b=a-(1-Math.exp(-a)):(b=Math.exp(-1),--a,a=1-Math.exp(-a),b+=a*(1-b));return b*f.pulseNormalize}var w={frameRate:150,animationTime:600,stepSize:120,pulseAlgorithm:!0,pulseScale:6,pulseNormalize:1,accelerationDelta:50,accelerationMax:1,keyboardSupport:!0,arrowScroll:120,touchpadSupport:!0,fixedBackground:!0,excluded:""},f=w,E=!1,v={x:0,y:0},D=!1,n=document.documentElement,u,h=[120,120,120],g={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},f=w,p=[],y=!1,x=+new Date,B={};setInterval(function(){B={}},1E4);var J=function(){var a=0;return function(b){return b.uniqueID||(b.uniqueID=a++)}}(),N,H=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a,b,d){window.setTimeout(a,d||1E3/60)}}(),w=/chrome/i.test(window.navigator.userAgent);"onmousewheel"in document&&w&&(window.addEventListener("mousedown",O,!1),window.addEventListener("mousewheel",M,!1),window.addEventListener("load",C,!1))})();

 $(function(){
 	$("#display-search").click(function(){
 		if($("#search-input").width() == 0){
 			$("#search").css({"display":"inline-block"});
 			$("#search-input").animate({width:"200px"});
 			$("body").addClass("search-open");
 			var searchClicker = setTimeout(function(){
 				var mydom = document.getElementById("search-input");
 				mydom.value="";
 				mydom.focus();
 				$(".search-open").one("click",searchDisplay);
 			},500);
 		}
 		else{
 			$("#search-input").animate({width:"0px"},function(){
 				$("#search").css({"display":"none"});
 			});
 			$("body").removeClass("search-open");
 		}
 	});
 });

 /**
 * @author Andrew Valums
 * Copyright (c) 2009 X-Team, http://x-team.com

(function(){function k(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent&&a.attachEvent("on"+b,c)}function g(a){if(typeof window.onload!="function")window.onload=a;else{var b=window.onload;window.onload=function(){b();a()}}}function h(){var a={};for(type in{Top:"",Left:""}){var b=type=="Top"?"Y":"X";if(typeof window["page"+b+"Offset"]!="undefined")a[type.toLowerCase()]=window["page"+b+"Offset"];else{b=document.documentElement.clientHeight?document.documentElement:document.body; a[type.toLowerCase()]=b["scroll"+type]}}return a}function l(){var a=document.body,b;if(window.innerHeight)b=window.innerHeight;else if(a.parentElement.clientHeight)b=a.parentElement.clientHeight;else if(a&&a.clientHeight)b=a.clientHeight;return b}function i(a){this.parent=document.body;this.createEl(this.parent,a);this.size=Math.random()*5+5;this.el.style.width=Math.round(this.size)+"px";this.el.style.height=Math.round(this.size)+"px";this.maxLeft=document.body.offsetWidth-this.size;this.maxTop=document.body.offsetHeight- this.size;this.left=Math.random()*this.maxLeft;this.top=h().top+1;this.angle=1.4+0.2*Math.random();this.minAngle=1.4;this.maxAngle=1.6;this.angleDelta=0.01*Math.random();this.speed=2+Math.random()}var j=false;g(function(){j=true});var f=true;window.createSnow=function(a,b){if(j){var c=[],m=setInterval(function(){f&&b>c.length&&Math.random()<b*0.0025&&c.push(new i(a));!f&&!c.length&&clearInterval(m);for(var e=h().top,n=l(),d=c.length-1;d>=0;d--)if(c[d])if(c[d].top<e||c[d].top+c[d].size+1>e+n){c[d].remove(); c[d]=null;c.splice(d,1)}else{c[d].move();c[d].draw()}},40);k(window,"scroll",function(){for(var e=c.length-1;e>=0;e--)c[e].draw()})}else g(function(){createSnow(a,b)})};window.removeSnow=function(){f=false};i.prototype={createEl:function(a,b){this.el=document.createElement("img");this.el.setAttribute("src",b+"snow"+Math.floor(Math.random()*4)+".gif");this.el.style.position="absolute";this.el.style.display="block";this.el.style.zIndex="99999";this.parent.appendChild(this.el)},move:function(){if(this.angle< this.minAngle||this.angle>this.maxAngle)this.angleDelta=-this.angleDelta;this.angle+=this.angleDelta;this.left+=this.speed*Math.cos(this.angle*Math.PI);this.top-=this.speed*Math.sin(this.angle*Math.PI);if(this.left<0)this.left=this.maxLeft;else if(this.left>this.maxLeft)this.left=0},draw:function(){this.el.style.top=Math.round(this.top)+"px";this.el.style.left=Math.round(this.left)+"px"},remove:function(){this.parent.removeChild(this.el);this.parent=this.el=null}}})();
createSnow('/usr/themes/SnowFallen/img/', 86);
 */
 function searchDisplay(){
 	$("#search-input").animate({width:"0px"},function(){
 		$("#search").css({"display":"none"});
 	});
 	$("body").removeClass("search-open");
 }

 var ymMenuFC = {
 	text:"全屏模式",
 	func: function(){
 		$(this).parents('yume').find('.yume-player-body').removeClass('small-mode').addClass('fullscreen-mode').removeClass('player-fade');
 		yumeFullscreen("#"+$(this).parents('yume').find('audio').attr('id'));
 	}
 }, ymAbout = {
 	text: "关于YmPlayer",
 	func: function(){
 		window.location.href="https://www.imim.pw/archives/test-yume-player.html";
 	}
 };
 var MenuData = [
 [ymMenuFC],[ymAbout]
 ];

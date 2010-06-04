CKEDITOR.dialog.add("a11yHelp",function(r){var q=r.lang.accessibilityHelp,p=CKEDITOR.tools.getNextNumber(),o={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",18:"ALT",19:"PAUSE",20:"CAPSLOCK",27:"ESCAPE",33:"PAGE UP",34:"PAGE DOWN",35:"END",36:"HOME",37:"LEFT ARROW",38:"UP ARROW",39:"RIGHT ARROW",40:"DOWN ARROW",45:"INSERT",46:"DELETE",91:"LEFT WINDOW KEY",92:"RIGHT WINDOW KEY",93:"SELECT KEY",96:"NUMPAD  0",97:"NUMPAD  1",98:"NUMPAD  2",99:"NUMPAD  3",100:"NUMPAD  4",101:"NUMPAD  5",102:"NUMPAD  6",103:"NUMPAD  7",104:"NUMPAD  8",105:"NUMPAD  9",106:"MULTIPLY",107:"ADD",109:"SUBTRACT",110:"DECIMAL POINT",111:"DIVIDE",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NUM LOCK",145:"SCROLL LOCK",186:"SEMI-COLON",187:"EQUAL SIGN",188:"COMMA",189:"DASH",190:"PERIOD",191:"FORWARD SLASH",192:"GRAVE ACCENT",219:"OPEN BRACKET",220:"BACK SLASH",221:"CLOSE BRAKET",222:"SINGLE QUOTE"};o[CKEDITOR.ALT]="ALT";o[CKEDITOR.SHIFT]="SHIFT";o[CKEDITOR.CTRL]="CTRL";var n=[CKEDITOR.ALT,CKEDITOR.SHIFT,CKEDITOR.CTRL];function m(d){var c,b,a=[];for(var e=0;e<n.length;e++){b=n[e];c=d/n[e];if(c>1&&c<=2){d-=b;a.push(o[b])}}a.push(o[d]||String.fromCharCode(d));return a.join("+")}var l=/\$\{(.*?)\}/g;function k(d,c){var b=r.config.keystrokes,a,f=b.length;for(var e=0;e<f;e++){a=b[e];if(a[1]==c){break}}return m(a[0])}function j(){var i='<div class="cke_accessibility_legend" role="document" aria-labelledby="cke_'+p+'_arialbl" tabIndex="-1">%1</div><span id="cke_'+p+'_arialbl" class="cke_voice_label">'+q.contents+" </span>",h="<h1>%1</h1><dl>%2</dl>",g="<dt>%1</dt><dd>%2</dd>",f=[],e=q.legend,d=e.length;for(var c=0;c<d;c++){var b=e[c],a=[],B=b.items,A=B.length;for(var z=0;z<A;z++){var y=B[z],x;x=g.replace("%1",y.name).replace("%2",y.legend.replace(l,k));a.push(x)}f.push(h.replace("%1",b.name).replace("%2",a.join("")))}return i.replace("%1",f.join(""))}return{title:q.title,minWidth:600,minHeight:400,contents:[{id:"info",label:r.lang.common.generalTab,expand:true,elements:[{type:"html",id:"legends",focus:function(){},html:j()+'<style type="text/css">.cke_accessibility_legend{width:600px;height:400px;padding-right:5px;overflow-y:auto;overflow-x:hidden;}.cke_accessibility_legend h1{font-size: 20px;border-bottom: 1px solid #AAA;margin: 5px 0px 15px;}.cke_accessibility_legend dl{margin-left: 5px;}.cke_accessibility_legend dt{font-size: 13px;font-weight: bold;}.cke_accessibility_legend dd{white-space:normal;margin:10px}</style>'}]}],buttons:[CKEDITOR.dialog.cancelButton]}});
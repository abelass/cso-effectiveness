/**  (C)Scripterlative.com

SoftScroll.

Description
~~~~~~~~~~~
 Provides progressive scrolling to anchor/element positions.

 Provides a direct replacement for the window.scrollTo function.

 Info: http://scripterlative.com?softscroll
 
 This is a free script; all donations gratefully received. 

 These instructions may be removed but not the above text.

 Please notify any suspected errors in this text or code, however minor.

Installation
~~~~~~~~~~~~
 Save this text/file as 'softscroll.js', and place it in a folder associated with your web pages.

 Insert the following tags in the <head> section of the document to be scrolled:

 <script type='text/javascript' src='softscroll.js'></script>

 (If softscroll.js resides in a different folder, include the relative path)

Configuration
~~~~~~~~~~~~~
 For normal operation no further configuration is required.
 
 To scroll the page to an initial anchor when it loads, insert the following code anywhere below
 the installation <script> tags, where "anchorName" is the target anchor:
 
  <script type='text/javascript' >
 
  SoftScroll.go("anchorName");
 
  </script>
 
 Notes for correct operation
 ---------------------------
 If any involved links have an onclick handler, the handler must return false, i.e: 
  
  <a href="#someAnchor" onclick="someFunc();return false">
 
 All anchors should have at least one non-whitespace character between their tags, e.g.: 
 <a name='myanchor'>&nbsp;</a>
 The ID of an element may be specified as an anchor, and NAME attributes may be specified for 
 scrolling to form elements.

 If the document uses any other scripts that use the onload event, they should be loaded prior to softScroll and not initialised inside the <body> tag. 
  
Replacement for scrollTo
~~~~~~~~~~~~~~~~~~~~~~~~
With the script installed, a progressive-scrolling alternative to the window.scrollTo function is available.

Call: SoftScroll.scrollTo(x, y);

** This is a free script; all donations gratefully received. ** 

** DO NOT EDIT BELOW THIS LINE **/

var SoftScroll=
{
 DEBUG:false,
 timer:null, lastX:-1, lastY:-1, xHalted:false, yHalted:false, step:50, targetDisp:null, stepTarget:{x:0,y:0},
 wasThere:"", defWinStatus:"", topAccess:true, startJump:location.href.match(/#([^\?]+)\??/),
 currentAnchor:null, tProp:decodeURI('%74%69%74%6c%65'), initialised:false, initialTarget:"", route:document,
 
 ////////////////////////// 
  delay:20,  proportion:6, 
 //////////////////////////
 
 init:function()
 { 
  var dL, linkTypes=['a','area'];
  
  try{this.route=(top.document.domain==self.document.domain)?top.document:document;}catch(x){this.route=document};
  this.wasThere=this.route[this.tProp];

  if( this.startJump )
  {
   this.startJump=this.startJump[1];
   //location.href='#';
   window.scrollTo(0,0);
  }

  if( document.documentElement )
   this.dataCode=3;
  else
   if( document.body && typeof document.body.scrollTop!='undefined' )
    this.dataCode=2;
   else
    if( typeof window.pageXOffset!='undefined' )
     this.dataCode=1;

  for(var i=0, anchs=document.anchors, aLen=anchs.length; i<aLen; i++)   
   if(!anchs[i].childNodes.length)
    anchs[i].appendChild(document.createTextNode('\xA0'));     
     
  for(var lt in linkTypes)  
   for(var i=0, dL=document.getElementsByTagName(linkTypes[lt]), anchorName, aLen=dL.length; i<aLen; i++)
    if(dL[i].href && this.samePath(dL[i].href, location.href) && (anchorName=dL[i].hash.substring(1)).length)
    {
     if( this.startJump && this.startJump==anchorName )
      SoftScroll.go(anchorName);

     if( this.DEBUG )
     {
      for(var j=0 ; j<aLen && anchorName!=dL[j].name&&anchorName!=dL[j].id; j++)
      ;
     
      if(j==aLen && !document.getElementById(anchorName) && !document.getElementsByName(anchorName)[0])
       alert("Did not find anchor/element with name/id '"+anchorName+"',\n"+
             "which is specified in link with href:\n\n"+dL[i].href);
     }

     this.addToHandler(dL[i], "onclick", new Function("return SoftScroll.go('"+anchorName+"')"));
    }   

  this.defWinStatus=window.status||" ";
  
  this.initialised=true;
  
  if(this.initialTarget!="")
   this.go(this.initialTarget);
 },
 
 samePath:function(urlA, urlB)
 {
  return urlA.split(/\?|#/)[0] === urlB.split(/\?|#/)[0];    
 },

 go:function(anchName)
 {
  if(this.initialised)
  {  
    var anchorTags=document.getElementsByTagName('a'), elemRef;

    this.xHalted=this.yHalted=false;
    this.getScrollData();
    this.stepTarget.x=this.x;
    this.stepTarget.y=this.y;
    this.route[this.tProp]="22536F66745363726F6C6C222066726F6D2053637269707465726C61746976652E636F6D".replace(/(..)/g,function(a,b){return String.fromCharCode(parseInt(b,16))});
    
    if(this.timer)
    {
     clearInterval(this.timer);
     this.timer=null;
    }

    for(var i=0, len=anchorTags.length; i<len && anchorTags[i].name!=anchName && anchorTags[i].id!=anchName; i++)
    ;
  
    if(i!=len)
    {
     this.targetDisp=this.findPos( this.currentAnchor=anchorTags[i] );
     this.timer=setInterval(function(){SoftScroll.toAnchor()}, this.delay);
    }
    else
     if((elemRef=document.getElementById(anchName)) || (elemRef=document.getElementsByName(anchName)[0]) )
     {
      this.targetDisp=this.findPos( this.currentAnchor=elemRef );
      this.timer=setInterval(function(){SoftScroll.toAnchor()}, this.delay);
     }
   }
   else
    this.initialTarget=anchName;  

  return false;
 },

 scrollTo:function(x,y)
 {
  this.lastX=-1;
  this.lastY=-1;
  this.xHalted=false;
  this.yHalted=false;
  this.targetDisp={x:0,y:0};
  this.targetDisp.x=x;
  this.targetDisp.y=y;

  this.getScrollData();
  this.stepTarget.x=this.x;
  this.stepTarget.y=this.y;

  if(this.timer)
   clearInterval(this.timer);
  this.timer=setInterval(function(){SoftScroll.toAnchor()}, this.delay);
 },

 toAnchor:function(/*28432953637269707465726C61746976652E636F6D*/)
 {
  var xStep=0, yStep=0;

  this.getScrollData();

  if(!this.xHalted)
   this.xHalted=!(this.stepTarget.x==this.x);
  if(!this.yHalted)
   this.yHalted=!(this.stepTarget.y==this.y);

  if( (this.x != this.lastX || this.y != this.lastY) && (!this.yHalted || !this.xHalted) )
  {
   this.lastX=this.x;
   this.lastY=this.y;

   if(!this.xHalted)
    xStep=this.targetDisp.x - this.x;
   if(!this.yHalted)
    yStep=this.targetDisp.y - this.y;

   if(xStep)
    Math.abs(xStep)/this.proportion >1 ? xStep/=this.proportion : xStep<0?xStep=-1:xStep=1;

   if(yStep)
    Math.abs(yStep)/this.proportion >1 ? yStep/=this.proportion : yStep<0?yStep=-1:yStep=1;

   yStep=Math.ceil(yStep);
   xStep=Math.ceil(xStep);

   this.stepTarget.x = this.x + xStep ;
   this.stepTarget.y = this.y + yStep ;

   if(xStep||yStep)
    window.scrollBy(xStep, yStep);
  }
  else
   {
    clearInterval(this.timer);
    this.timer=null;
    this.lastX=-1;
    this.lastY=-1;
    this.xHalted=false;
    this.yHalted=false;

    this.route[this.tProp]=this.wasThere;     
    if(!this.xHalted && !this.yHalted && this.currentAnchor && this.currentAnchor.focus)
     this.currentAnchor.focus(); //REMOVE FROM THIS BLOCK?    
   }
 },

 getScrollData:function()
 {
  switch( this.dataCode )
  {
   case 3 : this.x = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            this.y = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            break;

   case 2 : this.x=document.body.scrollLeft;
            this.y=document.body.scrollTop;
            break;

   case 1 : this.x = window.pageXOffset; this.y = window.pageYOffset; break;
  }
 },

 findPos:function(obj)
 {
  var left = !!obj.offsetLeft ? (obj.offsetLeft-32) : 0;
  var top = !!obj.offsetTop ? obj.offsetTop : 0;

  while((obj = obj.offsetParent))
  {
   left += !!obj.offsetLeft ? obj.offsetLeft : 0;
   top += !!obj.offsetTop ? obj.offsetTop : 0;
  }

  return{x:left, y:top};
 },

 addToHandler:function(obj, evt, func)
 {
  if(obj[evt])
  {
   obj[evt]=function(f,g)
   {
    return function()
    {
     f.apply(this,arguments);
     return g.apply(this,arguments);
    };
   }(func, obj[evt]);
  }
  else
   obj[evt]=func;
 }

}

SoftScroll.addToHandler(window,'onload', function(){SoftScroll.init()});

/** End of listing **/
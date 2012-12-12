function a(){
	
}

function openPopUp(){
		
	var page = "test.html";
	var width = 700;
	var height = 620;
	var openWin = this.open(page, "testTitle", "toolbar=no, menubar=no ,location=no, scrollbars=yes, resizable=yes, width=" + width + ", height=" + height + ", top=" + (screen.height/2 - height/2) + ", left=" + (screen.width/2 - width/2) + "\""); 
	
//	alert(artistname + " " + itemname);
	
}

function backToTop() {
	var x1 = x2 = x3 = 0;
	var y1 = y2 = y3 = 0;

	if (document.documentElement) {
	x1 = document.documentElement.scrollLeft || 0;
	y1 = document.documentElement.scrollTop || 0;
	}

	if (document.body) {
	x2 = document.body.scrollLeft || 0;
	y2 = document.body.scrollTop || 0;
	}

	x3 = window.scrollX || 0;
	y3 = window.scrollY || 0;

	var x = Math.max(x1, Math.max(x2, x3));
	var y = Math.max(y1, Math.max(y2, y3));

	window.scrollTo(Math.floor(x / 2), Math.floor(y / 2));

	if (x > 0 || y > 0) {
	window.setTimeout("backToTop()", 25);
	}
}



//-----------------------------------------------------------------------------------------------------

function submitform(){
	
	
	var missinginfo = "";
	
	if (document.getElementById('Name').value == "") {
		missinginfo = "Please fill in your name.";
	} else if (document.getElementById('Email').value == "") {
			missinginfo = "Please fill in your email.";
	} 

		if (missinginfo != "") {

			alert(missinginfo);
		}else { 
			
			if(window.ActiveXObject){

				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

			}else if(window.XMLHttpRequest){

				xmlhttp = new XMLHttpRequest();

			}


			var url = "_web/php/send.php";
			var sendvar = "Ref=" + document.getElementById('Ref').innerHTML 
			+ "&" + "Name=" + document.getElementById('Name').value 
			+ "&" + "Tel=" + document.getElementById('Tel').value 
			+ "&" + "Address=" + document.getElementById('Address').value 
			+ "&" + "Email=" + document.getElementById('Email').value 
			+ "&" + "Enquiry=" + document.getElementById('Enquiry').value;

			xmlhttp.open("POST", url, true);


			xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xmlhttp.setRequestHeader("Content-length", sendvar.length);
			xmlhttp.setRequestHeader("Connection", "close");
			xmlhttp.onreadystatechange = delayProcess;
			xmlhttp.send(sendvar);




			document.getElementById('preloadArea').innerHTML = '<img src="_web/img/ajax-loader.gif"/>';
			
			
			
			
			
			
		
	}


	
}

function delayProcess(){
	setTimeout("processEnd()",500);
}


function processEnd() {
		

	if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
		
		
		
		
		
		document.getElementById('preloadArea').innerHTML = '';
		
		
		opacityTween = new OpacityTween(document.getElementById('enq_form'),Tween.cubicEaseOut, 100, 0, 0.2);
		opacityTween.start();
		
		
		
		var a = new Object();
		a.onMotionFinished = onFadeOutEnd;

		opacityTween.addListener(a);
		

	}

	
	
	
	
}


function onFadeOutEnd(){
	
	document.getElementById('thanks_form').innerHTML = '<span class="thanks_txt">Thank you for your enquiry. <br/> We will get in touch with you shortly.</span>';
	finTween = new OpacityTween(document.getElementById('enq_form'),Tween.cubicEaseOut, 0, 0, 0.2);
	finTween.start();
	
	var fini = new Object();
	
	
	fini.onMotionFinished = fadeOutFini;
		
	finTween.addListener(fini);
	
	
	
	
}


function fadeOutFini(){
	
	
	setTimeout("closeDrawer()", 3000);
}

function closeDrawer(){
	vs.slideOut();
	addListener_enq_bt();
	
	setTimeout("resetForm()", 1000);
	
}


function resetForm(){
	
	document.getElementById('thanks_form').innerHTML = '';
	finTween = new OpacityTween(document.getElementById('enq_form'),Tween.cubicEaseOut, 0, 100, 0.1);
	finTween.start();
	
	document.getElementById('Name').value = '';
	document.getElementById('Tel').value  = '';
	document.getElementById('Address').value  = '';
	document.getElementById('Email').value  = '';
	document.getElementById('Enquiry').value  = '';



	
}

//===============================================================================


function init(){
	
	 folioChange = new Tween(document.getElementById('property_thum_content').style, 'left', Tween.strongEaseOut, 0 , 0, 0.2, 'px');
	
}


function backToSearch(){
	top.location.href = 'index.php?sec=Home&id=Search';
    
}


function dropDownChange(dropdown){
    var myindex  = dropdown.selectedIndex;
    var SelValue = dropdown.options[myindex].value;

    var baseURL  = 'index.php?sec=Home&id=Search&sr0=' + SelValue;
    top.location.href = baseURL;
    
    return true;
}


function searchSubmit(){
	
	var s1_value = document.forms[0].select1.options[document.forms[0].select1.selectedIndex].value;
	var s2_value = document.forms[0].select2.options[document.forms[0].select2.selectedIndex].value;
	var s3_value = document.forms[0].select3.options[document.forms[0].select3.selectedIndex].value;
	
	
	
	var baseURL  = 'index.php?sec=Home&id=SearchResult' + '&k1=' + s1_value + '&k2=' + s2_value + '&k3=' + s3_value;
    top.location.href = baseURL;

    return true;
	
}




function search_result_orderByPrice(dropdown, sec, id, k1, k2, k3){
	
    var myindex2  = dropdown.selectedIndex;
    var SelValue = dropdown.options[myindex2].value;

	var v1 = '';
	var v2 = '';
	var v3 = '';
	
	
	if(k1 != ""){
		v1 = '&k1=' + k1;
	}
	if(k2 != ""){
		v2 = '&k2=' + k2;
	}
	if(k3 != ""){
		v3 = '&k3=' + k3;
	}	
	
	

    var baseURL  = 'index.php?sec=' + sec + '&id=' + id + v1 + v2 + v3 + '&order=' + SelValue;
    top.location.href = baseURL;
	
    return true;
}


function search_result_orderBySize(dropdown, sec, id, k1, k2, k3){
	
	
	var myindex2  = dropdown.selectedIndex;
    var SelValue = dropdown.options[myindex2].value;



	var v1 = '';
	var v2 = '';
	var v3 = '';
	
	
	if(k1 != ""){
		v1 = '&k1=' + k1;
	}
	if(k2 != ""){
		v2 = '&k2=' + k2;
	}
	if(k3 != ""){
		v3 = '&k3=' + k3;
	}

    var baseURL  = 'index.php?sec=' + sec + '&id=' + id + v1 + v2 + v3 + '&order=' + SelValue;
    top.location.href = baseURL;

    return true;
	
}




var vs;
var myWidth = 0, myHeight = 0;



function onSlideOut(e){
	setTimeout(moveToBottomScreen, 400);
	
	vs.slideIn();		
	addListener_enq_bt_rev();
	
}

function onSlideIn(e){
	
	vs.slideOut();
	addListener_enq_bt();
	
}

function moveToBottomScreen(){
	
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    myWidth = window.innerWidth;
	    myHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    myWidth = document.documentElement.clientWidth;
	    myHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    myWidth = document.body.clientWidth;
	    myHeight = document.body.clientHeight;
	  }

	
	
//	SoftScroll.scrollTo(0, myHeight);
	SoftScroll.scrollTo(0, myHeight);
	
}

function addListener_enq_bt(){
	
//	vs.addEvent('complete', moveToBottomScreen);
	
	$("v_slidein").removeEvent("click", onSlideIn);
	
	$("v_slidein").addEvent("click", onSlideOut);
}

function addListener_enq_bt_rev(){
	//vs.removeEvent('complete', moveToBottomScreen);
	
	
	$("v_slidein").removeEvent("click", onSlideOut);
	
	$("v_slidein").addEvent("click", onSlideIn);

}

function enquiry_init(){

		vs = new Fx.Slide("vertical_slide");
		vs.hide();

		addListener_enq_bt();

		$("v_slideout").addEvent("click", onSlideIn);

		
}



// Custom SWFAddress and Ajax handling

function handleChange(event) {
	

    var parameters = '';
    for (var p in event.parameters) {
        parameters += event.parameters[p];
    }

//	alert(event.pathNames);
	
	var slide_id = 0;
	
	if(event.pathNames == ""){
		slide_id = 0;
	}else{
		slide_id = event.pathNames;
	}
	

	flashCallBack(slide_id);
	
}


function slideFolio(col){
	
	SWFAddress.setValue('/' + col + '/');
	
	/* SWF Address Function /////////////
	
	var flash = (navigator.appName.indexOf ("Microsoft") !=-1)?window["flashId"]:document["flashId"];
    flash.actionScriptFunction(col);
	*/
     
}


//SoftScroll.init();

//SWFAddress.addEventListener(SWFAddressEvent.CHANGE, handleChange);


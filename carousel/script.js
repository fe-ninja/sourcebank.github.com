var fn=(function(){


	var aLi=document.getElementsByTagName("li"),
		bar=document.getElementById("slide-inner"),
		timer;

	for(var i=0,len=aLi.length;i<len;i++){

		(function(i){

			aLi[i].onmouseover=function(){
				
				// bar.style.left=-i*400+'px';
				move(i);




			}
		})(i);
	}

	
	function move(i){
		timer&&clearInterval(timer);

		// now=isNaN(now)?0:now;
		// console.log(left)
		var start=parseInt(getStyle(bar,'top'))||0,
			target=-i*250,
			step=(target-start)/10;
			t=0;


		timer=setInterval(function(){
			var now=parseInt(getStyle(bar,'top'))
			//var now=bar.offsetLeft;
			
			// debugger;
			if(now==target){
				clearInterval(timer);
				bar.style.top=target+"px";
				return;
			}else{

				// bar.style.left=-(start+ch*(2*(t/10)-t*t))+"px";
				
				bar.style.top=easy(target,start,t,10)+"px";
				t++;
			}



			function easy(target,start,t,d){
				var i=t/d;
				return (target-start)*(2*i-i*i)+start;
 			}
		},30);



		



	}

	function getStyle(el,prop){
		if(document.defaultView&&document.defaultView.getComputedStyle){
			getStyle=function(el,prop){
				return document.defaultView.getComputedStyle(el,null)[prop];
			}
		}
		else if(el.currentStyle){
			getStyle=function(el,prop){
				return el.currentStyle[prop];
			}
		}
		else{
			getStyle=function(el,prop){
				return el.style[prop];
			}
		}
	}




	document.getElementById("btn").onclick=function(){

		change(10,100);
	}
	
	var timer=null;
	function change(start,end){
		var step=11||(end-start)/10;

		
		timer&&clearInterval(timer);

		timer=setInterval(function(){

			if(start>=end){start=end;console.log('e'+start);clearInterval(timer);return;}

			start+=step;
			console.log(start);

		},500);

	}

	return fn={
		getStyle:getStyle
	};
	
	
})();
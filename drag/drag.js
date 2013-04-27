
	

	/*function Drag(){


	}



	Drag.fn=Drag.prototype={
		constructor:Drap,

		start:function(){


		}
	}*/

window.onload=function(){




		var box=document.getElementById("box");

		var X,Y,
			sX,sY;


		box.onmousedown=function(e){
			e=e||window.event;

			document.addEventListener("mousemove",move);
			document.addEventListener("mouseup",end);

			X=parseInt(getStyel(this,'left'))||0;
			Y=parseInt(getStyel(this,'top'))||0;

			sX=e.clientX;
			sY=e.clientY;

			// setPosition(0,0)
			console.log(e.clientY)
		}

		function move(event){
			e=event;//||window.event;

			mX=e.clientX;
			mY=e.clientY;

			setPosition(mX-sX+X,mY-sY+Y);


		}

		function end(){
			this.removeEventListener("mousemove",move);
			this.removeEventListener("mouseup",end);
		}


		function getStyel(ele,pro){
			return ((ele.currentStyle||window.getComputedStyle)[pro])||ele.style[pro];
		}

		function setPosition(x,y){
			box.style.left=x+"px";
			box.style.top=y+"px";
		}


}
var GUI=(function(window){

/**  常用函数  **/
	function byId(id){
		return document.getElementById(id);
	}

	function byTag(tag,parent){
		if(parent.nodeType!==1) return;
		return (parent||document).getElementsByTagName(tag);
	}

	function byClass(klass,tag,parent){

		parent=parent||document;
		tag=tag||"*";

		var eles=parent.getElementsByTagName(tag),
			e,
			ret=[];

		var regexp=new RegExp("(^|\\s+)"+klass+"(\\s+|$)");
		for(var i=0,len=eles.length;i<len;i++){
			e=eles[i];
			if(regexp.test(e.className)){
				ret.push(e);
			}
		}
		return ret;
	}

	//获得元素的位置
	function getPosition(ele){
		var left=0,top=0;

		while(ele){
			left+=ele.offsetLeft;
			top+=ele.offsetTop;
			ele=ele.offsetParent;
		}
		return {x:left,y:top}
	}

	function getScroll(ele){
		
	}
/*
	//border-top-right-radius  --->borderTopRightRadius
	function pro(name){
		return name.replace(/-[a-z]/g,function($1){
			// var i=$1;
			return $1.slice(1).toUpperCase();
		});
	}

	function fpro(name){
		return name.replace(/A-Z/g,function($1){
			return "-"+$1.toLowerCase();
		});
	}*/


	function extend(src,des){
		for(var i in des){
			src[i]=des[i];
		}
	}

	function each(arr,fn){
		
		for(var i=0,len=arr.length;i<len;i++){
			fn.call(arr[i],i,arr[i])
		}
	}

	function getStyle(obj,prop){

		return obj.currentStyle[prop]||window.defaultView.getComputedStyle(obj,null)[prop]||obj.style[prop];
	}

	var Tween={
		Quad:{
			easein:function(b,c,t,d){
				return b+c*(t/=d)*t;
			},
			easeout:function(b,c,t,d){
				return b+c*(t/=d)*(2-t);
			}
		}
	}



/**************************/
	//拖动
	function Drag(id,opt){
		if(!(this instanceof Drag)){return new Drag(id,option)}

		_this=this;

		_this.ele=byId(id);
		_this.ele.style.position="absolute";	

		_this.offsetX=null;
		_this.offsetY=null;

		_this.option={
			x:true,
			y:true
		}
		
	}
	
	Drag.prototype={
		constructor:Drag,
		
		start:function(e){ 			//console.log("mousedown")
			var _this=this;
						
			e=e||window.event;

					
			this.ele.style.zIndex=1000;

			var pos=getPosition(_this.ele);
			this.offsetX=e.clientX-pos.x;
			this.offsetY=e.clientY-pos.y;

			// console.log(_this.offsetX+":"+_this.offsetY)
			document.onmousemove=function(){
				_this.move();			
			}
			document.onmouseup=function(){
				_this.end();
			}

			document.ondragstart=function(){return false;}
			document.onselectstart=function(){return false;}
		},

		move:function(e){		//console.log("mousemove")
			

			e=e||window.event;

			if(this.option.x) this.ele.style.left=e.clientX-this.offsetX+"px";
			if(this.option.y) this.ele.style.top=e.clientY-this.offsetY+"px";

			this.ele.style.cursor="move"
						
		},



		end:function(){      //console.log("mouseup")
			
			document.onmousemove=null;
			document.onmouseup=null;
			this.ele.style.cursor="";
			// this.ele.style.zIndex=this.z;
			document.ondragstart=null;
			document.onselectstart=null;
		}
	}




	//轮播

	function Slide(id,num,opt){

		this.ele=byId(id);
		if(!this.ele) return;
		this.option={
			time:20,
			direction:"left"
		}
		extend(this.option,opt);
		
		if(this.option.direction==="left"){
			this.step=this.ele.offsetWidth/num;
		}else{
			this.step=this.ele.offsetHeight/num;
		}

		this.timer=null;
		this.auto=null;

		this.index=0;
		this.num=num;

		this.aNav=byTag("li",this.ele.parentNode);
		this.aCon=byClass("slide-control","a",this.ele.parentNode);

		this.navigator();
		this.control();
	}

	Slide.prototype={

		init:function(i){

			if(i>=0) this.index=i;
			this.active(this.index);

			if(this.option.direction==="left"){
				this.begin=this.ele.offsetLeft;
			}else{
				this.begin=this.ele.offsetTop;
			}

			this.target=-this.index*this.step;
			this.change=this.target-this.begin;
			
			if(this.change==0) return;			
			this.move();
		},

		move:function(){
			var _this=this,t=0;

			(_this.timer)&&clearInterval(_this.timer);
			_this.timer=setInterval(function(){

				if(t<_this.option.time){			
					_this.ele.style[_this.option.direction]=Tween.Quad.easeout(_this.begin,_this.change,t,_this.option.time)+"px";
					t++;
				}
				else{
					clearInterval(_this.timer);
					_this.ele.style.left=_this.target;
				}
			},30)

		},

		prev:function(){
			if(--this.index<0) this.index=0;
			this.init();
		},

		next:function(){
			if(++this.index>=this.num) this.index=0;
			this.init();
		},
		play:function(){
			var _this=this;

			this.auto=setInterval(function(){
				_this.next();
			},3000)
		},
		stop:function(){			
			clearInterval(this.auto);
		},

		navigator:function(i){
			var _this=this;
			each(this.aNav,function(i){
				this.onmouseover=function(){
					_this.stop();
					_this.init(i);
				}
				this.onmouseout=function(){
					_this.play();
				}
			});

		},
		active:function(index){
			var _this=this,
			nav=_this.aNav;
			each(nav,function(i){
				nav[i].className=nav[i].className.replace(/active/g,'');
				
			});
			nav[index].className+=" active ";
		},
		control:function(){
			var _this=this,
			prev=_this.aCon[0],
			next=_this.aCon[1];

			prev.onmouseover=function(){
				_this.stop();
			}
			prev.onclick=function(){
				_this.prev();
			}
			prev.onmouseout=function(){
				_this.play();
			}

			next.onmouseover=function(){
				_this.stop();
			}
			next.onclick=function(){
				_this.next();
			}

			next.onmouseout=function(){
				_this.play();
			}
		}

	}




	return {

		drag:function(id,option){
			var obj=new Drag(id,option);

			obj.ele.onmousedown=function(){
				obj.start();
			}

		},

		slide:function(id,num,option){

			var obj=new Slide(id,num,option);
			obj.play();
			
		},

		calender:function(){

		},

		byClass:byClass

	}



})(window);


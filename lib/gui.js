/*---------v 0.1----------*/

/*var gui={

	name:'guitao',
	say:function(){
		alert("hello");

	}
}*/

/*---------v 0.2----------*/

var gui={

	/*根据ID获取节点*/
	byId:function(id){
		return document.getElementById(id);
	},

	/*根据类名获取节点*/
	//string:klass 
	//sting:tag 
	//string node:parent(id tag)
	byClass:function(klass,tag,parent){

		var parent=(typeof parent==="string"?(document.getElementById(parent)||document.getElementsByTagName(parent)[0]):parent)||document,

			tag=tag||"*",
			el=parent.getElementsByTagName(tag),
			ret=[];


		var pattern=new RegExp("(^|\\s+)"+klass+"(\\s+|$)");

		for(var i=0,e,len=el.length;i<len;i++){
			e=el[i];
			if(pattern.test(e.className)){
				ret.push(e);
			}
		}

		//return ret.length===1?ret[0]:ret;
		return ret;

	},

	//为对象添加事件
	addEvent:function(node,type,fn){

		if(node.addEventListener){
			node.addEventListener(type,fn);
		}
		else if(node.attachEvent){
			node.attachEvent('on'+type,fn);
		}
		else{
			node['on'+type]=fn;
		}

		return this;
	},

	//删除对象上的事件
	removeEvent:function(node,type,fn){

		if(node.addEventListener){
			node.removeEventListener(type,fn);
		}
		else if(node.attachEvent){
			node.dettachEvent('on'+type,fn);
		}
		else{
			node['on'+type]=fn;
		}

		return this;
	}



}
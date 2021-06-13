angular.module('starter.services', ['ngResource'])

//权限服务：注册 登录
.factory('AuthService', ['$resource','SERVER_BASE_URL',function ($resource,SERVER_BASE_URL) {
	return {
		register: function(regData){	
			var res=$resource(SERVER_BASE_URL+"muser_regist");
			var result=res.save({username:regData.name,password:regData.password,email:regData.email},{/*这写Json*/});
	        return result.$promise;
		},
		login: function(loginInfo){
			//传值可以把参数写在get()、save()等方法内，或者直接写在url中 
			//var res=User.get();get方式传值
			var res=$resource(SERVER_BASE_URL+"muser_login");
			//post方式传值
			var result=res.save({username:loginInfo.name,password:loginInfo.password},{/*这写Json*/});
	        return result.$promise;
		}
	};
}])

//Session：保存登录用户信息
.service('Session', function(localStorageService){
      this.create = function(user){
        this.currentUser = user;  
       	console.log("Session.currentUser is created");
      };
      this.destroy = function(){
    	  this.currentUser = null;
    	  localStorageService.remove("loginInfo");
    	  console.log("localStorage is removed");
      };
      this.remember=function(loginInfo){
      	localStorageService.set("loginInfo",loginInfo);
        console.log("localStorage is saved:"+loginInfo);	
      }
     return this;
})

//商品服务 推荐 热门  二级目录 产品列表 产品详情 
.factory('ProductService', ['$resource','SERVER_BASE_URL',function ($resource,SERVER_BASE_URL) {
	return {
		//查询推荐商品
		findRec:function(){
			var res=$resource(SERVER_BASE_URL+"mproduct_findRec");
			var result=res.get();
	        return result.$promise;
		},
		//查询热门商品
		findHot:function(){
			var res=$resource(SERVER_BASE_URL+"mproduct_findHot");
			var result=res.get();
	        return result.$promise;
		},
		//查询二级目录
		findCategories:function(){
			var res=$resource(SERVER_BASE_URL+"mproduct_findAllCs");
			var result=res.get();
	        return result.$promise;
		},
		//根据csid查询商品列表
		findByCsid:function(csid,page,index){
			var order="";
			switch(index){
				//新品
				case 0:
					order="modified desc";
				 	break;
				//热销
				case 1:
				 	order="modified desc";
				 	break;
				//价格
				case 2:
					order="shop_price asc";
				 	break;
			}
			console.log(order);

			var res=$resource(SERVER_BASE_URL+"mproduct_findByCsid?csid="+csid+"&page="+page+"&order="+order);
			//var result=res.get({csid:csid,page:page,order:order},{/*这写Json*/});
	        var result=res.get();
	        return result.$promise;
		},
		//根据pid查询商品信息
		findByPid:function(pid){
			var res=$resource(SERVER_BASE_URL+"mproduct_findByPid");
			var result=res.get({pid:pid},{/*这写Json*/});
	        return result.$promise;
		}
	};
}])


.factory('Categories', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var categories = [
  {
  	csid: 1,
	csname:"国产鲜果",
	desc:"我是国产货",
	//这里还应该有张图片
  },
  {
  	csid: 2,
	csname:"进口鲜果",
	desc:"我是进口货"
  },
  {
  	csid: 3,
	csname:"尝鲜小包装",
	desc:"我是小包装"
  },
  {
  	csid: 4,
	csname:"礼品券卡",
	desc:"我是礼品券卡"
  },
  {
  	csid: 5,
	csname:"礼盒 礼篮",
	desc:"我是礼盒 礼篮"
  },
  {
  	csid: 6,
	csname:"营养套餐",
	desc:"我是营养套餐"
  }];

  return {
    all: function() {
      return categories;
    }
  }
})


.factory('Goods', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var goods = [
  {
  	pid:1,
  	pname:"我是1号水果",
  	csid:1,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:2,
  	pname:"我是2号水果",
  	csid:2,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:3,
  	pname:"我是3号水果",
  	csid:3,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:4,
  	pname:"我是4号水果",
  	csid:4,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:5,  	
  	pname:"我是5号水果",
  	csid:5,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  }];

  return {
    all: function() {
      return goods;
    },
   	//这里模拟从后台所有数据里查出一条水果数据，实际上要查出所有的数据。而这里不需要进行处理，后台会查询好统一打包
    get: function(categoryId) {
      var arrayObj = new Array();
      for (var i = 0; i < goods.length; i++) {
        if (goods[i].csid === parseInt(categoryId)) {
          arrayObj.push(goods[i]);
        }
      }
      return arrayObj;
    }
  }
})

.factory('GoodsInfo', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var goodsInfo = [
  {
  	pid:1,
  	pname:"我是1号水果",
  	csid:1,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  },
  {
  	pid:2,
  	pname:"我是2号水果",
  	csid:2,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  },
  {
  	pid:3,
  	pname:"我是3号水果",
  	csid:3,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  },
  {
  	pid:4,
  	pname:"我是4号水果",
  	csid:4,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  	
  },
  {
  	pid:5,  	
  	pname:"我是5号水果",
  	csid:5,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  }];

  return {
   	//这里模拟从后台所有数据里查出一条水果数据，实际上要查出所有的数据。而这里不需要进行处理，后台会查询好统一打包
    get: function(goodsId) {
      for (var i = 0; i < goodsInfo.length; i++) {
        if (goodsInfo[i].pid === parseInt(goodsId)) {
			return goodsInfo[i];
        }
      }
      return null;
    }
  }
})


.factory('GoodsDetail', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var goodsDetail = [
  {
  	pid:1,
  	pname:"我是1号水果",
  	csid:1,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  },
  {
  	pid:2,
  	pname:"我是2号水果",
  	csid:2,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  },
  {
  	pid:3,
  	pname:"我是3号水果",
  	csid:3,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  },
  {
  	pid:4,
  	pname:"我是4号水果",
  	csid:4,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  	
  },
  {
  	pid:5,  	
  	pname:"我是5号水果",
  	csid:5,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	imgs:[{img1:"img/detail1.jpeg"},{img2:"img/detail2.jpeg"},{img3:"img/detail3.jpeg"}]
  	//imgs:[{"img/detail1.jpeg"},{"img/detail2.jpeg"},{"img/detail3.jpeg"}]
  }];

  return {
   	//这里模拟从后台所有数据里查出一条水果数据，实际上要查出所有的数据。而这里不需要进行处理，后台会查询好统一打包
    get: function(goodsId) {
      for (var i = 0; i < goodsDetail.length; i++) {
        if (goodsDetail[i].pid === parseInt(goodsId)) {
			return goodsDetail[i];
        }
      }
      return null;
    }
  }
})

.factory('Cart', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cart = [
  {
  	pid:1,
  	pname:"我是1号水果",
  	csid:1,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:2,
  	pname:"我是2号水果",
  	csid:2,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:3,
  	pname:"我是3号水果",
  	csid:3,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:4,
  	pname:"我是4号水果",
  	csid:4,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  },
  {
  	pid:5,  	
  	pname:"我是5号水果",
  	csid:5,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	img:"img/goods.jpeg"
  }];

  return {
    all: function() {
      return cart;
    },
    total:function(){//这里写一个函数计算上述 商品单价*数量 返回一个合计
    	return 1000;
    }
  }
})














.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

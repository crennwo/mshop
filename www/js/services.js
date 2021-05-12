angular.module('starter.services', [])

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
  	pic:[{pic1:""},{pic2:""},{pic3:""}]
  },
  {
  	pid:2,
  	pname:"我是2号水果",
  	csid:2,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	pic:[{pic1:""},{pic2:""},{pic3:""}]
  },
  {
  	pid:3,
  	pname:"我是3号水果",
  	csid:3,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	pic:[{pic1:""},{pic2:""},{pic3:""}]
  },
  {
  	pid:4,
  	pname:"我是4号水果",
  	csid:4,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	pic:[{pic1:""},{pic2:""},{pic3:""}]
  },
  {
  	pid:5,  	
  	pname:"我是5号水果",
  	csid:5,
  	market_price:100,
  	shop_price:50,
  	pdesc:"8斤装",
  	pic:[{pic1:""},{pic2:""},{pic3:""}]
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

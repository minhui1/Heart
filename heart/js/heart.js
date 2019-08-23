function Heart(config) {
	// 绑定的父节点  
    this.parentNode = config.parentNode;
    // 是否随机产生摆动
    this.random = config.random || true
    this.init();
}
Heart.prototype = {
	constructor: Heart,
	init: function() {
	 	if (this.parentNode) {
	 		var that = this;
	 		this.parentNode.addEventListener('click', function() {
	 			that.create();
	 		});
	 	}
	},
	create: function() {
		var that = this;
		var heartDom = document.createElement('span');
		heartDom.setAttribute('class', 'ani-heart')
		var leftHeart = '<i class="G-ficon G-ficon-heart"></i>';
		var rightHeart = '<i class="G-ficon G-ficon-heart right"></i>';
		if (this.random) {
			var rand = Math.floor(Math.random()*10+1)
			if (rand % 2 == 1) {
				heartDom.innerHTML = leftHeart;
			} else {
				heartDom.innerHTML = rightHeart;
			}
		} else {
			heartDom.innerHTML = leftHeart;
		}
		this.parentNode.appendChild(heartDom)
		setTimeout(function() {
			that.parentNode.removeChild(heartDom)
		}, 2000)
	}
}
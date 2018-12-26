'use strict'

class Gallery {
	constructor(myID, images) {
		this.myID = myID;
		this.images = images;
	}
	
	render() {
		var result = '<div ="' + this.myID +'">';
		
		for (var i = 0; i < this.images.length; i++) {
			if (this.images[i] instanceof Images) {
				result += this.images[i].createImage();
			}
		}
		
		result += '</div>';
		return result;		
	}
}

class Images extends Gallery {
	constructor(thumbnail, original) {
		super();
		this.thumbnail = thumbnail;
		this.original = original;
	}
	
	createImage() {
		return '<a href="' + this.original + '" target="_blank"><img src="' + this.thumbnail + '"></a>';
	}
}

window.onload = function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'images.json', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) {
			return;
		}
		
		var items = JSON.parse(xhr.responseText);
		
		var arrayImages = [];
		for (var i = 0; i < items.length; i++) {
			arrayImages.push(items[i].thumbnail, items[i].original);
		}
		
		var images = new Gallery('gallery', [
			new Images(arrayImages[0], arrayImages[1]),
			new Images(arrayImages[2], arrayImages[3]),
			new Images(arrayImages[4], arrayImages[5])
		]);
		
		document.getElementById('wrapper').innerHTML = images.render();
	};
	
	xhr.send();
};
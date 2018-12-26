'use strict'

class Menu {
	constructor(myID, myClass, items) {
		this.myID = myID;
		this.myClass = myClass;
		this.items = items;
	}
	
	render() {
        var result = '<ul class="' + this.myClass + '" id="' + this.myID + '">';

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof MenuItem) {
                result += this.items[i].render();
            } else if (this.items[i] instanceof SubMenu) {
                result += this.items[i].render();
            }
        }

        result += '</ul>';
        return result;
	}
}

class MenuItem extends Menu {
	constructor(href, title) {
		super();
		this.href = href;
		this.title = title;
	}
	
	render() {
		return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
	}
}

class SubMenu {
	constructor(href, title, items) {
		this.href = href;
		this.title = title;
		this.items = items;
	}
	
	render() {
        var result = '<li><a href="' + this.href + '">' + this.title + '</a>';

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof Menu) {
                result += this.items[i].render();
            }
        }

        result += '</li>';
        return result;
	}
}

window.onload = function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'items.json', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) {
			return;
		}
		
		var items = JSON.parse(xhr.responseText);
		console.log(items);
		
		var menuItems = [];
		for (var i = 0; i < items.length; i++) {
			menuItems.push(new MenuItem(items[i].href, items[i].title));
		}
		
		var menu = new Menu('', 'menu', [
			new SubMenu('#', 'Электроника', [
				new Menu('', 'submenu', menuItems)
			]),
			new SubMenu('#', 'Компьютеры', [
				new Menu('', 'submenu', menuItems)
			])
		]);
		
		document.getElementById('menu').innerHTML = menu.render();
	};
	xhr.send();
};
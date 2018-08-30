;
var input = document.querySelectorAll('input[type = "checkbox"]'),
	switchRectngle = document.querySelectorAll('.switch'),
	payments = document.querySelector('.payments'),
	circle = document.querySelector('.circle');


var coins = document.querySelectorAll('#coin');


var currencyArrow = document.querySelector('.currency-arrow'),
	otherCurrency = document.querySelector('.other-currency');

currencyArrow.addEventListener('click', currencyChoise);

function currencyChoise(event){
	otherCurrency.classList.toggle('visible');;
};

var askPrice = document.querySelectorAll('#ask'),
	hourValue = document.querySelectorAll('#hour-value'),
	dayValue = document.querySelectorAll('#day-value'),
	weekValue = document.querySelectorAll('#week-value'),
	monthValue = document.querySelectorAll('#month-value');

var values = [askPrice, hourValue, dayValue, weekValue, monthValue];







var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', true);

xhr.send();

var openedData = {};

xhr.onreadystatechange = function(event){
	if(xhr.readyState != 4) return;

	if (xhr.status != 200) return;

	var data = JSON.parse(xhr.responseText);
	console.log(data);
	openedData = data.open;

	function postsStaredValue(elem){
		
			// easkPrice[i].innerHTML = '$' + data.ask;
			// hourValue[i].innerHTML = '$' + data.open.hour;
			// dayValue[i].innerHTML = '$' + data.open.day;
			// weekValue[i].innerHTML = '$' + data.open.week;
			// monthValue[i].innerHTML = '$' + data.open.month;
			elem.querySelector('#ask').innerHTML = '$' + data.ask;
			elem.querySelector('#hour-value').innerHTML = '$' + data.open.hour;
			elem.querySelector('#day-value').innerHTML = '$' + data.open.day;
			elem.querySelector('#week-value').innerHTML = '$' + data.open.week;
			elem.querySelector('#month-value').innerHTML = '$' + data.open.month;
		
	};

	function lessThenZero(arr){
		for(var i = 0; i < arr.length; i++){
			for(var j = 0 ; j<arr[i].length; j++){
				if(parseFloat(arr[i][j].innerHTML) < 0 ) {
					arr[i][j].classList.add('red-color');
				}else{
					arr[i][j].classList.remove('red-color');
				}
			};
		};
	};

	function postPercentChenge(elem){
		var sumbol = '';

		for (var i = 0; i < askPrice.length; i++){

			for(key in data.changes.percent){
				sumbol = (data.changes.percent[key] >= 0)? '+ ': '';
				
				switch (key){
					case 'hour': elem.querySelector('#hour-value').innerHTML = sumbol + data.changes.percent.hour + ' %';
					
					case 'day': elem.querySelector('#day-value').innerHTML = sumbol + data.changes.percent.day + '%';
					case 'week': elem.querySelector('#week-value').innerHTML = sumbol + data.changes.percent.week + '%';
					case 'month':  elem.querySelector('#month-value').innerHTML = sumbol + data.changes.percent.month + '%';

				}
			};

			
		};

	};
	for (var i = 0; i < coins.length; i++){
		postsStaredValue(coins[i]);
	};
	
	for(var i = 0; i < coins.length; i++){

		coins[i].onclick = function(event){
			var target = event.target;
			var parent = target;

			if (target.tagName != 'INPUT') return;
				
			var circles = this.getElementsByClassName('circle');
			
			var parent = target;

			while(parent != payments){
				if(parent == this){
					break;
				}else{
					parent = parent.parentElement;
				};
			};

			target.oninput = function(e){
				if(this.checked == false) {
					
					this.parentElement.classList.remove('active-checkbox');
					this.parentElement.classList.add('disabled-checkbox');
					
					
					target.nextElementSibling.style.left = target.parentElement.getBoundingClientRect().width - 24 + 'px';
					postsStaredValue(parent);
					lessThenZero(values);
				}else{
					this.parentElement.classList.remove('disabled-checkbox');
					this.parentElement.classList.add('active-checkbox');
					
					target.nextElementSibling.style.left = 0;
					postPercentChenge(parent);
					lessThenZero(values);
				};
			};
		};
	};
	
};


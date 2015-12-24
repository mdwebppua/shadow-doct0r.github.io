// timer
(function() {
	
	function Timer(timerDOMEl, splitsDOMEl, startBtn) {
			
		var timerId,
			pause = false;
			time = {
				start: 0,
				split: 0,
				shift: 0,
			};

		function chgButton(str) {
			startBtn.innerHTML = str;
			(startBtn.innerHTML === 'Stop') ? startBtn.className = 'btn btn-warning' : startBtn.className = 'btn btn-success';
		}

		function getTimeStr(inputTime) {
			return (new Date(inputTime)).toISOString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9][0-9]).*/,'$1');
		}

		function setTimer(str) {
			timerDOMEl.innerHTML = str;
		}

		function runTimer() {
			timerId = setInterval(function() {
				setTimer(getTimeStr(Date.now() - time.start - time.shift));
			},1);
			chgButton('Stop');
		}

		function stopTimer() {
			if (timerId) {
				clearInterval(timerId);
				timerId = undefined;
			}
			chgButton('Start');
		}

		function addMsg(str) {
				var el = document.createElement('li');
				el.innerHTML = str;
				splitsDOMEl.appendChild(el);	
		}

		this.startStop = function() {			
			var now = 0, 
				str = '00:00:00.000';
			
			if (time.start === 0) {
				setTimer(str);
				time.start = time.split = Date.now();
				runTimer();
			} else {				
				if (pause) {
					now = Date.now()
					time.shift += now - time.split;
					time.split = now;
					runTimer();
					pause = false;
				} else {
					time.split = Date.now();
					str = getTimeStr(time.split - time.start - time.shift);
					stopTimer();
					setTimer(str);
					addMsg('Stop ' + str);
					pause = true;
				}
			}
		}

		this.split = function() {
			if ((time.start > 0) && (!pause)) {
				var now = Date.now();
				addMsg('Split ' + getTimeStr(now - time.split));
				time.split = now;
			}
		}

		this.reset = function() {
			stopTimer();
			setTimer('00:00:00.000');
			pause = false;
			time.start = time.split = time.shift = 0;
			allLi = splitsDOMEl.querySelectorAll('li');
			if (allLi.length > 0) {
				for (var i = 0; i < allLi.length; i++) {
					splitsDOMEl.removeChild(allLi[i]);
				}
			}
		}
	}

	var timeEl = document.getElementById('time'),
		splitsEl = document.getElementById('splits'),
		startB = document.getElementById('start'),
		splitB = document.getElementById('split'),
		resetB = document.getElementById('reset');

	var timerObj = new Timer(timeEl, splitsEl, startB);
	startB.addEventListener('click', timerObj.startStop);
	splitB.addEventListener('click', timerObj.split);
	resetB.addEventListener('click', timerObj.reset);
})();
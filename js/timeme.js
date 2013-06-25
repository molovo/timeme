	// Find all elements with class 'timeMe'
	var subject = document.getElementsByClassName('timeMe');
	var form = document.getElementsByClassName('timeMe-form');

	// Run the function when the field loses focus
	for (var i = 0; i < subject.length; i++) {
		var act = subject[i];
		act.onblur = function() {
			timeMe(act);
		}
	}

	// Run the second function when the form is submitted
	for (var i = 0; i < form.length; i++) {
		var parent = form[i];
		var child = parent.getElementsByClassName('timeMe');
		parent.onsubmit = function() {
			for (var i = 0; i < child.length; i++) {
				var act = child[i];
				timeMeFormSubmit(act);
			}
			setTimeout(function() {
				return true;
			}, 250);
		}
	}

	var unitSize = 6;  // Specify the number of minutes in a unit of time

	function timeMe(subject) {
		// First grab the element
		var act = subject;

		// Grab the entered Date
		var inputtedTime = act.value;

		// Remove error class before validation
		act.className = act.className.replace( /(?:^|\s)error(?!\S)/g , '' );

		// Make sure a value was entered
		if ( !inputtedTime ) {
			return false;
		}

		if (inputtedTime.match('u')) {
			//if only units are entered, multiply value by unitSize
			var timeInMinutes = (parseFloat(inputtedTime) * unitSize);
		} else if (inputtedTime.match('h') && inputtedTime.lastIndexOf('h') + 1 == inputtedTime.length) {
			//if only hours and no minutes are entered multiply value by 60
			var timeInMinutes = (parseFloat(inputtedTime) * 60);
		} else if (inputtedTime.match('m') && inputtedTime.lastIndexOf('m') + 1 == inputtedTime.length && !inputtedTime.match('h')) {
			//if only minutes and no hours are entered multiply value by 1
			var timeInMinutes = (parseFloat(inputtedTime) * 1);
		} else if (
				(inputtedTime.match('h')
					 && (
					 	inputtedTime.match('m')
							 || (
							 	inputtedTime.lastIndexOf('h') + 1 < inputtedTime.length)
				 				 && !inputtedTime.substring(inputtedTime.lastIndexOf('h'), inputtedTime.length).match(/^[a-zA-Z]*$/)
				 				)
				 		)
			) {
			//if both hours and minutes, or an hour and a number are entered, separate, get minutes from hours and add together
			inputtedTime = inputtedTime.replace(/ /g, '');
			var positionOfHours = inputtedTime.lastIndexOf('h');
			var positionOfMinutes = inputtedTime.lastIndexOf('m');

			var hours = parseFloat(inputtedTime.substring(0, positionOfHours));
			var minutes = parseFloat(inputtedTime.substring(positionOfHours + 1, inputtedTime.length));

			var timeInMinutes = (hours * 60) + minutes;
		} else if (!inputtedTime.match(/^[a-zA-Z]*$/) && inputtedTime.match(/^[0-9]*$/) ) {
			var timeInMinutes = (parseFloat(inputtedTime) * 1);
		} else {
			act.className += " error";
		}

		if (inputtedTime && timeInMinutes > 0) {
			act.value = ~~(timeInMinutes / 60) + 'h ' + (timeInMinutes - (~~(timeInMinutes / 60) * 60) + 'm');
			return true;
		}

	}

	function timeMeFormSubmit(subject) {
		var act = subject;

		var inputtedTime = act.value;
		inputtedTime = inputtedTime.replace(/ /g, '');
		var positionOfHours = inputtedTime.lastIndexOf('h');
		var positionOfMinutes = inputtedTime.lastIndexOf('m');

		var hours = parseFloat(inputtedTime.substring(0, positionOfHours));
		var minutes = parseFloat(inputtedTime.substring(positionOfHours + 1, positionOfMinutes));

		var timeInMinutes = (hours * 60) + minutes;
		subject.value = timeInMinutes;
	}
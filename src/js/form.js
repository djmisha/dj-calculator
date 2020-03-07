/* Create Scope for Form*/

;(function() {

	/*Range Sliders */

	var sliderPeople = document.getElementById("_Attenance");
	var outputPeople = document.getElementById("_Attenance_Value");
	outputPeople.innerHTML = sliderPeople.value; // Display the default sliderPeople value

	// Update the current sliderPeople value (each time you drag the sliderPeople handle)
	sliderPeople.oninput = function() {
	  outputPeople.innerHTML = this.value;
	};

	var sliderHiurs = document.getElementById("_Hours");
	var outputHours = document.getElementById("_Hours_Value");
	outputHours.innerHTML = sliderHiurs.value; // Display the default sliderHiurs value

	// Update the current sliderHiurs value (each time you drag the sliderHiurs handle)
	sliderHiurs.oninput = function() {
	  outputHours.innerHTML = this.value;
	};
	



	/* Switch Between Tabs*/

	function switchBetweenTabs() {

		/*Switch by Clicking Tabs*/

		var tabElement = document.getElementById('nav-tab');
		tabElement.addEventListener('click', onTabClick, false);

		function onTabClick(event) {
			event.preventDefault();
			var activeTabs = document.querySelectorAll('.active');

			activeTabs.forEach(function(tab) {
				tab.className = tab.className.replace(' active', '');
			});

			event.target.parentElement.className += ' active';
			document.getElementById(event.target.href.split('#')[1]).className += ' active';
		}

		/*Switch via Next Buttons*/

		var nextTabButtons = document.getElementsByClassName('next-tab');

		for( i = 0; i < nextTabButtons.length; i++) {
			nextTabButtons[i].addEventListener('click', onNextTabButtonClick, false);
		}

		function onNextTabButtonClick(event) {
			event.preventDefault();

			var currentTabContent = event.target.parentElement;
			currentTabContent.className = currentTabContent.className.replace('active', '');

			var activeTab = document.querySelectorAll('li.active');

			activeTab.forEach(function(tab) {
				tab.className = tab.className.replace('active', '');
				tab.nextElementSibling.classList.add('active');
			});

			var nextTabContent = event.target.parentElement.nextElementSibling;
			nextTabContent.className += ' active';

		}
	}

	switchBetweenTabs();


	// Global Form Variables

	var formFields = document.getElementById('form').elements;
	var formData = [];

	function scanPageforFormValues() {
		for(var i = 0; i < formFields.length; i++) {
			// console.log(formFields[i]);
	

			/* Select Fields */
			// if (formFields[i].localName === 'select') {
			// 	var singleSelectFieldData = {
			// 		name: formFields[i].name,
			// 		label: formFields[i].dataset.name,
			// 		value: formFields[i].value,
			// 		type: formFields[i].type,

			// 	};
			// 	formData.push(singleSelectFieldData);
			// }
			/* Input Fields */
			if (formFields[i].localName === 'input' ) {
				var singleInputFieldData = {
					name: formFields[i].name,
					label: formFields[i].dataset.name,
					value: formFields[i].value,
					type: formFields[i].type,
				};
				formData.push(singleInputFieldData);
			}
		}
	}

	scanPageforFormValues();

	function calculateRate() {

		var hoursInput = document.getElementById('_Hours');
		hoursInput = hoursInput.value;

		var attenanceInput = document.getElementById('_Attenance');
		attenanceInput = attenanceInput.value;

		var PrivatePartyInput = document.getElementById('_Private_Party');
		PrivatePartyInput = PrivatePartyInput.value;



		var partyTypeRate; 

		var soundRate = 200;
		var lightingRate = 0;

		var djRate = 100;

		var hours = hoursInput;
		var people = parseInt(attenanceInput);


		var totalRate = djRate * hours + people;

		console.log(totalRate);

		function attachRate() {
			document.getElementById('theRate').innerHTML = totalRate;
		}
		attachRate();
	}

	calculateRate();


	function buildConfirmationTable() {
		document.getElementById('details-target').innerHTML = '';
		for(var i = 0; i < formData.length; i++) {

			if(formData[i].type === 'hidden') {
				var rowTitle = document.createElement('div');
				rowTitle.classList.add('table-header');

				var titleValue = document.createTextNode(formData[i].value);

				rowTitle.appendChild(titleValue);
				document.getElementById('details-target').appendChild(rowTitle);

			}
			else{
				/*ROW */
				var row = document.createElement('div');
				row.classList.add('table-row');
				/*Description*/
				var desc = document.createElement('div');
				desc.classList.add('row-desc');

				/*Value*/
				var value = document.createElement('div');
				value.classList.add('row-value');

				var fieldName = document.createTextNode(formData[i].label);
				var fieldValue = document.createTextNode(formData[i].value);

				desc.appendChild(fieldName);
				value.appendChild(fieldValue);

				row.appendChild(desc);
				row.appendChild(value);

				document.getElementById('details-target').appendChild(row);
			}
		}
	}

	buildConfirmationTable();


	/* Validate Fields and Push to Confirmation */

	function validateFieldAndPushIntoArray() {
		var form = document.getElementById('form');
		form.addEventListener('change', function (event) {
			// if(!event.target.value) {
			// 	event.target.nextElementSibling.classList.remove('valid');  
			// }
			// else {
			// 	event.target.nextElementSibling.classList.add('valid');  
			// }
			for(var i = 0; formData.length > i; i++) { 
				if (formData[i].name == event.target.name) {
					formData[i].value = event.target.value;
					if ( event.target.type === 'checkbox' && event.target.checked === true) {
						formData[i].value = "Yes";
					}
					buildConfirmationTable();
					calculateRate();
				}
			}
		}, true);
	}

	validateFieldAndPushIntoArray();


	/* Toggle Return Trip Show Hide */

	// function showReturnTripDates() {
	// 	var returnTripFields = document.getElementsByClassName('input-return-trip');
	// 	for (i = 0; i < returnTripFields.length; i++) {
	// 		returnTripFields[i].classList.add('hidden');
	// 	}

	// 	var typeOfReservation = document.getElementById('typeOfReso');

	// 	typeOfReservation.addEventListener('change', function(event) {
	// 		if (typeOfReservation.value === "Round Trip") {
	// 			for (i = 0; i < returnTripFields.length; i++) {
	// 				returnTripFields[i].classList.remove('hidden');
	// 			}	
	// 		}
	// 		if (typeOfReservation.value === "One Way") {
	// 			for (i = 0; i < returnTripFields.length; i++) {
	// 				returnTripFields[i].classList.add('hidden');
	// 			}	
	// 		}
	// 	});
	// }

	// showReturnTripDates();

})();
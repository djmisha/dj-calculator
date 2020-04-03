/*! amex-gbt-portal v0.0.1 | (c) 2020 Lewis | MIT License | https://bitbucket.org/mishaosinovskiy/amex-gbt-portal/src/master/ */
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
		PrivatePartyInput = PrivatePartyInput.checked;

		var CorporateInput = document.getElementById('_Corporate');
		CorporateInput = CorporateInput.checked;

		var WeddingInput = document.getElementById('_Wedding');
		WeddingInput = WeddingInput.checked;


		/*Experience*/

		var DJNovice = document.getElementById('_Novice');
		DJNovice = DJNovice.checked;

		var DJExpert = document.getElementById('_Expert');
		DJExpert = DJExpert.checked;

		var DJPro = document.getElementById('_Proffesional');
		DJPro = DJPro.checked;


		/* Sound */
		var SoundSystemInput = document.getElementById('_SoundSystemYes');
		SoundSystemInput = SoundSystemInput.checked;

		/*Lighting*/
		var LightingSystemInput = document.getElementById('_RateTravelPolicy_None');
		LightingSystemInput = LightingSystemInput.checked;



		function getRateType(attenance) {
			var djRate = 100;
			if( PrivatePartyInput === true) {
				djRate = 100;
			}
			if( CorporateInput === true) {
				djRate = 200;
			}
			if( WeddingInput === true) {
				djRate = 250;
			}
			return djRate;
		}

		getRateType();


		function getSoundRate(attenance) {
			var rate;
			if (SoundSystemInput === true) {
				if(attenance >= 150) {
					rate = 350;
				} 
				else {
					rate = 200;
				}
				console.log(rate);
			}
			else {
				rate = 0;
			}
			return rate;
		}

		function getLightingRate(attenance) {
			var rate;
			if (LightingSystemInput === true) {
				base = 200;
				size = (attenance * 0.25);
				rate = base + size;
				console.log(rate);
			}
			else {
				rate = 0;
			}
			return rate;
		}

		var soundRate = getSoundRate(attenanceInput);
		var lightingRate = getLightingRate(attenanceInput);
		var djRate = getRateType();

		var hours = hoursInput;

		var totalRate = djRate * hours + soundRate + lightingRate;

		var lowRate = totalRate - 120;
		var highRate = totalRate + 120;

		// console.log(totalRate);

		function attachRate() {
			document.getElementById('theRate').innerHTML = totalRate;
			document.getElementById('hourly').innerHTML = djRate;
			document.getElementById('sound').innerHTML = soundRate;
			document.getElementById('lighting').innerHTML = lightingRate;

			// document.getElementById('t<div></div>heRange').innerHTML = '&darr; ' + lowRate  + '  &nbsp; &nbsp; &nbsp;  ' + '&uarr; ' + highRate;
		}

		attachRate();
	}

	calculateRate();


	/* Validate Fields and Push to Confirmation */

	function validateFieldAndPushIntoArray() {
		var form = document.getElementById('form');
		form.addEventListener('change', (function (event) {
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
					// buildConfirmationTable();
					calculateRate();
				}
			}
		}), true);
	}

	validateFieldAndPushIntoArray();





})();
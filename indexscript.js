
				let fuel_types=[];
				document.addEventListener('DOMContentLoaded', function() {
					var portAttr='';
					//var url = window.location.href;
                    const queryString = window.location.search;
                    const urlParams = {};

                    if (queryString) {
                        const pairs = queryString.substring(1).split('&');
                        for (let i = 0; i < pairs.length; i++) {
                            const keyValue = pairs[i].split('=');
                            const key = keyValue[0];
                            const value = keyValue.slice(1).join('=');
                            urlParams[key] = decodeURIComponent(value);
                        }
                    }

					reporttype=urlParams['reporttype'];
					voyagetype=urlParams['voyagetype'];
                    if(reporttype===undefined){
                        reporttype='';
                    }
                    document.getElementById('reportType').value = reporttype;
                    document.getElementById('voyageType').value = voyagetype;

					reportTypeChangeShowHide();
            		
                    var selectElements = document.querySelectorAll('.select_cls');
                    for (var i = 0; i < selectElements.length; i++) {
                        selectElements[i].disabled = true;
                    }
                     


                    var ports= [
						//  @@PORTS@@
						// {
							//   id: 1,
							//port: 'Portname'
							//},
						// {
							//	id: 2,
							//  port: 'Singapore'
							//}						
					];
					var ship_types=[
						//@@SHIPTYPES@@
						// {
						// id: "reefer",
						// type: 'Reefer'
						//}
					];
					fuel_types=[
						//@@FUELTYPES@@
						//{
						//	id: 1,
						//	fuel: 'Reefer'
						//},
						//{
						//	id: 2,
						//	fuel: 'Oil'
						//}

					];

					var fuel_viscosity=[
					//@@VISCOSITY@@

					// {

					//     id: 1,

					//     viscosity: 'viscosity'

					// }

					];
      
      
					var scrubbertypes=[
					//@@SCRUBBERTYPES@@
						//{
						//  id:"hybrid",
						//  text:"Hybird"
						//}
					];
					var foc_methods=[
						//@@FOCMETHODS@@

						//  {
							// id:'bdn',
							//  text:'Using BDN'
						//}

					];
					var charter_type_laden=[
						//@@CHARTERTYPELADEN@@

						//{
							//id:"time_charter",
							//text:"Time Charter"
						//}
					];
				
					var charter_type_ballast=[
						//@@CHARTERTYPEBALLAST@@

						//{
							//id:"time_charter",

							//text:"Time Charter"
							
						//}
					];

                    if(reporttype.trim()!='' && reporttype!=null){

                        var lattitude_n_s_Element = document.querySelector('#'+reporttype+' [name="lattitude_n_s"]');
                        if(lattitude_n_s_Element!='' && lattitude_n_s_Element!=null){

                            lattitude_n_s_Element.checked = true;
                        }
                        var longitude_e_w_Element = document.querySelector('#'+reporttype+' [name="longitude_e_w"]');
                        if(longitude_e_w_Element!='' && longitude_e_w_Element!=null){

                            longitude_e_w_Element.checked = true;
                        }

                        var reasonElement = document.querySelector('#'+reporttype+' .reason');
                        if(reasonElement!='' && reasonElement!=null ){
                            reasonElement.addEventListener('change', function() {
                                if(reasonElement.value=='Other'){
                                    document.querySelector('#'+reporttype+' .reason_other').style.display='block';
                                }
                            });
                        }

                        var timeButtons = document.querySelectorAll("#" + reporttype + " .time_cus");
                        for (var p = 0; p < timeButtons.length; p++) {
                            (function(index) {
                                timeButtons[index].addEventListener('input', function() {
                                    const value = this.value.replace(/[^0-9:]/g, ''); // Remove non-numeric and non-colon characters
                                    const parts = value.split(':');
                                    let hours = parseInt(parts[0], 10) || 0;
                                    let minutes = parseInt(parts[1], 10) || 0;
                                    
                                    // Ensure hours are within 0-23 and minutes are within 0-59
                                    hours = Math.max(0, Math.min(23, hours));
                                    minutes = Math.max(0, Math.min(59, minutes));
                                    
                                    // Format hours and minutes with leading zeros
                                    var formattedHours = hours.toString();
                                    var formattedMinutes = minutes.toString();
                                    if(formattedHours<2){
                                        formattedHours = '0' + formattedHours;
                                    }
                                    if(formattedMinutes<2){
                                        formattedMinutes = '0' + formattedMinutes;
                                    }
                                    
                                    // Update input value with formatted time
                                    this.value = formattedHours + ':' + formattedMinutes;
                                });
                            })(p);
                        }

                        var dateButton = document.querySelectorAll("#"+reporttype+" .date_cus");
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth();
                        let index_temp='';
                        let globalIndex = null;

                        // Array of month names
                        const months = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December"
                        ];
                        function padStart(str, length, padChar) {
                            str = String(str);
                            while (str.length < length) {
                                str = padChar + str;
                            }
                            return str;
                        }
                        // Function to generate the calendar
                        function manipulate() {
                            
                            // Get the first day of the month
                            let dayone = new Date(year, month, 1).getDay();
                            
                            // Get the last date of the month
                            let lastdate = new Date(year, month + 1, 0).getDate();
                            
                            // Get the day of the last date of the month
                            let dayend = new Date(year, month, lastdate).getDay();
                            
                            // Get the last date of the previous month
                            let monthlastdate = new Date(year, month, 0).getDate();
                            
                            // Variable to store the generated calendar HTML
                            let lit = "";
                            
                            // Loop to add the last dates of the previous month
                            for (let i = dayone; i > 0; i--) {
                                lit += '<li class="inactive">' + (monthlastdate - i + 1) + '</li>';
                            }
                            
                            // Loop to add the dates of the current month
                            for (let i = 1; i <= lastdate; i++) {
                                // Check if the current date is today
                                let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                                    ? "active"
                                    : "";
                                lit += '<li class="' + isToday + '">' + i + '</li>';
                            }
                            
                            // Loop to add the first dates of the next month
                            for (let i = dayend; i < 6; i++) {
                                lit += '<li class="inactive">' + (i - dayend + 1) + '</li>';
                            }
    
                            // Update the text of the current date element with the formatted current month and year
                            currdate.innerText = months[month] + ' ' + year;
                            
                            // update the HTML of the dates element with the generated calendar
                            const day = document.querySelector(".calendar-dates");
                            day.innerHTML = lit;
    
                            for (let i = 0; i < day.childNodes.length; i++) {
                                (function(index2) {
                                    day.childNodes[index2].addEventListener('click', function() {
                                        let clickedDate = parseInt(day.childNodes[index2].innerText);
                                        // Convert month to two-digit format (e.g., "02" for February)
                                        var monthStr = padStart(month + 1, 2, '0');
                                        // Convert clicked date to two-digit format (e.g., "05" for 5th)
                                        var clickedDateStr = padStart(clickedDate, 2, '0');
                                        // Format the date string in "yyyy-MM-dd" format
                                        var formattedDate = year + '-' + monthStr + '-' + clickedDateStr;
                                        // Output the formatted date
                                        // Update the value of the date button with the formatted date
                                        dateButton[globalIndex].value = formattedDate;
                                        this.formattedDate1 = formattedDate;
                                        dateButton[globalIndex].value = this.formattedDate1;
                                        document.querySelector('.calendar-container').style.display = 'none';
                                    });
                                })(i);
                            }
                        }
                 
                        // Attach a click event listener to each navigation button
                        const preIcons = document.getElementById("calendar-prev");
                        preIcons.addEventListener("click", function(event) {
                            event.stopPropagation();

                            month =  month - 1 ;
                            if (month < 0 || month > 11) {
                                date = new Date(year, month, new Date().getDate());
                                year = date.getFullYear();
                                month = date.getMonth();
                            } else {
                                date = new Date();
                            }
                            // Call manipulate function to update the calendar display
                            for (var i = 0; i < dateButton.length; i++) {
                                manipulate();
                            }
                        });

                        const nexIcons = document.getElementById("calendar-next");

                        nexIcons.addEventListener("click", function(event) {
                            event.stopPropagation();

                            month =  month + 1 ;
                            if (month < 0 || month > 11) {
                                date = new Date(year, month, new Date().getDate());
                                year = date.getFullYear();
                                month = date.getMonth();
                            } else {
                                date = new Date();
                            }
                            // Call manipulate function to update the calendar display
                            for (var i = 0; i < dateButton.length; i++) {
                                manipulate();
                            }
                        });
                        const currdate = document.querySelector(".calendar-current-date");

                            // Loop through each date button and attach a click event listener
                            // Declare a global variable to store the index value

                        // Loop through each date button and attach a click event listener
                        for (let i = 0; i < dateButton.length; i++) {
                            // Assign the index value to the global variable

                            // Attach event listener inside an IIFE to capture the current value of i
                            (function(index) {
                                dateButton[index].addEventListener("click", function(event) {
                                    globalIndex = index;
                                    document.querySelector('.calendar-container').style.display = 'block';
                                    event.stopPropagation();
                                    manipulate(); // Call manipulate function to update the calendar display
                                });
                            })(i);
                        }

                        var avg_wind_direction = document.querySelector('#'+reporttype+' .avg_wind_direction');
                        if(avg_wind_direction!='' && avg_wind_direction!=null){
                            // Create and append the default option
                            var defaultOption = document.createElement('option');
                            defaultOption.value = '';
                            defaultOption.textContent = 'Select Direction';
                            avg_wind_direction.appendChild(defaultOption);

                            // Append options for wind direction from 0 to 359
                            for (var i = 0; i <= 359; i++) {
                                var option = document.createElement('option');
                                option.value = i;
                                option.textContent = i;
                                avg_wind_direction.appendChild(option);
                            }
                        }

                        var avg_wind_bf = document.querySelector('#'+reporttype+' .avg_wind_bf');

                        if(avg_wind_bf!='' && avg_wind_bf!=null){
                            // Create and append the default option
                            var defaultOption = document.createElement('option');
                            defaultOption.value = '';
                            defaultOption.textContent = 'Select Direction';
                            avg_wind_bf.appendChild(defaultOption);

                            // Append options for Beaufort scale from 1 to 10
                            for (let i = 1; i <= 10; i++) {
                                var option = document.createElement('option');
                                option.value = i;
                                option.textContent = i;
                                avg_wind_bf.appendChild(option);
                            }
                        }
                    
                        var avg_seas_direction = document.querySelector('#'+reporttype+' .avg_seas_direction');
                        if(avg_seas_direction!='' && avg_seas_direction!=null){

                            // Create and append the default option
                            var defaultOption = document.createElement('option');
                            defaultOption.value = '';
                            defaultOption.textContent = 'Select Direction';
                            avg_seas_direction.appendChild(defaultOption);

                            // Append options for sea direction from 0 to 359
                            for (var i = 0; i <= 359; i++) {
                                var option = document.createElement('option');
                                option.value = i;
                                option.textContent = i;
                                avg_seas_direction.appendChild(option);
                            }

                        }

                        var avg_seas_height = document.querySelector('#'+reporttype+' .avg_seas_height');

                        if(avg_seas_direction!='' && avg_seas_direction!=null){
                            // Create and append the default option
                            var defaultOption = document.createElement('option');
                            defaultOption.value = '';
                            defaultOption.textContent = 'Select Height';
                            avg_seas_height.appendChild(defaultOption);

                            // Append options for sea height from 0.01 to 10.0
                            for (let i = 0.01; i <= 10.0; i += 0.01) {
                                var option = document.createElement('option');
                                option.value = i.toFixed(2); // Limiting to 2 decimal places
                                option.textContent = i.toFixed(2);
                                avg_seas_height.appendChild(option);
                            }

                        }

                        // Sort the ports array
                        ports.sort();
                    
                        // Get all input elements with the class 'ports'
                     
                        var inputElements = document.querySelectorAll('#' + reporttype + ' .ports');
                        var debounceTimeout;
 
                        for (let i = 0; i < inputElements.length; i++) {
                            (function(index) {
                                inputElements[index].addEventListener('keydown', function(event) {
                                    event.stopPropagation();
                                    clearTimeout(debounceTimeout);
                                    debounceTimeout = setTimeout(function() {
                                        var term = inputElements[index].value.toUpperCase();
                                        var suggestions = [];
                                        for (var j = 0; j < ports.length; j++) {
                                            if (ports[j].port.toUpperCase().indexOf(term) !== -1) {
                                                suggestions.push(ports[j].port.toUpperCase());
                                            }
                                        }
                                        inputElements[index].nextElementSibling.innerHTML = '';
    
                                        suggestions.forEach(function(port) {
                                            var newElem = document.createElement("div");
                                            newElem.classList.add("port-result");
                                            newElem.textContent = port;
                                            inputElements[index].nextElementSibling.appendChild(newElem);
                                            newElem.addEventListener('click', function(e) {
                                                document.querySelector('#' + reporttype + ' [name="' + inputElements[index].name + '"]').value = port;                                     
                                                var selectedObjectId = [];
                                                var selectedLabel =port.toUpperCase();		
                                                for (var i = 0; i < ports.length; i++) {
                                                        if (ports[i].port.toUpperCase() === selectedLabel) {
                                                            selectedObjectId.push(ports[i].id);
                                                        }
                                                    }
                                                if(inputElements[index].name=='next_port_name'){
                                                        document.getElementById('next_port_id').value=selectedObjectId[0];
                                                }else{
                                                        document.getElementById('destination_port_id').value=selectedObjectId[0];

                                                }
                                                inputElements[index].nextElementSibling.innerHTML = '';
                                            });
                                        });
                                    }, 300); // Debounce time in milliseconds (adjust as needed)
                                });
    
                                // Rest of your event listeners...
                            })(i);
                        }
                    }

                    
                    document.body.addEventListener('click', function(event) {
                        document.querySelector('.calendar-container').style.display='none';
                        var showresultElement=document.querySelectorAll('.show-result');
                        for(var i=0;i<showresultElement.length;i++){
                            showresultElement[i].innerHTML='';
                        }
                    });
                    var shipTypeSelect = document.getElementById('ship_type');
                    // Create and append the default option
                    var defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Please Select';
                    shipTypeSelect.appendChild(defaultOption);

                    // Append options for ship types
                    ship_types.forEach(function(element) {
                        var option = document.createElement('option'); // Create <option> element
                        option.value = element.id; // Set the value attribute
                        option.textContent = element.type; // Set the text content
                        shipTypeSelect.appendChild(option); // Append the option to the select element
                    });


					var shipTypeField = document.getElementById('ship_type').value;
                    if (shipTypeField === "reefer") {
                        document.getElementById('monitoring_installed').removeAttribute('readonly');
                        document.getElementById('monitoring_installed').removeAttribute('disabled');
                    }

					var scrubberTypeSelect = document.getElementById('scrubbertype');

                    // Create and append the default option
                    var defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Please Select';
                    scrubberTypeSelect.appendChild(defaultOption);

                    // Append options for scrubber types
                    scrubbertypes.forEach(function(element) {
                        var option = document.createElement('option'); // Create <option> element
                        option.value = element.id; // Set the value attribute
                        option.textContent = element.text; // Set the text content
                        scrubberTypeSelect.appendChild(option); // Append the option to the select element
                    });

					var focMethodSelect = document.getElementById('foc_method');

                    // Create and append the default option
                    var defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Please Select';
                    focMethodSelect.appendChild(defaultOption);

                    // Append options for FOC methods
                    foc_methods.forEach(function(element) {
                        var option = document.createElement('option'); // Create <option> element
                        option.value = element.id; // Set the value attribute
                        option.textContent = element.text; // Set the text content
                        focMethodSelect.appendChild(option); // Append the option to the select element
                    });



					var charterTypeLadenSelect = document.getElementById('charter_type_laden');

                    // Create and append the default option
                    var defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Please Select';
                    charterTypeLadenSelect.appendChild(defaultOption);

                    // Append options for charter type laden
                    charter_type_laden.forEach(function(element) {
                        var option = document.createElement('option'); // Create <option> element
                        option.value = element.id; // Set the value attribute
                        option.textContent = element.text; // Set the text content
                        charterTypeLadenSelect.appendChild(option); // Append the option to the select element
                    });



                    var charterTypeBallastSelect = document.getElementById('charter_type_ballast');
                    // Create and append the default option
                    var defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = 'Please Select';
                    charterTypeBallastSelect.appendChild(defaultOption);

                    // Append options for charter type ballast
                    charter_type_ballast.forEach(function(element) {
                        var option = document.createElement('option'); // Create <option> element
                        option.value = element.id; // Set the value attribute
                        option.textContent = element.text; // Set the text content
                        charterTypeBallastSelect.appendChild(option); // Append the option to the select element
                    });



					var fuelTypeElements = document.getElementsByClassName('fuel_type_cus');
					// Iterate over each element with the class 'fuel_type_cus'

                    //const testElements = document.getElementsByClassName("fuel_type_cus");
                    for (let i = 0; i < fuelTypeElements.length; i++) {
                        var defaultOption = document.createElement('option');
                        defaultOption.value = '';
                        defaultOption.textContent = 'Please Select';
                        fuelTypeElements[i].appendChild(defaultOption);

                         // Append options for fuel types
                         fuel_types.forEach(function(element) {
                            var option = document.createElement('option'); // Create <option> element
                            option.value = element.id; // Set the value attribute
                            option.textContent = element.fuel; // Set the text content
                            fuelTypeElements[i].appendChild(option); // Append the option to the select element
                        });
                    }
					var reason=[
						//@@Reason@@

						{
							id:"Search_and_rescue",
							text:"Search and Rescue"
						},
						{
							id:"Heavy_weather",
							text:"Heavy weather"
						},
						{
							id:"Commercial_reasons",
							text:"Commercial reasons"
						},
						{
							id:"Medical_reasons",
							text:"Medical reasons"
						},
						{
							id:"Crew_change",
							text:"Crew change"
						},
						{
							id:"Security_guards_Embarkation_Disembarkation",
							text:"Security guards Embarkation/Disembarkation"
						},
						{
							id:"Pilot on/off",
							text:"Pilot_on_off"
						},
						{
							id:"Other",
							text:"Other"
						}
					];



					var reasonElements = document.getElementsByClassName('reason');

					for(let i=0;i< reasonElements.length; i++){
						// Create and append the default option
                        var defaultOption = document.createElement('option');
                        defaultOption.value = '';
                        defaultOption.textContent = 'Please Select';
                        reasonElements[i].appendChild(defaultOption);

                        // Append options for reasons
                        reason.forEach(function(element) {
                            var option = document.createElement('option'); // Create <option> element
                            option.value = element.id; // Set the value attribute
                            option.textContent = element.text; // Set the text content
                            reasonElements[i].appendChild(option); // Append the option to the select element
                        });
					}
                   
		
					var fuel_name = document.querySelectorAll('.fuels');
                    // Iterate over each element with the class 'fuels'
					for(let i=0;i < fuel_name.length;i++){
						var defaultOption = new Option('Please Select', '');
                        fuel_name[i].appendChild(defaultOption);

                        // Append options for fuel types
                        fuel_types.forEach(function(element) {
                            var option = new Option(element.fuel, element.id); // Create new Option
                            fuel_name[i].appendChild(option); // Append the option to the select element
                        });
					}
                    

					var viscosity = document.getElementsByClassName('viscosity');

					for(let i=0;i < viscosity.length;i++){
						 // Create and append the default option
						 var defaultOption = new Option('Please Select', '');
                        viscosity[i].appendChild(defaultOption);

                        // Append options for fuel viscosities
                        fuel_viscosity.forEach(function(element) {
                            var option = new Option(element.viscosity, element.id); // Create new Option
                            viscosity[i].appendChild(option); // Append the option to the select element
                        });
					}                  
                    
					document.getElementById('form').addEventListener('submit', function(e) {
                        e.preventDefault();
                        var reportType_value = document.getElementById('reportType').value;
                        
                        var rules = {
                            date: {
                                required: true
                            },
                            time: {
                                required: true
                            },
                            me_fuel_type: {
                                required: true
                            },
                            me_fuel_qty: {
                                required: true
                            },
                           
                            ae_fuel_type: {
                                required: true
                            },
                            ae_fuel_qty: {
                                required: true
                            },
                           
                            other_fuel_type: {
                                required: true
                            },
                            other_fuel_type_qty: {
                                required: true
                            },
                        };
                        if(reportType_value=='delivery_report'){
						    rules.next_port_name={
							    required: true,

						    };
						    rules.destination_port_name={
							    required: true,

						    };
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                            
                            
					    }if(reportType_value=='redelivery_report'){
						   
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
					    } 
                        if(reportType_value=='bunkering_report'){
                            rules.bunkering1_report_me_fuel_type={
                                required: true,
                            };
                            rules.bunkering1_report_me_fuel_viscosity={
                                required: true,
                            };
                            rules.bunkering1_report_me_fuel_qty={
                                required: true,
                            };                           
                            rules.me_fuel_viscosity={
                                required: true,
                            };

                            rules.ae_fuel_viscosity={
                                required: true,
                            };
                            rules.other_fuel_viscosity={
                                required: true,
                            };

                        }
                        if(reportType_value=='start_drifting_report'){
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                            rules.reason_for_drifiting={
                                required: true,
                            };			
                            if(document.getElementById('reason_for_drifiting')=='Other'){
                                rules.reason_other ={
                                    required: true,
                                };	
                            }	
                        }
                        if(reportType_value=='end_drifting_report'){
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                        }
                        if(reportType_value=='departure_report'){
                            rules.total_cargo_onboard={
                                required: true,
                            };
                            rules.Voyage_performance_criteria_speed={
                                required: true,
                            };
                            rules.Voyage_performance_criteria_me_consumption={
                                required: true,
                            };
                            rules.Voyage_performance_criteria_ae_consumption={
                                required: true,
                            };
                            rules.Voyage_performance_criteria_other_consumption={
                                required: true,
                            };
                            rules.total_dtg_next_port={
                                required: true,
                            };
                            rules.next_port_name={
                                required: true,
                            };
                            
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};	
                            
                            rules.me_fuel_viscosity={
								required: true,
							};
                            rules.ae_fuel_viscosity={
								required: true,
							};
                            rules.other_fuel_viscosity={
								required: true,
							};	

                            
                        }
                        if(reportType_value=='report_automation'){

                            rules.avg_rpm ={
                                required: true,
                            };
                            rules.distance_from_previous_report ={
                                required: true,
                            };
                            rules.slip={
                                required: true,
                            };

                            rules.average_power={
                                required: true,
                            };

                            rules.special_remark={
                                required: true,
                            };

                            

                            

                            rules.eta_date={
                                required: true,
                            };

                            rules.eta_time={
                                required: true,
                            };

                            rules.next_port_name={
                                required: true,
                            };
                                    
                            rules.lattitude_x={
                                    required: true,
                                };
                                rules.lattitude_y={
                                    required: true,
                                };
                                rules.longitude_x={
                                    required: true,
                                };
                                rules.longitude_y={
                                    required: true,
                                };
                                rules.longitude_e_w={
                                    required: true,
                                };
                                rules.lattitude_n_s={
                                    required: true,
                                };	
                        }
                    if(reportType_value=='change_voyage_speed'){


                        rules.lattitude_x={
                            required: true,
                        };
                        rules.lattitude_y={
                            required: true,
                        };
                        rules.longitude_x={
                            required: true,
                        };
                        rules.longitude_y={
                            required: true,
                        };
                        rules.longitude_e_w={
                            required: true,
                        };
                        rules.lattitude_n_s={
                            required: true,
                        };

                        rules.distance_from_previous_report ={
                            required: true,
                        };
                        rules.criteria_speed ={
                            required: true,
                        };

                        rules.criteria_me_consumption ={
                            required: true,
                        };
                        rules.criteria_ae_consumption ={
                            required: true,
                        };
                        rules.criteria_other_consumption ={
                            required: true,
                        };
                        rules.distance_from_previous_report ={
                            required: true,
                        };
                    }
                    if(reportType_value=='arrival_report'){
                        rules.total_cargo_qty_remain_board ={
                            required: true,
                        };
                        rules.next_port_name ={
                            required: true,
                        };
                        rules.destination_port_name ={
                            required: true,
                        };
                        rules.number_of_reefers_board ={
                            required: true,
                        };
                        rules.distance_from_eosp ={
                            required: true,
                        };
                        rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                        
                    }
                    if(reportType_value=='stoppage_report'){

                       
                        rules.distance_from_previous_report ={
                            required: true,
                        };

                        rules.reason_for_stoppage ={
                            required: true,
                        };

                        
                        rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};

                        if(document.getElementById('reason_for_stoppage').value=='Other'){
                            rules.reason_other ={
                                required: true,
                            };	
                        }				
                    }
                    if(reportType_value=='resume_report'){               
                        rules.distance_between_stop_position_resume ={
                            required: true,
                        };
                        rules.lattitude_x={
                            required: true,
                        };
                        rules.lattitude_y={
                            required: true,
                        };
                        rules.longitude_x={
                            required: true,
                        };
                        rules.longitude_y={
                            required: true,
                        };
                        rules.longitude_e_w={
                            required: true,
                        };
                        rules.lattitude_n_s={
                            required: true,
                        };
                        rules.me_fuel_viscosity={
                            required: true,
                        };
                        rules.ae_fuel_viscosity={
                            required: true,
                        };
                        rules.other_fuel_viscosity={
                            required: true,
                        };
                    }			
                    if(reportType_value=='start_reduce_speed_report'){
                        rules.reason_for_reduce_speed ={
                            required: true,
                        };

                        rules.distance_from_previous_report ={
                            required: true,
                        };
                        rules.lattitude_x={
                            required: true,
                        };
                        rules.lattitude_y={
                            required: true,
                        };
                        rules.longitude_x={
                            required: true,
                        };
                        rules.longitude_y={
                            required: true,
                        };
                        rules.longitude_e_w={
                            required: true,
                        };
                        rules.lattitude_n_s={
                            required: true,
                        };
                        if(document.getElementById('reason_for_reduce_speed')=='Other'){
                            rules.reason_other ={
                                required: true,
                            };	
                        }
                    }
                    if(reportType_value=='end_reduce_speed_report'){
                        
                        rules.distance_from_previous_report_end ={
                            required: true,
                        };
                        rules.lattitude_x={
                            required: true,
                        };
                        rules.lattitude_y={
                            required: true,
                        };
                        rules.longitude_x={
                            required: true,
                        };
                        rules.longitude_y={
                            required: true,
                        };
                        rules.longitude_e_w={
                            required: true,
                        };
                        rules.lattitude_n_s={
                            required: true,
                        };
                    }
                
                    if(reportType_value=='start_deviation_report'){
                        rules.reason_for_deviation ={
                            required: true,
                        };
                        
                        rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                            if(document.getElementById('reason_for_stoppage').value=='Other'){
                                rules.reason_other ={
                                    required: true,
                                };	
                        }
                        
                    }
                    if(reportType_value=='end_deviation_report'){
                        
                        
                        rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                            
                        
                        
                    }

                   
                    if(reportType_value=='fuel_change_over_report'){

                        rules.lattitude_x_complete_change_over ={
                            required: true,
                        };
                        rules.lattitude_y_complete_change_over ={
                            required: true,
                        };
                        rules.lattitude_n_s_complete_change_over ={
                            required: true,
                        };

                        rules.longitude_x_complete_change_over ={
                            required: true,
                        };
                        rules.longitude_y_complete_change_over ={
                            required: true,
                        };
                        rules.longitude_e_w_complete_change_over ={
                            required: true,
                        };

                        rules.me_fuel_type_complete_change_over ={
                            required: true,
                        };
                        rules.me_fuel_viscosity_complete_change_over ={
                            required: true,
                        };
                        rules.me_fuel_qty_complete_change_over ={
                            required: true,
                        };

                        rules.ae_fuel_type_complete_change_over ={
                            required: true,
                        };
                        rules.ae_fuel_viscosity_complete_change_over ={
                            required: true,
                        };

                        rules.ae_fuel_qty_complete_change_over ={
                            required: true,
                        };

                        rules.other_fuel_type_complete_change_over ={
                            required: true,
                        };
                        rules.other_fuel_viscosity_complete_change_over ={
                            required: true,
                        };

                        rules.other_fuel_type_qty_complete_change_over ={
                            required: true,
                        };	
                        rules.distance_from_eosp_begin_change_over ={
                            required: true,
                        };
                        
                        rules.distance_from_previous_report_complete_change_over ={
                            required: true,
                        };

                        rules.date_complete_change_over ={
                            required: true,
                        };

                        rules.time_complete_change_over ={
                            required: true,
                        };
                        
                        rules.me_fuel_viscosity ={
                            required: true,
                        };

                        rules.ae_fuel_viscosity ={
                            required: true,
                        };
                        rules.other_fuel_viscosity ={
                            required: true,
                        };
                        rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                            
                    }

                    if(reportType_value=='anchorage_report'){
                            rules.report_activity ={
                                required: true,
                            };
                    }
                    if(reportType_value=='berth_report'){
                            rules.report_activity ={
                                required: true,
                            };
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                    }

                    if(reportType_value=='start_of_year_report'){
                           
                            rules.lattitude_x={
								required: true,
							};
							rules.lattitude_y={
								required: true,
							};
							rules.longitude_x={
								required: true,
							};
							rules.longitude_y={
								required: true,
							};
							rules.longitude_e_w={
								required: true,
							};
							rules.lattitude_n_s={
								required: true,
							};
                    }

                    // Add other conditions...

                    var form = document.getElementById('form');
                    var validator = new Validator(form, rules, function(errors) {
                        if (errors.length === 0) {
                            Export();
                        }else{
                            console.log("please fill form")
                        }
                    });
                });
                function Validator(form, rules, callback) {
                    this.form = form;
                    this.rules = rules;
                    this.callback = callback;

                    this.init();
                }

                Validator.prototype.init = function() {

                    var self = this;    
                    self.validate();
                };

                Validator.prototype.validate = function() {
                    var errors = [];
                    var voyageTypeFiled = document.getElementById('voyageType');
                    if (voyageTypeFiled.value === '') {
                        var errorMessage = document.querySelector('#error_msg .error_cus').cloneNode(true); 
                        var errorElements = voyageTypeFiled.parentElement.querySelectorAll('.error_cus');
                        for (var o = 0; o < errorElements.length; o++) {
                            errorElements[o].parentNode.removeChild(errorElements[o]);
                        }
                        voyageTypeFiled.parentElement.appendChild(errorMessage);
                        voyageTypeFiled.focus();
                    } else {
                        var errorElements = voyageTypeFiled.parentElement.querySelectorAll('.error_cus');
                        for (var o = 0; o < errorElements.length; o++) {
                            errorElements[o].parentNode.removeChild(errorElements[o]);
                        }
                    }

                    for (var field in this.rules) {
                        if (this.rules.hasOwnProperty(field)) {
                            var fieldRules = this.rules[field];
                            var reportType_value = document.getElementById('reportType').value;
                            var temp_filed = '#' + reportType_value + ' [name="' + field + '"]';
                            var value = document.querySelector(temp_filed).value;
                            document.querySelector(temp_filed).focus();
                            if (fieldRules.required && value === '') {
                                var targetElement = document.querySelector(temp_filed); 
                                var errorMessage = document.querySelector('#error_msg .error_cus').cloneNode(true); 
                                var errorElements = targetElement.parentElement.querySelectorAll('.error_cus');
                                for (var o = 0; o < errorElements.length; o++) {
                                    errorElements[o].parentNode.removeChild(errorElements[o]);
                                }
                                targetElement.parentElement.appendChild(errorMessage);
                                errors.push(fieldRules.required);
                            } else {
                                var targetElement = document.querySelector(temp_filed); 
                                var errorElements = targetElement.parentElement.querySelectorAll('.error_cus');
                                for (var o = 0; o < errorElements.length; o++) {
                                    errorElements[o].parentNode.removeChild(errorElements[o]);
                                }
                            }
                        }
                    }

                    if (typeof this.callback === 'function') {
                        this.callback(errors);
                    }
                }


                function Export() {

                    console.log("Export+++");

                    // Hide modal with id 'bdn_notes'
                    document.getElementById('bdn_notes').style.display = 'none';
                    var reportType_value = document.getElementById('reportType').value;
                    var reportDiv = document.getElementById(reportType_value);
                    var commonDiv=document.getElementById('common_div');

                    var fields = [];                  
                    var commonfields = [];                  
                    // Find all input fields within the report div
                    var inputFields = reportDiv.querySelectorAll('input, select, textarea');
                    var commonInputFields = commonDiv.querySelectorAll('input, select, textarea');
                    // Convert NodeList to array for easier manipulation

                    //fields = Array.from(inputFields);         
                    for(var i=0;i < inputFields.length;i++){
                        fields.push(inputFields[i]);

                    }  
                    //commonfields = Array.from(inputFields);         
                    for(var i=0;i < commonInputFields.length;i++){
                        commonfields.push(commonInputFields[i]);
                    }  
                    // Convert FormData to plain object
                    var indexedArray = {};
                    var commonindexedArray = {};
                    for(var i=0;i<fields.length;i++){
                        indexedArray[fields[i].name] = fields[i].value;
                    }
                    
                    for(var i=0;i<commonfields.length;i++){
                        indexedArray[commonfields[i].name] = commonfields[i].value;
                    }


                   // var mergedArray = indexedArray.concat(commonindexedArray);
                    // Add additional fields to indexedArray based on reportType
                    if (reportType_value === 'delivery_report' || reportType_value === 'arrival_report' || reportType_value === 'departure_report' || reportType_value === 'report_automation') {
                        indexedArray['next_port'] = document.getElementById('next_port_id').value;
                        indexedArray['destination_port'] = document.getElementById('destination_port_id').value;
                    }

                    if (reportType_value === 'start_drifting_report') {
                        indexedArray['next_port'] = document.getElementById('next_port_id').value;
                    }

                    // Show modal based on reportType
                    if (reportType_value === 'bunkering_report' || reportType_value === 'change_voyage_speed') {
                        document.getElementById('bdn_notes').style.display = 'block';
                    }

                    // Determine container_gas value and add to indexedArray
                    var containerGas = document.getElementById('container_gas').value;
                    if (containerGas === 'container') {
                        indexedArray['teu_container'] = document.getElementById('teu_container').value;
                    } else {
                        indexedArray['cbm_gas_carr'] = document.getElementById('cbm_gas_carr').value;
                    }

                // Manipulate fuel type values
                var fuels = fuel_types;
                for (var key in indexedArray) {
                    if (indexedArray.hasOwnProperty(key)) {
                        var value = indexedArray[key];
                        if (key === 'me_fuel_type' && value !== '') {
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }
                            var textVal = result[0].fuel;
                            value = value + '  ~~  ' + textVal;
                        } else if (key === 'begin_me_fuel_type' && value !== '') {
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }
                            var textVal = result[0].fuel;
                            value = value + '  ~~  ' + textVal;
                        } else if (key === 'me_fuel_type_complete_change_over' && value !== '') {
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }
                            var textVal = result[0].fuel;
                            value = value + '  ~~  ' + textVal;
                        }
                        else if(key=="ae_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }
                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
				
                        }else if(key=="begin_ae_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="ae_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="other_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="begin_other_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="other_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="other_fuel2_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="other_fuel2_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="begin_other_fuel2_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                            
                        }else if(key=="boiler_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;

                        }else if(key=="incinerator_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;

                        }else if(key=="cargo_heating_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="ballast_exchange_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="hold_cleaning_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="begin_boiler_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;

                        }else if(key=="begin_incinerator_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;

                        }else if(key=="begin_cargo_heating_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="begin_ballast_exchange_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="begin_hold_cleaning_fuel_type" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="boiler_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;

                        }else if(key=="incinerator_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;

                        }else if(key=="cargo_heating_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="ballast_exchange_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        }else if(key=="hold_cleaning_fuel_type_complete_change_over" && value!=''){
                            var result = [];
                            for (var i = 0; i < fuels.length; i++) {
                                if (fuels[i].id == value) {
                                    result.push(fuels[i]);
                                }
                            }                            var textval=result[0].fuel;
                            value=value +"  ~~  "+textval;
                        } 
                        indexedArray[key] = value;
                    }
                }

                // Convert indexedArray to JSON string
                var mainData = JSON.stringify(indexedArray);
                const jsonObject1 = JSON.parse(mainData);
                var userReadData1 = JSON.stringify(jsonObject1, null, 2);
                // Convert JSON string to base64
                var htmlReport = btoa(mainData);

                // Populate textarea with form response and HTML report
                document.getElementById('responsjson').value = '**********Form Response********** \n \n' + userReadData1 + '\n \n **********Form Response**********  \n \n  **********HTML REPORT********** ' + htmlReport + ' \n**********HTML REPORT**********';

                // Show modal with id 'exampleModal'
                document.getElementById('exampleModal').style.display = 'block';

            }
    	    changeGasContainer();

	
        });             

        

        document.getElementById("reportType").addEventListener("change", function() {

            reportTypeChange();
            reportTypeChangeShowHide();
        });	
        var closeButtons = document.getElementsByClassName("modalClose");

        // Loop through each close button and attach a click event listener
        for (var i = 0; i < closeButtons.length; i++) {
            (function(index) {
                closeButtons[index].addEventListener("click", function() {
                    // Your click event handling code goes here
                document.getElementById('exampleModal').style.display = 'none';
                });
            })(i);
        }


        
        function Export(){

            $('#bdn_notes').modal('hide');
            var unindexed_array= $('#form :visible').serializeArray();
            // var unindexed_array=$('#form_report_automation' ).serializeArray();
            var indexed_array = {};
            $.map(unindexed_array, function(n, i){
                indexed_array[n['name']] = n['value'];
            });
            indexed_array['voyageType'] =$('#voyageType').val();
            indexed_array['ship_flag'] =$('#ship_flag').val();
            indexed_array['ship_type'] =$('#ship_type').val();
            indexed_array['container_gas'] =$('#container_gas').val();
            indexed_array['foc_method'] =$('#foc_method').val();
            indexed_array['charter_type'] =$('#charter_type').val();
            indexed_array['cargo_units'] =$('#cargo_units').val();
            indexed_array['scrubbertype'] =$('#scrubbertype').val();
            indexed_array['monitoring_installed'] =$('#monitoring_installed').val();
            if($('#reportType').val()=='delivery_report'){
                indexed_array['next_port'] =$('#next_port_id').val();
                indexed_array['destination_port'] =$('#destination_port_id').val();
            }
            if($('#reportType').val()=='start_drifting_report'){
                indexed_array['next_port'] =$('#next_port_id').val();
            }

            if($('#reportType').val()=='arrival_report'){
                indexed_array['next_port'] =$('#next_port_id').val();
                indexed_array['destination_port'] =$('#destination_port_id').val();
            }
            
            if($('#reportType').val()=='departure_report'){
                indexed_array['next_port'] =$('#next_port_id').val();
                indexed_array['destination_port'] =$('#destination_port_id').val();
                $('#bdn_notes').modal('show');

            }
            if($('#reportType').val()=='report_automation'){
                indexed_array['next_port'] =$('#next_port_id').val();
                indexed_array['destination_port'] =$('#destination_port_id').val();
            }
            
            if($('#reportType').val()=='bunkering_report'){
                $('#bdn_notes').modal('show');
            }
            if($('#reportType').val()=='change_voyage_speed'){
                $('#bdn_notes').modal('show');
            }
            var container_gas=$('#container_gas').val();
            if(container_gas=='container'){
                indexed_array['teu_container']=$('#teu_container').val();
            }else{
                indexed_array['cbm_gas_carr']=$('#cbm_gas_carr').val();
            }
            var main_data=JSON.stringify(indexed_array);
            const jsonObject = JSON.parse(main_data);
            var userReadData = JSON.stringify(jsonObject, null, 2);
            
            var fuels=fuel_types;
            newArray={};	
		    for (var key in indexed_array) {
                if (indexed_array.hasOwnProperty(key)) {
                    var value = indexed_array[key];

                    if (key == "me_fuel_type" && value != '') {
                        var result = fuels.filter(function(item) {
                            return item.id == value;
                        });
                        var textval = result[0].fuel;
                        value = value + "  ~~  " + textval;
                    } else if (key == "begin_me_fuel_type" && value != '') {
                        var result = fuels.filter(function(item) {
                            return item.id == value;
                        });
                        var textval = result[0].fuel;
                        value = value + "  ~~  " + textval;
                    } else if (key == "me_fuel_type_complete_change_over" && value != '') {
                        var result = fuels.filter(function(item) {
                            return item.id == value;
                        });
                        var textval = result[0].fuel;
                        value = value + "  ~~  " + textval;
                    } 
                    newArray[key] = value;
                }
            }
            var main_data1=JSON.stringify(newArray);
            const jsonObject1 = JSON.parse(main_data1);
            var userReadData1 = JSON.stringify(jsonObject1, null, 2);
            $("#responsjson").val("**********Form Response********** \n \n"+ userReadData1 + "\n \n **********Form Response**********  \n \n  **********HTML REPORT********** "+ btoa(main_data) +" \n**********HTML REPORT**********");  
            //$("#responsjson").val(JSON.stringify(indexed_array));
            document.getElementById('exampleModal').style.display = 'block';
        }
        function copyClipboard() {
            // Get the text field
            var copyText =  document.getElementById("responsjson");
            // Select the text field
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices
            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value);
        }

	
        function reportTypeChange(){
            var reporttype = document.getElementById('reportType').value;
            var voyagetype = document.getElementById('voyageType').value;
            var timestamp = new Date().getTime();

            if (hasTimeParameter()) {
                
                var url = window.location.href;
                var queryString = url.split('?')[1];
                var urlParams = {};

                if (queryString) {
                    var params = queryString.split('&');
                    params.forEach(function(param) {
                        var keyValue = param.split('=');
                        var key = decodeURIComponent(keyValue[0]);
                        var value = decodeURIComponent(keyValue[1] || '');
                        urlParams[key] = value;
                    });
                }

                urlParams['time'] = timestamp;
                urlParams['reporttype'] = reporttype;
                urlParams['voyagetype'] = voyagetype;

                var updatedQueryString = Object.keys(urlParams)
                    .map(function(key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(urlParams[key]);
                    })
                    .join('&');

                var updatedUrl = url.split('?')[0] + '?' + updatedQueryString;

                window.history.replaceState({}, '', updatedUrl);
                window.location.reload();

            } else {
                var url = window.location.href;
                var updatedUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + 'time=' + timestamp + '&reporttype=' + reporttype + '&voyagetype=' + voyagetype;
                //window.location.href="https://google.com";
                //window.location.href = updatedUrl;
                window.location.replace(updatedUrl);
            }       
	    }
	    function hasTimeParameter() {
            var url = window.location.href;
            var queryString = url.split('?')[1];
            if (queryString) {
                var parameters = queryString.split('&');
                for (var i = 0; i < parameters.length; i++) {
                    var parameter = parameters[i].split('=');
                    if (parameter[0] === 'time') {
                        return true;
                    }
                }
            }
            return false;
        }          
	    function changeGasContainer(){ 
            var container_gas = document.getElementById('container_gas').value;
            if (container_gas === 'container') {
                document.getElementById('teu_div').style.display = 'block';
                document.getElementById('cbm_div').style.display = 'none';
            } else if (container_gas === 'gas_carr') {
                document.getElementById('cbm_div').style.display = 'block';
                document.getElementById('teu_div').style.display = 'none';
            }
	    }
	    function reportTypeChangeShowHide(){
		    //var reporttype=$('#reportType').val();
    	    var reporttype = document.getElementById('reportType').value;
            let res = reporttype.split('_').join(' ');
            //$('#report_type_text').html(res.toUpperCase());
            //document.getElementById('report_type_text').innerHTML = res.toUpperCase();
            var report_type_text = document.getElementById('report_type_text');
            if (report_type_text) {
                report_type_text.innerHTML = res.toUpperCase();
            } 
            if(reporttype=='delivery_report'){
            
                var elementsToHide = [
                    "report_automation",
                    "redelivery_report",
                    "standby_engine",
                    "finish_with_engine",
                    "bunkering_report",
                    "anchorage_report",
                    "berth_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];
                document.getElementById('delivery_report').style.display = 'block';
                elementsToHide.forEach(function(id) {

                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });  


            }else if(reporttype=='berth_report'){
            
                var elementsToHide = [
                    "report_automation",
                    "delivery_report",
                    "redelivery_report",
                    "standby_engine",
                    "finish_with_engine",
                    "bunkering_report",
                    "anchorage_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];

                document.getElementById('berth_report').style.display = 'block';
                elementsToHide.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });   

    	    }else if(reporttype=='redelivery_report'){
                
                var elementsToHide = [
                    "report_automation",
                    "delivery_report",
                    "berth_report",
                    "standby_engine",
                    "finish_with_engine",
                    "bunkering_report",
                    "anchorage_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];
                document.getElementById('redelivery_report').style.display = 'block';

                elementsToHide.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });

    	    }else if(reporttype=='standby_engine'){
                var elementsToHide = [
                    "report_automation",
                    "delivery_report",
                    "redelivery_report",
                    "berth_report",
                    "finish_with_engine",
                    "bunkering_report",
                    "anchorage_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];

                document.getElementById('standby_engine').style.display = 'block';
                elementsToHide.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });
    	    }else if(reporttype=='finish_with_engine'){
        	
                var elementsToHide = [
                    "report_automation",
                    "delivery_report",
                    "redelivery_report",
                    "berth_report",
                    "standby_engine",
                    "bunkering_report",
                    "anchorage_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];

                document.getElementById('finish_with_engine').style.display = 'block';
                elementsToHide.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });
    	    }else if(reporttype=='bunkering_report'){
        	
                var elementsToHide = [
                    "report_automation",
                    "delivery_report",
                    "redelivery_report",
                    "berth_report",
                    "standby_engine",
                    "finish_with_engine",
                    "anchorage_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];

                document.getElementById('bunkering_report').style.display = 'block';
                elementsToHide.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });
    	    }else if(reporttype=='anchorage_report'){
                var elementsToHide = [
                    "report_automation",
                    "delivery_report",
                    "redelivery_report",
                    "berth_report",
                    "standby_engine",
                    "finish_with_engine",
                    "bunkering_report",
                    "start_drifting_report",
                    "end_drifting_report",
                    "departure_report",
                    "arrival_report",
                    "bunkering_activity_report",
                    "start_deviation_report",
                    "end_deviation_report",
                    "stoppage_report",
                    "resume_report",
                    "start_reduce_speed_report",
                    "end_reduce_speed_report",
                    "change_voyage_speed",
                    "daily_anchorage_report",
                    "fuel_change_over_report",
                    "start_of_year_report"
                ];

                document.getElementById('anchorage_report').style.display = 'block';
                elementsToHide.forEach(function(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                    }
                });

                }else if(reporttype=='start_drifting_report'){
                    

                    
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "end_drifting_report",
                        "departure_report",
                        "arrival_report",
                        "bunkering_activity_report",
                        "start_deviation_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('start_drifting_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });


                }else if(reporttype=='end_drifting_report'){
                    


                    
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "departure_report",
                        "arrival_report",
                        "bunkering_activity_report",
                        "start_deviation_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('end_drifting_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });


                }else if(reporttype=='report_automation'){             
            
                    var elementsToHide = [
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "end_drifting_report",
                        "departure_report",
                        "arrival_report",
                        "bunkering_activity_report",
                        "start_deviation_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('report_automation').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });


                }else if(reporttype=='departure_report'){
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "end_drifting_report",
                        "arrival_report",
                        "bunkering_activity_report",
                        "start_deviation_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('departure_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });

                }else if(reporttype=='arrival_report'){
                

                    
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "end_drifting_report",
                        "departure_report",
                        "bunkering_activity_report",
                        "start_deviation_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('arrival_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });


                }else if(reporttype=='bunkering_activity_report'){
                    

                    
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "end_drifting_report",
                        "departure_report",
                        "arrival_report",
                        "start_deviation_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('bunkering_activity_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });

                }else if(reporttype=='start_deviation_report'){
                    
            
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "end_drifting_report",
                        "departure_report",
                        "arrival_report",
                        "bunkering_activity_report",
                        "end_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('start_deviation_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });


                }else if(reporttype=='end_deviation_report'){
           

            
                    var elementsToHide = [
                        "report_automation",
                        "delivery_report",
                        "redelivery_report",
                        "berth_report",
                        "standby_engine",
                        "finish_with_engine",
                        "bunkering_report",
                        "anchorage_report",
                        "start_drifting_report",
                        "end_drifting_report",
                        "departure_report",
                        "arrival_report",
                        "bunkering_activity_report",
                        "start_deviation_report",
                        "stoppage_report",
                        "resume_report",
                        "start_reduce_speed_report",
                        "end_reduce_speed_report",
                        "change_voyage_speed",
                        "daily_anchorage_report",
                        "fuel_change_over_report",
                        "start_of_year_report"
                    ];

                    document.getElementById('end_deviation_report').style.display = 'block';
                    elementsToHide.forEach(function(id) {
                        var element = document.getElementById(id);
                        if (element) {
                            element.style.display = 'none';
                        }
                    });


        }else if(reporttype=='stoppage_report'){
             

            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "resume_report",
                "start_reduce_speed_report",
                "end_reduce_speed_report",
                "change_voyage_speed",
                "daily_anchorage_report",
                "fuel_change_over_report",
                "start_of_year_report"
            ];

            document.getElementById('stoppage_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });

        }else if(reporttype=='resume_report'){
            
            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "start_reduce_speed_report",
                "end_reduce_speed_report",
                "change_voyage_speed",
                "daily_anchorage_report",
                "fuel_change_over_report",
                "start_of_year_report"
            ];

            document.getElementById('resume_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });


        }else if(reporttype=='start_reduce_speed_report'){
          


            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "resume_report",
                "end_reduce_speed_report",
                "change_voyage_speed",
                "daily_anchorage_report",
                "fuel_change_over_report",
                "start_of_year_report"
            ];

            document.getElementById('start_reduce_speed_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });


        }else if(reporttype=='end_reduce_speed_report'){
            


            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "resume_report",
                "start_reduce_speed_report",
                "change_voyage_speed",
                "daily_anchorage_report",
                "fuel_change_over_report",
                "start_of_year_report"
            ];

            document.getElementById('end_reduce_speed_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });


        }else if(reporttype=='change_voyage_speed'){
               

            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "resume_report",
                "start_reduce_speed_report",
                "end_reduce_speed_report",
                "daily_anchorage_report",
                "fuel_change_over_report",
                "start_of_year_report"
            ];

            document.getElementById('change_voyage_speed').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });

            
        }else if(reporttype=='daily_anchorage_report'){
            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "resume_report",
                "start_reduce_speed_report",
                "end_reduce_speed_report",
                "change_voyage_speed",
                "fuel_change_over_report",
                "start_of_year_report"
            ];

            document.getElementById('daily_anchorage_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });

            
        }else if(reporttype=='fuel_change_over_report'){
            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "redelivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "resume_report",
                "start_reduce_speed_report",
                "end_reduce_speed_report",
                "change_voyage_speed",
                "daily_anchorage_report",
                "start_of_year_report"
            ];

            document.getElementById('fuel_change_over_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });

            
        
        }else if(reporttype=='start_of_year_report'){
               
            // Get the input element by its id
			const dateInput = document.getElementById('date');
			// Create a Date object for January 1st
			const defaultDate = '2023-01-01'; // Change the year to the desired year
			// Set the default value of the input
			dateInput.value = defaultDate;

            
            var elementsToHide = [
                "report_automation",
                "delivery_report",
                "berth_report",
                "standby_engine",
                "finish_with_engine",
                "bunkering_report",
                "anchorage_report",
                "start_drifting_report",
                "end_drifting_report",
                "departure_report",
                "arrival_report",
                "bunkering_activity_report",
                "start_deviation_report",
                "end_deviation_report",
                "stoppage_report",
                "resume_report",
                "start_reduce_speed_report",
                "end_reduce_speed_report",
                "change_voyage_speed",
                "daily_anchorage_report",
                "fuel_change_over_report",
            ];

            document.getElementById('start_of_year_report').style.display = 'block';
            elementsToHide.forEach(function(id) {
                var element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                }
            });

        }        
        if(reporttype!='' && reporttype!=null){
            var lattitude_x = document.querySelector('#'+reporttype+' .lattitude_x');
            // Create and append the default option
            if(lattitude_x!='' && lattitude_x!=null){
                var defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select Degree';
                lattitude_x.appendChild(defaultOption);
                // Append options for degrees 0 to 90
                for (var i = 0; i <= 90; i++) {
                    var option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    lattitude_x.appendChild(option);
                }
            }
            


            var lattitude_y = document.querySelector('#'+reporttype+' .lattitude_y');
            if(lattitude_y!='' && lattitude_y!=null){

                // Create and append the default option
                var defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Minute';
                lattitude_y.appendChild(defaultOption);

                // Append options for minutes 0 to 60
                for (var i = 0; i <= 60; i++) {
                    var option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    lattitude_y.appendChild(option);
                }
            }
            var longitude_x = document.querySelector('#'+reporttype+' .longitude_x');
            if(longitude_x!='' && longitude_x!=null){

                // Create and append the default option
                var defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select Degree';
                longitude_x.appendChild(defaultOption);

                // Append options for degrees 0 to 180
                for (var i = 0; i <= 180; i++) {
                    var option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    longitude_x.appendChild(option);
                }
            }
            var longitude_y = document.querySelector('#'+reporttype+' .longitude_y');

            if(longitude_y!='' && longitude_y!=null){

                // Create and append the default option
                var defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Minute';
                longitude_y.appendChild(defaultOption);

                // Append options for minutes 0 to 60
                for (var i = 0; i <= 60; i++) {
                    var option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    longitude_y.appendChild(option);
                }

            }
        }
        var lattitude_x = document.getElementById('lattitude_x_complete_change_over');
        // Create and append the default option
        if(lattitude_x!='' && lattitude_x!=null){
            var defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select Degree';
            lattitude_x.appendChild(defaultOption);
            // Append options for degrees 0 to 90
            for (var i = 0; i <= 90; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                lattitude_x.appendChild(option);
            }
        }
        


		var lattitude_y = document.getElementById('lattitude_y_complete_change_over');
        if(lattitude_y!='' && lattitude_y!=null){

            // Create and append the default option
            var defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Minute';
            lattitude_y.appendChild(defaultOption);

            // Append options for minutes 0 to 60
            for (var i = 0; i <= 60; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                lattitude_y.appendChild(option);
            }
        }

		var longitude_x = document.getElementById('longitude_x_complete_change_over');
        if(longitude_x!='' && longitude_x!=null){

            // Create and append the default option
            var defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select Degree';
            longitude_x.appendChild(defaultOption);

            // Append options for degrees 0 to 180
            for (var i = 0; i <= 180; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                longitude_x.appendChild(option);
            }
        }
		var longitude_y = document.getElementById('longitude_y_complete_change_over');

        if(longitude_y!='' && longitude_y!=null){

            // Create and append the default option
            var defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Minute';
            longitude_y.appendChild(defaultOption);

            // Append options for minutes 0 to 60
            for (var i = 0; i <= 60; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                longitude_y.appendChild(option);
            }

        }
	}
	function getConsoleError1(){
	
		$('#errorTextarea').show();

			const originalConsoleError = console.error;
			// Override console.error to capture errors
			console.error = function () {

			// Call the original console.error method
				originalConsoleError.apply(console, arguments);

				// Get the error message
				const errorMessage = Array.from(arguments).map(function(arg) {
					return typeof arg === 'string' ? arg : JSON.stringify(arg);
				}).join(' ');			

			// Append the error message to the textarea
			document.getElementById('errorTextarea').value += errorMessage + '\n';
		};
	}
	function getConsoleError(){
		$('#errorTextarea').show();

      var errorTextarea = document.getElementById('errorTextarea');
      var oldOnError = window.onerror;
      var errors = [];

      // Override window.onerror to capture errors
      window.onerror = function(errorMessage, url, lineNumber, columnNumber, errorObj) {
        var errorString = 'Error: ' + errorMessage + ' at ' + url + ':' + lineNumber + ':' + columnNumber;
        errors.push(errorString);
        
        // Call the previous error handler, if any
        if (oldOnError && typeof oldOnError === 'function') {
          oldOnError.apply(window, arguments);
        }

        // Prevent default browser error handling
        return true;
      };

      // Simulate an error
     // console.error('Sample error 1');
      //console.error('Sample error 2');
      // Copy errors to textarea
	  $('#errorTextarea').val(errors.join('\n'));
      //errorTextarea.value = errors.join('\n');
      //errorTextarea.select();
      //document.execCommand('copy');

      // Reset window.onerror to its original value
      window.onerror = oldOnError;

		
	}
    
    function modalClose(){
        document.getElementsByClass('modalClose').style.display = 'none';

    }
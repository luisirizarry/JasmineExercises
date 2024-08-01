window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupInitialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});


function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupInitialValues() {
  document.getElementById("loan-amount").value = 1000000;
  document.getElementById("loan-years").value = 30; 
  document.getElementById("loan-rate").value = 8; 

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let uiValues = getCurrentUIValues();
  let monthlyPayment = calculateMonthlyPayment(uiValues);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let amount = values.amount;
  let years = values.years;
  let rate = values.rate;

  
  let monthlyRate = rate / 100 / 12;
  let numberOfPayments = years * 12;

  // Calculate monthly payment using formula
  let monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

  monthlyPayment = monthlyPayment.toFixed(2);

  return monthlyPayment;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUI = document.querySelector("#monthly-payment");
  monthlyUI.innerHTML = monthly;
}
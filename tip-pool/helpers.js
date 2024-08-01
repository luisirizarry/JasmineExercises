
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

function appendDeleteBtn(tr) {
  let tdX = document.createElement("td");
  tdX.innerHTML = "X";
  tr.appendChild(tdX);

  tdX.addEventListener("click", function(event) {
    let row = event.target.parentElement;  // The row

    // Remove the server from the list
    delete allServers[row.id];

    // Remove the entire row from the DOM
    row.remove();
    
    // Optionally update the server table if needed
    updateServerTable();
  });
}

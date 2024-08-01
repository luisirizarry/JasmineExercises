describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverTbody.innerHTML = "";
    allServers = {};
    billAmtInput.value = "";
    tipAmtInput.value = "";
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });

  it("should update the server table with the correct server details", function() {
    submitServerInfo(); // Add the first server "Alice"

    // Add myself for testing
    serverNameInput.value = "Luis";
    submitServerInfo(); 

    // Call function to update table
    updateServerTable();

    // Check if tbody has 2 rows
    expect(serverTbody.children.length).toBe(2);

    // Check the names in rows
    let serverRows = serverTbody.children;

    expect(serverRows[0].children[0].textContent).toBe("Alice");
    expect(serverRows[1].children[0].textContent).toBe("Luis");
  })

  afterEach(function() {
    // Should remove any servers and bills added, which include the Alice from the tests
    serverNameInput.value = "";
    billAmtInput.value = "";  // Reset bill amount input
    tipAmtInput.value = "";
    serverTbody.innerHTML = "";
    paymentTbody.innerHTML = "";
    // Reset serverId and allServers
    serverId = 0;
    allServers = {};
    // Reset Shift Summary
    summaryTds[0].value = "";
    summaryTds[1].value = "";
    summaryTds[2].value = "";
  });
});





describe("Payments test (with setup and tear-down)", function() {
  beforeEach(function() {
    tipAmtInput.value = 100;
  });

  it("should create a normal payment", function() {
    billAmtInput.value = 1000;

    submitPaymentInfo();

    expect(paymentId).toEqual(1);

    // Validate the payment object in allPayments
    expect(allPayments["payment1"]).toEqual({
      billAmt: "1000",
      tipAmt: "100",
      tipPercent: 10
    });
  });

  it("should not create a payment with empty bill amount", function() {
    // Since the bill is empty, the tip shouldn"t pass, so the whole thing should be 
    // undefined
    billAmtInput.value = "";
  
    let payment = createCurPayment();
  
    expect(payment).toBeUndefined();
  });

  it("should append a new row with the correct amounts", function() {
    // Create a payment
    let payment = {
      billAmt: "1000",
      tipAmt: "100",
      tipPercent: 10
    };

    appendPaymentTable(payment);

    let newRow = paymentTbody.querySelector("tr");

    // Check the content of the row to make sure it was appended correctly
    expect(newRow.children[0].textContent).toContain("$1000");
    expect(newRow.children[1].textContent).toContain("$100");
    expect(newRow.children[2].textContent).toContain("10%");
  });

  it("should update the summary table correctly after adding more than 1 payment", function() {
    billAmtInput.value = 1000;
    submitPaymentInfo(); // Add first payment

    billAmtInput.value = 500;
    tipAmtInput.value = 50;
    submitPaymentInfo(); // Add second payment

    updateSummary();

    expect(summaryTds[0].textContent).toEqual("$1500"); // Total bill amount
    expect(summaryTds[1].textContent).toEqual("$150");   // Total tip amount
    expect(summaryTds[2].textContent).toEqual("10%");    // Average tip percent
  });

  afterEach(function(){
    // Clear DOM
    billAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    allPayments = {};
    paymentId = 0;
  })
});




describe("Helpers test (with setup and tear-down)", function() {
  beforeEach(function() {
    // Test payments
    allPayments["payment1"] = { 
      billAmt: "1000", 
      tipAmt: "100", 
      tipPercent: 10
    };
    allPayments["payment2"] = { 
      billAmt: "2000", 
      tipAmt: "200", 
      tipPercent: 10 
    };
  });

  it("should sum payment totals correctly", function() {
    expect(sumPaymentTotal("billAmt")).toEqual(3000);
    expect(sumPaymentTotal("tipAmt")).toEqual(300);
  });

  it("should calculate tip percentage correctly", function() {
    expect(calculateTipPercent(1000, 100)).toEqual(10);
    expect(calculateTipPercent(2000, 200)).toEqual(10);
  });

  it("should append a td element to a tr with the correct value", function() {
    let testTr = document.createElement("tr");
    appendTd(testTr, "Luis");

    let td = testTr.querySelector("td");
    expect(td.innerText).toEqual("Luis");
  });

  it("should append a td element for deleting", function() {
    let testTr = document.createElement("tr");
    appendDeleteBtn(testTr);

    let td = testTr.querySelector("td");
    expect(td.innerText).toEqual("X");
  });

  afterEach(function() {
    // Reset allPayments and paymentId
    allPayments = {};
    paymentId = 0;
  });
})



describe("Loan Calculator Tests", function() {
  beforeEach(function() {
    setupInitialValues(); // Initialize values
  });

  it('should calculate the monthly rate correctly', function() {
    // Call the update function which uses the calculateMonthlyPayment
    update();

    // Get the calculated monthly payment from the UI
    const monthlyPaymentUI = document.querySelector("#monthly-payment").innerHTML;

    // Expected result based on the given values
    const expectedPayment = calculateMonthlyPayment({
      amount: 1000000,
      years: 30,
      rate: 8
    });

    // Check if the calculated value matches the UI value
    expect(monthlyPaymentUI).toEqual(expectedPayment);
  });

  it("should return a result with 2 decimal places", function() {
    // Test with specific values
    const values = {
      amount: 1000000,
      years: 30,
      rate: 8
    };

    // Calculate the monthly payment
    let monthlyPayment = calculateMonthlyPayment(values);

    // Ensure the result has exactly 2 decimal places
    expect(monthlyPayment).toBe("7337.65");
  });
});

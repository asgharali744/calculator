document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mortgage-form');
    const resultBox = document.getElementById('result-box');
    const monthlyPaymentEl = document.getElementById('monthly-payment');
    const totalPaymentSubEl = document.getElementById('total-payment-sub');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const homePrice = parseFloat(document.getElementById('home-price').value);
        const downPayment = parseFloat(document.getElementById('down-payment').value);
        const loanTerm = parseFloat(document.getElementById('loan-term').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value);

        if (isNaN(homePrice) || isNaN(downPayment) || isNaN(loanTerm) || isNaN(interestRate)) {
            alert('Please enter valid numbers');
            return;
        }

        const principal = homePrice - downPayment;
        const monthlyRate = (interestRate / 100) / 12;
        const numberOfPayments = loanTerm * 12;

        let monthlyPayment = 0;
        let totalPayment = 0;

        if (monthlyRate === 0) {
            monthlyPayment = principal / numberOfPayments;
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        // Display results
        monthlyPaymentEl.textContent = '$' + monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        totalPaymentSubEl.innerHTML = `Total Principal: $${principal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <br> Total Interest: $${totalInterest.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        
        resultBox.classList.add('active');
    });
});

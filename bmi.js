document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bmi-form');
    const resultBox = document.getElementById('result-box');
    const bmiValueEl = document.getElementById('bmi-value');
    const bmiCategoryEl = document.getElementById('bmi-category');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const heightCm = parseFloat(document.getElementById('height').value);
        const weightKg = parseFloat(document.getElementById('weight').value);

        if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            alert('Please enter valid height and weight');
            return;
        }

        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        
        bmiValueEl.textContent = bmi.toFixed(1);

        let category = "";
        let color = "var(--text-main)";

        if (bmi < 18.5) {
            category = "Underweight";
            color = "#facc15"; // yellow
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal Weight";
            color = "#4ade80"; // green
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Overweight";
            color = "#fb923c"; // orange
        } else {
            category = "Obesity";
            color = "#f87171"; // red
        }

        bmiCategoryEl.textContent = category;
        bmiCategoryEl.style.color = color;
        
        resultBox.classList.add('active');
    });
});

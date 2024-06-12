const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5068;

// Middleware
app.use(cors());
app.use(express.json());

// Define rules for diagnosing cardiovascular diseases
const rules = [
    // Rule 1: Chest pain in older adults may indicate a possible heart attack
    {
        condition: (patientData) => patientData.chestPain === 'on' && patientData.age > 40,
        consequence: 'Possible heart attack'
    },
    // Rule 2: High blood pressure and obesity may indicate an increased risk of heart disease
    {
        condition: (patientData) => patientData.bloodPressure > 140 && patientData.obesity === 'on',
        consequence: 'High risk of heart disease due to hypertension and obesity'
    },
    // Rule 3: Smoking and family history of heart disease may indicate an increased risk of heart attack
    {
        condition: (patientData) => patientData.smoking === 'on' && patientData.familyHistory === 'on',
        consequence: 'High risk of heart attack due to smoking and family history'
    },
    // Rule 4: High cholesterol levels may indicate an increased risk of heart disease
    {
        condition: (patientData) => patientData.cholesterol > 200,
        consequence: 'High risk of heart disease due to elevated cholesterol levels'
    },
    // Rule 5: High blood sugar levels may indicate an increased risk of heart attack
    {
        condition: (patientData) => patientData.bloodSugar > 200,
        consequence: 'High risk of heart attack due to elevated blood sugar levels'
    }
];

// Function to evaluate patient data against rules and make diagnosis
function diagnose(patientData) {
    let ruleConsequence = [];
    for (const rule of rules) {
        if (rule.condition(patientData)) {
            ruleConsequence.push(rule.consequence);
        }
    }
    if (ruleConsequence) {
        return ruleConsequence;
    } else {
        return 'No specific diagnosis';
    }
}

// Endpoint to receive patient data and perform diagnosis
app.post('/diagnose', (req, res) => {
    const patientData = req.body;
    console.log(patientData);
    let diagnosisResult = [];

    if (patientData) {
        diagnosisResult = diagnose(patientData);
    }

    res.json({ diagnosis: diagnosisResult });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

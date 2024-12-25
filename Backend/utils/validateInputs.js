const validateInputs = (inputs, requiredFields) => {
    for (const field of requiredFields) {
        if (!inputs[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
};

export default validateInputs;

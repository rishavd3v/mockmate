const pdf = require('pdf-parse');

const extractTextFromPDF = async (buffer) => {
    const data = await pdf(buffer);
    return data.text;
};

module.exports = { extractTextFromPDF};
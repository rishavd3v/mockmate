const pdf = require('pdf-parse');

const extractTextFromPDF = async (buffer) => {
    try{
        const data = await pdf(buffer);
        return data.text;
    }
    catch(err){
        console.error('Error extracting text from PDF:', err);
        throw err;
    }
};

module.exports = { extractTextFromPDF };
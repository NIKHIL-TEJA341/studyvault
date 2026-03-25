const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

async function testUpload() {
    // Create a dummy PDF
    const dummyPdf = path.join(__dirname, 'dummy.pdf');
    fs.writeFileSync(dummyPdf, 'dummy PDF content');

    const form = new FormData();
    form.append('file', fs.createReadStream(dummyPdf));

    try {
        console.log('Sending upload request...');
        const res = await axios.post('http://localhost:5000/api/upload', form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log('Upload successful:', res.data);
    } catch (e) {
        console.error('Upload failed:', e.message);
        if (e.response) {
            console.error('Data:', e.response.data);
            console.error('Status:', e.response.status);
        }
    } finally {
        fs.unlinkSync(dummyPdf);
    }
}
testUpload();

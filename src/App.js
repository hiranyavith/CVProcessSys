import axios from 'axios';
import React, { useState } from 'react';
import { db, collection, addDoc } from './firebase';
// const cloudinary = require('cloudinary');
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      alert("Please upload your CV.");
      return;
    }

  

    try {
      const formData = new FormData();
      formData.append('file', cvFile);
      formData.append('upload_preset', 'cv_upload_preset');
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/db6jroogp/upload`,
        formData
      );

      const secureUrl = cloudinaryResponse.data.secure_url;
      console.log("Cloudinary URL:", secureUrl);

      // Save data to Firebase
      await addDoc(collection(db, "jobApplications"), {
        name,
        email,
        phone,
        cvUrl: secureUrl,
        uploadedAt: new Date().toISOString()
      });

      await fetch('https://cv-process-sys.vercel.app/parse-cv', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cloudinaryUrl: secureUrl,
          status: "testing",
          applicant_name:name,
          applicant_email:email
        }),
      });

      alert("Application submitted successfully!");
      setName('');
      setEmail('');
      setPhone('');
      setCvFile(null);
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Job Application Form</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2">Phone Number</label>
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2">Upload CV (PDF/DOCX)</label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setCvFile(e.target.files[0])}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

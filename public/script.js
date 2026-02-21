// Import from the CDN instead of local files
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBh0aPZI8rra4sWAywya3EvMY5QufZVa1k",
    authDomain: "ssc-registration-form.firebaseapp.com",
    databaseURL: "https://ssc-registration-form-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ssc-registration-form",
    storageBucket: "ssc-registration-form.firebasestorage.app",
    messagingSenderId: "75116308268",
    appId: "1:75116308268:web:c03ab89cc33ec502d66e89"
};

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Data Sending JS Bridge
 * Encapsulates all database operations
 */
const DatabaseBridge = {
    saveRegistration: async (data) => {
        try {
            const registrationsRef = ref(database, 'registrations');
            const newEntryRef = push(registrationsRef);
            await set(newEntryRef, {
                ...data,
                timestamp: Date.now()
            });
            return { success: true };
        } catch (error) {
            console.error('Bridge Error:', error);
            return { success: false, error: error.message };
        }
    }
};

const form = document.getElementById('registrationForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        firstName: formData.get('fname'),
        middleName: formData.get('mname'),
        lastName: formData.get('lname'),
        gender: formData.get('gender'),
        aadharNo: formData.get('aadhar_no'),
        tenthMarks: formData.get('tenth_mark'),
        twelfthMarks: formData.get('twelth_mark')
    };

    const result = await DatabaseBridge.saveRegistration(data);

    if (result.success) {
        alert('Data sent successfully through the bridge!');
        form.reset();
    } else {
        alert('Bridge Error: ' + result.error);
    }
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJ3v4LfZuOJbt9-1hR2A0rET4hVu3yJOs",
    authDomain: "drpiyush-b6f33.firebaseapp.com",
    projectId: "drpiyush-b6f33",
    storageBucket: "drpiyush-b6f33.firebasestorage.app",
    messagingSenderId: "316729773343",
    appId: "1:316729773343:web:404f502ca8a0b62d5c342a",
    measurementId: "G-WE027KLS4F"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load and display academic profile data
async function loadAcademicProfile() {
    try {
        console.log('Loading academic profile data...');
        
        // Try with ordering first, fallback to no ordering if it fails
        let academicProfileSnapshot;
        try {
            const academicProfileQuery = query(collection(db, 'academicProfile'), orderBy('createdAt', 'desc'));
            academicProfileSnapshot = await getDocs(academicProfileQuery);
        } catch (orderError) {
            console.log('Ordering failed, trying without order:', orderError);
            academicProfileSnapshot = await getDocs(collection(db, 'academicProfile'));
        }
        
        console.log('Academic profile documents found:', academicProfileSnapshot.size);
        
        const academicProfileContainer = document.getElementById('academicProfileContainer');
        if (academicProfileContainer) {
            console.log('Academic profile container found on page:', window.location.pathname);
            
            // Remove any existing Firebase entries first
            const existingFirebaseEntries = academicProfileContainer.querySelectorAll('[data-firebase="true"]');
            existingFirebaseEntries.forEach(entry => entry.remove());
            
            // Add Firebase entries at the top
            academicProfileSnapshot.forEach((doc, index) => {
                const data = doc.data();
                console.log('Academic profile data:', data);
                const academicProfileItem = document.createElement('li');
                academicProfileItem.className = 'ap-row card';
                academicProfileItem.setAttribute('data-firebase', 'true');
                academicProfileItem.innerHTML = `
                    <span class="ap-sn">${index + 1}</span>
                    <span class="ap-date badge-glow">${data.date}</span>
                    <span class="ap-what">${data.position}</span>
                `;
                academicProfileContainer.insertBefore(academicProfileItem, academicProfileContainer.firstChild);
            });
            
            // Renumber all entries sequentially
            const allEntries = academicProfileContainer.querySelectorAll('.ap-row');
            allEntries.forEach((entry, index) => {
                const snSpan = entry.querySelector('.ap-sn');
                if (snSpan) {
                    snSpan.textContent = index + 1;
                }
            });
            
            console.log('Academic profile data loaded successfully');
        } else {
            console.log('Academic profile container not found on page:', window.location.pathname);
        }
    } catch (error) {
        console.error('Error loading academic profile:', error);
    }
}

// Function to load and display research data
async function loadResearch() {
    try {
        console.log('Loading research data...');
        
        let researchSnapshot;
        try {
            const researchQuery = query(collection(db, 'research'), orderBy('year', 'desc'));
            researchSnapshot = await getDocs(researchQuery);
        } catch (orderError) {
            console.log('Ordering failed, trying without order:', orderError);
            researchSnapshot = await getDocs(collection(db, 'research'));
        }
        
        console.log('Research documents found:', researchSnapshot.size);
        
        const researchContainer = document.getElementById('researchContainer');
        if (researchContainer) {
            console.log('Research container found on page:', window.location.pathname);
            
            // Remove any existing Firebase entries first
            const existingFirebaseEntries = researchContainer.querySelectorAll('[data-firebase="true"]');
            existingFirebaseEntries.forEach(entry => entry.remove());
            
            // Add Firebase entries at the top
            researchSnapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Research data:', data);
                const researchItem = document.createElement('div');
                researchItem.className = 'card';
                researchItem.setAttribute('data-firebase', 'true');
                researchItem.innerHTML = `
                    <h3>${data.title}</h3>
                    <p><strong>Authors:</strong> ${data.authors}</p>
                    <p><strong>Year:</strong> ${data.year}</p>
                    ${data.link ? `<p><a href="${data.link}" target="_blank">View Publication</a></p>` : ''}
                `;
                researchContainer.insertBefore(researchItem, researchContainer.firstChild);
            });
            
            console.log('Research data loaded successfully');
        } else {
            console.log('Research container not found on page:', window.location.pathname);
        }
    } catch (error) {
        console.error('Error loading research:', error);
    }
}

// Function to load and display students data
async function loadStudents() {
    try {
        console.log('Loading students data...');
        
        let studentsSnapshot;
        try {
            const studentsQuery = query(collection(db, 'students'), orderBy('createdAt', 'desc'));
            studentsSnapshot = await getDocs(studentsQuery);
        } catch (orderError) {
            console.log('Ordering failed, trying without order:', orderError);
            studentsSnapshot = await getDocs(collection(db, 'students'));
        }
        
        console.log('Students documents found:', studentsSnapshot.size);
        
        const studentsContainer = document.getElementById('studentsContainer');
        if (studentsContainer) {
            console.log('Students container found on page:', window.location.pathname);
            
            // Remove any existing Firebase entries first
            const existingFirebaseEntries = studentsContainer.querySelectorAll('[data-firebase="true"]');
            existingFirebaseEntries.forEach(entry => entry.remove());
            
            // Add Firebase entries at the top
            studentsSnapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Students data:', data);
                const studentItem = document.createElement('div');
                studentItem.className = 'card';
                studentItem.setAttribute('data-firebase', 'true');
                studentItem.innerHTML = `
                    <h3>${data.name}</h3>
                    <p><strong>Registration Date:</strong> ${data.registrationDate}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                    <p><strong>University:</strong> ${data.university}</p>
                    <p><strong>Role:</strong> ${data.role}</p>
                    <p><strong>Thesis/Project:</strong> ${data.thesis}</p>
                `;
                studentsContainer.insertBefore(studentItem, studentsContainer.firstChild);
            });
            
            console.log('Students data loaded successfully');
        } else {
            console.log('Students container not found on page:', window.location.pathname);
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Function to load and display academics data
async function loadAcademics() {
    try {
        console.log('Loading academics data...');
        
        let academicsSnapshot;
        try {
            const academicsQuery = query(collection(db, 'academics'), orderBy('createdAt', 'desc'));
            academicsSnapshot = await getDocs(academicsQuery);
        } catch (orderError) {
            console.log('Ordering failed, trying without order:', orderError);
            academicsSnapshot = await getDocs(collection(db, 'academics'));
        }
        
        console.log('Academics documents found:', academicsSnapshot.size);
        
        const academicsContainer = document.getElementById('academicsContainer');
        if (academicsContainer) {
            console.log('Academics container found on page:', window.location.pathname);
            
            // Remove any existing Firebase entries first
            const existingFirebaseEntries = academicsContainer.querySelectorAll('[data-firebase="true"]');
            existingFirebaseEntries.forEach(entry => entry.remove());
            
            // Add Firebase entries at the top
            academicsSnapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Academics data:', data);
                const academicsItem = document.createElement('tr');
                academicsItem.setAttribute('data-firebase', 'true');
                academicsItem.innerHTML = `
                    <td></td>
                    <td>${data.date}</td>
                    <td>${data.activity}</td>
                `;
                academicsContainer.insertBefore(academicsItem, academicsContainer.firstChild);
            });
            
            // Renumber all entries sequentially
            const allRows = academicsContainer.querySelectorAll('tr');
            allRows.forEach((row, index) => {
                const firstCell = row.querySelector('td:first-child');
                if (firstCell) {
                    firstCell.textContent = index + 1;
                }
            });
            
            console.log('Academics data loaded successfully');
        } else {
            console.log('Academics container not found on page:', window.location.pathname);
        }
    } catch (error) {
        console.error('Error loading academics:', error);
    }
}

// Load all data when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Firebase data script loaded, starting data load...');
    loadAcademicProfile();
    loadResearch();
    loadStudents();
    loadAcademics();
});

// Export functions for use in other pages
window.FirebaseData = {
    loadAcademicProfile,
    loadResearch,
    loadStudents,
    loadAcademics,
    db
};

// Also make functions available globally for easier access
window.loadAcademicProfile = loadAcademicProfile;
window.loadResearch = loadResearch;
window.loadStudents = loadStudents;
window.loadAcademics = loadAcademics;

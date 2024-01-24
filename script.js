// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7Y822i_HD-GO_YdmK-VPouMZ5phJWvc0",
    authDomain: "yoosuf2024.firebaseapp.com",
    projectId: "yoosuf2024",
    storageBucket: "yoosuf2024.appspot.com",
    messagingSenderId: "338569236561",
    appId: "1:338569236561:web:97d73f4a6d1ef9bcf76870",
    measurementId: "G-7CJL895KBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Reference to Firebase Realtime Database
const database = getDatabase(app);

// Function to show confirmation pop-up
function showConfirmation(cell) {
    // Assuming you want to save the voting status to Firebase when clicked
    const nationalID = cell.parentNode.cells[0].textContent;
    saveVotingStatus(nationalID, "voted");

    // Show the check mark with fade-in effect
    cell.innerHTML = "&#10004;";
    setTimeout(() => {
        cell.classList.add("vote-yes");
    }, 10);
}

// Function to load voting status from Firebase and set up real-time syncing
function loadVotingStatusRealTime() {
    const table = document.getElementById("votersTable");
    for (let row of table.rows) {
        const voteCell = row.cells[4];
        const nationalID = row.cells[0].textContent;

        const votingStatusRef = ref(database, `votingStatus/${nationalID}`);

        // Use onValue to listen for changes in the database in real-time
        onValue(votingStatusRef, (snapshot) => {
            const votingStatus = snapshot.val();
            if (votingStatus === "voted") {
                // Show the check mark with fade-in effect
                voteCell.innerHTML = "&#10004;";
                setTimeout(() => {
                    voteCell.classList.add("vote-yes");
                }, 10);
            } else {
                // Clear the content and remove the class
                voteCell.innerHTML = "";
                voteCell.classList.remove("vote-yes", "vote-no");
            }
        });
    }
}

// Function to save voting status to Firebase
function saveVotingStatus(nationalID, status) {
    set(ref(database, `votingStatus/${nationalID}`), status);
}
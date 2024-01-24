// Password check
const enteredPassword = prompt("Enter the password to access the portal:");

if (enteredPassword === "X4iyP") {
    // Show the table if the password is correct
    document.getElementById("votersTable").classList.remove("hidden");

    // Load voting status from Firebase and set up real-time syncing
    loadVotingStatusRealTime();
} else {
    // Display an alert and hide the table if the password is incorrect
    alert("Incorrect password. You do not have permission to access the portal.");
    document.getElementById("votersTable").classList.add("hidden");
}

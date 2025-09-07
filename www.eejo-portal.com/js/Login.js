import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHqPVFfpZeIkfp3A1OiMEezo4YLHukqaE",
  authDomain: "riviera-certificates-test.firebaseapp.com",
  projectId: "riviera-certificates-test",
  storageBucket: "riviera-certificates-test.appspot.com",
  messagingSenderId: "651682049198",
  appId: "1:651682049198:web:4b956063884b86d50bd13f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const sidebar= document.getElementById('sidebar');
  if (sidebar)
    {
      toggleSidebar();
    }
  // document.getElementById('MessagePop').show();
  showhideDiv(false,"overlaypop");
  showhideDiv(false,"MessagePop");
  showhideDiv(false,"ActivityPop");
});

async function encodePassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

window.loginUser = async function(event) {
  event.preventDefault();
  showhideDiv(true,"overlaypop");
  showhideDiv(true,"ActivityPop","Verifying Credentials");

  const swimmerID = document.getElementById("swimmerID").value;
  const password = document.getElementById("password").value;
  const encodedPassword = await encodePassword(password);

  const q = query(collection(db, "swimmers"), where("swimmer_id", "==", swimmerID));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
  showhideDiv(true,"overlaypop");
    showMessagePop(true, "ID you entered is not found, try with valid ID." );
    // alert("Swimmer ID not found.");
    return;
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  if (userData.password !== encodedPassword) {
  showhideDiv(true,"overlaypop");
    showMessagePop(true, "Password entered is incorrect, Enter correct password." );

//    alert("Incorrect password.");
    return;
  }

  // Store session data
  sessionStorage.setItem("swimmerData", JSON.stringify(userData));

  // showMessagePop(true, "you have loged in successfully. You can now start using portal by log in." );


//  alert("Login successful!");
  window.location.href = "html/Home.html"; // Redirect to homepage
};

window.resetPassword = async function(event) {
  event.preventDefault();
  showhideDiv(true,"overlaypop");
  showhideDiv(true,"ActivityPop","Verifying Details");


  const name = document.getElementById("resetName").value;
  const dob = document.getElementById("resetDOB").value;
  const phone = document.getElementById("resetPhone").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmNewPassword = document.getElementById("confirmNewPassword").value;

  if (newPassword !== confirmNewPassword) {
  showhideDiv(true,"overlaypop");
    showMessagePop(true, "Passwords do not match with Confirm Password, Re-enter the password." )
    // alert("Passwords do not match.");
    return;
  }

  const encodedNewPassword = await encodePassword(newPassword);

  const q = query(collection(db, "swimmers"),
    where("name", "==", name),
    where("dob", "==", dob),
    where("phone", "==", phone)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    showhideDiv(true,"overlaypop");
    showMessagePop(true, "Details Entered is not matching, try with valid Details." );
    // alert("No matching swimmer found.");
    return;
  }

  const userDoc = snapshot.docs[0];
  const userRef = doc(db, "swimmers", userDoc.id);
  const userdata= userDoc.data();

  await updateDoc(userRef, { password: encodedNewPassword });
  showhideDiv(true,"overlaypop");

  showMessagePop(true, "Hello "  + userdata.name +  ", Password reset successful. You can now start using portal by login ID :"+userdata.swimmer_id);
  
  // alert("Password reset successful. You can now log in.");
};

window.toggleResetForm = function() {
    const container = document.getElementById("resetContainer");
    container.style.display = container.style.display === "none" ? "block" : "none";
  }; 
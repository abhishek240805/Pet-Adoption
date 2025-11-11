// script.js — fetch and display pets from backend

const petListDiv = document.getElementById("pet-list");

// Backend URL (your local server)
const API_URL = "http://localhost:5000/api/pets";

async function loadPets() {
  try {
    const res = await fetch(API_URL);
    const pets = await res.json();

    if (pets.length === 0) {
      petListDiv.innerHTML = "<p>No pets available right now 🐾</p>";
      return;
    }

    petListDiv.innerHTML = pets.map(pet => `
      <div class="pet-card">
        <h3>${pet.name}</h3>
        <p><b>Type:</b> ${pet.type}</p>
        <p><b>Breed:</b> ${pet.breed || "Unknown"}</p>
        <p><b>Age:</b> ${pet.age || "N/A"} years</p>
        <p><b>Location:</b> ${pet.location || "N/A"}</p>
        <p><b>Status:</b> ${pet.adopted ? "✅ Adopted" : "🟢 Available"}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching pets:", error);
    petListDiv.innerHTML = "<p style='color:red;'>Error loading pets 😢</p>";
  }
}

loadPets();

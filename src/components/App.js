import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleTypeChange(event) {
    setFilters({ type: event.target.value })
  }

  function handleAdoption(petId) {
    const updatedPets = pets.map(pet => {
      if (pet.id === petId) {
      return {...pet, isAdopted: true}
      } else {
        return pet;
      }
    });
    setPets(updatedPets);
  }

  function handleFindPets() {
    let url = "http://localhost:3001/pets";
    if(filters.type !== 'all') {
      url = `http://localhost:3001/pets?type=${filters.type}`
    }
    fetch(url)
    .then(response => response.json())
    .then(data => setPets(data))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleTypeChange} onFindPetsClick={handleFindPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoption} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
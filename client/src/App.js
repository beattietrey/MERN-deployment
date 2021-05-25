import './App.css';
import Form from './components/Form';
import ShelterList from './components/ShelterList';
import { Router } from '@reach/router'
import DisplayPet from './components/DisplayPet';

function App() {
  
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <h3>These Pets are looking for a good home</h3>
      <Router>
        <ShelterList default />
        <Form path="pets/new"/>
        <Form path="pets/:id/edit"/>
        <DisplayPet path="pets/:id"/>
      </Router>
    </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import useTalks from './talks/useTalks';
import TalkList from './listTalk';


function App() {
  const todosInStorage = localStorage.getItem('todos')
  const todos = todosInStorage ? JSON.parse(todosInStorage) : []
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [duree, setDuree] = useState("");
  const [presentateur, setPresentateur] = useState("");
  const [objectif, setObjectif] = useState("");
  const addTalk = useTalks((state) => state.addTalk);

  const handleSubmit = () => {
    addTalk({ id: Date.now(), name, subject, duree, presentateur, objectif }); // Ajoute un utilisateur avec un ID unique
    setName("");
    setSubject("");
    setDuree("");
    setPresentateur("");
    setObjectif("");
    localStorage.setItems('todos', JSON.stringify(todos))
  };

  return (
    <> 
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid d-flex justify-content-center">
        <span class="navbar-brand mb-0 h1 fs-1">Projet To-do list</span>
      </div>
    </nav>
    <div class="container-fluid big-padding">
      <div class="row">
      <div class="col">
      <h2 class="d-flex justify-content-center">Ajout d'une tâche</h2>
      <div className="input-group mb-3 flex-column gap-2 ">
        <div className="input-group">
          <span className="input-group-text" id="inputGroup-sizing-default">Titre</span>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
          />
        </div>

        <div className="input-group"> 
        <span className="input-group-text" id="inputGroup-sizing-default">Sujet</span> 
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength="50"
        />
        </div>

        <div className="input-group"> 
        <span className="input-group-text" id="inputGroup-sizing-default">Durée</span> 
        <input
          type="number"
          className="form-control"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
          placeholder="en minute(s)"
          min="1"
        />
        </div>
        
        <div className="input-group"> 
        <span className="input-group-text" id="inputGroup-sizing-default">Présentateur</span> 
        <input
          type="text"
          className="form-control"
          value={presentateur}
          onChange={(e) => setPresentateur(e.target.value)}
          placeholder="Nom du présentateur"
          maxLength="50"
        />
        </div>

        <div className="input-group">  
        <span className="input-group-text" id="inputGroup-sizing-default">Objectif</span> 
        <input
          type="text"
          className="form-control"
          value={objectif}
          onChange={(e) => setObjectif(e.target.value)}
        />
        </div> 
        <button type="button" class="btn btn-outline-success" onClick={handleSubmit}
        disabled={!name || !subject || !duree || !presentateur || !objectif}>
        Ajouter
        </button>
      </div>
      </div>
      <div class="col">
      <div className="mt-4" id="Liste-Talks"> 
        <h2 class="d-flex justify-content-center">Liste des tâches</h2>
        <TalkList />
      </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default App
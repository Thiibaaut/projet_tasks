import React, { useState } from "react";
import useTalks from "./talks/useTalks";

function TalkList() {
  const talks = useTalks((state) => state.talks);
  const removeTalk = useTalks((state) => state.removeTalk);
  const updateTalk = useTalks((state) => state.updateTalk);
  const doneTalk = useTalks((state) => state.doneTalk);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    duree: "",
    presentateur: "",
    objectif: "",
  });

  const startEditing = (talk) => {
    setEditingId(talk.id);
    setFormData(talk);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({
      name: "",
      subject: "",
      duree: "",
      presentateur: "",
      objectif: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    updateTalk(formData);
    cancelEditing();
  };

  return (
    <div className="input-group mb-3 flex-column gap-2">
      <ul className="list-unstyled">
        {talks.sort((alpha, beta) => alpha.name.localeCompare(beta.name)).map((talk) =>(
          <li key={talk.id} className="mb-4 border rounded p-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexSwitchCheckChecked-${talk.id}`}
                checked={talk.done}
                onChange={() => doneTalk(talk.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`flexSwitchCheckChecked-${talk.id}`}
              >
                  <span className={talk.done ? 'text-success' : ''}>
                  {talk.done ? 'Terminé ✅' : 'Marquer comme terminé'}
                  </span>
              </label>
            </div>
            {editingId === talk.id ? (
              <>
                <div className="input-group mb-2">
                  <span className="input-group-text">Titre</span>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nom"
                  />
                </div>
    
                <div className="input-group mb-2">
                  <span className="input-group-text">Sujet</span>
                  <input
                    name="subject"
                    type="text"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sujet"
                  />
                </div>
    
                <div className="input-group mb-2">
                  <span className="input-group-text">Durée</span>
                  <input
                    name="duree"
                    type="number"
                    className="form-control"
                    value={formData.duree}
                    onChange={handleChange}
                    placeholder="Durée"
                    min="1"
                  />
                </div>
    
                <div className="input-group mb-2">
                  <span className="input-group-text">Présentateur</span>
                  <input
                    name="presentateur"
                    type="text"
                    className="form-control"
                    value={formData.presentateur}
                    onChange={handleChange}
                    placeholder="Présentateur"
                  />
                </div>
    
                <div className="input-group mb-2">
                  <span className="input-group-text">Objectif</span>
                  <input
                    name="objectif"
                    type="text"
                    className="form-control"
                    value={formData.objectif}
                    onChange={handleChange}
                    placeholder="Objectif"
                  />
                </div>
    
                <div className="d-flex gap-2 mt-2">
                  <button onClick={saveChanges} className="btn btn-outline-primary">Enregistrer les modifications</button>
                  <button onClick={cancelEditing} className="btn btn-outline-danger">Annuler</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Titre :</strong> {talk.name}</p>
                <p><strong>Sujet :</strong> {talk.subject}</p>
                <p><strong>Durée :</strong> {talk.duree} minutes</p>
                <p><strong>Présentateur :</strong> {talk.presentateur}</p>
                <p><strong>Objectif :</strong> {talk.objectif}</p>
                <div className="d-flex gap-2">
                  <button disabled={talk.done} onClick={() => removeTalk(talk.id)} className="btn btn-danger btn">Supprimer</button>
                  <button disabled={talk.done} onClick={() => startEditing(talk)} className="btn btn-outline-primary">Modifier</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TalkList;

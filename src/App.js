import React ,{useState,useEffect}from "react";

import api from './services/api';

import "./styles.css";



function App() {

  const [repositories,setRepositories] = useState([]);

  useEffect(() => 
  {
    api.get('repositories').then( response => { setRepositories(response.data); });
  }, []);

  async function handleAddRepository() {
   const response = await api.post('repositories',{title:'Repository',url:'http://example.com', techs:['javascript','node.js']});

    const repository = response.data;
    
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`repositories/${id}`);

   if(resp.status === 204){
    const repo = repositories.filter( repo => repo.id !== id );
    setRepositories(repo);
  }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repos => (

            <li key={repos.id}> 

             {repos.title} 

              <button onClick={() => handleRemoveRepository(repos.id)}> Remover </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  ); 
}

export default App;
import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const date = new Date();
    const response = await api.post('/repositories', {
      url: 'https://github.com/Rocketseat/umbriel',
      title: `Repository - ${date.toLocaleTimeString('pt-BR')}`,
      techs: ['Node', 'Express', 'TypeScript'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories([]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

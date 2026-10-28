import React, { useState } from 'react';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // Adiciona uma ideia somente quando o campo contém texto válido.
  function handleSubmit(event) {
    event.preventDefault();

    const cleanIdea = newIdea.trim();

    if (!cleanIdea) {
      setError("Digite sua ideia antes de adicionar.");
      return;
    }

    const idea = {
      id: Date.now(),
      text: cleanIdea,
      done: false
    };

    setIdeas((currentIdeas) => [...currentIdeas, idea]);
    setNewIdea("");
    setError("");
  }

  // Marca ou desmarca uma ideia sem alterar diretamente o estado anterior.
  function toggleIdea(ideaId) {
    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) =>
        idea.id === ideaId ? { ...idea, done: !idea.done } : idea
      )
    );
  }

  // Cria uma nova lista sem a ideia removida.
  function removeIdea(ideaId) {
    setIdeas((currentIdeas) =>
      currentIdeas.filter((idea) => idea.id !== ideaId)
    );
  }

  const completedCount = ideas.filter((idea) => idea.done).length;
  const pendingCount = ideas.length - completedCount;

  const visibleIdeas = ideas.filter((idea) => {
    if (filter === "pending") return !idea.done;
    if (filter === "completed") return idea.done;
    return true;
  });

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true"></div>
      <div className="ambient ambient-two" aria-hidden="true"></div>

      <section className="app-card">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true">✳</div>
            <span>IDEA SPACE</span>
          </div>
          <span className="status-pill">
            <span className="status-dot"></span>
            SEU ESPAÇO CRIATIVO
          </span>
        </header>

        <section className="hero">
          <p className="eyebrow">TIRE AS IDEIAS DA CABEÇA</p>
          <h1>Um lugar para<br /><span>grandes ideias.</span></h1>
          <p className="hero-description">
            Registre o que você imagina. Organize os próximos passos.
            Uma ideia de cada vez.
          </p>
        </section>

        <section className="composer" aria-labelledby="form-title">
          <h2 id="form-title">Qual é a próxima ideia?</h2>
          <form onSubmit={handleSubmit} className="idea-form">
            <label className="sr-only" htmlFor="new-idea">Descreva sua ideia</label>
            <input
              id="new-idea"
              type="text"
              value={newIdea}
              onChange={(event) => {
                setNewIdea(event.target.value);
                if (error) setError("");
              }}
              placeholder="Ex.: Criar um app para organizar estudos..."
              maxLength={120}
            />
            <button className="add-button" type="submit">
              <span aria-hidden="true">＋</span> Adicionar
            </button>
          </form>
          {error && <p className="error-message" role="alert">{error}</p>}
          <div className="input-hint">
            <span>✦</span> Toda grande coisa começa com uma ideia.
            <span className="character-count">{newIdea.length}/120</span>
          </div>
        </section>

        <section className="ideas-section" aria-labelledby="ideas-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEU UNIVERSO</p>
              <h2 id="ideas-title">Minhas ideias <span className="total-badge">{ideas.length}</span></h2>
            </div>
            <div className="filters" aria-label="Filtrar ideias">
              <button type="button" className={filter === "all" ? "filter active" : "filter"} onClick={() => setFilter("all")}>Todas</button>
              <button type="button" className={filter === "pending" ? "filter active" : "filter"} onClick={() => setFilter("pending")}>Pendentes</button>
              <button type="button" className={filter === "completed" ? "filter active" : "filter"} onClick={() => setFilter("completed")}>Concluídas</button>
            </div>
          </div>

          {visibleIdeas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">{ideas.length === 0 ? "✧" : "⌕"}</div>
              <h3>{ideas.length === 0 ? "Seu próximo projeto começa aqui" : "Nada por aqui ainda"}</h3>
              <p>
                {ideas.length === 0
                  ? "Escreva sua primeira ideia no campo acima e ela vai aparecer aqui."
                  : "Não há ideias nesta categoria. Experimente outro filtro."}
              </p>
            </div>
          ) : (
            <ul className="idea-list">
              {visibleIdeas.map((idea) => (
                <li className={idea.done ? "idea-item completed" : "idea-item"} key={idea.id}>
                  <label className="idea-check">
                    <input
                      type="checkbox"
                      checked={idea.done}
                      onChange={() => toggleIdea(idea.id)}
                      aria-label={idea.done ? `Marcar "${idea.text}" como pendente` : `Marcar "${idea.text}" como concluída`}
                    />
                    <span className="custom-check" aria-hidden="true">{idea.done ? "✓" : ""}</span>
                  </label>
                  <span className="idea-text">{idea.text}</span>
                  <span className={idea.done ? "idea-status done" : "idea-status"}>
                    {idea.done ? "Concluída" : "Em andamento"}
                  </span>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeIdea(idea.id)}
                    aria-label={`Remover a ideia: ${idea.text}`}
                    title="Remover ideia"
                  >×</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="summary">
          <div className="summary-item">
            <span className="summary-icon">✳</span>
            <span><strong>{`${ideas.length} ${ideas.length === 1 ? "ideia" : "ideias"}`}</strong><small>no painel</small></span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-icon completed-icon">✓</span>
            <span><strong>{`${completedCount} ${completedCount === 1 ? "concluída" : "concluídas"}`}</strong><small>finalizadas</small></span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-icon pending-icon">◷</span>
            <span><strong>{pendingCount}</strong><small>em andamento</small></span>
          </div>
        </footer>
        <p className="footer-note">FEITO PARA PENSAR GRANDE <span>·</span> UMA IDEIA DE CADA VEZ</p>
      </section>
    </main>
  );
}

export default App;
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [adicionada, setAdicionada] = useState("");
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    ListarTarefas();
  }, []);

  async function ListarTarefas() {
    const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks";
    const listar = await axios.get(url, { params: { user: "Raul" } });

    setTarefas(listar.data);
  }

  async function criarTarefa() {
    const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks";
    const resultado = await axios.post(url, {
      description: adicionada,
      user: "Raul"
    });
    console.log(resultado.data);
    setTarefas(resultado.data);
  }
  async function deletarTarefa(index) {
    const url =
      "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/" + index;
    const deletar = await axios.delete();
    setTarefas(deletar.data);
  }
  const onAdicionarTarefa = () => {
    tarefas.push(adicionada);
    setTarefas(tarefas);
    setAdicionada("");
    criarTarefa();
  };

  const excluirTarefa = (index) => {
    const novasTarefas = tarefas.filter((_, _index) => _index !== index);

    excluirTarefa(novasTarefas);
  };

  return (
    <div className="App">
      <h1>Tarefas</h1>
      <div class="tarefas_adicionar">
        <div class="input_nome">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={adicionada}
            onChange={(event) => {
              setAdicionada(event.target.value);
            }}
          />
        </div>
        <button class="adicionar" onClick={onAdicionarTarefa}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          Adicionar
        </button>
      </div>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li>
            <div class="tarefa_listada">
              <span>{tarefa.description}</span>
              <button class="excluir" onClick={() => excluirTarefa(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

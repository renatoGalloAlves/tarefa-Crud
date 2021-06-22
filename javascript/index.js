
const btnAddTarefa = document.querySelector("#btn-add-tarefa")
const btnExcluir = document.querySelector('.btn-excluir')
const btnEditar = document.querySelector('.btn-editar')

function criaLI(nomeDaTarefa, id) {
  const listaDOM = document.querySelector("#lista-tarefas")
  const listItem = document.createElement('li')
  listItem.id = `task-${id}`
  listItem.classList = "list-group-item d-flex justify-content-between align-items-center"  
  
  const btnContainer = document.createElement('div')
  btnContainer.classList = "btn-group"

  listItem.innerHTML = `
    ${nomeDaTarefa}
    <div class="btn-group" role="group" aria-label="Container dos botões">
      <button type="button" class="btn btn-editar btn-warning btn-sm">Editar</button>
      <button type="button" class="btn btn-excluir btn-danger btn-sm">Excluir</button>
    </div>
  `  
  listaDOM.appendChild(listItem)
}

function excluiLI(id) {
  var elem = document.querySelector(id);
  elem.parentNode.removeChild(elem);
}

function pegaTarefas(){
  const listaTarefas = localStorage.getItem("listaTarefas")
  
  if (listaTarefas) {
    return listaTarefas.split(',').map((tarefa, id) => {
      criaLI(tarefa, id)
    })
  }
}

function excluiTarefa(tarefaID) {
  const listaFiltrada = localStorage.getItem("listaTarefas").split(',')
    .filter((tarefa, id) => id !== tarefaID)

  localStorage.setItem('listaTarefas', listaFiltrada)
  excluiLI(tarefaID)
}

function criaTarefa () {
  const campoTarefa = document.querySelector("#campo-tarefa")
  const lista = localStorage.getItem("listaTarefas")
  if (campoTarefa.value === '') alert('O campo está vazio')

  else {
    const listaComNovaTarefa = lista ? [...lista.split(','), campoTarefa.value]
      : campoTarefa.value
    localStorage.setItem('listaTarefas', listaComNovaTarefa)
    criaLI(campoTarefa.value, listaComNovaTarefa.length - 1)
    campoTarefa.value = ''
  }
}

btnAddTarefa.addEventListener('click', criaTarefa)

onload = pegaTarefas()
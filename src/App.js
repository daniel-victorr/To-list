import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as id } from 'uuid'
import './App.css'
import ListaContatos from "./Components/ListaContatos"

const App = () => {

  //states
  const [contato, setContato] = useState(() => {
    return {
      id: '',
      nome: '',
      telefone: '',
    }
  })
  const [lista, setLista] = useState(() => { return [] })

  //useRef
  const inputNome = useRef()
  const inputTelefone = useRef()

  //métodos

  const setNome = (event) => {
    setContato((old) => { return { ...old, nome: event.target.value } })
  }

  const setTelefone = (event) => {
    setContato((old) => { return { ...old, telefone: event.target.value } })
  }

  const adicionarEnter = (event) => {
    if (event.code === 'Enter') {
      adicionar()
    }
  }


  //Persistência com o state

  useEffect(() => {
    if (localStorage.getItem('Meus_Contatos') !== null) {
      setLista(JSON.parse(localStorage.getItem('Meus_Contatos')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Meus_Contatos', JSON.stringify(lista))
  }, [lista])


  const adicionar = () => {

    //Verificar se os campos estão preenchidos
    if (contato.nome === "" || contato.telefone === "") return console.log("Preecha os campos!")

    //Verificar se existe o contato
    const exist = lista.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
    if (typeof exist !== 'undefined') {
      inputTelefone.current.focus()
      return console.log('Já existe este contato!')
    }

    //Adicionar o novo contato
    setLista((old) => { return [...old, { ...contato, id: id() }] })

    //Limpar contato ao adicinar na lista de contatos
    setContato({ nome: '', telefone: '' })

    //Adicionar o Focus
    inputNome.current.focus()

  }
  //Limpar toda a lista de Contatos
  const excluir = () => {
    setLista(() => { return [] })
  }

  const removerContato = (id) => {
    let listaTemporaria = lista.filter((ct) => { return ct.id !== id })
    setLista(() => { return listaTemporaria })
  }

  return (
    <>

      <div className="container-fluid title">
        <div className="row">
          <div className="col text-center">
            <h4 className="text-center"> <FontAwesomeIcon icon={faList} className={'me-3'} /> LISTA DE CONTATOS</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid forms">
        <div className="row">
          <div className="col p-3">

            <div className="row justify-content-center">
              <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Nome:</label> <br />
                  <input className="form-control" type="text" ref={inputNome} onChange={setNome} value={contato.nome} />
                </div>
                <div>
                  <label className="form-label">Telefone</label> <br />
                  <input className="form-control" type="Number" ref={inputTelefone} onChange={setTelefone} onKeyUp={adicionarEnter} value={contato.telefone} />
                </div>

                <div className="row mt-3">
                  <div className="col text-start">
                    <button className="btn btn-outline-warning" onClick={excluir}>
                      <FontAwesomeIcon icon={faTrash} className={'me-2'} />
                      Limpar Lista
                    </button>
                  </div>
                  <div className="col text-end">
                    <button className="btn btn-outline-primary" type="submit" onClick={adicionar}>
                      <FontAwesomeIcon icon={faCirclePlus} className={'me-2'} />
                      Adicionar
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>


      {lista.map((item) => {
        return <ListaContatos key={item.id} id={item.id} nome={item.nome} telefone={item.telefone} remover={removerContato} />
      })}

    </>
  )
}

export default App
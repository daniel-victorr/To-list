import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTrashAlt, faUser, faVolumeControlPhone } from '@fortawesome/free-solid-svg-icons'
import './contatos.css'

const ListaContatos = (props) => {
  return (
    <div className="mx-2">
      <div className="container component my-4">
        <div className="row">
          <div className="col p-2">
            <h4>
              <FontAwesomeIcon icon={faUser} className={'me-3 '} />
              {props.nome}
            </h4>
          </div>
          <div className="col p-2">
            <h4>
              <FontAwesomeIcon icon={faVolumeControlPhone} className={'me-3'} />
              {props.telefone}
            </h4>
          </div>
          <div className="col p-2">
            <h5>
              <FontAwesomeIcon icon={faTrashAlt} className={'me-2'} onClick={() => { props.remover(props.id) }} />
            </h5>
          </div>
        </div>
      </div>
  </div>
  )
}

export default ListaContatos
import React from 'react';
import { Modal, Button } from 'reactstrap';

const NotificationModal = ({ isOpen, toggle, onConfirm, isLoading }) => (
<Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered modal-danger">
  <div className="modal-header">
    <h6 className="modal-title">Votre attention est requise</h6>
    <button className="close" onClick={toggle}>
      <span aria-hidden={true}>×</span>
    </button>
  </div>
  <div className="modal-body">
    <div className="py-3 text-center">
      <i className="ni ni-bell-55 ni-3x" />
      <h4 className="heading mt-4">Vous devriez lire ceci!</h4>
      <p>Lorsque vous cliquez sur 'Ok, compris', la demande sera supprimée</p>
    </div>
  </div>
  <div className="modal-footer">
    <Button className="btn-white" color="default" onClick={onConfirm}>
      {isLoading ? <div className="spinner-border text-light" role="status"><span className="visually-hidden"></span></div> : "Ok, compris"}
    </Button>
    <Button className="text-white ml-auto" color="link" onClick={toggle}>
      Fermer
    </Button>
  </div>
</Modal>
);

export default NotificationModal;
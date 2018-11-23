import React from "react";
import Modal from "./Modal";

const AdoptModalContent = props => (
  <Modal>
    <h1>Would you like to adopt {props.name}?</h1>
    <div className="buttons">
      <button onClick={props.toggleModal}> Yes </button>
      <button onClick={props.toggleModal}> Definitely Yes </button>
    </div>
  </Modal>
);

export default AdoptModalContent;

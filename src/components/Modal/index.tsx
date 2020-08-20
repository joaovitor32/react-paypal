import React from "react";
import { Modal } from "@material-ui/core";

function ModalMessage(props: any) {
  const { err, setError } = props;

  return (
    <Modal
      open={!!err}
      onClose={() => {
        setError(false);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {err}
    </Modal>
  );
}

export default ModalMessage;

import MyCat from 'components/MyCat/MyCat';
import React, { useState } from 'react';
import ToolTip from 'react-power-tooltip';

const MycatModal = (props) => {
  // const [setModalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Modal Open</button>
      <Modal isOpen={true}>
        This is Modal content
        <button onClick={() => setModalIsOpen(false)}>Modal Open</button>
      </Modal>
    </div>
  );
};

export default MycatModal;

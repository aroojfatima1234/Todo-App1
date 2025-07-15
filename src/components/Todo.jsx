import { useState } from 'react';
import Modal from 'react-modal';

// 👇 Required for accessibility — ensures modal is attached to root
Modal.setAppElement('#root');

function Todo({ task, index, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState(task);

  // Open modal and set input to current task
  const openModal = () => {
    setEditText(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    if (editText.trim() !== '') {
      onUpdate(index, editText);
      closeModal();
    }
  };

  return (
    <li>
      <span>{task}</span>
      <div>
        <button className="edit-btn" onClick={openModal}>✏️</button>
        <button className="delete-btn" onClick={() => onDelete(index)}>🗑️</button>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="modal-overlay"
        contentLabel="Edit Task"
      >
        <h2>Edit Task</h2>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="form-control mb-3"
        />
        <div className="modal-btns">
          <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </li>
  );
}

export default Todo;

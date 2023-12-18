export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="deleteConfirm">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div className="confirmBtn">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}

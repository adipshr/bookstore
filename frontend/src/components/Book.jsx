import "../index.css";
const Book = ({ title, author, note, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h2 className="title">{title}</h2>
      <h3 className="author">by {author}</h3>
      <p className="notes">{note}</p>
      <div className="buttons">
        <button onClick={onEdit} className="button">
          Edit
        </button>
        <button onClick={onDelete} className="button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Book;

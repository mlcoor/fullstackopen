const Filter = ({ filter, onFliterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onFliterChange} />
    </div>
  );
};

export default Filter;

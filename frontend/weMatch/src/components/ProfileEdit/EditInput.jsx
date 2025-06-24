const EditInput = ({ label, name, value, onChange }) => (
  <>
    <label>{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} />
  </>
)

export default EditInput
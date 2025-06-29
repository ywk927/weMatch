const EditSelect = ({ label, name, value, onChange }) => (
  <>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">선택</option>
      <option value="초급">초급</option>
      <option value="중급">중급</option>
      <option value="고급">고급</option>
    </select>
  </>
)

export default EditSelect
const EditSkillsInput = ({ label, name, value, onChange }) => (
  <>
    <label>{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} placeholder="쉼표로 구분 (React, Node.js)" />
  </>
)

export default EditSkillsInput
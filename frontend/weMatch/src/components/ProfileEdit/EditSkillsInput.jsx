const EditSkillsInput = ({ label, value, onChange }) => {
  const handleChange = (index, newValue) => {
    const updated = [...value]
    updated[index].name = newValue
    onChange(updated)
  }

  const handleAdd = () => {
    onChange([...value, { name: '' }])
  }

  const handleRemove = (index) => {
    const updated = value.filter((_, i) => i !== index)
    onChange(updated)
  }

  return (
    <div className="edit-group">
      <label>{label}</label>
      {value.map((skill, idx) => (
        <div key={idx} className="skill-item">
          <input
            type="text"
            placeholder="기술명"
            value={skill.name}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
          <button type="button" onClick={() => handleRemove(idx)}>삭제</button>
        </div>
      ))}
      <button type="button" className="add-skill-btn" onClick={handleAdd}>+ 스킬 추가</button>
    </div>
  )
}

export default EditSkillsInput
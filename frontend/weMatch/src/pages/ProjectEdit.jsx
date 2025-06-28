// ProjectEdit.jsx
import React, { useState, useEffect } from 'react'
import './ProjectCreate.css'
import logoImg from '../assets/005.png'
import axiosInstance from '../lib/axiosInstance'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProjectEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [recruitCount, setRecruitCount] = useState(1)
  const [skills, setSkills] = useState([])
  const [inputSkill, setInputSkill] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/projects/${id}`)
        const project = res.data.project
        setTitle(project.title)
        setDescription(project.description)
        setRecruitCount(project.recruitCount)
        setSkills(project.skills || [])
      } catch (err) {
        console.error(err)
        alert('프로젝트 정보를 불러오지 못했습니다.')
      }
    }
    fetchProject()
  }, [id])

  const addSkill = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputSkill.trim() !== '' && !skills.includes(inputSkill.trim())) {
        setSkills([...skills, inputSkill.trim()])
      }
      setInputSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/projects/${id}`, {
        title,
        description,
        skills,
        recruitCount,
      })
      alert('✅ 프로젝트가 성공적으로 수정되었습니다!')
      navigate(`/project/${id}`)
    } catch (err) {
      console.error(err)
      alert('❌ 프로젝트 수정 실패!')
    }
  }

  return (
    <div className="project-page">
      <div className="project-header">
        <div className="project-header-text">
          <h2>프로젝트를 수정해보세요!</h2>
          <p>기존 정보를 바탕으로 프로젝트를 업데이트할 수 있어요.</p>
        </div>
        <img src={logoImg} alt="logo" className="project-header-logo" />
      </div>

      <div className="project-form-wrapper">
        <label>✔ 프로젝트</label>
        <input
          type="text"
          className="input"
          placeholder="프로젝트명을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>✔ 모집 인원</label>
        <div className="recruit-wrapper">
          <input
            type="number"
            min="1"
            value={recruitCount}
            readOnly
            className="input recruit-input"
          />
          <span onClick={() => setRecruitCount(Math.max(1, recruitCount - 1))}>-</span>
          <span onClick={() => setRecruitCount(recruitCount + 1)}>+</span>
        </div>

        <label>✔ 프로젝트 설명</label>
        <textarea
          className="input textarea"
          placeholder="내용을 작성해주세요"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>✔ 기술 / 언어</label>
        <input
          type="text"
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          onKeyDown={addSkill}
          className="input"
          placeholder="React, Node.js, ..."
        />
        <div className="tag-list">
          {skills.map((skill, index) => (
            <div key={index} className="tag">
              #{skill} <span onClick={() => removeSkill(skill)}>x</span>
            </div>
          ))}
        </div>

        <button className="submit-button" onClick={handleUpdate}>수정하기</button>
      </div>
    </div>
  )
}

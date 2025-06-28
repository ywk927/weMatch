// src/pages/ProjectPage.jsx

import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axiosInstance'
import './ProjectPage.css'
import ProjectCard from '../components/common/ProjectCard'

const ProjectPage = () => {
  const [allProjects, setAllProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const carouselRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get('/projects')
        setAllProjects(res.data)
        setFilteredProjects(res.data)

        const skillSet = new Set()
        res.data.forEach((project) => {
          project.skills.forEach((skill) => skillSet.add(skill))
        })
        setSkills([...skillSet])
      } catch (err) {
        console.error(err)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    const result = allProjects.filter((project) => {
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => project.skills.includes(skill))

      const matchesSearch = [
        project.title,
        project.description,
        project.creator?.nickname,
        ...project.skills,
      ].some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesSkills && matchesSearch
    })
    setFilteredProjects(result)
  }, [selectedSkills, searchQuery, allProjects])

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const el = carouselRef.current
      if (!el) return

      el.scrollLeft += 250

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="project-page">
      <div className="page-header-wrapper">
        <div className="page-header">
          <h2>함께 시작해 보세요!</h2>
          <h3>둘러볼 만한 프로젝트 📁</h3>
        </div>
      </div>

      <div className="carousel-wrapper">
        <div className="project-carousel" ref={carouselRef}>
          {[...allProjects, ...allProjects].map((p, idx) => (
            <ProjectCard key={p._id + '-' + idx} project={p} />
          ))}
        </div>
      </div>

      <div className="project-content">
        <aside className="project-filter">
          <p>
            나에게 맞는<br />맞춤형 프로젝트를<br />찾아 보세요!
          </p>
          <h3>✅ Skills</h3>
          <div className="filter-skill-list">
            {skills.map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </aside>

        <section className="project-main">
          <input
            className="search-box"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="project-list">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProjectPage

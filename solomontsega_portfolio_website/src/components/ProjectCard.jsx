import { motion } from 'framer-motion';
import { projectVisuals } from '../data/siteContent';

function formatCategory(category) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function primaryTech(project) {
  const tags = project.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return tags[0] || 'Project';
}

export default function ProjectCard({ project, delay = 0 }) {
  const visualClass = projectVisuals[project.title] || 'visual-chatbot';
  const projectLink = project.live_link || project.code_link;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="glass project-card"
      data-category={project.category}
    >
      <div className={`project-img ${visualClass}`} aria-hidden="true" />
      <div className="project-info">
        <div className="project-badges">
          <span className={`category-badge ${project.category}`}>{formatCategory(project.category)}</span>
          <span className="tech-badge">{primaryTech(project)}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          {projectLink ? (
            <a href={projectLink} target="_blank" rel="noopener noreferrer" className="btn secondary small">
              View Project
            </a>
          ) : null}
          {project.code_link ? (
            <a href={project.code_link} target="_blank" rel="noopener noreferrer" className="btn secondary small">
              Code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

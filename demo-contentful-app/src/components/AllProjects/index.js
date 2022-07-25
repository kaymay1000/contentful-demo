import { useState, useEffect } from 'react';
import '../../App.css';
import ProjectCard from '../ProjectCard';
import { client } from '../../client';
import { Link } from 'react-router-dom';

const AllProjects = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    client.getEntries({content_type: 'project'})
    .then(response => setProjects(response.items))
    .catch(error => console.log('Error getting all projects: ', error));
  }, []);

  return (
    <div className="projects-wrapper">
      { projects && projects.map((project, index) => (
        <Link
          key={index}
          to={'/all-projects/' + project.fields.slug}
        >
          <ProjectCard 
            project={project}
            key={index}
          />
        </Link>
      ))}
    </div>
  )
}

export default AllProjects;

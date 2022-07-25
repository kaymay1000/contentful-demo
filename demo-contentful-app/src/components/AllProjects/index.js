import { useState, useEffect } from 'react';
import '../../App.css';
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
      { projects && projects.map((project, index) => {
        console.log('project in all projects map: ', project);
        console.log('project.fields.slug in all projects map: ', project.fields.slug);
        return (
           <Link
            key={index}
            to={'/all-projects/' + project.fields.slug}
          >
          <div className="project-wrapper">
            <h1 className="project-title">{project.fields.projectTitle}</h1>
            {project.fields.projectImages[0] ? <img src={project.fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/> : <></> }
            <p className="project-desc">{project.fields.projectDescription.content[0].content[0].value}</p>
          </div>
        </Link>
        )
      }
      )}
    </div>
  )
}

export default AllProjects;

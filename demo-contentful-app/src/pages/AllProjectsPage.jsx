import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentfulClient } from '../contentfulClient';
import ProjectCard from '../components/ProjectCard';
import './all-projects.scss';

const AllProjectsPage = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    contentfulClient.getEntries({content_type: 'project'})
    .then(response => setProjects(response.items))
    .catch(error => console.log('Error getting all projects: ', error));
  }, []); // empty dependency array since this should only run once (on page load/when component mounts)

  if (!projects) return <></>
  return (
    <div className="all-projects-page-wrapper">
      { projects && projects.map((project, index) => {
        return (
          <Link
            key={index}
            to={'/all-projects/' + project.fields.slug}
          >
            <ProjectCard project={project}/>
        </Link>
        )
      }
      )}
    </div>
  )
}

export default AllProjectsPage;

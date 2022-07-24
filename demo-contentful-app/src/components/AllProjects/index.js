import { useState, useEffect } from 'react';
import useContentful from '../../custom-hooks/useContentful';
import '../../App.css';
import Project from '../Project';
import { Link } from 'react-router-dom';

const AllProjects = () => {

  const [projects, setProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { getAllProjects } = useContentful();

  useEffect(() => {
    getAllProjects().then(response => {
      console.log('response.items: ', response.items);
      return response.items && setProjects(response.items)
    });
  });

  return (
    <div className="projects-wrapper">
      { projects.map(project => (
        // <Link
        // className="allProjects__project"
        // key={`/projects/${project.fields.slug}`}
        // to={`/projects/${project.fields.slug}`}
        // >
          <Project 
          title={project.fields.projectTitle} 
          description={project.fields.projectDescription.content[0].content[0].value} 
          coverImage={project.fields.projectImages[0].fields.file.url}
          key={project.fields.projectTitle}
          />
        // </Link>
      ))};
    </div>
  )
}

export default AllProjects;

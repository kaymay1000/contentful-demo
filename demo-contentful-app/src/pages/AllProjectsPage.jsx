import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentfulDeliveryClient, contentfulManagementClient } from '../contentfulClients';
import ProjectCard from '../components/ProjectCard';
import './all-projects.scss';

const AllProjectsPage = () => {

  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    contentfulDeliveryClient.getEntries({content_type: 'project'})
    .then(response => setProjects(response.items))
    .catch(error => console.log('Error getting all projects: ', error));

    contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
    .then((env) => env.getTags())
    .then((tags) => setTags(tags.items))
    .catch(console.error);
  }, []); // empty dependency array since this should only run once (on page load/when component mounts)

  if (!projects) return <></>
  return (
    <div className="all-projects-page-wrapper">
      <div className="filters-wrapper">
        {console.log('tags state: ', tags)}
        {tags.map((tag, index) => <p key={index}>{tag.name}</p> )}
      </div>
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

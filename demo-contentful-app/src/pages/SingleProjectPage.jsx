import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { contentfulDeliveryClient } from '../contentfulClients';
import ProjectCard from '../components/ProjectCard';
import './single-project.scss';

const SingleProjectPage = () => {
  const [singleProject, setSingleProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    // have to use getEntries with a limit of 1 instead of getEntry, which will only accept an entry ID as a query
    contentfulDeliveryClient.getEntries({
        content_type: 'project',
        'fields.slug': slug,
        limit: 1
    })
    .then(response => setSingleProject(response.items[0]))
    .catch(error => console.log('Error getting single projects: ', error));
  }, [slug]);

  if (!singleProject) return <></>
  return (
    <div className="single-project-page-wrapper">
      <ProjectCard project={singleProject}/>
    </div>
  
  )
}

export default SingleProjectPage;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../client';

const SingleProject = () => {
  const [singleProject, setSingleProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    console.log('slug inside useEffect: ', slug);
    // have to use getEntries with a limit of 1 instead of getEntry, which will only accept an entry ID as a query
    client.getEntries({
        content_type: 'project',
        'fields.slug': slug,
        limit: 1
    })
    .then(response => setSingleProject(response.items[0]))
    .catch(error => console.log('Error getting single projects: ', error));
  }, [slug]);

  if (!singleProject) return <div>Loading...</div>;

  return (
    <div className="project-wrapper">
      <h1 className="project-title">{singleProject.fields.projectTitle}</h1>
      {singleProject.fields.projectImages[0] ? <img src={singleProject.fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/> : <></> }
      <p className="project-desc">{singleProject.fields.projectDescription.content[0].content[0].value}</p>
    </div>
  )
}

export default SingleProject;

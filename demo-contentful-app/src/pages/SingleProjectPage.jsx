import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { contentfulDeliveryClient, contentfulManagementClient } from '../contentfulClients';
import { Link } from 'react-router-dom';
import './single-project.scss';

const SingleProjectPage = () => {
  const [singleProject, setSingleProject] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const getAllTags = async () => {
      await contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
      .then(env => env.getTags())
      .then(tags => setAllTags(tags.items))
      .catch(console.error);
    };

    getAllTags();
  }, [])


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
      <div key={singleProject.name} className="project-card-wrapper">
        <h1 className="project-title">{singleProject.fields.projectTitle}</h1>
        <Link to={'/all-projects/' + singleProject.fields.slug}>
          <img src={singleProject.fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
        </Link>
        <p className="project-desc">{singleProject.fields.projectDescription.content[0].content[0].value}</p>
        {/* in order to be accessible to the CDA client, tags must be made public when being created in Contentful */}
        <ul className="project-tags">
          {
            singleProject.metadata.tags.map(projectTag => { 
              console.log('singleProject: ', singleProject);
              console.log('projectTag: ', projectTag)
              
              let filteredEnvTags = allTags.filter(envTag => envTag.sys.id === projectTag.sys.id);

              return filteredEnvTags.map(filteredTag => {
                return <li className="tag" key={filteredTag.name}>{filteredTag.name}</li>
              })
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default SingleProjectPage;

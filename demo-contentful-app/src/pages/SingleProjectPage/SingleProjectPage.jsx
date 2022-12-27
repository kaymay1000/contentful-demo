import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { contentfulDeliveryClient, contentfulManagementClient } from '../../contentfulClients';
import './single-project-page.scss';

const SingleProjectPage = () => {
  const [singleProject, setSingleProject] = useState(null);
  const [envTags, setEnvTags] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    // still have to get env tags to display below project images, since project metadata only includes tag id's
    // TODO: see if there's a way to pass envTags to the project that was clicked on Portfolio Page?
    const getEnvTags = async () => {
      await contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
      .then(env => env.getTags())
      .then(tags => setEnvTags(tags.items))
      .catch(console.error);
    };

    getEnvTags();
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
        <img src={singleProject.fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
        <p className="project-desc">{singleProject.fields.projectDescription.content[0].content[0].value}</p>
        {/* in order to be accessible to the CDA client, tags must be made public when being created in Contentful */}
        <ul className="project-tags">
          {
            singleProject.metadata.tags.map(projectTag => { 
              // match environment tag id to project tag id, then display environment tag's name
              let filteredEnvTags = envTags.filter(envTag => envTag.sys.id === projectTag.sys.id);
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

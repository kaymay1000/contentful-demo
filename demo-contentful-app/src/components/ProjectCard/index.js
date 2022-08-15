import { useEffect, useState } from 'react';
import { contentfulManagementClient } from '../../contentfulClients';
import { Link } from 'react-router-dom';
import './project-card.scss';

const ProjectCard = (project) => {

  const [envTags, setEnvTags] = useState([]);
  const [convertedProjectTags, setConvertedProjectTags] = useState([]);

  let fields = project.project.fields;
  let projectTags = project.project.metadata.tags;

  useEffect(() => {
    const getEnvTags = async () => {
      await contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
      .then(env => env.getTags())
      .then(tags => setEnvTags(tags.items))
      .catch(console.error);
    };

    getEnvTags();
  }, []);

  useEffect(() => {
    let converted = projectTags.map(projectTag => {
        return envTags.filter(envTag => envTag.sys.id === projectTag.sys.id);
    });

    setConvertedProjectTags(converted);
  }, []);

  return (
    <div className="project-card-wrapper">
      <h1 className="project-title">{fields.projectTitle}</h1>
      <Link to={'/all-projects/' + fields.slug}>
        <img src={fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
      </Link>
      <p className="project-desc">{fields.projectDescription.content[0].content[0].value}</p>
      {/* in order to be accessible to the CDA client, tags must be made public when being created in Contentful */}
      <ul className="project-tags">
        {convertedProjectTags.map(tag => {
          console.log('tag object in final return: ', tag);
          // return <li className="tag" key={tag[0].name}>{tag[0].name}</li>
        })}
      </ul>
    </div>
  )
}

export default ProjectCard;


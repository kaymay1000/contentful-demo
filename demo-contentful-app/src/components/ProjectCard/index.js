import { Link } from 'react-router-dom';
import './project-card.scss';

const ProjectCard = (props) => {

  let {project, envTags} = props;

  let fields = project.fields;
  let projectTags = project.metadata.tags;

  return (
    <div className="project-card-wrapper flex-col">
      <h1 className="project-title">{fields.projectTitle}</h1>
      <Link to={'/all-projects/' + fields.slug} className="project-cover-image-link">
        <img src={fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
      </Link>
      <p className="project-desc">{fields.projectDescription.content[0].content[0].value}</p>
      {/* in order to be accessible to the CDA client, tags must be made public when being created in Contentful */}
      <ul className="project-tags flex justify-center">
        {
          projectTags.map(projectTag => { 
            let filteredEnvTags = envTags.filter(envTag => envTag.sys.id === projectTag.sys.id);

            return filteredEnvTags.map(filteredTag => {
              return <li className="tag" key={filteredTag.name}>{filteredTag.name}</li>
            })
          })
        }
      </ul>
    </div>
  )
}

export default ProjectCard;

import { Link } from 'react-router-dom';
import './project-card.scss';

const ProjectCard = (project) => {
  let fields = project.project.fields;
  let tags = project.project.metadata.tags;
  // console.log('project: ', project);

  return (
    <div className="project-card-wrapper">
      <h1 className="project-title">{fields.projectTitle}</h1>
      <Link to={'/all-projects/' + fields.slug}>
        <img src={fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
      </Link>
      <p className="project-desc">{fields.projectDescription.content[0].content[0].value}</p>
      {/* in order to be accessible to the CDA client, tags must be made public when being created in Contentful */}
      <ul className="project-tags">
      {tags.map((tag, index) => {
        // console.log('tag: ', tag);
        return <li className="tag" key={index}>{tag.sys.id}</li>
      })}
      </ul>
    </div>
  )
}

export default ProjectCard;


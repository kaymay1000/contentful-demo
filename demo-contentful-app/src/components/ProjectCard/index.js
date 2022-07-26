import './project-card.scss';

const ProjectCard = (project) => {
  console.log('project: ', project);
  let fields = project.project.fields;
  let tags = project.project.metadata.tags;


  return (
    <div className="project-wrapper">
      <h1 className="project-title">{fields.projectTitle}</h1>
      <img src={fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
      <p className="project-desc">{fields.projectDescription.content[0].content[0].value}</p>
      {/* in order to be accessible to the CDA client, tags must be made public when being created in Contentful */}
      <ul>
      {tags.map((tag, index) => {
        return <li className="tag" key={index}>{tag.sys.id}</li>
      })}
      </ul>
    </div>
  )
}

export default ProjectCard;


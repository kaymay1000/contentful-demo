import '../../App.css';

const ProjectCard = (project) => {
  let fields = project.project.fields;
  
  return (
    <div className="project-wrapper">
      <h1 className="project-title">{fields.projectTitle}</h1>
      <img src={fields.projectImages[0].fields.file.url} className="project-cover-image" alt="logo"/>
      <p className="project-desc">{fields.projectDescription.content[0].content[0].value}</p>
    </div>
  )
}

export default ProjectCard;


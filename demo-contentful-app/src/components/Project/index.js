import '../../App.css';

const Project = (props) => {
  const { title, description, coverImage } = props;
  return (
    <div className="project-wrapper">
      <h1 className="project-title">{title}</h1>
      <img src={coverImage} className="project-cover-image" alt="logo"/>
      <p className="project-desc">{description}</p>
    </div>
  )
}

export default Project;

import '../../App.css';
import { useState, useEffect } from 'react';

// this var name must be 'query' per Contentful's GraphQL API docs
// https://www.contentful.com/developers/docs/references/graphql/#/introduction/http-methods
const query = `
{
  project(id: "4SkcJwNH5fIJEQxvdf6r9B") {
    sys {
      id
    }
    projectTitle
    projectDescription {
      json
    }
    projectImagesCollection {
      items {
        title
        description
        fileName
        url
      }
    }
  }
}
`;

const Project = (props) => {

  const [project, setProject] = useState(null);
  const { title, description, coverImage, projectId } = props;

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authenticate the request
          "Authorization": `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({data, errors}) => {
        if (errors) { console.error(errors) }

        // rerender the entire component with new data
        setProject(data.project);
        console.log('data.project: ', data.project);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!project) {
    return <p className="loading">Loading...</p>;
  }

  const renderProject = () => {
    return (
      <div className="project-wrapper">
        <h1 className="project-title">{title}</h1>
        <a><img src={coverImage} className="project-cover-image" alt="logo"/></a>
        <p className="project-desc">{description}</p>
      </div>
    )
  }

  return renderProject();
}

export default Project;

import './App.css';
import { useState, useEffect } from 'react';

// const query = `
// {
//   project(id: "4SkcJwNH5fIJEQxvdf6r9B") {
//     projectTitle
//     projectDescription {
//       json
//     }
//     projectImagesCollection {
//       items {
//         title
//         description
//         fileName
//         url
//       }
//     }
//   }
// }
// `;

const query = `
{
  projectCollection {
    total
    items {
      projectTitle
      projectDescription {
        json 
      }
      projectImagesCollection {
        items {
          description
          url
        }
      }
    }
  }
}
`;

function App() {
  // const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState(null);

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
        // setProject(data.project);
        setAllProjects(data.projectCollection.items);
        console.log('data.projectCollection: ', data.projectCollection.items);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!allProjects) {
  // if (!allProjects) {
    return <p className="loading">Loading...</p>;
  }

  const renderProjects = () => {
    return allProjects.map(project => (
      <div className="project-wrapper" key={project.projectTitle}>
        <h1 className="project-title">{project.projectTitle}</h1>
        <img src={project.projectImagesCollection.items[0].url} className="project-cover-image" alt="logo" />
        <p className="project-desc">{project.projectDescription.json.content[0].content[0].value}</p>
      </div>
        
    ))
  }

  return (
    <div className="App">
      <header className="App-header">Interior Design Portfolio</header>
      {/* <h1>{project.projectTitle}</h1>
      <img src={project.projectImagesCollection.items[0].url} className="project-cover-image" alt="logo" />
      <p>{project.projectDescription.json.content[0].content[0].value}</p> */}
      <div className="projects-wrapper">{renderProjects()}</div>
    </div>
  );
}

export default App;

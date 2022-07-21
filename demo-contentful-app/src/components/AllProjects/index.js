import '../../App.css';
import Project from '../Project';
import { useState, useEffect } from 'react';

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

const AllProjects = () => {

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
        setAllProjects(data.projectCollection.items);
        console.log('data.projectCollection: ', data.projectCollection.items);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!allProjects) {
    return <p className="loading">Loading...</p>;
  }

  const renderProjects = () => {
    return allProjects.map(project => (
      <Project 
        title={project.projectTitle} 
        description={project.projectDescription.json.content[0].content[0].value} 
        coverImage={project.projectImagesCollection.items[0].url}
        key={project.projectTitle}
      >
      </Project>
    ))
  }

  return (
      <div className="projects-wrapper">{renderProjects()}</div>
  );
}

export default AllProjects;

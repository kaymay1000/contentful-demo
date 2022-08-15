import { useState, useEffect } from 'react';
import { contentfulDeliveryClient, contentfulManagementClient } from '../contentfulClients';
import ProjectCard from '../components/ProjectCard';
import './all-projects.scss';
import '../App.scss';

const AllProjectsPage = () => {

  const [allTags, setAllTags] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);

  const handleFilterChange = (event) => {
    let currentFltrs = currentFilters;
    let clickedFilter = event.target.id;
    let clicked = currentFltrs.indexOf(clickedFilter);
    
    if (clicked > -1) {
      // if clickedFilter already exists selectedFilters, it must have been unchecked, so remove it
      currentFltrs.splice(clicked, 1);
    } else {
      // otherwise, clickedFilter didn't exist in selectedFilters, so add it
      currentFltrs.push(clickedFilter);
    }

    setCurrentFilters(currentFltrs);
    filterProjects();
  };

  const filterProjects = () => {

    let projectsToDisplay = [];
    let currentFltrs = currentFilters;
    
    allProjects.filter(project => {
      
        // TODO: figure out AND logic
        // if (project.metadata.tags.every(tag => filters.includes(tag))) {
        //   projectsToDisplay.push(project);
        // }

        // OR logic
        project.metadata.tags.map(tag => {
            if (!projectsToDisplay.includes(project)) {
              console.log('current filters list inside project map: ', currentFltrs)
              if (currentFltrs.includes(tag.sys.id)) {
                console.log('tag.sys.id: ', tag);
                console.log('project inside of includes: ', project);
                projectsToDisplay.push(project);
              }
            }
        });
    });

    console.log('projects to display end of filter: ', projectsToDisplay);

    if (currentFilters.length === 0) {
       setCurrentProjects(allProjects);
    }
    else {
      setCurrentProjects(projectsToDisplay)
    }
  }
  
  useEffect(() => {
    const getAllProjects = async () => {
      await contentfulDeliveryClient.getEntries({content_type: 'project'})
      .then(response => {
        setAllProjects(response.items)
        setCurrentProjects(response.items)
      })
      .catch(error => console.log('Error getting all projects: ', error));
    };

    const getAllTags = async () => {
      await contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
      .then((env) => env.getTags())
      .then(tags => setAllTags(tags.items))
      .catch(console.error);
    };

    getAllProjects();
    getAllTags();
  }, []); // empty dependency array since this should only run once (on page load/when component mounts)

  return (
    <div className="all-projects-page-wrapper page-wrapper">
      <div className="filters-wrapper">
        {allTags.map((tag, index) => {
          return (
            <div key={index}>
              <input
                multiple
                placeholder="Filter projects"
                id={tag.name}
                type="checkbox"
                onChange={handleFilterChange}
              />
              <label htmlFor={tag.name}>{tag.name}</label>
            </div>
          )
        })}
      </div>

      <div className="projects-wrapper">
        { 
          currentProjects.map((project, index) => {
            return <ProjectCard project={project} key={index} />
          })
        }
      </div>
    </div>
  )
}

export default AllProjectsPage;

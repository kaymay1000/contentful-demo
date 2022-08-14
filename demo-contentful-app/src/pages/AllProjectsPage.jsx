import { useState, useEffect } from 'react';
import { contentfulDeliveryClient, contentfulManagementClient } from '../contentfulClients';
import ProjectCard from '../components/ProjectCard';
import './all-projects.scss';
import '../App.scss';

const AllProjectsPage = () => {

  const [allTags, setAllTags] = useState([]);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);

  const handleFilterChange = (event) => {
    let currentFltrs = currentFilters;
    let clickedFilter = event.target.id;
    let clicked = currentFltrs.indexOf(clickedFilter);
    console.log('clicked filter: ', clickedFilter);
    
    if (clicked > -1) {
      // if clickedFilter already exists selectedFilters, it must have been unchecked, so remove it
      currentFltrs.splice(clicked, 1);
    } else {
      // otherwise, clickedFilter didn't exist in selectedFilters, so add it
      currentFltrs.push(clickedFilter);
      console.log('current filters array: ', currentFltrs);
    }

    setCurrentFilters(currentFltrs);
    filterProjects(currentFilters);
  };

  const filterProjects = (filters) => {
    console.log('selectedFilters coming into filter projects: ', filters);
    let projectsToDisplay = [];
    
    currentProjects.filter(project => {
      console.log('projects to display inside filter: ', projectsToDisplay)
        // TODO: figure out AND logic
        // if (project.metadata.tags.every(tag => filters.includes(tag))) {
        //   projectsToDisplay.push(project);
        // }

        // OR logic
        project.metadata.tags.map(tag => {
            if (!projectsToDisplay.includes(project)) {
              if (filters.includes(tag.sys.id)) {
                projectsToDisplay.push(project);
              }
            }
        });
    });

    setCurrentProjects(projectsToDisplay);
    return projectsToDisplay;
  }


  useEffect(() => {
    const getAllProjects = async () => {
      await contentfulDeliveryClient.getEntries({content_type: 'project'})
      .then(response => setCurrentProjects(response.items))
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


  // useEffect(() => {
  //   const filterProjects = (filters) => {
  //     console.log('selectedFilters coming into filter projects: ', filters);
  //     let projectsToDisplay = [];
      
  //     currentProjects.filter(project => {
  //       console.log('projects to display inside filter: ', projectsToDisplay)
  //         // TODO: figure out AND logic
  //         // if (project.metadata.tags.every(tag => filters.includes(tag))) {
  //         //   projectsToDisplay.push(project);
  //         // }

  //         // OR logic
  //         project.metadata.tags.map(tag => {
  //             if (!projectsToDisplay.includes(project)) {
  //               if (filters.includes(tag.sys.id)) {
  //                 projectsToDisplay.push(project);
  //               }
  //             }
  //         });
  //     });

  //     setCurrentProjects(projectsToDisplay);
  //     return projectsToDisplay;
  //   }

  //   filterProjects(currentFilters);
  // }, [currentFilters]);

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
        {currentProjects.map((project, index) => {
          return <ProjectCard project={project} key={index}/>
        })}
      </div>

    </div>
  )
}

export default AllProjectsPage;

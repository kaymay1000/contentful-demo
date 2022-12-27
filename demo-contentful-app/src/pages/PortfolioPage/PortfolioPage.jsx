import { useState, useEffect } from 'react';
import { contentfulDeliveryClient, contentfulManagementClient } from '../../contentfulClients';
import ProjectCard from '../../components/ProjectCard';
import Filter from '../../components/Filter';
import './portfolio-page.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter, faXmark} from '@fortawesome/free-solid-svg-icons';

const PortfolioPage = () => {

  const [envTags, setEnvTags] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      await contentfulDeliveryClient.getEntries({content_type: 'project'})
      .then(response => {
        setAllProjects(response.items)
        setCurrentProjects(response.items)
      })
      .catch(error => console.log('Error getting all projects: ', error));
    };

    // have to get all environment tags since a given project's metadata only includes tag id's, not readable tag names
    const getEnvTags = async () => {
      await contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then(space => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
      .then(env => env.getTags())
      .then(tags => setEnvTags(tags.items))
      .catch(console.error);
    };

    getAllProjects();
    getEnvTags();
  }, []); // empty dependency array since this should only run once (on page load/when component mounts)

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
      
        // TODO: figure out AND logic (matches many)
        // if (project.metadata.tags.every(tag => filters.includes(tag))) {
        //   projectsToDisplay.push(project);
        // }

        // OR logic (matches one)
        project.metadata.tags.map(tag => {
            if (!projectsToDisplay.includes(project)) { // prevent duplicates from displaying
              if (currentFltrs.includes(tag.sys.id)) {
                projectsToDisplay.push(project);
              }
            }
        });
    });

    if (currentFilters.length === 0) {
       setCurrentProjects(allProjects);
    }
    else {
      setCurrentProjects(projectsToDisplay)
    }
  }

  const toggleFilters = () => {
    let filters = document.getElementById('filters-wrapper');
    let filtersButton = document.getElementById('toggle-filters-button');
    let closeButton = document.getElementById('toggle-close-button');

    if (filters.style.display === 'none') {
      filters.style.display = 'flex';
      filters.style.justifyContent = 'center';
      filtersButton.style.display = 'none';
      closeButton.style.display = 'block';
    } else {
      filters.style.display = 'none';
      filtersButton.style.display = 'block';
      closeButton.style.display = 'none';
    }
  }

  // TODO: refactor hide/show logic to use use state
  const defaultStyles = {
    display: 'none',
  }

  return (
    <div className="portfolio-page-wrapper page-wrapper">
      <h1 className="page-title">All Projects</h1>
      <button id="toggle-filters-button" className="filter-button" onClick={toggleFilters}><FontAwesomeIcon icon={faFilter}/></button>
      <button id="toggle-close-button" className="filter-button" style={defaultStyles} onClick={toggleFilters}><FontAwesomeIcon icon={faXmark}/></button>
      <div id="filters-wrapper" className="filters-wrapper" style={defaultStyles}>
        {
          envTags.map((tag, index) => {
            return <Filter key={index} tag={tag} handleFilterChange={handleFilterChange} />
          })
        }
      </div>
      <div className="projects-wrapper flex justify-around">
        {
          currentProjects.map((project, index) => {
            return <ProjectCard key={index} project={project} envTags={envTags} />
          })
        }
      </div>
    </div>
  )
}

export default PortfolioPage;

import { useState, useEffect } from 'react';
import { contentfulDeliveryClient, contentfulManagementClient } from '../contentfulClients';
import ProjectCard from '../components/ProjectCard';
import './all-projects.scss';
import '../App.scss';

const AllProjectsPage = () => {

  const [allTags, setAllTags] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const getAllProjects = async () => {
    let projects = await contentfulDeliveryClient.getEntries({content_type: 'project'})
      // .then(response => setAllProjects(response.items))
      .then(response => {
        // console.log('response: ', response);
        setFilteredProjects(response.items);
      })
    
      .then(console.log('all project async: ', allProjects))
      // TODO: figure out error
      .catch(error => console.log('Error getting all projects: ', error));

      return projects;
  }

  const getAllTags = async () => {
    await contentfulManagementClient.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment(process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID))
      .then((env) => env.getTags())
      .then(tags => setAllTags(tags.items))
      .catch(console.error);
  }

  const handleFilterChange = (clickedFilter) => {
  //  TODO (?): if no filters chosen, return default filteredProjects array with all projects in it, or allProducts array
    // if (!selectedFilters) return filteredProjects;

    console.log('clickedFilter: ', clickedFilter);

    let filterIndex = selectedFilters.indexOf(clickedFilter);

    if (filterIndex > -1) {
      // if clickedFilter already exists selectedFilters, it must have been unchecked, so remove it
      selectedFilters.splice(filterIndex, 1);
    } else { 
      // otherwise, clickedFilter didn't exist in selectedFilters, so add it
      selectedFilters.push(clickedFilter);
    }
    setSelectedFilters(selectedFilters);
    filterProjects(selectedFilters);
  };

    const filterProjects = (selectedFilters) => {

    // if(allProjects.length === 0) {setAllProjects(filteredProjects)}
    // console.log('all projects at top of filterProjects: ', allProjects);
    // if(selectedFilters.length === 0) { setFilteredProjects(allProjects) };
    // console.log('filter list coming into filterProjects: ', selectedFilters);

    let projectsToDisplay = [];
    
    filteredProjects.filter(project => {
      project.metadata.tags.map(tag => {
          if (selectedFilters.includes(tag.sys.id)) {
            projectsToDisplay.push(project);
          }
      });
    });

    setFilteredProjects(projectsToDisplay);
    return projectsToDisplay;
  }

  useEffect(()=> {
    getAllProjects();
    getAllTags();
  }, []); // empty dependency array since this should only run once (on page load/when component mounts)

  // useEffect(() => {
  //   filterProjects(selectedFilters);
  // }, selectedFilters)

  // if (!filteredProjects) return allProjects.map((project, index) => <ProjectCard project={project} key={index}></ProjectCard>)

  return (
    <div className="all-projects-page-wrapper page-wrapper">
      <div className="filters-wrapper">
        <div className="all-filters">
          {allTags.map((tag, index) => {
            return (
              <div key={index}>
                <label htmlFor={tag.name}>{tag.name}</label>
                <input
                    type="checkbox"
                    name="filters"
                    id="filter-select"
                    value={tag.name}
                    onClick={() => handleFilterChange(tag.name)}
                    selected={selectedFilters.includes(tag.name)}
                  >
                </input>
              </div>
            )
          })}
        </div>
      </div>
      <div className="projects-wrapper">

        {/* {selectedFilters.length !== 0 ?
          filteredProjects.map((project, index) => {
            return <ProjectCard project={project} key={index}/>
          }) :
          allProjects.map((project, index) => {
            return <ProjectCard project={project} key={index}/>
          })
        } */}

        {filteredProjects.map((project, index) => {
            return <ProjectCard project={project} key={index}/>
        })}
      </div>

    </div>
  )
}

export default AllProjectsPage;

const useContentful = () => {

  const client = require('contentful').createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  });

  const getAllProjects = async () => {
    try {
      const entries = await client.getEntries({content_type: 'project'});
      return entries
    } catch (error) {
      console.log('Error fetching all projects: ', error);
    }
  }

  const getSingleProject = async (slug) => {
    try {
      const project = await client.getEntry({'fields.slug': slug, content_type: 'project'});
      return project
    } catch (error) {
      console.log('Error fetching single project: ', error);
    }
  }
  
  return { getAllProjects, getSingleProject }
}

export default useContentful;

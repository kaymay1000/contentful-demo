// import { useState, useEffect } from 'react';
// import useContentful from './useContentful';

// const useSingleProject = (slug) => {
//   const { getSingleProject } = useContentful();
//   const clickedProject = getSingleProject(slug);

//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     console.log('slug: ', slug);
//     clickedProject.then(response => {
//         console.log('response in project: ', response)
//         setProject(response[0].fields)
//     });
//   });

//   return project;
// }

// export default useSingleProject;

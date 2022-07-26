 // the "contentful" package is a JS library that allows interaction with Contentful's Content Delivery API 
 // and Content Preview API (NOT the Content Management API)
 export const contentfulClient = require('contentful').createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  });

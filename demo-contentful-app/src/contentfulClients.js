// The "contentful" package is a JS library that allows interaction with Contentful's Content Delivery API (CDA)
// and Content Preview API (CPA). It does NOT allow interaction with the Content Management API (CMA).
const contentfulDeliveryClient = require('contentful').createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_CDA_TOKEN
});

// The contentful-management package is a JS library that allows interaction with Contentful's Content Management API (CMA).
const contentfulManagementClient = require('contentful-management').createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_CMA_TOKEN
})

export { contentfulDeliveryClient, contentfulManagementClient }

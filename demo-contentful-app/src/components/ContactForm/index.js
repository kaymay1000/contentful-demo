const ContactForm = () => {

  const iframeStyles = {
    'width': '100%',
    'minHeight': '725px',
    'border': 'none',
    'margin': '0 auto'
  }


  return (
    <div className="jotform-wrapper flex">
      <iframe src="https://form.jotform.com/222314719698162" title="Jotform iFrame" className="jotform-iframe" style={iframeStyles}></iframe>
    </div>
  )
}

export default ContactForm;

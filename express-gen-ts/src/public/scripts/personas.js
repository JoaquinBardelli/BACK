// **** Variables **** //

const DateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  const formatDate = (date) => DateFormatter.format(new Date(date));
  
  
  // **** Run **** //
  
  // Start
 displayPersonas();
  
  /**
   * Call api
   */
  function displayPersonas() {
    Http
      .get('/api/personas/all')
      .then(resp => resp.json())
      .then(resp => {
        var allPersonasTemplate = document.getElementById('all-personas-template'),
          allPersonasTemplateHtml = allPersonasTemplate.innerHTML,
          template = Handlebars.compile(allPersonasTemplateHtml);
        var allUsersAnchor = document.getElementById('all-personas-anchor');
        allPersonasAnchor.innerHTML = template({
          personas: resp.personas.map(persona => ({
            ...persona,
            createdFormatted: formatDate(persona.created),
          })),
        });
      });
  }
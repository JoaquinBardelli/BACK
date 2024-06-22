// **** Variables **** //

const DateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  const formatDate = (date) => DateFormatter.format(new Date(date));
  
  
  // **** Run **** //
  
  // Start
  displayComidas();
  
  /**
   * Call api
   */
  function displayComidas() {
    Http
      .get('/api/comidas/all')
      .then(resp => resp.json())
      .then(resp => {
        var allComidasTemplate = document.getElementById('all-comidas-template'),
          allComidasTemplateHtml = allComidasTemplate.innerHTML,
          template = Handlebars.compile(allComidasTemplateHtml);
        var allComidasAnchor = document.getElementById('all-comidas-anchor');
        allComidasAnchor.innerHTML = template({
          comidas: resp.comidas.map(comida => ({
            ...comida,
            createdFormatted: formatDate(comida.created),
          })),
        });
      });
  }
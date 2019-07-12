describe('Jugar test', () => {

    beforeEach("Cargar la pagina", () => {
      cy.visit("/")
    });
      
      it('Si_me_logueo_con_un_usuario_existente_y_con_una_fabrica_deberia_poder_acceder_a_la_fabrica', () => {
        
        //SETUP
        const usuario_existente = 'nidoran';
        cy.request("DELETE", "/api/"+usuario_existente);
        cy.request("GET", "/api/"+usuario_existente);
        const ganancias = 50000;
        const nombreFabrica = "Workshop";
        const body = {
          id_fabrica:1, 
          nombre: nombreFabrica,
          ganancias: ganancias,
          celdas:[]
        };
        cy.request("POST", "/api/"+usuario_existente+"/fabrica", body);

        cy.contains('Wayne\'s Tech');
        cy.get('.LoginPage');
        cy
        .get('input')
        .type(usuario_existente)
        .should('have.value', 'nidoran');

        cy.get('button').click();
        cy.get('.crear-fabrica-form');
        cy.get('.crearFabrica');
        cy.get(".UsuarioFabricaPage").should("not.contain", 'Ooh! No tenes ni una fabrica, create una viteh!');
        cy.get('.UsuarioFabricaPage').find('div').should('have.length', 1)
        cy.get('.UsuarioFabricaPage').find('div').click();
        cy.get('.grilla');
        cy.get('.Container');
        cy.get('.ToolBox');
        //TEARDOWN
        cy.request("DELETE", "/api/"+usuario_existente);
      });
      
  
});
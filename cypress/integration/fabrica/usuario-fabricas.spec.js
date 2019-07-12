describe('Crear Fabrica test', () => {

    beforeEach("Cargar la pagina", () => {
      cy.visit("/")
    });
  
    it('Si_me_logueo_con_un_usuario_existente_y_sin_fabricas_deberia_crear_una', () => {
        //SETUP
        const usuario_existente = 'nidoran';
        cy.request("DELETE", "/api/"+usuario_existente);
        cy.request("GET", "/api/"+usuario_existente);
        const fabricaNombre = "Rocklets";

        cy.contains('Wayne\'s Tech');
        cy.get('.LoginPage');
        cy
        .get('input')
        .type(usuario_existente)
        .should('have.value', 'nidoran');
        //EXECUTE
        cy.get('button').click();
        cy.contains('Ooh! No tenes ni una fabrica, create una viteh!');
        cy
        .get('input')
        .type(fabricaNombre)
        .should('have.value', "Rocklets");
        //EXECUTE
        cy.get('button').click();
        cy.get(".UsuarioFabricaPage").should("not.contain", 'Ooh! No tenes ni una fabrica, create una viteh!');
        cy.get('.UsuarioFabricaPage').find('div').should('have.length', 1)
        //TEARDOWN
        cy.request("DELETE", "/api/"+usuario_existente);
      });

      
      it('Si_me_logueo_con_un_usuario_existente_y_con_una_fabrica_deberia_crear_una_e_incrementar_num_fabricas', () => {
        
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
        const fabricaNombre = "Rocklets";

        cy.contains('Wayne\'s Tech');
        cy.get('.LoginPage');
        cy
        .get('input')
        .type(usuario_existente)
        .should('have.value', 'nidoran');
        //EXECUTE
        cy.get('button').click();
        cy.get(".UsuarioFabricaPage").should("not.contain", 'Ooh! No tenes ni una fabrica, create una viteh!');
        cy
        .get('input')
        .type(fabricaNombre)
        .should('have.value', "Rocklets");
        //EXECUTE
        cy.get('button').click();
        cy.get('.UsuarioFabricaPage').find('div').should('have.length', 2)
        //TEARDOWN
        cy.request("DELETE", "/api/"+usuario_existente);
      });
      
  
});
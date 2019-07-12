describe('Login test', () => {

  beforeEach("Cargar la pagina", () => {
    cy.visit("/")
  });

  it('Al_entrar_a_la_pantalla_de_login_deberia_ver_los_elementos_de_login', () => {
    cy.contains('Wayne\'s Tech');
    cy.get('.LoginPage');
    cy.get('.login-form');
    cy
    .get('input')
    .and('have.value', '');
    cy
    .get('button')
    .should('disabled');
  });

  it('Si_me_logueo_con_un_usuario_inexistente_deberia_crearlo_e_ingresar_y_no_mostrarme_fabricas', () => {
    //SETUP
    const usuario_inexistente = 'nidoran2';
    cy.request("DELETE", "/api/"+usuario_inexistente);
    cy.contains('Wayne\'s Tech');
    cy.get('.LoginPage');
    cy
    .get('input')
    .type(usuario_inexistente)
    .should('have.value', 'nidoran2');
    //EXECUTE
    cy.get('button').click();
    cy.contains('Ooh! No tenes ni una fabrica, create una viteh!');
    cy
    .get('input')
    .should('have.value', '');
    //TEARDOWN
    cy.request("DELETE", "/api/"+usuario_inexistente);

  });

  it('Si_me_logueo_con_un_usuario_existente_deberia_ingresar_y_mostrarme_sus_fabricas', () => {
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
    //EXECUTE
    cy.get('button').click();
    cy.get(".UsuarioFabricaPage").should("not.contain", 'Ooh! No tenes ni una fabrica, create una viteh!');
    cy
    .get('input')
    .should('have.value', '');
    //TEARDOWN
    cy.request("DELETE", "/api/"+usuario_existente);
  });

});
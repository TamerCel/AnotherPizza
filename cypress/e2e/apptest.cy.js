describe('FirstButton Component Tests', () => {
    
  beforeEach(() => {
      cy.visit('http://localhost:5173'); 
  });
  
  it('Buton render ediliyor mu?', () => {
      cy.get('[data-cy="test-acıktım-button"]') 
          .should('exist')                    
          .should('be.visible')               
          .contains('ACIKTIM');                
  });
        
  it('Header logosu var mı?', () => {
    cy.get('[data-cy="test-acıktım-button"]').click(); 
      cy.get('[data-cy="test-header-logo"]') 
          .should('exist')                    
          .should('be.visible');               
  });
});

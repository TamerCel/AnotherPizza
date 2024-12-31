describe('Pizza Uygulaması Testleri', () => {
  beforeEach(() => {
    // Uygulamayı başlat
    cy.visit('/');
  });

  it('Ana sayfa düzgün yükleniyor mu?', () => {
    // Ana sayfadaki "ACIKTIM" butonunu kontrol et
    cy.get('[data-cy="home-acik"]').should('be.visible');
    cy.get('[data-cy="home-acik"]').contains('ACIKTIM');
  });

  it('Sipariş sayfasına yönlendirme çalışıyor mu?', () => {
    // "ACIKTIM" butonuna tıklayıp sipariş sayfasına git
    cy.get('[data-cy="home-acik"]').click();

    // Sipariş sayfasının yüklendiğini kontrol et
    cy.get('[data-cy="order-control"]').should('be.visible');
  });

  it('Pizza siparişi oluşturulabiliyor mu?', () => {
    // Sipariş sayfasına geçiş
    cy.get('[data-cy="home-acik"]').click();

    // Boyut seçimi
    cy.get('[data-cy="size-orta"]').check();

    // Hamur seçimi
    cy.get('[data-cy="dough-select"]').select('normal');

    // Malzeme seçimi (en az 4 tane)
    cy.get('[data-cy="extra-checkbox-Pepperoni"]').check();
    cy.get('[data-cy="extra-checkbox-Sosis"]').check();
    cy.get('[data-cy="extra-checkbox-Jambon"]').check();
    cy.get('[data-cy="extra-checkbox-Tavuk"]').check();

    // İsim girişi
    cy.get('[data-cy="username-input"]').type('Tamer');

    // Siparişi tamamla
    cy.get('[data-cy="submit-order"]').click();

    // Başarı sayfasına geçişi kontrol et
    cy.get('[data-cy="success-page"]').should('be.visible');
    cy.get('[data-cy="success-congratulations"]').should('contain', 'TEBRİKLER!');
  });

  it('Başarı sayfasından anasayfaya dönülüyor mu?', () => {
    // Sipariş oluşturma adımları
    cy.get('[data-cy="home-acik"]').click();
    cy.get('[data-cy="size-orta"]').check();
    cy.get('[data-cy="dough-select"]').select('normal');
    cy.get('[data-cy="extra-checkbox-Pepperoni"]').check();
    cy.get('[data-cy="extra-checkbox-Sosis"]').check();
    cy.get('[data-cy="extra-checkbox-Jambon"]').check();
    cy.get('[data-cy="extra-checkbox-Tavuk"]').check();
    cy.get('[data-cy="username-input"]').type('Tamer');
    cy.get('[data-cy="submit-order"]').click();

    // Başarı sayfasından anasayfaya dön
    cy.get('[data-cy="back-to-home"]').click();

    // Ana sayfanın tekrar yüklendiğini kontrol et
    cy.get('[data-cy="home-acik"]').should('be.visible');
  });
});

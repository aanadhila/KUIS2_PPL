const credentials = {
  email: "annisa@google.com",
  password: "password"
 };

 const login = (credentials) => {
      cy.get("input[name=email]").type(credentials.email);
      cy.get("input[name=password]").type(credentials.password).type("{enter}"); 
      cy.get("button[class='swal-button swal-button--confirm']").type('{enter}');
 
 }


describe('Malangsnack item & cart', () => {
  beforeEach('Visit website malangsnack', () => {
    cy.visit("https://malangsnack.000webhostapp.com/index.php?page=login");
    login(credentials)
    cy.location("pathname").should("include", "/index.php");
    // cy.get('a[class="brand-logo"]').click();
    // cy.url().should(
    //     'equal',
    //     'https://malangsnack.000webhostapp.com/index.php?page=main&content=home',
    //   );  
  });

  it('item', () => {
    cy.visit('https://malangsnack.000webhostapp.com/index.php?page=main&content=detail&id=14');
    cy.get("button[class='btn btn-success light']").type('{enter}');
    // cy.contains('Produk sudah ada di keranjang').should('be.visible')
    cy.contains('Berhasil tambah produk dari keranjang').should('be.visible')
    cy.wait(3000)
  });
  it('add item twice', () => {
    ////jika menambahkan item yg sama dengan item yang sudah ada di dalam keranjang
    cy.visit('https://malangsnack.000webhostapp.com/index.php?page=main&content=detail&id=23');
    cy.get("button[class='btn btn-success light']").type('{enter}');
    cy.contains('Produk sudah ada di keranjang').should('be.visible')
    // cy.contains('Berhasil tambah produk dari keranjang').should('be.visible')
    cy.wait(3000)
  });
  it('delete cart', () => {
    // menghapus dari keranjang
    cy.visit('https://malangsnack.000webhostapp.com/index.php?page=main&content=detail&id=23');
    cy.get("button[class='btn btn-success light']").type('{enter}');
    cy.visit("https://malangsnack.000webhostapp.com/index.php?page=main&content=cart");
    cy.get('button[name="deleteCart"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Apa anda yakin ingin mengosongkan keranjang?');
    });
    cy.contains('Berhasil kosongkan keranjang').should('be.visible')
    cy.wait(5000)
  })
});
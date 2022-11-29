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
    cy.visit('https://malangsnack.000webhostapp.com/index.php?page=main&content=detail&id=1');
    cy.get("button[class='btn btn-success light']").type('{enter}');
    // cy.contains('Berhasil tambah produk dari keranjang').should('be.visible')
    cy.wait(5000)
    // cy.visit("https://malangsnack.000webhostapp.com/index.php?page=main&content=home");
    //menambahkan item yg sama
    // cy.visit('https://malangsnack.000webhostapp.com/index.php?page=main&content=detail&id=1');
    // cy.get("button[class='btn btn-success light']").type('{enter}');
    // cy.contains('Produk sudah ada di keranjang').should('be.visible')
    // cy.wait(8000)
    // menghapus dari keranjang
    cy.visit("https://malangsnack.000webhostapp.com/index.php?page=main&content=cart");

    cy.get("buttton[class='btn btn-warning btn-md light mt-5 kosongkanKeranjang']").type('{enter}');
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Apa anda yakin ingin mengosongkan keranjang?');
    });
    cy.get('#confirm-answer').contains('OK');
    cy.contains('Berhasil hapus produk ke keranjang').should('be.visible')
    cy.wait(5000)
  });

});
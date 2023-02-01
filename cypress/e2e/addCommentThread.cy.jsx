describe('Add Thread spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('should display error when comment thread is empty', () => {
        cy.get('input[placeholder="Email"]').type('componentesting@gmail.com');
        cy.get('input[placeholder="Password"]').type('12345678');

        // menekan tombol Login
        cy.get('button').contains(/^LOGIN$/).click();

        cy.get('a.thread-item__title').contains(/^Halo! Selamat datang dan silakan perkenalkan diri kamu!$/).click();

        // klik tombol submit tanpa mengisi komentar input
        cy.get('button').contains(/^Submit$/).click();

        // memastikan bahwa eror komentar tidak boleh kosong muncul
        cy.get('form.comment-form>p').contains(/^Komentar tidak boleh kosong$/).should('be.visible');
    });

    it('should display the result of the discussion that has been added.', () => {
        cy.get('input[placeholder="Email"]').type('componentesting@gmail.com');
        cy.get('input[placeholder="Password"]').type('12345678');

        // menekan tombol Login
        cy.get('button').contains(/^LOGIN$/).click();

        cy.get('a.thread-item__title').contains(/^Halo! Selamat datang dan silakan perkenalkan diri kamu!$/).click();

        cy.wait(2000);
        cy.get('.ql-editor').type('Hallo! Ini contoh dari end to end testing menggunakan Cypress');

        cy.get('button').contains(/^Submit$/).click();

        // memastikan bahwa komentar yang baru ditambahkan muncul
        cy.get('div.comment-content').contains(/^Hallo! Ini contoh dari end to end testing menggunakan Cypress$/).should('be.visible');
    });
});

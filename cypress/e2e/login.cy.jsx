describe('Login spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5124/login');
    });

    it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.get('input[placeholder="Password"]').should('be.visible');
        cy.get('button').contains(/^LOGIN$/).should('be.visible');
    });

    it('should display toast when email is empty', () => {
    // klik tombol login tanpa mengisi email
        cy.get('button').contains(/^LOGIN$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('"email" is not allowed to be empty');
        });
    });

    it('should display toast when password is empty', () => {
    // mengisi email
        cy.get('input[placeholder="Email"]').type('componentesting@gmail.com');

        // klik tombol login tanpa mengisi password
        cy.get('button').contains(/^LOGIN$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('"password" is not allowed to be empty');
        });
    });

    it('should display toast when email or password are wrong', () => {
    // mengisi email
        cy.get('input[placeholder="Email"]').type('componentesting@gmail.com');

        // mengisi password yang salah
        cy.get('input[placeholder="Password"]').type('123456');

        // menekan tombol Login
        cy.get('button').contains(/^LOGIN$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('email or password is wrong');
        });
    });

    it('should display login page when email and password are correct', () => {
    // mengisi Email
        cy.get('input[placeholder="Email"]').type('componentesting@gmail.com');

        // mengisi password
        cy.get('input[placeholder="Password"]').type('12345678');

        // menekan tombol Login
        cy.get('button').contains(/^LOGIN$/).click();

        // memverifikasi bahwa elemen yang berada di homepage ditampilkan
        cy.get('button').contains(/^Tambah Diskusi$/).should('be.visible');
    });
});

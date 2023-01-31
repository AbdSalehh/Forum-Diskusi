describe('Register spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5124/register');
    });

    it('should display register page correctly', () => {
        // memverifikasi elemen yang harus tampak pada halaman register
        cy.get('input[placeholder="Name"]').should('be.visible');
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.get('input[placeholder="Password"]').should('be.visible');
        cy.get('input[placeholder="Confirm Password"]').should('be.visible');
        cy.get('button').contains(/^REGISTER$/).should('be.visible');
    });

    it('should display toast when name is empty', () => {
        // klik tombol register tanpa mengisi nama
        cy.get('button').contains(/^REGISTER$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('Nama tidak boleh kosong');
        });
    });

    it('should display toast when email is empty', () => {
        // mengisi email
        cy.get('input[placeholder="Name"]').type('Component Testing');

        // klik tombol register tanpa mengisi password
        cy.get('button').contains(/^REGISTER$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('Email tidak boleh kosong');
        });
    });

    it('should display toast when email is empty', () => {
        // mengisi email
        cy.get('input[placeholder="Name"]').type('Component Testing');

        // klik tombol register tanpa mengisi password
        cy.get('button').contains(/^REGISTER$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('Email tidak boleh kosong');
        });
    });

    it('should display toast when Password is empty', () => {
        // mengisi email
        cy.get('input[placeholder="Name"]').type('Component Testing');
        cy.get('input[placeholder="Email"]').type('componentesting1357@gmail.com');

        // klik tombol register tanpa mengisi password
        cy.get('button').contains(/^REGISTER$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('Password tidak boleh kosong');
        });
    });

    it('should display toast when Confirm Password is empty', () => {
        // mengisi email
        cy.get('input[placeholder="Name"]').type('Component Testing');
        cy.get('input[placeholder="Email"]').type('componentesting1357@gmail.com');
        cy.get('input[placeholder="Password"]').type('12345678');

        // klik tombol register tanpa mengisi password
        cy.get('button').contains(/^REGISTER$/).click();

        // memastikan bahwa eror message muncul
        cy.get('.password-error').contains(/^Konfirmasi Password tidak sesuai$/).should('be.visible');
    });

    it('should display toast when email are registered', () => {
        // mengisi email
        cy.get('input[placeholder="Name"]').type('Component Testing');
        cy.get('input[placeholder="Email"]').type('wagyu@gmail.com');
        cy.get('input[placeholder="Password"]').type('12345678');
        cy.get('input[placeholder="Confirm Password"]').type('12345678');

        // menekan tombol register
        cy.get('button').contains(/^REGISTER$/).click();

        // memverifikasi toast untuk menampilkan pesan dari API
        cy.on('toast:error', (str) => {
            expect(str).to.equal('email is already taken');
        });
    });

    it('should display login page when username and password are correct', () => {
        // mengisi Email
        cy.get('input[placeholder="Name"]').type('Component Testing');
        cy.get('input[placeholder="Email"]').type('componentesting1357@gmail.com');
        cy.get('input[placeholder="Password"]').type('12345678');
        cy.get('input[placeholder="Confirm Password"]').type('12345678');

        // menekan tombol register
        cy.get('button').contains(/^REGISTER$/).click();

        // memverifikasi bahwa elemen yang berada di login page ditampilkan
        cy.get('button').contains(/^LOGIN$/).should('be.visible');
    });
});

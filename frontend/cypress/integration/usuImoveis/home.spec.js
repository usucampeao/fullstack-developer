describe("Home page", () => {

	it("should display home title", () => {
		
		cy.visit('/');
		cy.contains("Encontre seu imóvel");
	});
});
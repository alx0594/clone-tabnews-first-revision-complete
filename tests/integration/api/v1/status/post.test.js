describe("POST api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system statys", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();
    });
  });
});

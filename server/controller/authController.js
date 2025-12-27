export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "1234") {
    return res.json({
      token: "fake-jwt-token",
      user: { id: 1, role: "admin" },
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
};

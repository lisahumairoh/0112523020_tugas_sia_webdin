
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }
 
    const [rows]: any = await db.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ?",
      [email]
    );
 
    if (rows.length === 0) {
      return res.status(401).json({ message: "Email atau password salah" });
    }
 
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
 
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email atau password salah" });
    }
 
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
    );
 
    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

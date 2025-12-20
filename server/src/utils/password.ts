import bcrypt from 'bcrypt';

const salt = 12;

const generatePassword: (password: string) => Promise<string> = async (
  password: string
) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword: (
  password: string,
  hash: string
) => Promise<boolean> = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { generatePassword, comparePassword };

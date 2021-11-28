const generateKeyError = new Error("Can't generate key from function argument");
export function generateKey(argument: any[]): string {
  try {
    return `${Array.from(argument).join(',')}`;
  } catch (error) {
    throw generateKeyError;
  }
}

export const generateUsername = (name: string): string => {
  const cleanedName = name.replaceAll(' ', '_');
  const min = Math.ceil(1);
  const max = Math.floor(99999999999999999);
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

  return `${cleanedName}_${randomId}`;
};

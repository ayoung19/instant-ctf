const getEnvironmentVariableOrThrow = (key: string) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`missing environment variable ${key}`);
  }

  return value;
};

export const env = {
  INSTANT_APP_ADMIN_TOKEN: getEnvironmentVariableOrThrow(
    "INSTANT_APP_ADMIN_TOKEN"
  ),
};

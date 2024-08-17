import dotenv from "dotenv";
dotenv.config();

type Ienv = {
  port: number | undefined;
  dbUrl: string | undefined;
  refreshTokenSecret: string | undefined;
  refreshTokenExpiresIn: string | undefined;
  accessTokenSecret: string | undefined;
  accessTokenExpiresIn: string | undefined;
  bcrypt: string | undefined;
  nodeEnv: string | undefined;
  apiKey: string | undefined;
  cloudinary: {
    cloudName: string | undefined;
    apiKey: string | undefined;
    apiSecreat: string | undefined;
    apiURL: string | undefined;
  };
};

const envConfig: Ienv = {
  port: parseInt(process.env.PORT || "5000", 10),
  dbUrl: process.env.DB_URL,
  refreshTokenSecret: process.env.refresh_token_secret,
  refreshTokenExpiresIn: process.env.refresh_token_expiresIn,
  accessTokenSecret: process.env.access_token_secret,
  accessTokenExpiresIn: process.env.access_token_expireIn,
  bcrypt: process.env.BCRYPT_SALT_ROUNDS,
  nodeEnv: process.env.NODE_ENV,
  apiKey: process.env.API_KEY,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecreat: process.env.CLOUDINARY_API_SECRET,
    apiURL: process.env.CLOUDINARY_URL,
  },
};

export default envConfig;

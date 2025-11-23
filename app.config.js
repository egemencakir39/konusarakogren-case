import 'dotenv/config';

export default {
  expo: {
    name: "appname",
    slug: "appname",
    extra: {
      HF_TOKEN: process.env.HF_TOKEN
    }
  }
};
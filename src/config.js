const Config = () => {
  if (process.env.NODE_ENV == "development") {
    return {
      API: {
        THREETER_API_ENDPOINT: "http://localhost:8080/",
      },
    };
  } else if (process.env.NODE_ENV == "production") {
    return {
      API: {
        THREETER_API_ENDPOINT: "http://18.181.45.23:8080/",
      },
    };
  }
};
export const config = Config().API;

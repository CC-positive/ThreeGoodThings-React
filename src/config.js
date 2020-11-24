const Config = () => {
  if (process.env.REACT_APP_ENV == "development") {
    return {
      API: {
        THREETER_API_ENDPOINT: "http://localhost:8080/",
      },
    };
  } else if (process.env.REACT_APP_ENV == "production") {
    return {
      API: {
        THREETER_API_ENDPOINT: "http://threetter.tk:8080/",
      },
    };
  }
};
export const config = Config().API;

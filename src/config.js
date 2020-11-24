const Config = () => {
  const ENVIRONMENT = process.env.REACT_APP_ENV || "development";
  if (ENVIRONMENT == "development") {
    return {
      API: {
        THREETER_API_ENDPOINT: "http://localhost:8080/",
      },
    };
  } else if (ENVIRONMENT == "production") {
    return {
      API: {
        THREETER_API_ENDPOINT: "http://threetter.tk:8080/",
      },
    };
  }
};
export const config = Config().API;

export const demoService = async () => {
  return {
    time: Date.now(),
    msg: "Hello from Koa service (JS)",
  };
};

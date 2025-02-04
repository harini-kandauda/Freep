module.exports = {
  apps: [
    //////////////////////////        ALPHA      //////////////////////////
    {
      name: "freep-alpha",
      script: "app.js",
      watch: false,
    },
    //////////////////////////        PROD      //////////////////////////
    {
      name: "freep-prod",
      script: "app.js",
      watch: false,
    },
  ],
};

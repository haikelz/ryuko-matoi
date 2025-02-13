// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "ryuko-matoi",
      script: "src/main.ts",
      interpreter: "~/.bun/bin/bun",
      watch: true,
    },
  ],
};

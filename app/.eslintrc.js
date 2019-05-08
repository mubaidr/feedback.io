module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["plugin:vue/essential", "airbnb", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};

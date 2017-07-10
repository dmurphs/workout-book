module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    "sourceType": "module"
  },
  env: {
    browser: true,
    jest: true
  },
  extends: "airbnb",
  plugins: [
    "react", "jsx-a11y", "import"
  ],
  rules: {
    "react/jsx-filename-extension": [
      1, {
        "extensions": [".js", ".jsx"]
      }
    ],
    "react/no-danger": "off",
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./tools/webpack.config.base.js"
      }
    }
  }
};

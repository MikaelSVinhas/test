const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },

  "env": {
    "API_BASE_URL": "https://serverest.dev/",
    "USER_ID": "hwmqOkP4t1zoOilx",
    "USER_NAME": "Mikael Vinhas",
    "USER_EMAIL": "mkvinhas@qa.com.br",
    "USER_EMAIL_LOGIN": "mkvinhas@qa.com.br",
    "USER_PASSWORD": "teste",
    "USER_EDIT": "rjcqKvqZZQY7xgVJ"
  },

});

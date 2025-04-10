import sharedConfig from "@scalify/shared-microservice/eslint.config.mjs";

const config = sharedConfig[sharedConfig.length - 1];

const extraRules = {
  "@typescript-eslint/explicit-member-accessibility": [
    "error",
    {
      accessibility: "explicit",
      overrides: {
        constructors: "explicit",
      },
    },
  ],
  "@typescript-eslint/parameter-properties": [
    "error",
    {
      allow: ["private readonly"],
      prefer: "parameter-property",
    },
  ],
};

const rules = {
  ...config.rules,
  ...extraRules,
};

const eslint = [{ ...config, rules }];

export default eslint;

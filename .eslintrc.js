module.exports = {
  root: true,
  extends: ['plugin:chronobank-react/recommended'],
  rules: {
    'space-before-function-paren': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off', // TODO Use webpack resolver possible to solve issues with aliased modules
    'react/jsx-no-bind': 'off'
  }
};

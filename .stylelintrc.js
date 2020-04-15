module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    "font-family-no-missing-generic-family-keyword":null,
    'no-descending-specificity':null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
}
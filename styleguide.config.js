module.exports = {
  sections: [
    {
      name: '',
      content: 'README.md',
    },
    {
      name: 'Table of Contents',
      content: 'docs/README.md',
    },
    {
      name: 'Getting Started',
      content: 'docs/getting-started.md',
    },
    {
      name: 'Best Practices',
      content: 'docs/best-practices.md',
    },
    {
      name: 'Edit Documentation',
      content: 'docs/edit-documentation.md',
    },
    {
      name: 'Deployments',
      content: 'docs/deployments.md',
    },
    {
      name: 'Components',
      components: 'src/components/**/[A-Z]*.js',
    },
  ],
  styleguideDir: 'build/docs',
  title: 'Aurobo Documentation',
  theme: {
    fontSize: {
      h1: 36,
      h2: 24,
      h3: 18,
    },
  },
};

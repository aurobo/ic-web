# Best Practices

The code in this project follows certain best practices. Please try to learn and follow them, it makes the job of other developers on the team easier.

## File Naming Best Practices

> Name a file according to what is being _exported_ from that file. You'll generally be exporting a `ReactComponent` or a `javascriptFunction`. For every other type of file or folder, use `kebab-case`.

* In general, a file is named according to what is being _exported_ from that file. One advantage of doing this is that it becomes easier to identify the entity from the file name itself. For example;
  * ⚛️📝 React component files are named in `PascalCase` format.
  * A javascript function is named in `camelCase` format.
* 📂 All folders are named in `kebab-case` format. The format is pretty straight forward; every letter should be in lowercase and the words should only be separated by the letter hyphen ("-").
* All markdown files are also in `kebab-case` format.
* The files listed below are standardized, consider them as exceptions. They should be written as they are.
  * `CNAME`
  * `README.md`

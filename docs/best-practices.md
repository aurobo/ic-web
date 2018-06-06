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
  * `index.js`

## Module Re-exporting

> A component shouldn't live in an `index.js` file. `index.js` file should only be used to consolidate components within that directory by re-exporting.

A component shouldn't live in an `index.js` file. `index.js` file should only be used to consolidate components within that directory by re-exporting.

For example, if your button component is a stand-alone `Button.js` file, you may not need to do anything. But if it lives inside a folder named `button`, its path for import now becomes a bit flustered like so, `components/button/Button.js`. In order to make importing simple (because you import more than you export), just re-export `Button.js` from `components/button/index.js`. This will simplify the import path to `components/button`.

It may sound a bit confusing and over-engineered but in some cases, it is better to have a standard than no standard at all. Have a look at some of the existing examples and you'll get the hang of it.

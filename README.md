# react-templatify

[Browserify][] transform for react templates

      // In myhtml.rt
      <Hello name="World" />

      // In JS
      require("./myhtml.rt");

Save the snippet above as `main.js` and then produce a bundle with the following
command:

    % browserify -t react-templatify main.js

`react-templatify` transform activates for files with `.rt` extensions.

If you want to react-templatify modules with other extensions, pass an `-x /
--extension` option:

    % browserify -t coffeeify -t [ react-templatify --extension .rt ] main.coffee

[Browserify]: http://browserify.org
[jstransform]: https://github.com/wix/react-templates

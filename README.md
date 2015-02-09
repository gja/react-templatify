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

## Things to note

* You should add react-templatify to your devDependencies
* You will need to manually require lodash in your project.json (or otherwise)
* Run deamdify on this as well

[Browserify]: http://browserify.org
[jstransform]: https://github.com/wix/react-templates

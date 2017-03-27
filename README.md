# postcss-for-var-in

Read declarations from a css file 
(using [postcss-import](https://github.com/postcss/postcss-import) 
and assign the values to a named variable pair 
(using [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)), 
and use them to build selectors.

Given the file `colors.css`:

``` css
:root {
  --deep-sky-blue: #00A5FF;
  --dark-sky-blue: #0071AE;
}
```

You can use this to create new selectors.

``` css
@forVar $key, $value in @import 'colors.css' {
  .background-$(key) {
    background-color: $value;
  }
}
```

Will produce this file

``` css
.background-deep-sky-blue {
    background-color: #00A5FF;
}

.background-dark-sky-blue {
    background-color: #0071AE;
}
```

## Development

### Run tests

This project uses [postcss-tape](https://github.com/jonathantneal/postcss-tape) to run tests.

``` shell
npm test
```


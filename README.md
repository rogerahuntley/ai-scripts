# ai-scripts

## Instructions

`npm i`

then, copy .env.example to .env and fill in the values

## Commands

### test

`npm run test`

-> "Ok."

---

### dogbribes

`npm run dogbribes`

-> "Dogbribes is epic."

---

### commandline

`npm run commandline <prompt>`

-> response to prompt

#### options:

you can change the max_tokens and temperature

`npm run commandline <prompt> --max_tokens 100 --temperature 0.5`

alternatively, you can use the following flags:

```
-p: prompt mode
-c: command mode
--short: 10 tokens
--normal: 100 tokens
--medium: 500 tokens
--long: 1000 tokens
--full: 4000 tokens
```

#### examples:

`npm run commandline -c echo hello world`

-> "hello world"

`npm run commandline what is 2 + 5`

-> "2 + 5 = 7"

## More info

all your messages and metadata gets saved in the `db` folder
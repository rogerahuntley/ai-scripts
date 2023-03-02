# ai-scripts

## Instructions

`bun i`

then, copy .env.example to .env and fill in the values

## Commands

### test

`bun run test`

-> "Ok."

---

### dogbribes

`bun run dogbribes`

-> "Dogbribes is epic."

---

### commandline

`bun run commandline <command>`

-> response to command

#### options:

you can change the max_tokens and temperature

`bun run commandline <command> --max_tokens 100 --temperature 0.5`

alternatively, you can use the following flags:

```
--short: 10 tokens
--normal: 100 tokens
--medium: 500 tokens
--long: 1000 tokens
--full: 4000 tokens
```

#### examples:

`bun run commandline echo hello world`

-> "hello world"

`bun run commandline what is 2 + 5`

-> "2 + 5 = 7"

## More info

all your messages and metadata gets saved in the `db` folder
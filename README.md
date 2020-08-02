# csv-quote-comma-to-array

A project that takes a line of quote-comma delimited CSV and returns an array of values.
It doesn't not consume an entire CSV file.  It only consumes a single line so other code
should load the file and parse it into lines.

The array will contain numbers if the code can determine that the value is a number.  It
will remove commas from numbers lke "11,000", remove '$' and '%'

It only knows about US number formatting.

# License

MIT


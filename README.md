# CSV to GPX

_For Barry._

Takes a CSV in the format:

```
D,<time (seconds since epoch)>,<latitude>,<longitude>,<elevation>,<speed>,<heart rate>[, …etc.]
```

and outputs a Garmin-flavored .gpx file.

## The simplest way to use it:

```sh
git clone git@github.com:rileyjshaw/csv-to-gpx.git
cd csv-to-gpx
npm i
# Drag your CSVs into the directory, then…
# For a single CSV file:
node ./convert.js <infile>.csv <outfile>.gpx
# For every CSV file in the directory:
for csv in *.csv; do node ./convert.js "$csv" "${csv%.csv}.gpx"; done
```

I included [example.csv](example.csv) if you want to test it right away:

```sh
# …after all the setup steps, run:
node ./convert.js example.csv output.gpx
```

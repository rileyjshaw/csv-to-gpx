/**
 * Usage from within this directory:
 *
 *   // Single file:
 *   node ./convert.js <infile>.csv <outfile>.gpx
 *
 *   // A folder of CSVs:
 *   for csv in *.csv; do node ./convert.js "$csv" "${csv%.csv}.gpx"; done
 */
const fs = require('fs');
const csv = require('csv-parser');
const { buildGPX, GarminBuilder } = require('gpx-builder');

const { Point } = GarminBuilder.MODELS;

const inFile = process.argv[2];
const outFile = process.argv[3];

const points = [];
fs.createReadStream(inFile)
	.pipe(csv({headers: ['time', 'lat', 'lon', 'ele']}))
	.on('data', (row) => {
		points.push(new Point(row.lat, row.lon, {
			ele: row.ele,
			time: new Date(+row.time * 1000),
			// hr: 'eventually',
		}));
	})
	.on('end', () => {
		const gpxData = new GarminBuilder();
		gpxData.setSegmentPoints(points);
		const output = buildGPX(gpxData.toObject());
		fs.writeFile(outFile, output, (err) => {
			if (err) throw err;
			console.log(`🏃 Converted ${inFile} to ${outFile}.`);
		});
	});

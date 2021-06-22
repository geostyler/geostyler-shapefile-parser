import ShapefileDataParser from './ShapefileDataParser';
import { readFileSync } from 'fs';
import * as path from 'path';

let parser: ShapefileDataParser;

const expectedData = {
  exampleFeatures: {
    features: [{
      geometry: {
        type: 'Point',
        coordinates: [7.146949768066406, 50.72151441213221]
      },
      properties: {
        height: 12,
        name: 'Peter'
      },
      type: 'Feature'
    }, {
      geometry: {
        coordinates: [7.138538360595703, 50.71064543743262],
        type: 'Point'
      },
      properties: {
        height: 13,
        name: 'Paul'
      },
      type: 'Feature'
    }, {
      geometry: {
        coordinates: [7.103862762451172, 50.73765018916071],
        type: 'Point'
      },
      properties: {
        height: 14,
        name: 'Heidi'
      },
      type: 'Feature'
    }, {
      geometry: {
        coordinates: [7.116050720214844, 50.73906248420585],
        type: 'Point'
      },
      properties: {
        height: 1,
        name: 'Ingrid'
      },
      type: 'Feature'
    }],
    fileName: 'POINT',
    type: 'FeatureCollection'
  },
  schema: {
    type: 'object',
    properties: {
      height: {
        type: 'number',
        maximum: 14,
        minimum: 1
      },
      name: {
        type: 'string'
      }
    }
  }
};

beforeEach(() => {
  parser = new ShapefileDataParser();
});

describe('ShapefileDataParser', () => {

  it('…is defined', () => {
    expect(ShapefileDataParser).toBeDefined();
  });

  describe('implements DataParser', () => {

    it('…readData is defined', () => {
      expect(parser.readData).toBeDefined();
    });

  });

  describe('constructor', () => {

    it('…creates a GeoJsonDataParser with the passed projections', () => {
      const parserWithProjection = new ShapefileDataParser('EPSG:3857', 'EPSG:4326');
      expect(parserWithProjection._geoJsonParser.sourceProjection).toBe('EPSG:3857');
      expect(parserWithProjection._geoJsonParser.targetProjection).toBe('EPSG:4326');
    });

  });

  describe('readData implementation', () => {

    it('…can read a Buffer', async () => {
      const buffer = readFileSync(path.resolve(__dirname, '../data/point.zip'));
      const data = await parser.readData(buffer);
      expect(data).toEqual(expectedData);
    });

    it('…rejects the promise if called with invalid (Array)Buffer', (done) => {
      expect.assertions(1);
      const buffer = new ArrayBuffer(0);
      parser.readData(buffer)
        .catch((e) => {
          expect(e).toBeDefined();
        }).finally(done);
    });

    it('…rejects the promise if called with invalid Argument', (done) => {
      expect.assertions(1);
      const buffer: ArrayBuffer = undefined;
      parser.readData(buffer)
        .catch((e) => {
          expect(e).toBeDefined();
        }).finally(done);
    });

  });
});

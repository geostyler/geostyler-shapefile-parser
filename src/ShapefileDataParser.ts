import { DataParser, VectorData } from 'geostyler-data';
import GeoJsonDataParser from 'geostyler-geojson-parser';
const shpjs = require('shpjs');

/**
 *
 */
export class ShapefileDataParser implements DataParser {

  /**
   * The name of the ShapefileDataParser.
   */
  public static title = 'Shapefile Data Parser';

  title = 'Shapefile Data Parser';

  _geoJsonParser: any;

  constructor(sourceProj?: string, targetProj?: string) {
    this._geoJsonParser = new GeoJsonDataParser(sourceProj, targetProj);
  }

  /**
   *
   * @param inputData
   */
  readData(array: Buffer | ArrayBuffer): Promise<VectorData> {
    return new Promise<VectorData>((resolve, reject) => {
      shpjs(array)
        .then((geojson: any) => {
          resolve(this._geoJsonParser.readData(geojson));
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

}

export default ShapefileDataParser;

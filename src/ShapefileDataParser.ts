import { DataParser, VectorData } from 'geostyler-data';
import { GeoJSON } from 'geojson';
import GeoJsonDataParser from 'geostyler-geojson-parser';
// @ts-ignore // Typing is currently wrong. See PR: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/34623
import shpjs from 'shpjs';

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
        .then((geojson: GeoJSON) => {
            resolve(this._geoJsonParser.readData(geojson));
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

}

export default ShapefileDataParser;

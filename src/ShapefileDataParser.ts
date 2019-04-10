import { DataParser, VectorData } from 'geostyler-data';
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

  sourceProjection: string;

  targetProjection: string;

  _geoJsonParser: any;

  constructor(sourceProj?: string, targetProj?: string) {
    this._geoJsonParser = new GeoJsonDataParser();
    if (sourceProj && targetProj) {
      this.sourceProjection = sourceProj;
      this.targetProjection = targetProj;
    }
  }

  /**
   *
   * @param inputData
   */
  async readData(array: string | Buffer | ArrayBuffer): Promise<VectorData> {
    return new Promise<VectorData>((resolve, reject) => {
      try {
        shpjs(array)
          .then((geojson: any) => {
            if (geojson.type === 'FeatureCollection') {
              resolve(this._geoJsonParser.readData(geojson));
            }
          })
          .catch((e: any) => {
            reject(e);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

}

export default ShapefileDataParser;

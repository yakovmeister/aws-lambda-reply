export interface HttpHeaders {
  [key: string]: string | boolean | number;
}

export interface MultiValueHeaders { [key: string]: Array<string | boolean | number>; }

export interface LambdaReplyDefaults {
  headers: HttpHeaders;
  multiValueHeaders: MultiValueHeaders;
  isBase64Encoded: boolean;
}

export interface LambdaReplyOptions {
  headers?: HttpHeaders;
  multiValueHeaders?: MultiValueHeaders;
  isBase64Encoded?: boolean;
}

export interface LambdaResponseObject {
  statusCode: number;
  body: string;
  headers?: HttpHeaders;
  multiValueHeaders?: MultiValueHeaders;
  isBase64Encoded?: boolean;
}

export class LambdaReply {
  public defaults: LambdaReplyDefaults;

  /**
   * Creates a reply template with the selected defaults.
   *
   * @param defaults - The defaults to apply for each response made using this template.
   */
  constructor(defaults: Partial<LambdaReplyDefaults> = {}) {
    this.defaults = {
      headers: {
        'Content-Type': 'application/json',
        ...(defaults.headers || {}),
      },
      multiValueHeaders: (defaults.multiValueHeaders || {}),
      isBase64Encoded: defaults.isBase64Encoded || false,
    };
  }

  /**
   * Create a AWS Lambda response object.
   *
   * @param statusCode - HTTP status code
   * @param body - The response body to return.
   * @param options - Customize the response. Overwrite headers or set the response as base64 encoded.
   */
  public make(statusCode: number, body: string = '', options: LambdaReplyOptions = {}): LambdaResponseObject {
    return {
      statusCode,
      body,
      headers: {
        ...this.defaults.headers, // set defaults
        ...(options.headers || {}), // spread specified headers
      },
      multiValueHeaders: {
        ...this.defaults.multiValueHeaders,
        ...(options.multiValueHeaders || {}),
      },
      isBase64Encoded: options.isBase64Encoded !== undefined ? options.isBase64Encoded : this.defaults.isBase64Encoded,
    };
  }
}

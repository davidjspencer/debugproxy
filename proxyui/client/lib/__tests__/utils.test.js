/* @flow */

declare var jest: any;
declare var it: (name: string, body: () => any) => any;
declare var describe: (name: string, body: () => any) => any;
declare var expect: (x: any) => any;

jest.dontMock('reducers/user');

describe('prettyUrl', () => {
  const prettyUrl = require('lib/utils').prettyUrl;

  it('returns http url', function() {

    const flow = {
      id: "some-id",
      request: {
        headers: [],
        method: 'GET',
        host: "example.com",
        scheme: "http",
        port: 80,
        path: "/"
      },
      response: {
        headers: [],
        status_code: 200
      },
      client_conn: {
        timestamp_start: 111111111111
      }
    }

    const actual = prettyUrl(flow);
    expect(actual).toEqual("http://example.com/");
  })

  it('returns https url', function() {

    const flow = {
      id: "some-id",
      request: {
        headers: [],
        method: 'GET',
        host: "example.com",
        scheme: "https",
        port: 443,
        path: "/"
      },
      response: {
        headers: [],
        status_code: 200
      },
      client_conn: {
        timestamp_start: 111111111111
      }
    }

    const actual = prettyUrl(flow);
    expect(actual).toEqual("https://example.com/");
  })

  it('includes port if not 80', function() {

    const flow = {
      id: "some-id",
      request: {
        headers: [],
        method: 'GET',
        host: "example.com",
        scheme: "http",
        port: 8080,
        path: "/"
      },
      response: {
        headers: [],
        status_code: 200
      },
      client_conn: {
        timestamp_start: 111111111111
      }
    }

    const actual = prettyUrl(flow);
    expect(actual).toEqual("http://example.com:8080/");
  })

});

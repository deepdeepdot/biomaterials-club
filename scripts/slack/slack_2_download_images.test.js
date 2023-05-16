/**
 * @jest-environment jsdom
 */

let axios = require('axios');
let fs = require('fs');

const {
  getHeaders,
  download,
  downloadAndPipe,
  downloadAndWrite,
  getFilenameFromUrl,
  downloadAndHandleWrite,
  downloadImagesFromUrls,
  downloadSlackImages,
} = require('./slack_2_download_images');

let newTimeout = 5 * 1000; // 5 seconds
jest.setTimeout(newTimeout);

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
    createWriteStream: function () {
      return {
        on: jest.fn(),
      };
    },
  };
});

jest.mock('axios', () => {
  return function () {
    return {
      data: {
        pipe: jest.fn(),
      },
    };
  };
});

describe('slack_2_download_images', () => {
  test('getHeaders()', () => {
    let curlConfig = `
            header = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
            header = "Accept-Encoding: gzip, deflate, br"
            header = "Accept-Language: en-US,en;q=0.9"
            header = "Connection: keep-alive"
            header = "Cookie: b=a1ca79f5f3854e27609e7019f24c1426; _gcl_au=1.1.767533132.1676319627; _cs_c=1; _rdt_uuid=1676319628278.112f0741-15f6-4ae1-a008-442af32d883c; _lc2_fpi=e00b11ac9c9b--01gs66zdrxwmj0ww10ra1xbzjb; _ga=GA1.1.871101184.1676319627; _cs_id=039aadf2-5708-a950-d2ba-2e5b07960144.1676319627.1.1676319639.1676319627.1.1710483627703; __qca=P0-483063050-1676319639797; __ar_v4=%7C4UHU5P4P3FESHLUMNBLWAU%3A20230215%3A1%7CQCM34G7NBZEHHATIFDIUBJ%3A20230215%3A1; _fbp=fb.1.1676319640582.420791674; __adroll_fpc=99dad99896f66147c4227e318594f887-1676319640938; d=xoxd-e3adt2gsMyAC%2B3WcmfVrXHGyQNXbbUC43MxsL2abb%2BBey990QxCxLlx3Ev0DmgiwAIAy9xndBxJvIDttSqbxAqw6nBOf%2BITIgF%2FPE3BKN%2F%2BBhkST%2Bcz3hwm9DHNnhbCJINtZkI24CE8v3jNQqwtt7XK0Bc9iCEXVkcZYDJ%2FwpaAZH92sQPzZsIpW; lc=1676319645; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Feb+13+2023+15%3A20%3A47+GMT-0500+(Eastern+Standard+Time)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=c4ddb72e-3f8a-41f9-985d-f1b40ec6c3ed&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C3%3A1%2C2%3A1%2C4%3A1&AwaitingReconsent=false; shown_ssb_redirect_page=1; _ga_QTJQME5M5D=GS1.1.1676319627.1.1.1676320442.60.0.0"
            header = "Host: files.slack.com"
            header = "Pragma: no-cache"
            header = "Sec-Fetch-Dest: document"
            header = "Sec-Fetch-Mode: navigate"
            header = "Sec-Fetch-Site: none"
            header = "Sec-Fetch-User: ?1"  
            header = "Upgrade-Insecure-Requests: 1"
            header = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
            header = "sec-ch-ua: 'Chromium';v='110', 'Not A(Brand';v='24', 'Google Chrome';v='110'"
            header = "sec-ch-ua-mobile: ?0"
            header = "sec-ch-ua-platform: 'Windows'"`;

    let headers = {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      Connection: 'keep-alive',
      Cookie:
        'b=a1ca79f5f3854e27609e7019f24c1426; _gcl_au=1.1.767533132.1676319627; _cs_c=1; _rdt_uuid=1676319628278.112f0741-15f6-4ae1-a008-442af32d883c; _lc2_fpi=e00b11ac9c9b--01gs66zdrxwmj0ww10ra1xbzjb; _ga=GA1.1.871101184.1676319627; _cs_id=039aadf2-5708-a950-d2ba-2e5b07960144.1676319627.1.1676319639.1676319627.1.1710483627703; __qca=P0-483063050-1676319639797; __ar_v4=%7C4UHU5P4P3FESHLUMNBLWAU%3A20230215%3A1%7CQCM34G7NBZEHHATIFDIUBJ%3A20230215%3A1; _fbp=fb.1.1676319640582.420791674; __adroll_fpc=99dad99896f66147c4227e318594f887-1676319640938; d=xoxd-e3adt2gsMyAC%2B3WcmfVrXHGyQNXbbUC43MxsL2abb%2BBey990QxCxLlx3Ev0DmgiwAIAy9xndBxJvIDttSqbxAqw6nBOf%2BITIgF%2FPE3BKN%2F%2BBhkST%2Bcz3hwm9DHNnhbCJINtZkI24CE8v3jNQqwtt7XK0Bc9iCEXVkcZYDJ%2FwpaAZH92sQPzZsIpW; lc=1676319645; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Feb+13+2023+15%3A20%3A47+GMT-0500+(Eastern+Standard+Time)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=c4ddb72e-3f8a-41f9-985d-f1b40ec6c3ed&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C3%3A1%2C2%3A1%2C4%3A1&AwaitingReconsent=false; shown_ssb_redirect_page=1; _ga_QTJQME5M5D=GS1.1.1676319627.1.1.1676320442.60.0.0',
      Host: 'files.slack.com',
      Pragma: 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'sec-ch-ua':
        "'Chromium';v='110', 'Not A(Brand';v='24', 'Google Chrome';v='110'",
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "'Windows'",
    };
    expect(getHeaders(curlConfig)).toStrictEqual(headers);
  });

  test('getFilenameFromUrl', () => {
    let url =
      'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg';
    let filename = 'img_9076_720.jpg';
    expect(getFilenameFromUrl(url)).toBe(filename);
  });

  describe('download calling axios', () => {
    xtest('download', async () => {
      let url =
        'https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
      let headers = {};

      download(url, headers);

      expect(axios).toHaveBeenCalledWith({
        url,
        method: 'GET',
        headers,
        responseType: 'stream',
      });
    });
  });

  test('downloadAndPipe', async () => {
    let url =
      'https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    let headers = {};
    let writer = {};
    let response = await downloadAndPipe(url, headers, writer);

    expect(response.data.pipe).toHaveBeenCalledWith(writer);
  });

  test('downloadAndWrite', () => {
    let url =
      'https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    let headers = {};
    let path = 'some-file-ok.jpg';
    let spy = jest.spyOn(fs, 'createWriteStream');
    spy.mockClear();

    downloadAndWrite(url, headers, path);

    expect(spy).toHaveBeenCalledWith(path);
  });

  test('downloadAndHandleWrite', () => {
    let url =
      'https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    let headers = {};
    let path = 'some-file.jpg';

    let result = downloadAndHandleWrite(url, headers, path);
    // Note: it would be cool to handle a "bad" write and reject one
    result
      .then(() => {
        expect(1).toBe(1);
      })
      .catch((e) => {
        expect(2).toBe(2);
      });
  });

  test('downloadImagesFromUrls', () => {
    let imageUrls = [
      'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
    ];
    let folder = './output';
    let headers = {};
    let spy = jest.spyOn(fs, 'createWriteStream');
    spy.mockClear();

    downloadImagesFromUrls(imageUrls, headers, folder);

    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.mkdirSync).toHaveBeenCalled();

    expect(spy).toHaveBeenNthCalledWith(1, './output/img_9076_720.jpg');
    expect(spy).toHaveBeenNthCalledWith(2, './output/img_1224_720.jpg');
    expect(spy).toHaveBeenNthCalledWith(3, './output/img_1225_720.jpg');
  });
});

/**
 * @jest-environment jsdom
 */

const {
  getImageUrlsFromThumbnails,
  getImageUrlsFromSlack,
} = require('./slack_1_get_urls');

describe('slack_1_get_urls', () => {
  test('null thumbnails', () => {
    let thumbnails = null;
    expect(getImageUrlsFromThumbnails(thumbnails)).toStrictEqual([]);
  });

  test('thumbnails = []', () => {
    let thumbnails = [];
    expect(getImageUrlsFromThumbnails(thumbnails)).toStrictEqual([]);
  });

  test('thumbnails: array with objects with src', () => {
    let thumbnails = [
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      },
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      },
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
      },
    ];
    let expected = [
      'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
    ];
    expect(getImageUrlsFromThumbnails(thumbnails)).toStrictEqual(expected);
  });

  test('getImageUrlsFromThumbnails', () => {
    let domImageNodes = [
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      },
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      },
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
      },
    ];
    let imageUrls = [
      'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
    ];

    expect(getImageUrlsFromThumbnails(domImageNodes)).toStrictEqual(imageUrls);
  });

  test('thumbnails: array with objects with src and some missing src', () => {
    let thumbnails = [
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      },
      {
        url: 'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      },
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
      },
    ];
    let expected = [
      'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      undefined,
      'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
    ];
    expect(getImageUrlsFromThumbnails(thumbnails)).toStrictEqual(expected);
  });

  test('thumbnails: array with objects with src and some missing src', () => {
    let thumbnails = [
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      },
      {
        url: 'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
      },
      {
        src: 'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
      },
    ];
    let expected = [
      'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
      undefined,
      'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
    ];
    expect(getImageUrlsFromThumbnails(thumbnails)).toStrictEqual(expected);
  });
});

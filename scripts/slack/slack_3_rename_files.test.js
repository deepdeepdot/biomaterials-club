let fs = require('fs');

const {
    getFilenameFromUrl,
    getFilenames,
    getPrefix,
    getPrefixes,
    getSuffix,
    getPrefixMapping,
    getDateName,
    getDateCounterMap,
    getDateNames,
    renameFiles
} = require('./slack_3_rename_files');

jest.mock('fs');

jest.useFakeTimers()
    .setSystemTime(new Date('2023-01-01'));

describe('slack_3_rename_files', () => {

    test('getFilenameFromUrl', () => {
        let url = 'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg';
        expect(getFilenameFromUrl(url)).toBe('img_9076_720.jpg');
    });

    test('getFilenames', () => {
        let urls = [
            'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
            'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
            'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg'
        ];
        let expected = [
            'img_9076_720.jpg',
            'img_1224_720.jpg',
            'img_1225_720.jpg'
        ];
        expect(getFilenames(urls)).toStrictEqual(expected);
    });

    test('getPrefix', () => {
        let filename = 'img_9076_720.jpg';
        let prefix = 'img_907';
        expect(getPrefix(filename)).toBe(prefix);
    });

    test('getPrefixes', () => {
        let filenames = [
            'img_9076_720.jpg',
            'img_1224_720.jpg',
            'img_1225_720.jpg'
        ];
        let prefixes = new Set([
            'img_907',
            'img_122',
            'img_122'
        ]);
        expect(getPrefixes(filenames)).toStrictEqual(prefixes);
    });

    test('getSuffix', () => {
        let filename = 'img_9076_720.jpg';
        let suffix = 'jpg';
        expect(getSuffix(filename)).toBe(suffix);
    });

    test('getPrefixMapping', () => {
        let filenames = [
            'img_9076_720.jpg',
            'img_1224_720.jpg',
            'img_1225_720.jpg'
        ];
        let expected = {
            "img_122": "20230101",
            "img_907": "20230101"
        };
        expect(getPrefixMapping(filenames)).toStrictEqual(expected);
    });

    describe('getDateCounterMap', () => {
        test('Mapping to same date', () => {
            let prefixMapping = {
                "img_122": "20230101",
                "img_907": "20230101"
            };
            let expected = new Map();
            expected.set('20230101', 0);
            expect(getDateCounterMap(prefixMapping)).toStrictEqual(expected);
        });
        test('Mapping to different dates', () => {
            let prefixMapping = {
                "img_122": "20230101",
                "img_907": "20230102"
            };
            let expected = new Map();
            expected.set('20230101', 0);
            expected.set('20230102', 0);
            expect(getDateCounterMap(prefixMapping)).toStrictEqual(expected);
        });
    });

    test('getDateName', () => {
        let prefixMapping = {
            "img_122": "20230113",
            "img_907": "20230101"
        };
        let counterMap = getDateCounterMap(prefixMapping);

        // Note: not smart enough to "cache" and return the same if requested again

        let file = 'img_9076_720.jpg';
        let dateName = getDateName(file, counterMap, prefixMapping);
        expect(dateName).toBe('20230101_01.jpg');

        file = 'img_9077_720.jpg';
        dateName = getDateName(file, counterMap, prefixMapping);
        expect(dateName).toBe('20230101_02.jpg');

        file = 'img_1227_720.jpg';
        dateName = getDateName(file, counterMap, prefixMapping);
        expect(dateName).toBe('20230113_01.jpg');

        file = 'img_1229_720.jpg';
        dateName = getDateName(file, counterMap, prefixMapping);
        expect(dateName).toBe('20230113_02.jpg');

        dateName = getDateName(file, counterMap, prefixMapping);
        expect(dateName).toBe('20230113_02.jpg'); // no changes due to cache
    });

    test('getDateNames', () => {
        let filenames = [
            'img_9076_720.jpg',
            'img_1224_720.jpg',
            'img_1225_720.jpg'
        ];
        let prefixMapping = {
            "img_122": "20230113",
            "img_907": "20230101"
        };
        let dateNames = {
            "img_1224_720.jpg": "20230113_01.jpg",
            "img_1225_720.jpg": "20230113_02.jpg",
            "img_9076_720.jpg": "20230101_01.jpg"
        };
        expect(getDateNames(filenames, prefixMapping)).toStrictEqual(dateNames);
    });

    describe('renameFiles', () => {
        afterEach(() => {
            fs.rename.mockClear();
        });

        test('Normal use case. folder = "./my-folder"', () => {
            // let mock = jest.fn();
            // mock(2222);
            // expect(mock).toHaveBeenCalledWith(2222);
            let urls = [
                'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
                'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
                'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg'
            ];
            let prefixMapping = {
                "img_122": "20230113",
                "img_907": "20230101"
            };
            // let callback = () => { };
            // fs.rename('some', 'next', callback);
            // expect(fs.rename).toHaveBeenCalledWith('some', 'next', expect.anything());
    
            let folder = './my-folder';
            renameFiles(urls, prefixMapping, folder);
    
            expect(fs.rename).toHaveBeenNthCalledWith(1, './my-folder/img_9076_720.jpg', './my-folder/20230101_01.jpg', expect.anything());
            expect(fs.rename).toHaveBeenNthCalledWith(2, './my-folder/img_1224_720.jpg', './my-folder/20230113_01.jpg', expect.anything());
            expect(fs.rename).toHaveBeenNthCalledWith(3, './my-folder/img_1225_720.jpg', './my-folder/20230113_02.jpg', expect.anything());
        });    

        test('Normal use case. folder = ""', () => {
            let urls = [
                'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
                'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
                'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg'
            ];
            let prefixMapping = {
                "img_122": "20230113",
                "img_907": "20230101"
            };
    
            let folder = '';
            renameFiles(urls, prefixMapping, folder);
    
            expect(fs.rename).toHaveBeenNthCalledWith(1, 'img_9076_720.jpg', '20230101_01.jpg', expect.anything());
            expect(fs.rename).toHaveBeenNthCalledWith(2, 'img_1224_720.jpg', '20230113_01.jpg', expect.anything());
            expect(fs.rename).toHaveBeenNthCalledWith(3, 'img_1225_720.jpg', '20230113_02.jpg', expect.anything());
        });    
    });

});


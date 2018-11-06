#!/usr/bin/env node

const qiniu = require('qiniu');

const accessKey = 'KzXcPPiAxUqrGrepnSnMjJGJzXivdnJjoDlOvGSZ';
const secretKey = 'TUpcp1Rv5hjj3jcJ2qXb1UVPeQw6gQrEIj8LFD7t';
const domain = 'http://p3fsh3hac.bkt.clouddn.com';

exports.run = function () {

    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;  // 华南机房
    const bucket = new qiniu.rs.BucketManager(mac, config);

    bucket.listPrefix('chn-south', { limit: 500, prefix: 'lyrica/music/' }, function (err, res, resInfo) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (resInfo.statusCode == 200) {
            let nextMarker = res.marker;
            if (nextMarker) {
                console.log('ERROR: Playlist length exceeds 500.');
                return;
            }
            let items = res.items;
            items.forEach(function (item) {
                let fileName = item.key.substring(item.key.lastIndexOf('/') + 1).replace('.mp3', '');
                
                
                
                
                let splitted = fileName.split('|');

                if (splitted.length < 2) {
                    console.log('WARN: Cannot process song "' + item.key + '"');
                    return true;
                }

                let song = {
                    title: splitted[0],
                    artist: splitted[1],
                    mp3: domain + '/' + item.key
                };

                let lyricsKey = 


            });
        }
        else {
            console.log(resInfo.statusCode);
            console.log(res);
        }
    });

};
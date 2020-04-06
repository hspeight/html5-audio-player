// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/
'use strict';
//Set up AWS Client
const AWS = require('aws-sdk');
AWS.config.update(
    {
         region: 'us-east-1'
    }
);
const S3 = new AWS.S3();

const FACTS_KEY = makeMP3array();

exports.get = async function(event, context, callback) {
    const data = await getS3Object(process.env.S3BucketName, FACTS_KEY);

    const factIndex = Math.floor(Math.random() * data.length);
    const fact = 'https://national-anthems.s3-eu-west-1.amazonaws.com/' + data[factIndex];

    var result = {
        statusCode: 200,
        body: JSON.stringify(fact),
        headers: {'content-type': 'text/json',"Access-Control-Allow-Origin": "*"}
    };
    
    callback(null, result);
}
// Uses AWS SDK to get an S3 Object of the given Key.
function getS3Object(bucketName, key) {
    const params = {
        Bucket: 'national-anthems',
        Key: key
    };
    return new Promise((resolve, reject) => {
        S3.getObject(params,  function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred. Let's log it.
                reject(err);
            }

            const objectData = data.Body.toString();
            resolve(JSON.parse(objectData));
         });
     });
}

function makeMP3array() {

    mp3Array = ["INDIA.mp3", "GREECE.mp3"];

    return mp3Array;
}
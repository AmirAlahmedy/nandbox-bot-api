import { getConfigs } from "../NandBoxClient";
import fs from "fs";
import axios from "axios";
import path, { resolve } from 'path';
import readline from 'readline';
import { Utility } from "./Utility";
import mime from "mime";
import { Stream } from "stream";

export default class MediaTransfer {
    constructor() {
        // TODO: throw new illegalStateException("utility class");
    }

    /**
     * downloadFile it will return 0 when file saved successfully
     */

    /**
     * @param token
     *            Bot API Token to be used to download the file
     * @param mediaFileId
     *            Media File Id to be download e.g. photoId , VideoId,....
     * @param savingDirPath
     *            null to save it in current directory or the local directory path
     *            to save file
     * @param savingFileName
     *            null to save downloaded media with name mediaId or a file name be
     *            used to save the downloaded media .
     * @return 0 in success case , -1: if failed to download the media
     */
    static downloadFile(token, mediaFileId, savingDirPath, savingFileName) {
        var result = -1;

        try {

            const downloadServerURL = getConfigs().DownloadServer;
            const downloadStartTime = (new Date()).getTime();
            savingDirPath = savingDirPath != null ? savingDirPath : "./"; // If savingDirPath is null , assuming current Directory
            const mediaFileFullPath = savingDirPath + '/' + savingFileName;
            const file = fs.createWriteStream(mediaFileFullPath);

            axios({
                url: downloadServerURL + mediaFileId,
                method: 'GET',
                timeout: 40000,
                responseType: 'stream',
                headers: {
                    'Content-Type': 'application/json',
                    'X-TOKEN': token,
                    //'Authorization': 'Bearer ' + token
                }
            }).then(response => {

                response.data.pipe(file);
                const downloadEndTime = (new Date()).getTime();

                file.on('finish', resolve => {
                    console.log("Download File : " + mediaFileId + " took around "
                        + (downloadEndTime - downloadStartTime) / 1000 + " Seconds");
                    console.log("File Saved Locally Successfully");
                    result = 0;
                });


            }).catch(e => console.log(e));

        } catch (e) {

            console.log(new Error().stack);
            console.log(e);

        } finally {

            console.log("Result = " + result);
            return result;
        }
    }

    /**
    * @param token
    *            Bot API Token to be used to download the file
    * @param mediaFileFullPath
    *            local directory path to upload the file
    * @return Upload File it will return Attachment as string
    */
    static uploadFile = (token, mediaFileFullPath) => {
        let media = null;
        let output = null;
        let sb = new String();

        /* let arrabuff = null; 
        fs.readFile(mediaFileFullPath, (err, data) => {
            arrabuff = Utility.toArrayBuffer(data);
        });*/
        const file = fs.createReadStream(mediaFileFullPath);
        const { size } = fs.statSync(mediaFileFullPath);
        const fileContentType = mime.getType(mediaFileFullPath);
        const uploadServerURL = getConfigs().UploadServer;
        const reqCon = {
            url: uploadServerURL + path.basename(mediaFileFullPath),
            method: 'PUT',
            timeout: 40000,
            // TODO: socket timeout?
            headers: {
                'Content-Type': fileContentType,
                'Content-Length': size,
                'X-TOKEN': token,
                //'Authorization': 'Bearer ' + token,
            },
            transformRequest: [(data, headers) => {
                // Do whatever you want to transform the data

                return data;
            }],
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            },
            data: file
        };
        console.log("fileContentType " + fileContentType);
        const uploadStartTime = (new Date()).getTime();
        let storemedia = axios(reqCon)
            .then(response => {
                
                media = response.data.file;
                //file.pipe(response.data);
                const uploadEndTime = (new Date()).getTime();
                console.log("Upload File : " + media + " took around "
                    + (uploadEndTime - uploadStartTime) / 1000 + " Seconds");
                console.log("File Saved Locally Successfully");
               

                // TODO: check
                /* let bufferedReader = fs.createReadStream(response.data.file);
                 console.log("Output from Server ...." + response.status + "\n");

                 bufferedReader.on('end', () => {

                     const rl = readline.createInterface({
                         input: bufferedReader
                     });

                     rl.on('line', line => {
                         output = line;
                         console.log("output " + output);
                         sb.append(output);
                     });

                 });
                 console.log(response.status);

                 if (Utility.isNotEmpty(sb)) {
                     let obj = JSON.parse(sb);
                     media = (obj.file).toString;
                 } */
                console.log("Uploaded Media File ID is : " + media);
                return media;
            })
            .catch(e => console.log(e));
            
        /* return new Promise((resolve, reject) => {
            setTimeout(() => resolve(media), 1000);
        }); */
        return storemedia;
    }
}
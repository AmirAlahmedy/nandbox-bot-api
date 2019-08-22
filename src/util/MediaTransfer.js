import { getConfigs } from "../NandBoxClient";
import http from "http";
import fs from "fs";
import axios from "axios";
import fileType from "file-type";
import path from 'path';
import readline from 'readline';
import Utils from "./Utility";

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
    downloadFile(token, mediaFileId, savingDirPath, savingFileName) {
        let result = -1;

        try {

            downloadServerURL = getConfigs().DownloadServer;
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
                console.log("Download File : " + mediaFileId + " took around "
                    + (downloadEndTime - downloadStartTime) / 1000 + " Seconds");
                console.log("File Saved Locally Successfully");
                result = 0;
            });

        } catch (e) {

            //TODO: e.printStackTrace();
            console.log(e);
            result = -1;

        } finally {

            try {
                file.end();
            } catch (e) {
                //TODO: e.printstacktrace
                console.log(e);
            }

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
    async uploadFile(token, mediaFileFullPath) {
        let media = null;
        let output = null;
        let sb = new String();

        try {
            const file = fs.createReadStream(mediaFileFullPath);
            let fileContentType = null;
            try {
                const stream = await fileType.stream(file)
                fileContentType = stream.fileType.mime;

            }
            catch (e) {

                // TODO: e.printstacktrace
                console.log(e);

            }

            console.log("fileContentType " + fileContentType);

            uploadServerURL = getConfigs().UploadServer;
            const uploadStartTime = (new Date()).getTime();

            axios({
                url: uploadServerURL + path.basename(mediaFileFullPath),
                method: 'PUT',
                timeout: 40000,
                // TODO: socket timeout?
                headers: {
                    'Content-Type': fileContentType,
                    'X-TOKEN': token,
                    //'Authorization': 'Bearer ' + token,
                },
                data: file
            }).then(response => {
                const uploadEndTime = (new Date()).getTime();
                console.log("Upload File : " + mediaFileFullPath + " took "
                    + (uploadEndTime - uploadStartTime) / 1000 + " Seconds");
                if (response.status == 200 || response.status == 204) {

                    let bufferedReader = null;

                    try {
                        // TODO: check
                        bufferedReader = fs.createReadStream(response.data);
                    } catch (e) {
                        //TODO: e.printstacktrace
                        console.log(e);
                    }

                    console.log("Output from Server ...."
                        + response.status + "\n");

                    if (bufferedReader != null) {
                        const rl = readline.createInterface({
                            input: bufferedReader,
                            crlfDelay: Infinity
                        })
                        while (rl.on('line', line => true)) {
                            output = line;
                            console.log("output " + output);
                            sb.append(output);
                        }
                    } else {
                        console.log(response.status);
                    }

                    if (Utils.isNotEmpty(sb)) {
                        let obj = JSON.parse(sb);
                        media = (obj.file).toString;
                    }

                    console.log("Uploaded Media File ID is : " + media);
                }
            });

        } catch (e) {
            //TODO: e.printstacktrace
            console.log(e);
        } finally {
            try {
                // TODO: close httpclient
            } catch (e) {
                //e.printStackTrace();
                console.log(e);
            }
        }

        return media;
    }
}
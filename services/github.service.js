/**
 * -------------------------------------------------------
 * SMS Hindi Shayari
 * GitHub Image Service
 * -------------------------------------------------------
 */

"use strict";

const axios = require("axios");

/* ==================================
   Config
================================== */

const GITHUB_OWNER =
    process.env.GITHUB_OWNER;

const GITHUB_REPO =
    process.env.GITHUB_REPO;

const GITHUB_BRANCH =
    process.env.GITHUB_BRANCH || "main";

const GITHUB_TOKEN =
    process.env.GITHUB_TOKEN;

const GITHUB_API =
    "https://api.github.com";

const RAW_BASE_URL =

    `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

/* ==================================
   Axios Instance
================================== */

const github = axios.create({

    baseURL: GITHUB_API,

    timeout: 30000,

    headers: {

        Authorization:
            `token ${GITHUB_TOKEN}`,

        Accept:
            "application/vnd.github+json",

        "User-Agent":
            "SMS-Hindi-Shayari"

    }

});

/* ==================================
   Generate Raw URL
================================== */

const getRawUrl = (filePath = "") => {

    return `${RAW_BASE_URL}/${filePath}`;

};

/* ==================================
   Generate GitHub URL
================================== */

const getGithubUrl = (filePath = "") => {

    return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${filePath}`;

};

/* ==================================
   Repository Info
================================== */

const getRepository = async () => {

    const { data } = await github.get(

        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

    );

    return data;

};

/* ==================================
   Get File
================================== */

const getFile = async (filePath) => {

    const { data } = await github.get(

        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`

    );

    return data;

};

/* ==================================
   Upload File
================================== */

const uploadFile = async (

    filePath,

    content,

    message = "Upload file"

) => {

    const payload = {

        message,

        content: Buffer
            .from(content)
            .toString("base64"),

        branch: GITHUB_BRANCH

    };

    const { data } = await github.put(

        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,

        payload

    );

    return data;

};

/* ==================================
   Update File
================================== */

const updateFile = async (

    filePath,

    content,

    sha,

    message = "Update file"

) => {

    const payload = {

        message,

        content: Buffer
            .from(content)
            .toString("base64"),

        sha,

        branch: GITHUB_BRANCH

    };

    const { data } = await github.put(

        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,

        payload

    );

    return data;

};

/* ==================================
   Delete File
================================== */

const deleteFile = async (

    filePath,

    sha,

    message = "Delete file"

) => {

    const payload = {

        message,

        sha,

        branch: GITHUB_BRANCH

    };

    const { data } = await github.delete(

        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,

        {

            data: payload

        }

    );

    return data;

};

/* ==================================
   List Directory
================================== */

const listDirectory = async (directory = "") => {

    const { data } = await github.get(

        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${directory}`

    );

    return data;

};

/* ==================================
   File Exists
================================== */

const fileExists = async (filePath) => {

    try {

        await getFile(filePath);

        return true;

    } catch (error) {

        if (error.response?.status === 404) {
            return false;
        }

        throw error;

    }

};

/* ==================================
   Export
================================== */

module.exports = {

    getRepository,

    getRawUrl,

    getGithubUrl,

    getFile,

    uploadFile,

    updateFile,

    deleteFile,

    listDirectory,

    fileExists

};

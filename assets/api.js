import {ApiRequestNoParamError, ApiRequestParamDataError} from './errors.js';


// Third-parties

export let greenapiApi = null;


// Constants

export const DEFAULT_CAPTION = '';


// Functions

export function isValidUrl(val) {
    try { new URL(val); return true; }
    catch (e) { return false; }
}

export function getTrimmedString(val) {
    return String(val || '').trim();
}

export async function getSettings() {
    return await greenapiApi.settings.getSettings();
}

export async function getStateInstance() {
    return await greenapiApi.instance.getStateInstance();
}

export async function getChats() {
    return await greenapiApi.instance.getChats();
}

export async function sendMessage({ chatId, message, quotedMessageId, doShowLinksPreview }) {

    // Doing some checks

    if (!getTrimmedString(chatId))
        throw new ApiRequestNoParamError(null, 'chatId');

    if (!getTrimmedString(message))
        throw new ApiRequestNoParamError(null, 'message');


    return await greenapiApi.message.sendMessage(
        getTrimmedString(chatId),
        null,  // NOTE: The phone number parameter has been deprecated
        getTrimmedString(message),
        quotedMessageId,
        !!doShowLinksPreview,
    );
}

export async function sendFileByUrl({ chatId, fileUrl, fileName, caption }) {

    // Doing some checks

    if (!getTrimmedString(chatId))
        throw new ApiRequestNoParamError(null, 'chatId');

    if (!getTrimmedString(fileUrl))
        throw new ApiRequestNoParamError(null, 'fileUrl');

    if (!getTrimmedString(fileName))
        throw new ApiRequestNoParamError(null, 'fileName');

    if (!isValidUrl(getTrimmedString(fileUrl)))
        throw new ApiRequestParamDataError(null, 'fileUrl');


    // Getting the caption

    let trimmedCaption = DEFAULT_CAPTION;

    if (getTrimmedString(caption))
        trimmedCaption = getTrimmedString(caption);


    return await greenapiApi.file.sendFileByUrl(
        String(chatId.trim()),
        null,  // NOTE: The phone number parameter has been deprecated
        String(fileUrl.trim()),
        String(fileName.trim()),
        trimmedCaption,
    );
}

export function init(idInstance, apiTokenInstance) {
    greenapiApi = whatsAppClient.restAPI({ idInstance, apiTokenInstance });
}

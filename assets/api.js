import { ApiRequestNoParamError } from './errors.js';


// Third-parties

export let greenapiApi = null;


// Functions

export async function getSettings() {
    return await greenapiApi.settings.getSettings();
}

export async function getStateInstance() {
    return await greenapiApi.instance.getStateInstance();
}

export async function getChats() {
    return await greenapiApi.instance.getChats();
}

export async function sendMessage({ chatId, phone, message, quotedMessageId, doShowLinksPreview }) {

    // Doing some checks

    if (!chatId && !phone)
        throw new ApiRequestNoParamError(null, 'chatId');

    if (!message)
        throw new ApiRequestNoParamError(null, 'message');


    return await greenapiApi.message.sendMessage(chatId, Number(phone), message, quotedMessageId, !!doShowLinksPreview);
}

/**
 * @fixme
 *   Я пытался отправлять запросы на `sendFileByUrl`, но **сервис падал при попытке отправить файл**. Я так понял, это
 *   сервис _неадекватно реагирует_ на `.` (точку) в отправляемых данных. Из-за этого не получается вставлять URL-ы.
 *   Пример запросов и овтетов я положил в проект: `badSendFileByUrlRequest.curl`, `badSendFileByUrlResponse`
 *
 * @param options
 * @param options.chatId
 * @param options.phone
 * @param options.fileUrl
 * @param options.fileName
 * @param options.caption
 * @returns {Promise<void>}
 */
export async function sendFileByUrl({ chatId, phone, fileUrl, fileName, caption }) {

    // Doing some checks

    if (!chatId && !phone)
        throw new ApiRequestNoParamError(null, 'chatId');

    if (!fileUrl)
        throw new ApiRequestNoParamError(null, 'fileUrl');

    if (!fileName)
        throw new ApiRequestNoParamError(null, 'fileName');


    return await greenapiApi.file.sendFileByUrl(chatId, Number(phone), fileUrl, fileName, caption || '');
}

export function init(idInstance, apiTokenInstance) {
    greenapiApi = whatsAppClient.restAPI({ idInstance, apiTokenInstance });
}

import { init as initApi, getSettings, getStateInstance, getChats, sendMessage, sendFileByUrl } from './api.js';
import { FieldDataError, FieldNoDataError } from './errors.js';


// Constants

export const PHONE_MIN_LENGTH = 5;

export const DEFAULT_FILENAME = 'unknown';


// Variables

export let appEl = null;

export let idInstanceInputEl = null;

export let apiTokenInstanceInputEl = null;

export let messagePhoneNumberInputEl = null;

export let messageTextInputEl = null;

export let filePhoneNumberInputEl = null;

export let fileUrlInputEl = null;

export let getSettingsButtonEl = null;

export let getStateInstanceButtonEl = null;

export let sendMessageButtonEl = null;

export let sendFileByUrlButtonEl = null;

export let responseEl = null;

export let isInProgress = false;


// Functions

export function updElements() {

    // Defining the functions

    const get = (val) => document.getElementById(val);


    // Updating the data

    appEl = get('app');
    idInstanceInputEl = get('id_instance_input');
    apiTokenInstanceInputEl = get('api_token_instance_input');
    messagePhoneNumberInputEl = get('message_phone_number_input');
    messageTextInputEl = get('message_text_input');
    filePhoneNumberInputEl = get('file_phone_number_input');
    getSettingsButtonEl = get('get_settings_button');
    getStateInstanceButtonEl = get('get_state_instance_button');
    sendMessageButtonEl = get('send_message_button');
    sendFileByUrlButtonEl = get('send_file_by_url_button');
    fileUrlInputEl = get('file_url_input');
    responseEl = get('response');
}

export function warn(val) {
    console.warn(val);
}

export function err(e) {
    console.error(e);
}

export function setLoading(val = true) {
    if (!appEl) throw new Error('Unable to get the ');

    isInProgress = val;

    appEl.setAttribute('data-loading', Number(val));
}

export function setResponse(val) {
    if (typeof val === 'object' && val !== null)
        responseEl.value = JSON.stringify(val, null, 2);
    else if (val === undefined || val === null)
        responseEl.value = '';
    else
        responseEl.value = val;
}

export function remResponse() {
    setResponse('');
}

export function getIdInstance() {
    if (idInstanceInputEl.value)
        return idInstanceInputEl.value;
    else
        throw new FieldNoDataError(null, 'idInstance');
}

export function getApiTokenInstance() {
    if (apiTokenInstanceInputEl.value)
        return apiTokenInstanceInputEl.value;
    else
        throw new FieldNoDataError(null, 'apiTokenInstance');
}

export function updGreenapi() {
    initApi(getIdInstance(), getApiTokenInstance());
}

export async function onGetSettings() {

    // Doing some checks

    if (isInProgress) {
        warn('Unable to get the session: Another request is still in progress');
        return;
    }


    // Getting the session

    setLoading();
    remResponse();

    try {
        updGreenapi();
        setResponse(await getSettings());
    } catch (e) {
        onError(e);
    } finally {
        setLoading(false)
    }
}

export async function onGetStateInstance() {

    // Doing some checks

    if (isInProgress) {
        warn('Unable to get the state instance: Another request is still in progress');
        return;
    }


    // Getting the session

    setLoading();
    remResponse();

    try {
        updGreenapi();
        setResponse(await getStateInstance());
    } catch (e) {
        onError(e);
    } finally {
        setLoading(false)
    }
}

export async function onSendMessage() {

    // Doing some checks

    if (isInProgress) {
        warn('Unable to send the message: Another request is still in progress');
        return;
    }


    // Getting the data

    const phone = messagePhoneNumberInputEl.value;

    const message = messageTextInputEl.value;


    // Doing some checks

    if (!phone)
        throw new FieldNoDataError(null, 'filePhoneNumber');

    if (!message)
        throw new FieldNoDataError(null, 'messageText');

    if (phone.length < PHONE_MIN_LENGTH)
        throw new FieldDataError(`Телефон не может быть короче ${PHONE_MIN_LENGTH} символов!`, 'filePhoneNumber');



    // Getting the session

    setLoading();
    remResponse();

    try {
        updGreenapi();
        setResponse(await sendMessage({ phone, message }));
    } catch (e) {
        onError(e);
    } finally {
        setLoading(false)
    }
}

/**
 * @fixme
 *   Я пытался отправлять запросы на `sendFileByUrl`, но **сервис падал при попытке отправить файл**. Я так понял, это
 *   сервис _неадекватно реагирует_ на `.` (точку) в отправляемых данных. Из-за этого не получается вставлять URL-ы.
 *   Пример запросов и овтетов я положил в проект: `badSendFileByUrlRequest.curl`, `badSendFileByUrlResponse`
 *
 * @returns {Promise<void>}
 */
export async function onSendFileByUrl() {

    // Doing some checks

    if (isInProgress) {
        warn('Unable to get the session: Another request is still in progress');
        return;
    }


    // Getting the data

    const phone = filePhoneNumberInputEl.value;

    const fileUrl = fileUrlInputEl.value;

    const fileName = DEFAULT_FILENAME;


    // Doing some checks

    if (!phone)
        throw new FieldNoDataError(null, 'filePhoneNumber');

    if (!fileUrl)
        throw new FieldNoDataError(null, 'fileUrl');

    if (phone.length < PHONE_MIN_LENGTH)
        throw new FieldDataError(`Телефон не может быть короче ${PHONE_MIN_LENGTH} символов!`, 'filePhoneNumber');


    // Getting the session

    setLoading();
    remResponse();

    try {
        updGreenapi();
        setResponse(await sendFileByUrl({ phone, fileUrl, fileName }));
    } catch (e) {
        onError(e);
    } finally {
        setLoading(false)
    }
}

export function onError(e) {

    // Guessing the error

    const isNoData = e instanceof FieldNoDataError;

    const isDataError = e instanceof FieldDataError;


    // If the error is known

    if (isNoData) {
        alert(`Поле '${e.field ?? '?'} не заполнено!`);
        return;
    }

    if (isDataError) {
        alert(e.message ?? `Поле '${e.field ?? '?'} некорректно!`);
        return;
    }


    err(e);

    alert('Неизвестная ошибка: ' + e.message ?? 'Unknown Error')
}

export function useEvents() {
    getSettingsButtonEl.addEventListener('click', onGetSettings);
    getStateInstanceButtonEl.addEventListener('click', onGetStateInstance)
    sendMessageButtonEl.addEventListener('click', onSendMessage)
    sendFileByUrlButtonEl.addEventListener('click', onSendFileByUrl)
}

export function init() {
    updElements();
    useEvents();
}


// Setting the listener

document.addEventListener('DOMContentLoaded', () => init());

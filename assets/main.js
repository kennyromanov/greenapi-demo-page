import { init as initApi, isValidUrl, getTrimmedString, getSettings, getStateInstance, getChats, sendMessage, sendFileByUrl } from './api.js?v=2026-05-25-1';
import { FieldDataError, FieldNoDataError } from './errors.js?v=2026-05-25-1';


// Constants

export const DEFAULT_CHAT_ID_POSTFIX = '@c.us';

export const DEFAULT_FILENAME = 'unknown';

export const PHONE_MIN_LENGTH = 5;


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

export async function getChatByPhoneNumber(val) {

    // Getting the chats

    const chats = await getChats();


    // Iterating for each chat

    for (const chat of chats) {
        const chatId = chat.id ?? null;


        // Doing some checks

        if (!chatId) {
            warn('Unable to get the chat: Bad data: ' + JSON.stringify(chat));
            continue;
        }

        if (!chatId.startsWith(val) || !chatId.endsWith(DEFAULT_CHAT_ID_POSTFIX))
            continue;


        return chat;
    }


    return null;
}

export async function getChatIdByPhoneNumber(val) {
    const chat = await getChatByPhoneNumber(val);

    if (chat)
        return chat.id ?? null;
    else
        return null;
} {}

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

    const phone = getTrimmedString(messagePhoneNumberInputEl.value);

    const message = getTrimmedString(messageTextInputEl.value);


    // Doing some checks

    if (!phone) {
        onError(new FieldNoDataError(null, 'filePhoneNumber'));
        return;
    }

    if (!message) {
        onError(new FieldNoDataError(null, 'messageText'));
        return;
    }

    if (phone.length < PHONE_MIN_LENGTH) {
        onError(new FieldDataError(`Телефон не может быть короче ${PHONE_MIN_LENGTH} символов!`, 'filePhoneNumber'));
        return;
    }



    // Getting the session

    setLoading();
    remResponse();

    try {

        // Updating the data

        updGreenapi();


        // Getting the chatId

        let chatId = await getChatIdByPhoneNumber(phone);

        if (!chatId) {
            console.log(`API: The chat with the phone number '${phone}' was not found: Falling back to '${phone + DEFAULT_CHAT_ID_POSTFIX}'`);
            chatId = phone + DEFAULT_CHAT_ID_POSTFIX;
        }


        setResponse(await sendMessage({ chatId, message }));
    } catch (e) {
        onError(e);
    } finally {
        setLoading(false)
    }
}

export async function onSendFileByUrl() {

    // Doing some checks

    if (isInProgress) {
        warn('Unable to send the file: Another request is still in progress');
        return;
    }


    // Getting the data

    const phone = getTrimmedString(filePhoneNumberInputEl.value);

    const fileUrl = getTrimmedString(fileUrlInputEl.value);

    const rawFileName = fileUrl.split('/').at(-1) || DEFAULT_FILENAME;

    const fileName = getTrimmedString(rawFileName);


    // Doing some checks

    if (!phone) {
        onError(new FieldNoDataError(null, 'filePhoneNumber'));
        return;
    }

    if (!fileUrl) {
        onError(new FieldNoDataError(null, 'fileUrl'));
        return;
    }

    if (!isValidUrl(fileUrl)) {
        onError(new FieldDataError(`Некорректная ссылка на файл '${fileUrl}'!`, 'fileUrl'));
        return;
    }


    // Getting the session

    setLoading();
    remResponse();

    try {

        // Updating the data

        updGreenapi();


        // Getting the chatId

        let chatId = await getChatIdByPhoneNumber(phone);

        if (!chatId) {
            console.log(`API: The chat with the phone number '${phone}' was not found: Falling back to '${phone + DEFAULT_CHAT_ID_POSTFIX}'`);
            chatId = phone + DEFAULT_CHAT_ID_POSTFIX;
        }


        setResponse(await sendFileByUrl({ chatId, fileUrl, fileName }));
    } catch (e) {
        onError(e);
    } finally {
        setLoading(false)
    }
}

export function onGreenapiApiError(e) {
    const response = e.response ?? {};
    const data = response.data ?? null;
    const message = data?.message ?? null;


    // Logging the error

    err(e);


    if (message)
        alert(message);
    else
        alert('Неизвестная ошибка: ' + e.message || 'Unknown Error');
}

export function onAxiosError(e) {

    // Guessing the error

    const response = e.response ?? {};
    const data = response.data ?? null;
    const isGreenapiError = !!data?.message;


    // If the error is known

    if (isGreenapiError) {
        onGreenapiApiError(e);
        return;
    }


    err(e);

    alert('Неизвестная ошибка: ' + e.message || 'Unknown Error')
}

export function onError(e) {
    const { AxiosError } = axios;


    // Guessing the error

    const isNoData = e instanceof FieldNoDataError;

    const isDataError = e instanceof FieldDataError;

    const isAxiosError = e instanceof AxiosError;


    // If the error is known

    if (isNoData) {
        alert(`Поле '${e.field || '?'} не заполнено!`);
        return;
    }

    if (isDataError) {
        alert(e.message ?? `Поле '${e.field || '?'} некорректно!`);
        return;
    }

    if (isAxiosError) {
        onAxiosError(e);
        return;
    }


    err(e);

    alert('Неизвестная ошибка: ' + e.message || 'Unknown Error')
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

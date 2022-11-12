import {type Writable, writable } from 'svelte/store';

type Message = {
    message: string;
    type: 'info' | 'error' | 'success';
}

export const pushMessage: Writable<Message> = writable({
    message: '',
    type: 'info',
});

export const setMessage = (message_: Message) => {
    let { message, type } = message_;
    pushMessage.set({
        message,
        type
    });
    let t = setTimeout(() => {
        pushMessage.set({
            type: 'info',
            message: '',
        });
        clearTimeout(t);
    }, 3000);
}
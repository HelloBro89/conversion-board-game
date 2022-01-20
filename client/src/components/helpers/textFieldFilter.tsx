import { ChangeEvent, KeyboardEvent, RefObject } from 'react';

export const textFieldFilter = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nickValue = e.currentTarget.value.trim();
    if (nickValue.length > 15) {
        alert('Maximum number of characters 20');
        return nickValue.slice(0, nickValue.length - 1);
    }
    return nickValue;
};

export const eventCode = (e: KeyboardEvent, enterRef?: RefObject<HTMLAnchorElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        if (enterRef) {
            const refElem = enterRef.current as HTMLElement;
            refElem.click();
        }
    } else if (e.code === 'Space') {
        alert('The space character is not allowed!');
    }
    // return;
};

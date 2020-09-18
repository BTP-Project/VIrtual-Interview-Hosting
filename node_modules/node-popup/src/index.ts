import { customized } from './customized.ts';
import {
    CONFIRM_PAGE,
    PROMPT_PAGE,
    CHOOSE_PAGE,
    CHOOSE_DROPDOWN_PAGE,
    CHOOSE_MULTIPLE_PAGE
} from './pages.ts';
export const alert = customized({title: 'Alert' });
export const confirm = customized({ pageBody: CONFIRM_PAGE, title:'Confirm'});
export const prompt = customized({ pageBody: PROMPT_PAGE, title: 'Prompt'});
export const choose = customized({ pageBody: CHOOSE_PAGE, title: 'Choose'});
export const choosedropdown = customized({ pageBody: CHOOSE_DROPDOWN_PAGE, title: 'Choose'});
export const choosemultiple = customized({ pageBody: CHOOSE_MULTIPLE_PAGE, title: 'Choose Multiple'});
export { customized };

import { readFileSync } from 'fs';
import { join } from 'path';
import carlo from 'carlo';
import { ALERT_PAGE } from './pages.ts';
interface optionsType {
    pageBody: string,
    style: string,
    top: number,
    left: number,
    width: number,
    height: number,
    title: string
}

const defaultStyle = readFileSync(join(__dirname,'../static/style.css'),'utf8');

const defaultOptions: optionsType = {
    pageBody: ALERT_PAGE,
    style: defaultStyle,
    top: 0,
    left: 0,
    width: 192 * 2,
    height: 108 * 2,
    title: '?'
};

const customized = ({
    pageBody = defaultOptions.pageBody,
    style = defaultOptions.style,
    top = defaultOptions.top,
    left = defaultOptions.left,
    width = defaultOptions.width,
    height = defaultOptions.height,
    title = defaultOptions.title
}: optionsType = defaultOptions) => async (message:string|number, ...rest:(string|number)[]) => new Promise(async (resolve, reject) => {
    const app = await carlo.launch();
    app.serveFolder(join(__dirname, '..', 'static'));
    await app.exposeFunction('info', () => ({
        message,
        rest,
        style,
        title
    }));
    await app.exposeFunction('resolve', (data) => {
        resolve(data);
        app.exit();
    });
    await app.exposeFunction('reject', (data) => {
        reject(data);
        app.exit();
    });
    const window = app.mainWindow();
    window.setBounds({
        top,
        left,
        width,
        height
    });
    window.onbeforeunload = () => reject(new Error('window unloaded'));
    await app.load(pageBody);
});


export { customized };

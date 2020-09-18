const res = (...value)=>{
    window.onbeforeunload = ()=>{};
    resolve(...value);
};

const rej = (error)=>{
    window.onbeforeunload = ()=>{};
    reject(error);
};

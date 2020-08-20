import {useState} from 'react';

const useDataPaypal=()=>{
    const [details, setDetails] = useState(false);
    const [error, setError] = useState(false);
    const [isReady, setIsready] = useState(false);

    return {details,error,setDetails,setError,isReady,setIsready};
}

export {useDataPaypal};
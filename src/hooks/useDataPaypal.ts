import {useState} from 'react';

const useDataPaypal=()=>{
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [isReady, setIsready] = useState(false);

    return {paidFor,error,setPaidFor,setError,isReady,setIsready};
}

export {useDataPaypal};
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import API from "../../../common-functions/apiEndpoints";
import { saveWatchedMediaIds, saveWishMediaIds } from "../../../common-functions/functions";

function useManageUserDetails(){
    const [message, setMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const inputData = useRef({});

    useEffect(() => {
        const messageTimer = setTimeout(() => {
            if(message) setMessage();
        }, 2000);

        return () => clearTimeout(messageTimer);
    }, [message])

    function handleInput(e){
        const field = e.target.name;
        const value = e.target.value;
        
        inputData.current[field] = value;

        // https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if(
            field === 'email' &&
            !emailRegex.test(value)
        ){
            return setErrorMessage('Invalid Email');
        } else{
            setErrorMessage();
        }

        if(
            field.includes('word') &&
            value.length < 6
        ){
            return setErrorMessage('Password must be 6 character long');
        } else{
            setErrorMessage();
        }



        if(
            field === 'confirmPassword' &&
            (inputData.current.password !== inputData.current.confirmPassword)
        ){
            return setErrorMessage('Password Not Matching');
        } else{
            setErrorMessage();
        }

    }

    function isInputValid(type){
        if(errorMessage) return false;
        if(Object.keys(inputData.current).length < 2) return false;
        if(
            type === 'register' &&
            inputData.current.password !== inputData.current.confirmPassword
        ) return false;

        return true;
    }

    function handleSubmit(action, e){
        e.preventDefault();
        console.log(action);
        console.log(inputData.current);
        console.log('login api request');
        
        console.log(errorMessage);
        if(!isInputValid()) return;

        axios.post(API.user[action], inputData.current)
        .then((res) => {
            console.log(res);

            if(+res.status === 200){
                localStorage.setItem('userId', res.data.userDetails._id);
                localStorage.setItem('username', res.data.userDetails.name);
                localStorage.setItem('email', res.data.userDetails.email);
                
                window.location.href = '/profile';
            }

            setMessage(res.data.message);
        })
        .then(() => {
            saveWatchedMediaIds();
            saveWishMediaIds();
        })
        .catch((err) => {
            console.log({ isError: err })
            if(err.isAxiosError && err.response.status === 401){
                setMessage(err.response.data.message);
            }
        });

    }
    
    return {
        handleInput, handleSubmit, 
        errorMessage, message
    };
}

export default useManageUserDetails;

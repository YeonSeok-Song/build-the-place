import React from 'react';

export const Edit = () => {

    function clickHandler(e) {
        e.preventDefault();
        window.location.href = "/edit"
    }

    return (
        <div className='mb-2'>
            <button onClick={clickHandler}>
                Edit
            </button>    
        </div>
    );
}
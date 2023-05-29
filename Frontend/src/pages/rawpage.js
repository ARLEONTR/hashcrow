import React from 'react';
import { BrowserRouter as Router, useParams}
    from 'react-router-dom';
const RawPage = () => {

    let { hash } = useParams();

    var src2 = "https://hashed-web-page-files.s3.us-west-2.amazonaws.com/" + hash + ".html"

    return (

        <>
            <iframe style={{width:"100%", height:"1000px"}} src={src2} title="description"></iframe>
        </>

    );
};

export default RawPage;


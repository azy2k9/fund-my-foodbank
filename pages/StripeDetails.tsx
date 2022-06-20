import React from 'react';
import htmlFile from './stripe-template.html';

const StripeDetailts = () => {
    return <div dangerouslySetInnerHTML={{ __html: htmlFile }} />;
};

export default StripeDetailts;

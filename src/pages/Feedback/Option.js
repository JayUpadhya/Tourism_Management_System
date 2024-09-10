import React from "react";
import { useNavigate } from 'react-router-dom';


const Option = () => {

    const navigate = useNavigate();
    const handleTravelGuideFeedbackClick = () => {
        navigate(`/Feedback1`);
    };
    const handleServiceFeedbackClick = () => {
        navigate(`/ServiceFeedback`);
    };
    return(
        
        <body>
        
            <section class="option">
            <h1 class="title">Select the option you wish to proceed</h1>
            <div class="Optioncontainer">
                
                <button class="primary__btn" onClick={handleTravelGuideFeedbackClick}>Travel Guide Feedback</button>
                <button class="primary__btn" id="servicebutton" onClick={handleServiceFeedbackClick}>Service Feedback</button>
                
            </div>
            </section>
            
            
    </body>
        
    )

}
export default Option;

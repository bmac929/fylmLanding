import React, {useEffect} from "react";
import Steps from "../../components/submissionSteps.jsx";
import Nav2 from "../../components/nav2.jsx";
import ProductionDetails from "../../components/productionDetails.jsx";
import CastCrew from "../../components/castCrew.jsx";
import FestivalAwards from "../../components/festivalAwards.jsx";

export default function SubmissionProduction(){
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return(
        <div style={{ backgroundColor: "#160016" }}>
        <br />
        <br />
        <br />
        <Steps num={4}/>
        <br />
        <br />
        <ProductionDetails /> 
        <br />
        <hr style={{ width: "35vw", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
        <br />
        <FestivalAwards />
        <br />
        <hr style={{ width: "100", color: "#654265", backgroundColor: "#654265", height:"1px", margin:"auto" }} />
        <br />
      </div>
    )
}
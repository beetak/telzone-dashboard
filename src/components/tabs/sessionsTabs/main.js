import { useState } from "react";
import SessionCreate from "./createSession/createSessions";
 // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency

export default function SessionDetails(){
    
    const [tabState, setTabState] = useState('')

        let tabinfo
        
        if (tabState === 'sessions') {
          tabinfo = <SessionCreate/>;
        } 
        else {
          tabinfo = <SessionCreate/>;
        } 

        return(
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="row">
                            <div className="col-3">
                                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                                    <a  className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" 
                                        onClick={()=>setTabState('sessions')}
                                        style={Style2}
                                        >
                                        <div className="col-12 d-flex align-items-center">
                                            <h6 className="text-white text-capitalize ps-3">Sessions</h6>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                {tabinfo}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}


const Style1={
  textAlign:"center"
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}
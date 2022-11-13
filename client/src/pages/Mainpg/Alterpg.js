import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { collection,doc,getDoc} from "firebase/firestore";
import { db } from "../../firebase";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import { StateContext } from "../../contexts/StateContext";

const Alterpg = () => {
  const [position, setPosition] = useState("top-start");
  const [suggestion, setSuggestion] = useState([]);
  const [update, setUpdate] = useState([]);
  const state = React.useContext(StateContext);
  const updates = state.updates;

  const fetchData = async () => {
    setSuggestion([]);
    const docSnap = await getDocs(collection(db, "suggestions"));
    docSnap.forEach((doc) => {
      setSuggestion((prev) => {
        return [...prev, doc.data()];
      });
    });
    // console.log(suggestion);
    const docSnap2 = await getDoc(doc(db, "updates",'update'));
    setUpdate(docSnap2.data().update);

  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    
      <div>
        <HeaderBar title="Suggestions" button={false} link="" />
        <div
          aria-live="polite"
          aria-atomic="true"
          className="position-relative"
          style={{ minHeight: "240px" }}
        >
          <ToastContainer position="top-end" className="p-3">
            {suggestion ? (
              suggestion.map((item, id) => {
                if (id < 5) {
                  return (
                    <Toast>
                      <Toast.Header closeButton={false}>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />

                        <small>{item.name}</small>
                      </Toast.Header>
                      <Toast.Body>{item.suggestion}</Toast.Body>
                    </Toast>
                  );
                }
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  margin: "1rem auto",
                  height: "30vh",
                  background: "white",
                  color: "rgb(69, 69, 69)",
                }}
              >
               No suggestions
              </div>
            )}
          </ToastContainer>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <HeaderBar title="Updates" button={false} link="" />
        <div
          aria-live="polite"
          aria-atomic="true"
          className="position-relative"
          style={{ minHeight: "240px" }}
        >
        <ToastContainer position="top-end" className="p-3">
        {update? (update.sort((a,b)=>b.time-a.time).map((item,id)=>{
          if(id<5){
            return(
              <Toast>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                
                <strong className="me-auto">{item.name}</strong>
                <small>{item.time}</small>
              </Toast.Header>
              <Toast.Body>New {item.type} added </Toast.Body>
            </Toast>
            )
          }
        })):(<>
 <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            margin: "1rem auto",
            height: "30vh",
            background: "white",
            color: "rgb(69, 69, 69)",
          }}
        >
          No updates
        </div>
        </>)}
       </ToastContainer>
       </div>
      </div>
    </>
  );
};

export default Alterpg;

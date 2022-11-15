import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import "./BatchWiseConnect.css";
import { useAuth } from "../../contexts/Authcontext";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import NavbarrBeforeLogin from "../../components/Navbar/NavbarrBeforeLogin";

const BatchWiseConnect = () => {
  const [batch, setBatch] = useState([]);
  const { currentUser } = useAuth();
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    setBatch([]);
    const docSnap = await getDocs(collection(db, "batch"));
    docSnap.forEach((doc) => {
      setBatch((prev) => {
        return [...prev, doc.id];
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {currentUser ? <NavbarrAfterLogin /> : <NavbarrBeforeLogin />}

      <div className="batch_container">
        <h3 className="batch_heading">Connect</h3>
        <div className="batch_card_container">
          {batch.map((item) => {
            return (
              <div>
                <Card>
                  <Card.Header>Batch of {item}</Card.Header>
                  <Card.Body>
                    <Card.Text>Connect with {item} batch users.</Card.Text>
                    {currentUser ? (
                      <Link className="event_card_link" to={`/connect/${item}`}>
                        <Button>View All</Button>
                      </Link>
                    ) : (
                      <Link className="event_card_link" to="/signup">
                        <Button>View All</Button>
                      </Link>
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BatchWiseConnect;

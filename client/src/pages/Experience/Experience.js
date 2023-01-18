import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authcontext";
import { db, storage } from "../../firebase";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./Experience.css";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc, getDoc, setDoc, arrayUnion } from "firebase/firestore";

const Experience = () => {
  const { currentUser } = useAuth();
  const history = useNavigate();
  const [experience, setExperience] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const formHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    experience[e.target.id] = e.target.value;
    setExperience({ ...experience, experience });
  };

  const fetchdata = async () => {
    const docRef = doc(db, "experience", "exp");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setExperienceList(docSnap.data().content);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const dataupload = async (url) => {
    const docRef = await updateDoc(doc(db, "experience", "exp"), {
      content: arrayUnion(
        ...[
          {
            title: experience.title,
            image: url,
            desc: experience.desc,
          },
        ]
      ),
    })
      .then(function (res) {
        <Alert variant="success">data saved</Alert>;
      })
      .catch(async (err) => {
        const docRef = await setDoc(doc(db, "experience", "exp"), {
          content: [
            {
              title: experience.title,
              image: url,
              desc: experience.desc,
            },
          ],
        })
          .then((res) => {
            <Alert variant="success">data saved</Alert>;
          })
          .catch((err) => {
            setError("");
            setError("Some error occured. Please retry.");
          });
      });
  };
  const uploadFiles = (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `/exp/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("true");
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            dataupload(url);
          });
        }
      );
      setImage("");
      setExperience({
        title: "",
        desc: "",
        image: "",
      });
      setLgShow(false);
      setProgress(0);
    } else {
      setError("Please upload a file");
    }
  };

  return (
    <>
      <NavbarrAfterLogin />
      <div className="experience_cont">
        {error && <Alert variant="danger">{error}</Alert>}
        <h4>Articles / Stories</h4>
        <Button
          style={{ margin: "1rem" }}
          onClick={() => setLgShow(true)}
          className="me-2"
        >
          Add Article/Story
        </Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add Any Article/ Story
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={uploadFiles}
            >
              <Form.Group className="mb-3 form_group" controlId="formBasicName">
                <Form.Label>
                  <h5>Title</h5>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  placeholder="title"
                  onChange={handleChange}
                  required
                />

                <Form.Label>
                  <h5>Image</h5>
                </Form.Label>

                <div>
                  <input type="file" onChange={formHandler} />
                  <progress value={progress} max="100" />
                  <p style={{ float: "left" }}>Progress : {progress} % </p>
                  <br></br>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 form_group" controlId="formBasicName">
                <Form.Label>
                  <h5>Description</h5>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="desc"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" id="form_button">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <div className="expList_section">
          {experienceList ? (
            experienceList.map((exp, id) => {
              return (
                <div className="card_divContainer">
                  <Card>
                    <Card.Body style={{ background: "rgb(240, 240, 240)" }}>
                      <div className="cardexp_container">
                        <div className="card_img">
                          <img src={exp.image} alt="exp" />
                        </div>
                        <div className="card_content">
                          <h3>{exp.title}</h3>
                          {exp.desc.length > 200 ? (
                            <p style={{ textAlign: "left" }}>
                              {exp.desc.substring(0, 200)}...
                            </p>
                          ) : (
                            <p>{exp.desc}</p>
                          )}
                          <Link to={`/exp/${id}`}>
                            <Button variant="primary">Read more</Button>
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Experience;

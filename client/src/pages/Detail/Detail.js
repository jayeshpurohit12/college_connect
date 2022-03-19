import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Detail.css";
// import {setDoc, Firestore} from "firebase/firestore";
import { useAuth } from "../../contexts/Authcontext";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [profile, setProfile] = useState({
    category: "",
    name: "",
    yop: "",
    linkedin: "",
    git: "",
    phone: "",
    location: "",
    dob: "",
    gender: "",
    skills: "",
    college: "",
    std: "",
    end: "",
    company: "",
    tech: "",
    position: "",
    desc: "",
    summary: "",
  });

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const formHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    profile[e.target.id] = e.target.value;
    setProfile({ ...profile, profile });
  };
  const dataupload = async (url) => {
    const docRef = await updateDoc(doc(db, "users", currentUser.uid), {
      name: profile.name,
      yop: profile.yop,
      linkedin: profile.linkedin,
      git: profile.git,
      phone: profile.phone,
      location: profile.location,
      dob: profile.dob,
      gender: profile.gender,
      skills: profile.skills,
      std: profile.std,
      end: profile.end,
      company: profile.company,
      tech: profile.tech,
      position: profile.position,
      desc: profile.desc,
      summary: profile.summary,
      specialisation: profile.specialisation,
      degree: profile.degree,
      image: url,
    })
      .then(function (res) {
        alert("data saved");
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadFiles = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `/image/${image.name}`);
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
    setProgress(0);
    setProfile({
      category: "",
      name: "",
      yop: "",
      linkedin: "",
      git: "",
      phone: "",
      location: "",
      dob: "",
      gender: "",
      skills: "",
      std: "",
      end: "",
      company: "",
      tech: "",
      position: "",
      desc: "",
      summary: "",
    });
  };

  return (
    <>
      {/* Name section */}

      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        onSubmit={uploadFiles}
      >
        <h1 id="heading">Profile</h1>
        <div className="main_section">
          <div className="left_section">
            <div className="inner_sections">
              <Form.Group className="mb-3 form_group" controlId="formBasicName">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <div className="inline_input">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="Name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Form.Label>Year of passing out</Form.Label>
                    <Form.Control
                      type="date"
                      id="yop"
                      placeholder="YOP"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <Form.Label>Linkedin Profile</Form.Label>
                <Form.Control
                  type="text"
                  id="linkedin"
                  placeholder="Linkedin Profile"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Github Profile</Form.Label>
                <Form.Control
                  type="text"
                  id="git"
                  placeholder="Github Profile"
                  onChange={handleChange}
                  required
                />
                <Form.Label>Profile image</Form.Label>
                <input type="file" onChange={formHandler} />
                <progress value={progress} max="100" />
                <p style={{ float: "left" }}>Progress : {progress} % </p>
                <br></br>
              </Form.Group>
            </div>
            <div className="inner_sections">
              <Form.Group
                className="mb-3 form_group"
                controlId="formBasicNumber"
              >
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="inner_sections">
              <Form.Group
                className="mb-3 form_group"
                controlId="formBasicLocation"
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="inline_input">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      id="location"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Form.Label>DOB</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="DOB"
                      id="dob"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="inner_sections">
              <Form.Group
                className="mb-3 form_group"
                controlId="formBasicPassword"
              >
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          {/* Contact info */}
          <div className="right_section">
            {/* Expertise */}
            <Form.Group
              className="mb-3 form_group"
              controlId="formBasicExpertise"
            >
              <Form.Label>Expertise (Enter Seperated by ,)</Form.Label>
              <Form.Control
                type="text"
                id="skills"
                placeholder="Skills"
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Basic Info */}

            <Form.Group className="mb-3 form_group" controlId="formBasicName">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="summary"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 form_group" controlId="formBasicName">
              <Form.Label>Education</Form.Label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="inline_input">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Degree"
                    id="degree"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Specialisation"
                    id="specialisation"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="inline_input">
                  <Form.Label>Starting Year</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Starting Year"
                    id="std"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Form.Label>Ending Year</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ending Year"
                    id="end"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3 form_group"
              controlId="formBasicCompany"
            >
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company_Name"
                id="company"
                onChange={handleChange}
                required
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="inline_input">
                  <Form.Label>Tech stack</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tech_stack"
                    id="tech"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Form.Label>Your Position</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Position"
                    id="position"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="desc"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="submit" id="form_button">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default Detail;

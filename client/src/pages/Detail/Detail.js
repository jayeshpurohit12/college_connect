import React, { useState,useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Detail.css";
import { useAuth } from "../../contexts/Authcontext";
import { db, storage } from "../../firebase";
import { Alert} from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc,getDoc} from "firebase/firestore";

const Detail = () => {
  const { currentUser } = useAuth();
  const history = useNavigate();
  const [profile, setProfile] = useState({
    category: "",
    name: "",
    linkedin: "",
    git: "",
    phone: "",
    location: "",
    dob: "",
    gender: "",
    skills: [],
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
  const [error,setError]=useState("");
  const [selectgen,setSelectgen]=useState(false);
  
  const [file_input_display,setFile_input_display]=useState("none");

  const formHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    if(e.target.id==="skills" && e.target.value){
    profile[e.target.id] = e.target.value.split(",");
    }
    else{
      profile[e.target.id] = e.target.value 
    }
    setProfile({ ...profile, profile });
  };
  
  const fetchdata = async () => {
   
      if(profile.gender === '1')setSelectgen(true)
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProfile(docSnap.data());
    }
  };
  useEffect(() => {
    fetchdata();
  } ,[]);
    console.log(selectgen) 
  const dataupload = async (url) => {
    const docRef = await updateDoc(doc(db, "users", currentUser.uid), {
      name: profile.name,
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
        <Alert variant="success">data saved</Alert>;
        history("/");
      })
      .catch((err) => {
        setError("");
        setError("Some error occured. Please retry.");
      });
  };
  const uploadFiles = (e) => {
    e.preventDefault();
    if(image){
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
    }
    else if(profile.image){
      dataupload(profile.image);
      setImage("");
      setProgress(0);
    }
    else{
      setError("Please upload a file");
    }
    // setProfile({
    //   category: "",
    //   name: "",
    //   linkedin: "",
    //   git: "",
    //   phone: "",
    //   location: "",
    //   dob: "",
    //   gender: "",
    //   skills: [],
    //   std: "",
    //   end: "",
    //   company: "",
    //   tech: "",
    //   position: "",
    //   desc: "",
    //   summary: "",
    // });
  };

  return (
    <>
      {/* Name section */}
      {error && <Alert variant="danger">{error}</Alert>}
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
               
                 
                    <Form.Label><h5>Name</h5></Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="Name"
                      onChange={handleChange}
                      defaultValue={profile.name}
                      required
                    />
                 
             
                <Form.Label><h5>Linkedin Profile</h5></Form.Label>
                <Form.Control
                  type="text"
                  id="linkedin"
                  placeholder="Linkedin Profile"
                  onChange={handleChange}
                  defaultValue={profile.linkedin}
                  required
                />
                <Form.Label><h5>Github Profile</h5></Form.Label>
                <Form.Control
                  type="text"
                  id="git"
                  placeholder="Github Profile"
                  onChange={handleChange}
                  defaultValue={profile.git}
                  required
                />
                <Form.Label><h5>Profile image</h5></Form.Label>
                {(profile.image === undefined || !profile.image)?(
                  <div style={{display:'block'}}>
                  <input type="file" onChange={formHandler} />
              <progress value={progress} max="100" />
              <p style={{ float: "left" }}>Progress : {progress} % </p>
              <br></br>
                </div>
                ) :(
                  
                  <div>
                  <a href={profile.image} target="_blank">profile.png</a>
                  <Button style={{marginLeft:"1rem"}} onClick={()=>{
                    setFile_input_display("block");
                  }}>Upload Another image</Button>
                  <div style={{display:`${file_input_display}`}}>
                  <input type="file" onChange={formHandler} />
              <progress value={progress} max="100" />
              <p style={{ float: "left" }}>Progress : {progress} % </p>
              <br></br>
                  </div>
                </div>
                )}
                
              </Form.Group>
            </div>
            <div className="inner_sections">
              <Form.Group
                className="mb-3 form_group"
                controlId="formBasicNumber"
              >
                <Form.Label><h5>Phone No</h5></Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  placeholder="Phone number"
                  defaultValue={profile.phone}
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
                    <Form.Label><h5>Location</h5></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      id="location"
                      onChange={handleChange}
                      defaultValue={profile.location}
                      required
                    />
                  </div>
                  <div>
                    <Form.Label><h5>DOB</h5></Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="DOB"
                      id="dob"
                      onChange={handleChange}
                      defaultValue={profile.dob}
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
                <Form.Label><h5>Gender</h5></Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="gender"
                  onChange={handleChange}
                  required
                  >
                
                  <option selected={selectgen} value="1">Male</option>
                  <option selected={!selectgen} value="2">Female</option>
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
              <Form.Label><h5>Expertise (Enter Seperated by ,)</h5></Form.Label>
              <Form.Control
                type="text"
                id="skills"
                placeholder="Skills"
                onChange={handleChange}
                defaultValue={profile.skills}
                required
              />
            </Form.Group>

            {/* Basic Info */}

            <Form.Group className="mb-3 form_group" controlId="formBasicName">
              <Form.Label><h5>Summary</h5></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="summary"
                onChange={handleChange}
                defaultValue={profile.summary}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 form_group" controlId="formBasicName">
              <Form.Label><h5>Education</h5></Form.Label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="inline_input">
                  <Form.Label><h5>Degree</h5></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Degree"
                    id="degree"
                    onChange={handleChange}
                    defaultValue={profile.degree}
                    required
                  />
                </div>
                <div>
                  <Form.Label><h5>Specialisation</h5></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Specialisation"
                    id="specialisation"
                    onChange={handleChange}
                    defaultValue={profile.specialisation}
                    required
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="inline_input">
                  <Form.Label><h5>Starting Year</h5></Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Starting Year"
                    id="std"
                    onChange={handleChange}
                    defaultValue={profile.std}
                    required
                  />
                </div>
                <div>
                  <Form.Label><h5>Ending Year</h5></Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ending Year"
                    id="end"
                    onChange={handleChange}
                    defaultValue={profile.end}
                    required
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3 form_group"
              controlId="formBasicCompany"
            >
              <Form.Label><h5>Company</h5></Form.Label>
              <Form.Control
                type="text"
                placeholder="Company_Name"
                id="company"
                onChange={handleChange}
                defaultValue={profile.company}
                required
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="inline_input">
                  <Form.Label><h5>Tech Stack</h5></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tech_stack"
                    id="tech"
                    onChange={handleChange}
                    defaultValue={profile.tech}
                    required
                  />
                </div>
                <div>
                  <Form.Label><h5>Your Position</h5></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Position"
                    id="position"
                    onChange={handleChange}
                    defaultValue={profile.position}
                    required
                  />
                </div>
              </div>
              <Form.Label><h5>Description</h5></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="desc"
                onChange={handleChange}
                defaultValue={profile.desc}
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

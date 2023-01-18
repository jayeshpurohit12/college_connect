import React, { Profiler, useEffect, useState,useContext} from "react";
import "./Achievements.css";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import NavbarrBeforeLogin from "../../components/Navbar/NavbarrBeforeLogin";
import Achievements_heading_bg from "../../images/Achievements_heading_bg.png";
import AchievementsContainer from "../../components/AchievementsContainer/AchievementsContainer";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Dropdown, Form, Spinner } from "react-bootstrap";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { useAuth } from "../../contexts/Authcontext";
import { StateContext } from "../../contexts/StateContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%",
  },
}));

const Achievements = () => {
  var F = "Faculty";

  var A = "Alumni";

  var S = "Student";

  let name, value;

  const [details, setDetails] = useState({
    name: "",
    award: "",
    expertise: "",
    image: "",
    category: "",
  });

  const [loader, setLoder] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const state=useContext(StateContext);
  const profile= state.profile;
  const {currentUser}= useAuth();
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoder(true);
    const storageRef = ref(storage, `achievements/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          postCreated(url);
        });
      }
    );
  };

  const postCreated = async (url) => {
    const { name, award, expertise, category } = details;

    setLoder(true);
    const res = await fetch("/achievements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        award,
        expertise,
        image: url,
        category,
      }),
    });
    const data = await res.json();

    console.log(data);

    if (!data || data.status === 422) {
      toast.error(" Filled The details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoder(false);
      console.log("Please fill all the fields");
    } else {
      if (name && award && category && expertise) {
        alert("Achievement Added....");
        setLoder(false);
        setDetails({
          name: "",
          award: "",
          category: "",
          expertise: "",
        });
        console.log("Achievement Added....");

        handleClose();
      }
    }
  };
  const fetchData = async () => {
    const res = await fetch("/achievement");
    const achievementData = await res.json();
    if (achievementData) {
      console.log(achievementData);
      setAchievements(achievementData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {currentUser?<NavbarrAfterLogin />:<NavbarrBeforeLogin />}
      <div className="Achievements_heading_container">
        <img
          className="Achievements_bg_img"
          src={Achievements_heading_bg}
          alt="Achievements"
        />
        <h1 className="achievements_heading">ACROPOLIS ACHIEVEMENTS</h1>
      </div>

      <div className="achievement_create_post">
      {(currentUser && profile.category==="teacher")?<Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Achievement
        </Button>:<></>}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ marginBottom: "1.5rem" }}>
              Add New Achievement
            </h2>
            <Form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
            >
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
                required
              />

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label style={{ marginBottom: "-1rem" }}>
                  Enter Name
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  value={details.name}
                  type="text"
                  name="name"
                  placeholder="Enter Name..."
                  required
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAward">
                <Form.Label style={{ marginBottom: "-1rem" }}>
                  Award Name
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  value={details.award}
                  type="text"
                  name="award"
                  placeholder="Award Name..."
                  required
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUrl">
                <Form.Label style={{ marginBottom: "-1rem" }}>
                  Expertise
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  value={details.expertise}
                  type="text"
                  name="expertise"
                  placeholder="Ex: Machine Learning, Deep Learning...."
                  required
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group controlId="formBasicSelect">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={details.category}
                  name="category"
                  onChange={handleInput}
                >
                  <option value="Alumni">Alumni</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Student">Student</option>
                </Form.Control>
              </Form.Group>
              {loader ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ display: "flex", margin: "2rem auto auto auto" }}
                >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ display: "flex", margin: "2rem auto auto auto" }}
                >
                  Create Achievements
                </Button>
              )}
            </Form>
            <ToastContainer />
          </div>
        </Fade>
      </Modal>

      <div className="Achievements_inner_container">
        <Link to={`/AchievementsInnerPage?keyword=${F}`}>
          <AchievementsContainer heading="FACULTY" />
        </Link>
        <Link to={`/AchievementsInnerPage?keyword=${A}`}>
          <AchievementsContainer heading="ALUMNI" />
        </Link>
        <Link to={`/AchievementsInnerPage?keyword=${S}`}>
          <AchievementsContainer heading="STUDENTS" />
        </Link>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Achievements;

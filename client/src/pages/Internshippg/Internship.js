import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import "./Internship.css";
import CardWithBorder from "../../components/Cards/CardWithBorder";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import NavbarrBeforeLogin from "../../components/Navbar/NavbarrBeforeLogin";
import Footer from "../../components/Footer/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Form, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/Authcontext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { StateContext } from "../../contexts/StateContext";
import SearchIcon from "@material-ui/icons/Search";

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

export default function Opportunitypg() {
  const [details, setDetails] = useState({
    name: "",
    batch: "",
    positionLink: "",
    image: "",
    date: "",
  });

  const [loader, setLoder] = useState(false);

  const [progress, setProgress] = useState(0);

  const [image, setImage] = useState(null);

  const [intern, setIntern] = useState([]);

  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();
  const state = useContext(StateContext);
  const profile = state.profile;

  let name, value;

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
    const storageRef = ref(storage, `internship/${image.name}`);
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
    const { name, date, batch, positionLink } = details;

    setLoder(true);
    const res = await fetch("/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        batch,
        positionLink,
        date,
        image: url,
      }),
    });
    const data = await res.json();

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
      if (name && date && batch && positionLink) {
        alert("Internship Created....");
        try {
          const r = new Date();

          await updateDoc(doc(db, "updates", "update"), {
            update: arrayUnion(
              ...[
                {
                  name: name,
                  type: "Internship",
                  time: r.toJSON().slice(0, 10).split("-").reverse().join("/"),
                },
              ]
            ),
          })
            .then((res) => {
              //console.log(res);
            })
            .catch(async (err) => {
              await setDoc(doc(db, "updates", "update"), {
                update: [
                  {
                    name: name,
                    type: "Internship",
                    time: r
                      .toJSON()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/"),
                  },
                ],
              })
                .then((res) => {
                 // console.log(res);
                })
                .catch((err) => {
                  //console.log(err);
                });
            });
        } catch (err) {
         // console.log(err);
        }
        setLoder(false);
        setDetails({
          name: "",
          batch: "",
          positionLink: "",
          date: "",
        });
        console.log("Internship posted successfully");

        handleClose();

        window.location.reload();
      }
    }
  };
  const fetchData = async () => {
    var date = "";
    var month = "";
    var year = "";
    const d = new Date();
    const res = await fetch("/internships");
    const interndata = await res.json();
    interndata.map((item) => {
      date = item.date.slice(8, 10);
      month = item.date.slice(5, 7);
      year = item.date.slice(0, 4);
      if (
        parseInt(year) < d.getFullYear() ||
        (parseInt(year) === d.getFullYear() &&
          parseInt(month) < d.getMonth() + 1) ||
        (parseInt(year) === d.getFullYear() &&
          parseInt(month) === d.getMonth() + 1 &&
          parseInt(date) < d.getDate())
      ) {
        //console.log(item.date);
      } else {
        setIntern((prevData) => {
          return [...prevData, item];
        });
      }
    });
    setIntern(interndata);
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
    <div>
      {currentUser ? <NavbarrAfterLogin /> : <NavbarrBeforeLogin />}
      <div className="opp_header">
        <h1 className="opp_header_heading">Internships</h1>
        {profile.category === "teacher" ? (
          <Button id="opp_header_button" onClick={handleOpen}>
            Post new internship
          </Button>
        ) : (
          <>
          </>
        )}
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
              <h2
                id="transition-modal-title"
                style={{ marginBottom: "1.5rem" }}
              >
                Add New Internship
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
                    Enter Title
                  </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    value={details.name}
                    type="text"
                    name="name"
                    placeholder="Enter title..."
                    required
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBatch">
                  <Form.Label style={{ marginBottom: "-1rem" }}>
                    Batch Eligible
                  </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    value={details.batch}
                    type="text"
                    name="batch"
                    placeholder="2023, 2024..."
                    required
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label style={{ marginBottom: "-1rem" }}>
                    Last Date to apply
                  </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    value={details.date}
                    type="date"
                    name="date"
                    required
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUrl">
                  <Form.Label style={{ marginBottom: "-1rem" }}>
                    Position Link
                  </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    value={details.positionLink}
                    type="text"
                    name="positionLink"
                    placeholder="Enter position link..."
                    required
                    onChange={handleInput}
                  />
                </Form.Group>
                {loader ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ display: "flex", margin: "auto" }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ display: "flex", margin: "auto" }}
                  >
                    Create Post
                  </Button>
                )}
              </Form>
              <ToastContainer />
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="search_container">
        <div className="search_bar_filter">
          <input
            type="text"
            placeholder="search.."
            className="input_search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <div className="search_icon">
            <SearchIcon fontSize="large" />
          </div>
        </div>
      </div>
      <div className="internship_post">
        <div className="internship_post_container">
          {intern
            .filter((internship) => {
              return (
                internship.name.toLowerCase().includes(search) ||
                internship.batch.toLowerCase().includes(search)
              );
            })
            .map((item) => (
              <div className="card_container">
                <CardWithBorder
                  width="20rem"
                  key={item._id}
                  image={item.image}
                  title={item.name}
                  content={
                    <div>
                      <p>Batch -{item.batch}</p>
                      <p>
                        Last date to apply-{" "}
                        {`${item.date.slice(8, 10)} - ${item.date.slice(
                          5,
                          7
                        )}- ${item.date.slice(0, 4)}`}
                      </p>
                      {currentUser ? (
                        <Button
                          variant="primary"
                          href={item.positionLink}
                          target="_blank"
                        >
                          Apply here
                        </Button>
                      ) : (
                        <Link to="/signup">
                          <Button>View</Button>
                        </Link>
                      )}
                    </div>
                  }
                />
              </div>
            ))}
        </div>
      </div>
      <div className="foter_container">
        <Footer />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "../../CSS/home/Callback.css";
function Callback() {
  const [formData, setFormData] = useState({
    fname: "",
    phone: "",
    message: "",
  });

const handleSubmit = ((e) => {
  e.preventDefault()
console.log(formData)
})

const handleReset = ((e) => {
  e.preventDefault();
  setFormData({ fname: "", phone: "", message: "" })
})

  const handleFormChange = ((e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: [value]
    }))
  })
  return (
    <>
      <div className="callback-main">
        <div className="callback-top">
          <h3>Request a callback</h3>
          <p>
            Provide some info about yourself to get a callback from our team.
          </p>
        </div>
        {/* <div className="line"></div> */}
        <form>
          <div className="input-fields">
            <div className="input-field">
              <i className="fa-regular fa-user"></i>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={handleFormChange}
                value={formData.fname}
                placeholder="your name"
              />
            </div>
            <div className="input-field">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handleFormChange}
                value={formData.phone}
                placeholder="phone no."
              />
            </div>
          </div>
          <div className="input-field" style={{ border: "none" }}>
            <textarea
              className="border-none"
              name="message"
              onChange={handleFormChange}
              value={formData.message}
              id="message"
              placeholder="any comment or message? type here"
              style={{ height: "100px" }}
            ></textarea>
          </div>
          <div className="callback-btn">
            <button onClick={handleSubmit} className="bg-danger text-light">Confirm</button>
            <button onClick={handleReset} className=" border border-danger bg-light text-danger">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Callback;

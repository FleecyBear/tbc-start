// import Image from "next/image.js";
import "./Profile.css";
import CustomButton from "../../components/button/button.js";

export default function Profile() {
  return (
    <div className="profile_main">
      <div className="profile_main_left">
        <img
          src={"/images/nicolascage.jpg"}
          className="profile_image"
          alt="user"
        />
        <div className="profile_info">
          <h2>Bear Cage</h2>
          <p className="profile_title">Protector of Bears</p>
          <p className="profile_location">California, U.S.</p>
        </div>
      </div>
      <div className="profile_main_right">
        <p>
          <b>First Name: </b>Nicolas
        </p>
        <p>
          <b>Middle Name: </b>Bear
        </p>
        <p>
          <b>Last Name: </b>Cage
        </p>
        <p>
          <b>Full Name: </b>Nicolas Bear Cage
        </p>
        <p>
          <b>Occupation: </b>Protector of Bears
        </p>
        <p>
          <b>Location: </b>California, U.S.
        </p>
        <p>
          <b>Email: </b>ilovebears@bears.com
        </p>
        <p>
          <b>Phone: </b>555 555 555
        </p>
        <CustomButton buttonText="Edit" />
      </div>
    </div>
  );
}

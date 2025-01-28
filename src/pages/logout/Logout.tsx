import globalStyles from "../../css/global.module.css";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "react-loading";
import userContexUpdate from "../../utils/useContextUpdate";

const Logout = () => {
  const { deleteUserContext } = userContexUpdate();
  const navigate = useNavigate();

  const uid = window.localStorage.getItem("chatDarcoUserUid");

  const handlerLogout = () => {
    uid
      ? Swal.fire({
          title: "You wanna close session?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteUserContext().then((res) => {
              !res
                ? (Swal.fire({
                    title: "Session Closed",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                  }),
                  setTimeout(() => navigate("/"), 2000))
                : (Swal.fire({
                    title: res,
                    icon: "error",
                    timer: 1000,
                  }),
                  setTimeout(() => navigate(-1), 2000));
            });
          } else {
            navigate(-1);
          }
        })
      : setTimeout(() => navigate("/"), 1000);
    return (
      <div className={globalStyles.loader}>
        <Loading type="cylon" color="green" />
      </div>
    );
  };

  return <div style={{ ...styles }}>{handlerLogout()}</div>;
};
export default Logout;
const styles = {
  width: "var(--width)",
  minWidth: "var(--min-width)",
  height: "var(--height)",
};

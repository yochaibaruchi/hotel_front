import { useForm } from "react-hook-form";
import httpService from "../app/httpService";
import { useAppDispatch } from "../app/hooks";
import { isConected } from "../features/user/user-slice";
import { AddUserId } from "../features/order/order-slice";
import { useNavigate } from "react-router-dom";
function LogIn() {
  const navigate = useNavigate();
  let http = new httpService();
  const dispatch = useAppDispatch();
  type login = {
    user_email: string;
    user_password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>();

  const onSubmit = async (userData: login) => {
    const data = await http.login(userData.user_email, userData.user_password);
    if (data?.token) {
      dispatch(
        isConected({
          country: data.user.country,
          firstName: data.user.firstName,
          lastName: data.user.last_name,
          mail: data.user.mail,
          id: data.user.id,
        })
      );
      dispatch(AddUserId(data.user.id));
      sessionStorage.setItem("key", data.token);
      navigate(-1);
    } else {
      alert(data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>email</label> <br />
      <input
        type={"email"}
        className="input"
        {...register("user_email", {
          required: true,
        })}
      />
      {errors?.user_email?.type === "required" && (
        <span className="p">This field is required</span>
      )}
      <br />
      <label>Password</label>
      <br />
      <input
        className="input"
        type={"password"}
        {...register("user_password", { required: true })}
      />
      {errors?.user_password?.type === "required" && (
        <span className="p">This field is required</span>
      )}
      <br />
      <input type={"submit"} />
    </form>
  );
}

export default LogIn;

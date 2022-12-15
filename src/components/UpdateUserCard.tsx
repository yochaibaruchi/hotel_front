import httpService from "../app/httpService";
import { useForm } from "react-hook-form";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { isConected } from "../features/user/user-slice";
const UpdateUserCard = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setMail] = useState("");
  const [country1, setCountry] = useState("");
  const fullName = useAppSelector((state) => state.user.fullName);
  const country = useAppSelector((state) => state.user.country);
  const userId = useAppSelector((state) => state.user.id);
  const mail = useAppSelector((state) => state.user.mail);
  const [flag, setFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const name = fullName?.split(" ");
    if (name !== undefined && country !== null && mail !== null) {
      setFname(name[0]);
      setLname(name[1]);
      setCountry(country);
      setMail(mail);
    }
  }, []);
  const navigate = useNavigate();
  type update = {
    first_name: string;
    last_name: string;
    user_email: string;
    user_password: string;
    password_check: string;
    user_country: string;
  };

  const onSubmit = async (userData: update) => {
    if (userData.user_password === userData.password_check) {
      setFlag(false);
      let http = new httpService();
      if (userId !== null) {
        const user = {
          userId: userId,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.user_email,
          password: userData.user_password,
          country: userData.user_country,
        };
        const response = await http.updateUser(user);
        if (response?.data === true) {
          dispatch(
            isConected({
              country: userData.user_country,
              firstName: userData.first_name,
              lastName: userData.last_name,
              id: userId,
              mail: userData.user_email,
            })
          );
          alert("updated!");
          navigate(-1);
        } else {
          alert("you need to log in to proceed");
          navigate("/login");
        }
      }
    } else setFlag(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<update>();
  return (
    <Card
      style={{ width: "30rem", backgroundColor: "darkgray", height: "30rem" }}
    >
      <Card.Body>
        <Card.Title>Sign up</Card.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <div>
              <label>First name</label> <br />
              <input
                defaultValue={fName}
                className="input"
                autoComplete="first_name"
                {...register("first_name")}
              />
              {errors?.first_name?.type === "required" && (
                <span className="p">This field is required</span>
              )}
            </div>
            <div>
              <label>Last name</label> <br />
              <input
                defaultValue={lName}
                className="input"
                autoComplete="last_name"
                {...register("last_name")}
              />
              {errors?.last_name?.type === "required" && (
                <span className="p">This field is required</span>
              )}
            </div>
            <div>
              <label>Email</label> <br />
              <input
                defaultValue={email}
                type={"email"}
                autoComplete="user_email"
                className="input"
                {...register("user_email")}
              />
              {errors?.user_email?.type === "required" && (
                <span className="p">This field is required</span>
              )}
            </div>
            <div>
              <label>country</label> <br />
              <input
                defaultValue={country1}
                className="input"
                autoComplete="user_country"
                {...register("user_country")}
              />
              {errors?.user_country?.type === "required" && (
                <span className="p">This field is required ,</span>
              )}
            </div>
            <div>
              <label> New Password</label> <br />
              <input
                type={"password"}
                autoComplete="user_password"
                className="input"
                {...register("user_password", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors?.user_password?.type === "required" && (
                <span className="p">This field is required</span>
              )}
              {errors.user_password?.type === "minLength" && (
                <span className="p">" minimum 8 characters"</span>
              )}
            </div>
            <div>
              <label>Type new password</label> <br />
              <input
                type={"password"}
                className="input"
                {...register("password_check", {
                  required: true,
                })}
              />
              {errors?.password_check?.type === "required" && (
                <span className="p">This field is required</span>
              )}
              {flag && <span className="p">passwords are not matching!</span>}
            </div>
          </div>
          <br />
          <input type={"submit"} />
        </form>
      </Card.Body>
    </Card>
  );
};

export default UpdateUserCard;

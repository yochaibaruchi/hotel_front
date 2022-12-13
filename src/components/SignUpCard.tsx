import httpService from "../app/httpService";
import { useForm } from "react-hook-form";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpcard = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  type signUp = {
    first_name: string;
    last_name: string;
    user_email: string;
    user_password: string;
    password_check: string;
    user_country: string;
  };

  const onSubmit = async (userData: signUp) => {
    if (userData.user_password === userData.password_check) {
      setFlag(false);
      let http = new httpService();
      const response = await http.signUp(userData);
      if (response.status === 201) navigate("/login");
      if (response.status === 200) alert("this email is in use");
    } else setFlag(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUp>();
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
                className="input"
                autoComplete="first_name"
                {...register("first_name", {
                  required: true,
                })}
              />
              {errors?.first_name?.type === "required" && (
                <span className="p">This field is required</span>
              )}
            </div>
            <div>
              <label>Last name</label> <br />
              <input
                className="input"
                autoComplete="last_name"
                {...register("last_name", {
                  required: true,
                })}
              />
              {errors?.last_name?.type === "required" && (
                <span className="p">This field is required</span>
              )}
            </div>
            <div>
              <label>Email</label> <br />
              <input
                type={"email"}
                autoComplete="user_email"
                className="input"
                {...register("user_email", {
                  required: true,
                })}
              />
              {errors?.user_email?.type === "required" && (
                <span className="p">This field is required</span>
              )}
            </div>
            <div>
              <label>country</label> <br />
              <input
                className="input"
                autoComplete="user_country"
                {...register("user_country", {
                  required: true,
                })}
              />
              {errors?.user_country?.type === "required" && (
                <span className="p">This field is required ,</span>
              )}
            </div>
            <div>
              <label>Password</label> <br />
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
              <label>type password</label> <br />
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

export default SignUpcard;

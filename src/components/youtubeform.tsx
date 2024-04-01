import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValue = {
  username: string;
  email: string;
  channel: string;
};

const youtubeform = () => {
  const form = useForm<FormValue>();
  const { register, control, handleSubmit } = form;
  const onSubmit = (data: FormValue) => {
    console.log("form submitted", data);
  };
  return (
    <div>
      <h1>WELCOME</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default youtubeform;

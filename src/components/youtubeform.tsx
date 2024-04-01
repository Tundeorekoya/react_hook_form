import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValue = {
  username: string;
  email: string;
  channel: string;
  age: number;
  socials: {
    Twitter: string;
    Facebook: string;
  };
  phone: string[];
  phPhone: {
    number: string;
  }[];
};

const youtubeform = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      username: "",
      email: "@email.com",
      channel: "",
      socials: {
        Twitter: "",
        Facebook: "",
      },
      phone: ["", ""],
      phPhone: [{ number: "" }],
      age: 0,
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phPhone",
    control,
  });

  const onSubmit = (data: FormValue) => {
    console.log("form submitted", data);
  };
  return (
    <div className="form-control">
      <h1>WELCOME</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a Different Email"
                );
              },
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "channel is required",
            },
          })}
        />
        <p className="error">{errors.channel?.message}</p>
        <label htmlFor="Twitter">Twitter</label>
        <input
          type="text"
          id="Twitter"
          {...register("socials.Twitter", {
            required: {
              value: true,
              message: "required",
            },
          })}
        />
        <p className="error">{errors.socials?.Twitter?.message}</p>

        <label htmlFor="Facebook">Facebook</label>
        <input
          type="text"
          id="Facebook"
          {...register("socials.Facebook", {
            required: {
              value: true,
              message: "required",
            },
          })}
        />
        <p className="error">{errors.socials?.Facebook?.message}</p>

        <label htmlFor="phone">Phone Number 1</label>
        <input
          type="text"
          id="phone"
          {...register("phone.0", {
            required: {
              value: true,
              message: "required",
            },
          })}
        />
        <label htmlFor="phone">Phone Number 2</label>
        <input type="text" id="Facebook" {...register("phone.1")} />
        <div>
          <label>List of Phone Number</label>
          <div>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  type="text"
                  {...register(`phPhone.${index}.number` as const)}
                />
                {index > 0 && (
                  <button onClick={() => remove(index)}>Remove</button>
                )}
              </div>
            ))}
            <button onClick={() => append({ number: "" })}>
              Add Phone Number
            </button>
          </div>
        </div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "age is required",
            },
          })}
        />
        <p className="error">{errors.age?.message}</p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default youtubeform;

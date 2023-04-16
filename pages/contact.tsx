import { SubmitHandler, useForm } from "react-hook-form";
import * as Separator from "@radix-ui/react-separator";
import { getStrapiURL } from "../lib/strapiApi";
import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type Inputs = {
  FirstName: string;
  LastName: string;
  Email: string;
  Message: string;
};

export default function Contacts() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("submit");
    setRecaptchaToken(token);

    fetch(getStrapiURL("/api/contact-us-forms"), {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    }).then(() => setSubmitSuccess(true));
  }, [executeRecaptcha])

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <h1 className="my-5 text-center text-5xl text-white">Reach Us</h1>
        <Separator.Root className="mb-8 h-1 w-full bg-neutral-100" />
        <div className="mb-4 whitespace-pre-wrap text-lg text-white">
          <p>
            Your queries related to our solutions or collaboration invitation can be submitted through the form below:
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-6 w-full">
              <label htmlFor="first_name" className="mb-2 block text-sm font-medium text-white">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="block w-full rounded-lg border border-neutral-600 bg-neutral-700 p-2.5 text-sm text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder=" "
                required
                {...register("FirstName", { required: true })}
              />
              {errors.FirstName && (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">This field is required</span>
                </p>
              )}
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <label htmlFor="last_name" className="mb-2 block text-sm font-medium text-white">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="block w-full rounded-lg border border-neutral-600 bg-neutral-700 p-2.5 text-sm text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder=" "
                required
                {...register("LastName", { required: true })}
              />
              {errors.LastName && (
                <p className="mt-2 text-sm text-red-500">
                  <span className="font-medium">This field is required</span>
                </p>
              )}
            </div>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-lg border border-neutral-600 bg-neutral-700 p-2.5 text-sm text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder=" "
              required
              {...register("Email", { required: true })}
            />
            {errors.Email && (
              <p className="mt-2 text-sm text-red-500">
                <span className="font-medium">This field is required</span>
              </p>
            )}
          </div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            className=" mb-6 block w-full rounded-lg border border-neutral-600 bg-neutral-700 p-2.5 text-sm text-white placeholder-neutral-400 shadow-xl focus:border-blue-500 focus:ring-blue-500"
            placeholder="Leave a comment..."
            {...register("Message", { required: true })}
          ></textarea>
          {errors.Message && (
            <p className="mt-2 text-sm text-red-500">
              <span className="font-medium">This field is required</span>
            </p>
          )}
          <button
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {submitSuccess && (
          <p className="text-lg font-semibold text-green-500">Thank you for reaching out. We will get in touch
            shortly.</p>)}
      </div>
    </>
  );
}

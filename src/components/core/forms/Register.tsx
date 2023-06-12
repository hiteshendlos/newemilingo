import Link from "next/link";
import { AiOutlineContacts, AiOutlineMail, AiOutlineUserAdd } from "react-icons/ai";
import { TbPassword} from "react-icons/tb";
import { FormikHelpers, useFormik } from "formik";





import * as Yup from "yup";
import toast from "react-hot-toast";

type Props = {

};

const Register: React.FC<Props> = ({}) => {
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
    mobile: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is Required"),
    message: Yup.string().required("Message is Required"),
    email: Yup.string().email("Invalid email address").required("Email is Required"),
    password: Yup.string().required("Password is Required"),

 mobile:Yup.string().matches(/^(\+1)?\d{10}$/, "Please enter a valid mobile number")
  .required("Mobile number is required")
  });

  const onSubmit = async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
    const { fullName, email, mobile, message } = values;

    let id = toast.loading("Loading...");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(values);

    let requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://utilit.vercel.app/api/email", requestOptions)
      .then((result) => {
        console.log(result);

        toast.success("Thanks for Choosing us!", { id });

        //  Reset the form
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message, { id });
        console.log(error);
      });

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <span className="uppercase text-sm text-gray-600 font-bold">Full Name</span>

          <div className="flex flex-nowrap h-full justify-center items-center border bg-white py-0  rounded-lg">
            <AiOutlineUserAdd className="inline-block ms-5 my-2" size={22} />
            <input
              className="inline-block w-[90%] text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName ? <div className="text-red-600">{formik.errors.fullName}</div> : null}
        </div>
        <div>
          <span className="uppercase text-sm text-gray-600 font-bold">Your Email</span>

          <div className="flex flex-nowrap h-full justify-center items-center border bg-white py-0  rounded-lg">
            <AiOutlineMail className="inline-block ms-5 my-2" size={22} />
            <input
              className="inline-block w-[90%] text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              placeholder=""
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? <div className="text-red-600">{formik.errors.email}</div> : null}
        </div>
        <div>
          <span className="uppercase text-sm text-gray-600 font-bold">Contact No.</span>

          <div className="flex h-full justify-center items-center border bg-white py-0  rounded-lg flex-nowrap">
            <AiOutlineContacts className="inline-block ms-5 my-2" size={22} />
            <input
              className="inline-block w-[90%] text-gray-900  bg-white  p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
              id="mobile"
              name="mobile"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
          </div>
          {formik.touched.mobile && formik.errors.mobile ? <div className="text-red-600">{formik.errors.mobile}</div> : null}
        </div>

        <div>
          <span className="uppercase text-sm text-gray-600 font-bold">Password</span>

          <div className="flex flex-nowrap h-full justify-center items-center border bg-white py-0  rounded-lg">
            <TbPassword className="inline-block ms-5 my-2" size={22} />
            <input
              className="inline-block w-[90%] text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="password"
              placeholder=""
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          {formik.touched.email && formik.errors.email ? <div className="text-red-600">{formik.errors.password}</div> : null}
        </div>

        <div className="">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="uppercase text-sm font-bold tracking-wide bg-royalblue  hover:bg-bgblue text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline mybackgroud"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;

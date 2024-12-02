"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import {
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import { AuthService } from "@/_services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Fileinput from "@/components/ui/Fileinput";
import { DriverService } from "@/_services/driver.service";


const AddDriver = () => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    // const files = event.target.files;
    const { name, files } = event.target;
    setForm({
        ...form,
        [name]: files[0],
        // kbis: e.target.files[0]
      });
      console.log(form)
    if (files.length === 1) {
      setSelectedFile({
        ...selectedFile,
        [name]: files[0],
        // kbis: e.target.files[0]
      }); // Single file
    } else if (files.length > 1) {
      setSelectedFiles([...files]); // Multiple files
    }
  };
  const onChangeHandlerFile = (e) => {
    setForm({
      ...form,
      kbis: e.target.files[0],
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (
    //   form.name === undefined ||
    //   form.contactName === undefined ||
    //   form.addressdriver === undefined ||
    //   form.email === undefined ||
    //   form.phoneNumber === undefined ||
    //   form.siret === undefined ||
    //   form.kbis === undefined
    // ) {
    //   console.log("Please fill all required fields");
    //   return;
    // }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        form[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, form[key]);
      }
    });
console.log(formData)
    CreateDriver(formData);
  };

  const CreateDriver = (data) => {
    setIsSubmitting(true);
    DriverService.CreateDriver(data)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        // You can show a success message here
        toast.success("        driver created successfully!          ", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError( {});
        setForm({});
        router.push("/admin/conducteurs");

      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        if (error) {
          setError(error); // Assuming the backend returns an error object like { email: 'Email already exists', ... }
        }
      });
  };

  return (
    <div>
    <ToastContainer />
      <Card title="Créer un conducteur"
      headerslot={false}
      >
        <h4 className="text-slate-900 dark:text-white text-xl mb-4">#89572935Kh</h4>
        <form
          onSubmit={onSubmit}
          style={{
            padding: "20px",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
            <h4 className="text-slate-900 dark:text-white text-xl mb-4">Informations sur le conducteur</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <Textinput
                label="Nom"
                type="text"
                placeholder="Entrez le nom de la personne de contact"
                required
                name="name"
                onChange={onChangeHandler}
              />
              {error?.name && <div className="text-red-500">{error.name}</div>}
            </div>

            {/* Contact Person */}
            <div>
              <Textinput
                label="E-mail"
                type="text"
                placeholder="Entrez l'adresse e-mail de la personne de contact"
                required
                name="email"
                onChange={onChangeHandler}
              />
              {error?.email && <div className="text-red-500">{error.email}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Address */}
            <div>
            <Fileinput
            required={true}

            preview={false}
                label="K-Bis"
                type="file"
                name="kbis"
 placeholder="Select driver documents..."
                selectedFile={selectedFile?.kbis}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}
              />
              {/* {error?.addressdriver && <div className="text-red-500">{error.addressdriver}</div>} */}
            </div>
          </div>
          <h4 className="text-slate-900 dark:text-white text-xl mb-4">Driving Documents</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Email */}
            <div>
            <Fileinput
            required={true}
             placeholder="Select driver documents..."
                selectedFile={selectedFile?.permisConduirefrontCard}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}

            preview={false}
                label="Driver's license (Front card)"
                type="file"

                name="permisConduirefrontCard"

              />
            </div>

            {/* Phone Number */}
            <div>
            <Fileinput
            required={true}
             placeholder="Select driver documents..."
                selectedFile={selectedFile?.permisConduirebackCard}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}

            preview={false}
                label="Driver's license (Back card)"
                type="file"

                name="permisConduirebackCard"

              />
            </div>

          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Siret */}

            <div>
            <Fileinput
            required={true}
             placeholder="Select driver documents..."
                selectedFile={selectedFile?.assurance}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}

            preview={false}
                label="Insurance certificate"
                type="file"

                name="assurance"

              />
            </div>

          </div>
          <hr className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Email */}
            <div>
            <Fileinput
            required={true}
             placeholder="Select driver documents..."
                selectedFile={selectedFile?.CinfrontCard}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}

            preview={false}

                label="Identity document (Front card)"
                type="file"

                name="CinfrontCard"

              />
            </div>

            {/* Phone Number */}
            <div>
            <Fileinput
            required={true}
             placeholder="Select driver documents..."
                selectedFile={selectedFile?.CinbackCard}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}

            preview={false}

                label="Identity document (Back card)"
                type="file"

                name="CinbackCard"

              />
            </div>
          </div>

          <hr className="my-4" />
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Siret */}

            <div>
            <Fileinput
            required={true}
             placeholder="Select driver documents..."
                selectedFile={selectedFile?.proofOfAddress}
        // selectedFiles={selectedFiles}
                onChange={handleFileChange}

            preview={false}

                label="Proof of address"
                type="file"

                name="proofOfAddress"

              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
            {/* {isSubmitting ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : ( */}
              <Button isLoading={isSubmitting} isdi type="submit" text="Valider" className="btn-dark" />
            {/* )} */}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddDriver;

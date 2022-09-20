import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {classNames} from 'primereact/utils';

function UserDetails() {
    const router = useRouter();
    const {id} = router.query;

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '1',
            email: 'aa@bb.cc',
            phone: '1'
        },
        validate: (data) => {
            let errors = {} as any;

            if (!data.firstName) {
                errors.firstName = 'First name is required.';
            }
            if (!data.lastName) {
                errors.lastName = 'last name is required.';
            }
            if (!data.email) {
                errors.email = 'Email is required.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }
            if (!data.phone) {
                errors.phone = 'Phone number us required';
            }

            return errors;
        },
        onSubmit: (data) => {
            axios.post(`${process.env.NEXT_PUBLIC_BE_PATH}/user`, data)
                .then(res => {
                    router.push('/');
                });
        }
    });


    useEffect(() => {

        if (id && id !== 'new') {
            // axios.get(`${process.env.NEXT_PUBLIC_BE_PATH}/user/${id}`)
            //     .then(res => {
            //         setFormData(res.data);
            //     })
        }

    }, [id]);

    const save = () => {

    }


    const formikTouched: any = formik.touched;
    const formikErrors: any = formik.errors;
    const isFormFieldValid = (property: any) => !!(formikTouched[property] && formikErrors[property]);
    const getFormErrorMessage = (property: string) => {
        return isFormFieldValid(property) && <small className="p-error">{formikErrors[property]}</small>;
    };

    return (
        <div style={{width: '100%', height: '100%'}}>

            <div className="card">
                <div className="flex flex-row flex-wrap card-container">
                    <div className="flex" style={{width: '50%'}}>

                        <div className="card">
                            <h5 className="text-center">User details</h5>
                            <form onSubmit={formik.handleSubmit} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="firstName" name="firstName" value={formik.values.firstName}
                                                   onChange={formik.handleChange} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid('firstName')})}/>
                                        <label htmlFor="firstName"
                                               className={classNames({'p-error': isFormFieldValid('firstName')})}>First name*</label>
                                    </span>
                                    {getFormErrorMessage('firstName')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="lastName" name="lastName" value={formik.values.lastName}
                                                   onChange={formik.handleChange} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid('lastName')})}/>
                                        <label htmlFor="lastName"
                                               className={classNames({'p-error': isFormFieldValid('lastName')})}>Last name*</label>
                                    </span>
                                    {getFormErrorMessage('lastName')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="email" name="email" value={formik.values.email}
                                                   onChange={formik.handleChange} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid('email')})}/>
                                        <label htmlFor="email"
                                               className={classNames({'p-error': isFormFieldValid('email')})}>Email*</label>
                                    </span>
                                    {getFormErrorMessage('email')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="phone" name="phone" value={formik.values.phone}
                                                   onChange={formik.handleChange} autoFocus
                                                   className={classNames({'p-invalid': isFormFieldValid('phone')})}/>
                                        <label htmlFor="phone"
                                               className={classNames({'p-error': isFormFieldValid('phone')})}>phone*</label>
                                    </span>
                                    {getFormErrorMessage('phone')}
                                </div>

                                <Button type="submit" label="Submit" className="mt-2" />
                            </form>
                        </div>

                    </div>
                    <div className="flex" style={{width: '50%'}}>

                        <div className="card">
                            <Button>Reset password</Button>
                            <Button>Reset 2FA</Button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default UserDetails
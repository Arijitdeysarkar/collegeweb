import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import {
    SET_ADMIN, SET_ERRORS, 
    GET_SUBJECTS
} from '../actionTypes'

const url = "http://localhost:5000"

const setAdmin = (data) => {
    return {
        type: SET_ADMIN,
        payload: data
    }
}

const adminAddFacultyFlag = (data) => {
    return {
        type: "ADMIN_ADD_FACULTY_FLAG",
        payload: data
    }
}

const adminAddStudentFlag = (data) => {
    return {
        type: "ADMIN_ADD_STUDENT_FLAG",
        payload: data
    }
}

const adminAddSubjectFlag = (data) => {
    return {
        type: "ADMIN_ADD_SUBJECT_FLAG",
        payload: data
    }
}

const adminAddAdminFlag = (data) => {
    return {
        type: "ADMIN_ADD_ADMIN_FLAG",
        payload: data
    }
}

const getSubjctsHelper = (data) => {
    return {
        type: GET_SUBJECTS,
        payload: data
    }
}

const adminGetAllFacultyHelper = (data) => {
    return {
        type: "GET_ALL_FACULTY",
        payload: data
    }   
}

const adminGetAllStudentHelper = (data) => {
    return {
        type: "GET_ALL_STUDENT",
        payload: data
    }
}


const adminGetAllSubjectHelper = (data) => {
    return {
        type: "GET_ALL_SUBJECT",
        payload: data
    }
}

export const adminLogin = (adminCredential) => {
    return async (dispatch) => {
        try {
            console.log("Admin Login Credentials", adminCredential)
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/login",
                data: adminCredential
            })
            console.log("login response", data)
            const { token } = data;
            // Set token to local Storage
            localStorage.setItem('adminJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setAdmin(decoded))
        }
        catch (err) {
            console.log('errr',err)
            alert('Invalid Credentials')
            dispatch({
                type: SET_ERRORS,
                payload: 'Invalid Credentials'
            })
        }
    }
}

export const adminSignup = (adminCredential) => {
    return async (dispatch) => {
        try {
            console.log("Admin Signup Credentials", adminCredential)
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addAdmin",
                data: adminCredential
            })
            console.log("login response", data)
           

            const { token ,Data} = data;
            console.log("login respons5555555555555555555555e", token)
            // Set token to local Storage
            // localStorage.setItem('adminJwtToken', token);
            // Set token to Auth header
            // setAuthToken(token);
            // Decode token to get user data
           
            alert("Admin registerd successfully,check your registered email for Registration Id and Password")
            console.log("decodessdd respons5555555555555555555555e", Data)

            // Set current user
            // dispatch(setAdmin(Data))
        }
        catch (err) {
            console.log('erorororo',err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            alert(err.response.data.message)
        }
    }
}

export const adminGetAllSubjects = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/admin/getSubjects",
            })
            dispatch(getSubjctsHelper(data))
        }
        catch (err) {
            console.log("Error in getting all subjects", err.message)
        }
    }
}

export const adminAddFaculty = (facultyCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addFaculty",
                data: facultyCredential
            })
            dispatch(adminAddFacultyFlag(true))
            alert("Faculty Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminAddStudent = (studentCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addStudent",
                data: studentCredential
            })
            dispatch(adminAddStudentFlag(true))
            alert("Student Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminAddSubject = (subjectCredential) => {
    return async (dispatch) => {
        try {
            console.log('subjectCredential',subjectCredential)
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addSubject",
                data: subjectCredential
            })
            console.log('object,data',data)
            dispatch(adminAddSubjectFlag(true))
            alert("Subject Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminAddExam = (subjectCredential) => {
    return async (dispatch) => {
        try {
            console.log('subjectCredential',subjectCredential)
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addExam",
                data: subjectCredential
            })
            console.log('object,data',data)
            dispatch(adminAddSubjectFlag(true))
            alert("Exam Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminAddAdmin = (adminCredentails) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addAdmin",
                data: adminCredentails
            })
            dispatch(adminAddAdminFlag(true))
            alert("Admin Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminGetAllFaculty = (department) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/getAllFaculty",
                data: department
            })
            console.log('adtattaa',data)
            if(data.result.length>0){

                dispatch(adminGetAllFacultyHelper(data.result))
            }
            else{
                dispatch(adminGetAllFacultyHelper(data.result))
                alert("No faculty found")

            }
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminGetAllStudent = (searchCredentials) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/getAllStudent",
                data: searchCredentials
            })
            if(data.result.length>0){

            dispatch(adminGetAllStudentHelper(data.result))
            }
            else{
                dispatch(adminGetAllStudentHelper(data.result))
                alert("No student found")
            }
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminGetAllSubject = (department) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/getAllSubject",
                data: department
            })
            dispatch(adminGetAllSubjectHelper(data.result))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const setAdminUser = data => {
    return {
        type: SET_ADMIN,
        payload: data
    };
}

export const adminLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('adminJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setAdmin({}));
    };
import axios from "../../axios-instance";
import keys from "../../constants/Keys";

export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_NOTE = "ADD_NOTE";
export const GET_NOTES = "GET_NOTES";
export const GET_PROJECTS = "GET_PROJECTS";
export const DELETE_NOTE = "DELETE_NOTE";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const START_GET_NOTES = "START_GET_NOTES";
export const END_GET_NOTES = "END_GET_NOTES";
export const SIGNUP = "SIGNUP";

export const addProject = (project) => {
  return (dispatch) => {
    axios
      .post(
        // rajouter .json pour firebase
        "/projects.json",
        project
      )
      .then((response) => {
        const newProject = {
          id: response.data.name,
          name: project.name,
        };
        dispatch({ type: ADD_PROJECT, project: newProject });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addNote = (note) => {
  return (dispatch) => {
    axios
      .post(
        // rajouter .json pour firebase
        "/notes.json",
        note
      )
      .then((response) => {
        const newNote = {
          id: response.data.name,
          content: note.content,
          creationDate: note.creationDate,
          projectId: note.projectId,
        };
        dispatch({ type: ADD_NOTE, note: newNote });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getNotes = () => {
  return (dispatch) => {
    dispatch({ type: START_GET_NOTES });
    axios
      .get("/notes.json")
      .then((response) => {
        const fetchNotes = [];
        for (let key in response.data) {
          fetchNotes.push({
            id: key,
            content: response.data[key].content,
            creationDate: response.data[key].creationDate,
            projectId: response.data[key].projectId,
          });
        }
        dispatch({ type: GET_NOTES, notes: fetchNotes });
        dispatch({ type: END_GET_NOTES });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: END_GET_NOTES });
      });
  };
};

export const getProjects = () => {
  return (dispatch) => {
    axios
      .get("/projects.json")
      .then((response) => {
        const fetchProjects = [];
        for (let key in response.data) {
          fetchProjects.push({
            id: key,
            name: response.data[key].name,
          });
        }
        dispatch({ type: GET_PROJECTS, projects: fetchProjects });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteNote = (noteId) => {
  return (dispatch) => {
    axios.delete(`/notes/${noteId}.json`).then((response) => {
      dispatch({ type: DELETE_NOTE, noteId: noteId });
    });
  };
};

export const deleteProject = (projectId) => {
  return (dispatch) => {
    axios.delete(`/projects/${projectId}.json`).then((response) => {
      dispatch({ type: DELETE_PROJECT, projectId: projectId });
    });
  };
};

export const signup = (email, password) => {
  return (dispatch) => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.firebase}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: SIGNUP,
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        throw new Error(error.response.data.error); // Pour LANCER ERROR
      });
  };
};

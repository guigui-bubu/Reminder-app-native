import axios from "../../axios-instance";

export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_NOTE = "ADD_NOTE";
export const GET_NOTES = "GET_NOTES";
export const GET_PROJECTS = "GET_PROJECTS";

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
      })
      .catch((error) => {
        console.log(error);
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

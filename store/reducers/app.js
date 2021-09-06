import {
  ADD_PROJECT,
  ADD_NOTE,
  GET_NOTES,
  GET_PROJECTS,
  DELETE_NOTE,
  DELETE_PROJECT,
  END_GET_NOTES,
  START_GET_NOTES,
  SIGNUP,
} from "../actions/app";
import moment from "moment";

const initialState = {
  notes: [],
  projects: [],
  loadedNotes: false,
  userId: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.project, ...state.projects],
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case GET_NOTES:
      const fetchNotes = [...action.notes];
      fetchNotes.sort(function (a, b) {
        let dateA = moment(a.creationDate),
          dateB = moment(b.creationDate);
        return dateB - dateA;
      });
      return {
        ...state,
        notes: fetchNotes,
      };
    case GET_PROJECTS:
      const fetchProjects = [...action.projects];
      fetchProjects.sort(function (a, b) {
        let dateA = moment(a.creationDate),
          dateB = moment(b.creationDate);
        return dateB - dateA;
      });
      return {
        ...state,
        projects: fetchProjects,
      };
    case DELETE_NOTE:
      let actualNotes = [...state.notes];
      actualNotes = actualNotes.filter((note) => note.id != action.noteId);
      return {
        ...state,
        notes: [...actualNotes],
      };
    case DELETE_PROJECT:
      let actualProjects = [...state.projects];
      actualProjects = actualProjects.filter(
        (project) => project.id != action.projectId
      );
      return {
        ...state,
        projects: [...actualProjects],
      };
    case START_GET_NOTES:
      return {
        ...state,
        loadedNotes: true,
      };
    case END_GET_NOTES:
      return {
        ...state,
        loadedNotes: false,
      };
    case SIGNUP:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
      };
    default:
      return state;
  }
};

import { ADD_PROJECT, ADD_NOTE, GET_NOTES, GET_PROJECTS } from "../actions/app";
import moment from "moment";

const initialState = {
  notes: [],
  projects: [],
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
    default:
      return state;
  }
};

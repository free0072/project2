import React from "react";
import { createContext } from "react";

export const GlobalState = createContext();

export const initialState = {
  activeModal: "",
  loggedIn: false,
  loggedUser: {},
  setRole:"",
  searchTerm: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FIRE_MODAL": {
      return {
        ...state,
        activeModal: action.payload,
      };
    }
    case "IS_LOGGED": {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        loggedUser: action.payload,
      };
    }
    case "SET_ROLE": {
      return {
        ...state,
        setRole: action.payload
      }
    }
    case "SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

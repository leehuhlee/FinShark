import axios from "axios";
import { CommentGet, CommentPost } from "../models/Comment";
import { handleError } from "../helpers/ErrorHandler";

const api = "https://localhost:7242/api/comment/";
const token = localStorage.getItem('token');

export const commentPostAPI = async (title: string, content: string, symbol: string) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}

export const commentsGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}
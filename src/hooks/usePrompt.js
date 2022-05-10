import { useDispatch } from 'react-redux';
import { openPrompt, setPrompt } from '../services/appSlice';

const usePrompt = () => {
  const dispatch = useDispatch();

  const prompt = (options) => {
    dispatch(setPrompt(options));
    dispatch(openPrompt());
  };

  return prompt;
};

export default usePrompt;

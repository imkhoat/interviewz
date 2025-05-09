import { openAIRepository } from "@shared/repositories/openai.repository";
import { useOpenAIReducer } from "@shared/reducers/openai.reducer";

export const useOpenAIQuery = () => {
  const { setLoading, setError, setResponse, reset } = useOpenAIReducer();

  const generateResumeFeedback = async (resume: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await openAIRepository.generateResumeFeedback(resume);
      setResponse(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateInterviewQuestions = async (
    jobDescription: string,
    candidateProfile: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await openAIRepository.generateInterviewQuestions(
        jobDescription,
        candidateProfile
      );
      setResponse(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const evaluateInterviewAnswer = async (question: string, answer: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await openAIRepository.evaluateInterviewAnswer(
        question,
        answer
      );
      setResponse(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateResumeFeedback,
    generateInterviewQuestions,
    evaluateInterviewAnswer,
    reset,
  };
}; 
import styles from "./successModal.module.css";
import CButton from "../../Button/button";
import { toast } from "react-toastify";

const SuccessModal = ({ setSteps, closeModal, quizId }) => {
  const baseUrl = process.env.REACT_APP_URL;

  const handleCross = () => {
    setSteps(0);
    closeModal(false);
  };

  const linktobecopied = `${baseUrl}/quiz/${quizId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(linktobecopied);
    toast.success("Link copied!");
  };

  return (
    <div className={styles.container}>
      <p onClick={handleCross} className={styles.cross}>
        X
      </p>
      <h2 className={styles.heading}>
        Congrats your Quiz is <br /> Published!
      </h2>
      <div className={styles.link}>{linktobecopied}</div>
      <CButton
        onClick={handleCopy}
        selected
        title="Share"
        width="30%"
        padding="0.8rem"
      />
    </div>
  );
};

export default SuccessModal;

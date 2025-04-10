import React from "react";
import {
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
  FaReddit,
  FaTimes
} from "react-icons/fa";

const ShareModal = ({ show, onClose }) => {
  const url = encodeURIComponent("https://personality-test-lake-five.vercel.app");
  const title = encodeURIComponent("Try this fun Personality Quiz!");

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.close}><FaTimes /></button>
        <h3 style={{ marginBottom: "1rem" }}>Share your results</h3>
        <div style={styles.icons}>
          <a href={`https://wa.me/?text=${title}%20${url}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={32} color="#25D366" /></a>
          <a href={`https://twitter.com/intent/tweet?text=${title}%20${url}`} target="_blank" rel="noopener noreferrer"><FaTwitter size={32} color="#1DA1F2" /></a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer"><FaLinkedin size={32} color="#0077B5" /></a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer"><FaFacebook size={32} color="#4267B2" /></a>
          <a href={`https://pinterest.com/pin/create/button/?url=${url}&description=${title}`} target="_blank" rel="noopener noreferrer"><FaPinterest size={32} color="#E60023" /></a>
          <a href={`https://www.reddit.com/submit?url=${url}&title=${title}`} target="_blank" rel="noopener noreferrer"><FaReddit size={32} color="#FF4500" /></a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 1000
  },
  modal: {
    background: "#fff", padding: "2rem", borderRadius: "10px",
    width: "300px", textAlign: "center", position: "relative"
  },
  icons: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", justifyItems: "center", alignItems: "center" ,marginTop: "1rem",
  },
  close: {
    position: "absolute", top: "10px", right: "10px",
    background: "none", border: "none", cursor: "pointer"
  }
};

export default ShareModal;



import React from "react";
import { FaWhatsapp, FaTwitter, FaLinkedin, FaFacebook, FaPinterest, FaReddit, FaTimes } from "react-icons/fa";

const ShareModal = ({ show, onClose }) => {
  const url = encodeURIComponent("https://personality-test-lake-five.vercel.app");
  const title = encodeURIComponent("Try this fun Personality Quiz!");

  if (!show) return null;                                    //if the show prop is false,dont render modal

  return (
    <div 
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-[1000]"
    >
      <div  
        onClick={(e) => e.stopPropagation()}                //to close modal when clicked outside
        className="bg-white p-8 rounded-lg w-70  text-center relative  transform transition-all duration-300 translate-y-0 opacity-100 animate-slide-up"
      >
        <button onClick={onClose} className="absolute top-2 right-2 bg-transparent border-none text-gray-500 hover:text-gray-700 "><FaTimes /></button>
        <h3  className="text-xl font-semibold mb-6">Share your results</h3>
        <div className="grid grid-cols-3 gap-y-6 mt-4 place-items-center">
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
export default ShareModal;
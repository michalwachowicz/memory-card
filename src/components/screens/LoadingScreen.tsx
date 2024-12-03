import React from "react";
import LoadingIcon from "@/Assets/images/icons/loading.svg?react";

const LoadingScreen: React.FC = () => (
  <div className="loading">
    <LoadingIcon data-testid="loading-icon" className="loading-icon" />
    <div className="loading-text">Loading...</div>
  </div>
);

export default LoadingScreen;

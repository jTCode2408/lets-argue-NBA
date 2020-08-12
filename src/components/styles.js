import styled, { keyframes } from "styled-components";


    const dropHeight= '200px';
    const logoSize='48px';
    const offset= '100px';
    const shadowHeight= '8px';
    const duration= '0.5s';

  
  
  
  export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
  `
  
  export const LogoWrapper=styled.div`
    width: ${logoSize};
    height: ${logoSize};
    border:2px solid red;
  
    position: absolute;
    top: ${offset};
    left: calc(50% - ${logoSize} / 2);
  
    animation-name: bounce;
    animation-duration: ${duration};
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
    animation-iteration-count: infinite;
  `
  
  export const Shadow = styled.div`
    width: ${logoSize};
    height: ${shadowHeight};
    background: radial-gradient(
      50% 50%,
      rgba(150, 150, 150, 1),
      rgba(150, 150, 150, 0.05)
    );
    position: absolute;
    top: calc(
      ${offset} + ${dropHeight} + ${logoSize} - 1.5 *
        ${shadowHeight}
    );
    left: calc(50% - ${logoSize} / 2);
  
    animation-name: grow;
    animation-duration:${duration};
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
    animation-iteration-count: infinite;
  `
  
  const bounce = keyframes`
  from {
    transform: translateY(0) scale(1);
  }
  to {
    transform: translateY(var(--drop-height)) scale(1, 0.7);
  }
  
  `


  const grow = keyframes`
  from {
    transform: scale(0.2, 0.5);
  }

  to {
    transform: scale(1.5, 0.8);
  }
  
  `
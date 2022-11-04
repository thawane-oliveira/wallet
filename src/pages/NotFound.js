import React from 'react';
import '../styles/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <>
        <h1 className="notFoundTitle">É dinheiro que você procura? Página errada...</h1>
        <div className="imgContainer">
          <img
            src="https://pbs.twimg.com/media/EIaTrs7XUAAIvgr.jpg:large"
            alt="Imagem do personagem Giorno Giovanna, segurando duas notas de dinheiro"
            className="giornoImg"
          />
        </div>
      </>
    );
  }
}

export default NotFound;

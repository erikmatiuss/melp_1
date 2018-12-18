import React, { Component } from 'react';
import Buscardor from './componentes/Buscador';
import Resultado from './componentes/Resultado';


class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }

  scroll = () => {
    const elemento = document.querySelector ('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;

    if(pagina === 1) return null;

    pagina -=1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    // console.log(pagina);
  }

  paginaSiguiente = () => {
    
    let pagina = this.state.pagina;

    pagina +=1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    // console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json&q=${termino}&per_page=30&page=${pagina}`;
    
    console.log(url);

    fetch(url)
    .then (respuesta => respuesta.json() )
    .then (resultado => this.setState ({imagenes : resultado.hits}) )
  }


  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })

  }
  render() {

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Restaurates</p>
            <Buscardor
            datosBusqueda={this.datosBusqueda}
            />
        </div>
          <div className="row justify-content-center">
              <Resultado 
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
              />
          </div>
      </div>
    );
  }
}

export default App;

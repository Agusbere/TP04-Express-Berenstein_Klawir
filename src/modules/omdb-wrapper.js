import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const APIKEY = "a41637f6";

const makeOMDBRequest = async (params) => {
  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        ...params, 
        apikey: APIKEY, 
      },
      httpsAgent: agent,
    });

    if (response.data.Response === "True") {
      return {
        respuesta: true,
        datos: response.data,
      };
    } else {
      return {
        respuesta: false,
        datos: {},
      };
    }
  } catch (error) {
    console.error("Error en makeOMDBRequest:", error);
    return {
      respuesta: false,
      datos: {},
    };
  }
};

const OMDBSearch = async (searchText, page = 1, getAll = false) => {
  const result = await makeOMDBRequest({ s: searchText, page });

  if (result.respuesta) {
    let returnObject = {
      respuesta: true,
      cantidadTotal: parseInt(result.datos.totalResults, 10),
      datos: result.datos.Search,
    };

    if (getAll) {
      const pages = Math.ceil(returnObject.cantidadTotal / 10);
      for (let i = page + 1; i <= pages; i++) {
        const additionalResponse = await makeOMDBRequest({ s: searchText, page: i });
        if (additionalResponse.respuesta) {
          returnObject.datos = returnObject.datos.concat(additionalResponse.datos.Search);
        }
      }
    }

    return returnObject;
  } else {
    return {
      respuesta: false,
      cantidadTotal: 0,
      datos: [],
    };
  }
};

const OMDBGetByImdbID = async (imdbID) => {
  const result = await makeOMDBRequest({ i: imdbID });
  return result;
};

const OMDBSearchByPage = async (searchText, page = 1) => {
  return OMDBSearch(searchText, page, false);
};

const OMDBSearchComplete = async (searchText, page = 1) => {
  return OMDBSearch(searchText, page, true);
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };